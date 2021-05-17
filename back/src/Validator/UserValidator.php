<?php

namespace App\Validator;

use App\Entity\User;
use App\Validator\ObjectValidator;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Core\Validator\Constraints as SecurityAssert;

class UserValidator extends ObjectValidator
{
    /**
     * Validate datas required for user object
     *
     * @param string $requestContent
     * @param string $constraintType
     * @return array
     */
    public function validateRequestDatas(string $requestContent, string $constraintType = null): array
    {
        $datas = $this->serializer->decode($requestContent, 'json');

        $regex = "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/";

        $value = '';
        if ($constraintType !== 'edit') {
            $value = $datas['password'];
        }

        $constraints = [
            'new' => new Assert\Collection([
                'fields' => [
                    'email' => [
                        new Assert\NotBlank(['message' => 'email.not_blank']),
                        new Assert\Email(),
                    ],
                    'password' => [
                        new Assert\NotBlank(['message' => 'password.not_blank']),
                        new Assert\Regex([
                            'pattern' => $regex,
                            'message' => 'password.regex',
                        ]),
                    ],
                    'confirmPassword' => [
                        new Assert\NotBlank(['message' => 'password.not_blank']),
                        new Assert\Regex([
                            'pattern' => $regex,
                            'message' => 'password.regex',
                        ]),
                        new Assert\IdenticalTo([
                            'value' => $value,
                            'message' => 'password.identical_to',
                            ]),
                    ],
                ],
            ]),
            'edit' => new Assert\Collection([
                'fields' => [
                    'email' => [
                        new Assert\NotBlank(['message' => 'email.not_blank']),
                        new Assert\Email(),
                    ],
                    'pseudo' => [
                        new Assert\Type('string'),
                    ],
                    'avatar' => [
                        new Assert\Type('string'),
                    ],
                ],
            ]),
            'editPassword' => new Assert\Collection([
                'fields' => [
                    'currentPassword' => [
                        new Assert\NotBlank(['message' => 'password.not_blank']),
                        new SecurityAssert\UserPassword(),
                    ],
                    'password' => [
                        new Assert\NotBlank(['message' => 'password.not_blank']),
                        new Assert\Regex([
                            'pattern' => $regex,
                            'message' => 'password.regex',
                        ]),
                    ],
                    'confirmPassword' => [
                        new Assert\NotBlank(['message' => 'password.not_blank']),
                        new Assert\Regex([
                            'pattern' => $regex,
                            'message' => 'password.regex',
                        ]),
                        new Assert\IdenticalTo([
                            'value' => $value,
                            'message' => 'password.identical_to',
                        ]),
                    ],
                ],
            ]),
        ];
        $validationErrors = $this->validator->validate($datas, $constraints[$constraintType]);

        $formatedErrorsList = [];

        $this->formatErrors($formatedErrorsList, $validationErrors);

        return $formatedErrorsList;
    }

    /**
     * Validate the user object
     *
     * @param User $user
     * @return array
     */
    public function validateObject(User $user): array
    {
        $errors = $this->validator->validate($user);

        $formatedErrorsList = [];

        if (count($errors) > 0) {
            $this->formatErrors($formatedErrorsList, $errors);
        }

        return $formatedErrorsList;
    }
}