<?php

namespace App\Controller;

use App\Entity\User;
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
    /**
     * Create a new User
     *
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param ValidatorInterface $validator
     * @return JsonResponse
     */
    public function new(Request $request, UserPasswordEncoderInterface $passwordEncoder, ValidatorInterface $validator): JsonResponse
    {
        $requestContent = json_decode($request->getContent());
        if (!isset($requestContent->email) && !isset($requestContent->password) && !isset($requestContent->confirmPassword)) {
            return new JsonResponse(['Format incorrect'], 400);
        }

        $user = new User();
        $user->setEmail($requestContent->email);
        if ($requestContent->password === $requestContent->confirmPassword) {
            if (preg_match("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/", $requestContent->password)) {
                // On enregistre le mot de passe hashé uniquement qu'on la regex correspond pour exploiter le message du NotBlank en cas de non correspondance
                $user->setPassword($passwordEncoder->encodePassword($user, $requestContent->password));
            }
        }
        $user->setRoles(['ROLE_USER']); // rôle défini par défaut
        
        // On définit un pseudo aléatoire avant de sauvegarder le nouvel utilisateur
        $user->setPseudo('User-'.rand(9999, 99999));

        $urlAvatar = $this->getParameter('avatar_default_url');
        $user->setAvatar('$urlAvatar');

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

            $user->setAvatar($urlAvatar);

            $entityManager->flush();

            $statusCode = 201;
            $data = $this->normalizeUser($user);
        }

        return new JsonResponse($data, $statusCode);
    }

    /**
     * Get profile of current user
     *
     * @return JsonResponse
     */
    public function profile(): JsonResponse
    {
        $currentUser = $this->getUser();

        if ($currentUser === null) {
            return new JsonResponse('Utilisateur non trouvé', 404);
        }

        $data = $this->normalizeUser($currentUser);

        return new JsonResponse($data, 200);
    }

    /**
     * Edit a profile
     *
     * @param Request $request
     * @param User $user
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @param ValidatorInterface $validator
     * @param JWTTokenManagerInterface $JWTManager
     * @return JsonResponse
     */
    public function edit(
        Request $request,
        User $user,
        UserPasswordEncoderInterface $passwordEncoder,
        ValidatorInterface $validator,
        JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $currentUser = $this->getUser();

        if ($user !== $currentUser) {
            $data = ['Vous n\'êtes pas autorisé à modifier cet utilisateur'];
            $statusCode = 403;

        } else {
            $requestContent = json_decode($request->getContent());

            if (isset($requestContent->email)) {
                $user->setEmail($requestContent->email);
                $emailChanged = true;
            }
            if (isset($requestContent->password)) {
                if ($requestContent->password === $requestContent->confirmPassword) {
                    if (preg_match("/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/", $requestContent->password)) {
                        // On enregistre le mot de passe hashé uniquement qu'on la regex correspond pour exploiter le message du NotBlank en cas de non correspondance
                        $user->setPassword($passwordEncoder->encodePassword($user, $requestContent->password));
                    }
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

    /**
     * Delete a user
     *
     * @param Request $request
     * @param User $user
     * @return JsonResponse
     */
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

    /**
     * Normalize a User Object
     *
     * @param User $user
     * @return array
     */
    private function normalizeUser(User $user): array
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
