<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class UserController extends AbstractController
{
    public function new(Request $request, UserPasswordEncoderInterface $passwordEncoder, ValidatorInterface $validator): JsonResponse
    {
        $requestContent = json_decode($request->getContent());

        $user = new User();
        $user->setEmail($requestContent->email);
        $user->setPassword($passwordEncoder->encodePassword($user, $requestContent->password));
        $user->setRoles(['ROLE_USER']); // rôle défini par défaut
        
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

            $statusCode = 201;
            $data = $this->normalizeUser($user);
        }

        return new JsonResponse($data, $statusCode);
    }

    public function profile(): JsonResponse
    {
        $currentUser = $this->getUser();

        if ($currentUser === null) {
            return new JsonResponse('Utilisateur non trouvé', 404);
        }

        $data = $this->normalizeUser($currentUser);

        return new JsonResponse($data, 200);
    }

    public function edit(
        Request $request,
        User $user,
        UserPasswordEncoderInterface $passwordEncoder,
        ValidatorInterface $validator,
        JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $currentUser = $this->getUser();

        if ($user !== $currentUser) {
            $data = 'Vous n\'êtes pas autorisé à modifier cet utilisateur';
            $statusCode = 403;

        } else {
            $requestContent = json_decode($request->getContent());
            if (isset($requestContent->email)) {
                $user->setEmail($requestContent->email);
                $emailChanged = true;
            }
            if (isset($requestContent->password)) {
                if ($requestContent->password === $requestContent->confirmPassword) {
                    $user->setPassword($passwordEncoder->encodePassword($user, $requestContent->password));
                }
            }
            if (isset($requestContent->pseudo)) {
                $user->setPseudo($requestContent->pseudo);
            }
            if (isset($requestContent->avatar)) {
                $user->setAvatar($requestContent->avatar);
            }

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
                if (isset($emailChanged) && $emailChanged) {
                    $data['token'] = $JWTManager->create($user);
                }
            }
        }

        return new JsonResponse($data, $statusCode);
    }

    public function delete(Request $request, User $user): JsonResponse
    {
        $currentUser = $this->getUser();

        if ($user !== $currentUser) {
            $message = 'Vous n\'êtes pas autorisé à modifier cet utilisateur';
            $statusCode = 403;
        } else {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->remove($user);
            $entityManager->flush();  
            
            $message = 'Suppression OK';
            $statusCode = 200;
        }

        return new JsonResponse($message, $statusCode);
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
