<?php

namespace App\Controller;

use App\Entity\User;
use App\Service\UserService;
use App\Repository\UserRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserController extends AbstractController
{
    public function new(Request $request, UserPasswordEncoderInterface $passwordEncoder, ValidatorInterface $validator): Response
    {
        $requestContent = json_decode($request->getContent());

        $user = new User();
        $user->setEmail($requestContent->email);
        $user->setPassword($passwordEncoder->encodePassword($user, $requestContent->password));
        $user->setRoles(['ROLE_USER']);
        
        // On définit un pseudo aléatoire avant de sauvegarder le nouvel utilisateur
        $user->setPseudo('User-'.rand(9999, 99999));

        $errors = $validator->validate($user);

        if (count($errors) > 0) {
            $data = [];
            foreach ($errors as $error) {
                /* @var ConstraintViolation $error */
                $data[] = $error->getMessage();
                $statusCode = 403;
            }
        } else {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            $entityManager->flush();

            $statusCode = 200;
            $data = $this->normalizeUser($user);
        }

        return new JsonResponse($data, $statusCode);
    }

    public function profile(UserService $userService): Response
    {
        $currentUser = $userService->getCurrentUser();

        if ($currentUser === null) {
            return new JsonResponse('Utilisateur non identifié', 200);
        }

        $data = $this->normalizeUser($currentUser);

        return new JsonResponse($data, 200);
    }

    /* 
     * Normalize a User Object
     * 
    **/
    private function normalizeUser($user)
    {
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers);

        return $serializer->normalize($user, null, [
            AbstractNormalizer::ATTRIBUTES => [
                'id',
                'email',
                'pseudo',
                'avatar',
                ]
            ]
        );
    }
}
