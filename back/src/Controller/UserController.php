<?php

namespace App\Controller;

use App\Entity\User;
use App\Validator\UserValidator;
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
        $userValidator = new UserValidator($validator);

        $errors = $userValidator->validateRequestDatas($request->getContent(), 'new');

        if (!count($errors) === 0) {
            return new JsonResponse($errors, 403);
        }

        $requestContent = json_decode($request->getContent());

        $user = new User();
        $user->setEmail($requestContent->email);
        $user->setPassword($passwordEncoder->encodePassword($user, $requestContent->password));
        
        $errorsObject = $userValidator->validateObject($user);
        
        if (count($errorsObject) > 0) {
                $data = $errorsObject;
                $statusCode = 403;
        } else {
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($user);
            
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
     * Edit a profile (except password)
     *
     * @param Request $request
     * @param User $user
     * @param ValidatorInterface $validator
     * @param JWTTokenManagerInterface $JWTManager
     * @return JsonResponse
     */
    public function edit(
        Request $request,
        User $user,
        ValidatorInterface $validator,
        JWTTokenManagerInterface $JWTManager): JsonResponse
    {
        $currentUser = $this->getUser();

        if ($user !== $currentUser) {
            $data = ['Vous n\'êtes pas autorisé à modifier cet utilisateur'];
            $statusCode = 403;
        } else {
            $userValidator = new UserValidator($validator);

            $errors = $userValidator->validateRequestDatas($request->getContent(), 'edit');

            if (count($errors) > 0) {
                $data = $errors;
                $statusCode = 403;
            } else {
                $requestContent = json_decode($request->getContent());

                $user->setEmail($requestContent->email);
                $user->setPseudo($requestContent->pseudo);
                $user->setAvatar($requestContent->avatar);

                $errorsObject = $userValidator->validateObject($user);

                if (count($errorsObject) > 0) {
                    $data = $errorsObject;
                    $statusCode = 403;
                } else {
                    $entityManager = $this->getDoctrine()->getManager();
                    $entityManager->flush();

                    $statusCode = 200;
                    $data = $this->normalizeUser($user);
                    $data['token'] = $JWTManager->create($user);
                }
            }
        }

        return new JsonResponse($data, $statusCode);
    }

    /**
     * Edit password
     *
     * @param Request $request
     * @param UserPasswordEncoderInterface $passwordEncoder
     * @return JsonResponse
     */
    public function editPassword(
        Request $request,
        UserPasswordEncoderInterface $passwordEncoder,
        ValidatorInterface $validator): JsonResponse
    {
        $currentUser = $this->getUser();

        if ($currentUser === null) {
            $data = ['Utilisateur non trouvé'];
            $statusCode = 404;
        } else {
            $userValidator = new UserValidator($validator);

            $errors = $userValidator->validateRequestDatas($request->getContent(), 'editPassword');
            if (count($errors) > 0) {
                $data = $errors;
                $statusCode = 403;
            } else {
                $requestContent = json_decode($request->getContent());

                $currentUser->setPassword($passwordEncoder->encodePassword($currentUser, $requestContent->password));

                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->flush();
    
                $data = $this->normalizeUser($currentUser);
                $statusCode = 200;
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

        if ($user->getAvatar() === null) {
            $urlAvatar = $this->getParameter('avatar_default_url');
            $user->setAvatar($urlAvatar);    
        }

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
