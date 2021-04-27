<?php

namespace App\Validator;

use App\Entity\Place;
use App\Validator\ContainsIdOfEntityClass;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Validator\ConstraintViolation;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class MonsterValidator
{
    private $serializer;
    private $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
        $this->serializer = new Serializer([new ObjectNormalizer()], [new JsonEncoder()]);
    }

    public function validateRequestDatas(string $requestContent)
    {
        $datas = $this->serializer->decode($requestContent, 'json');

        $constraints = new Assert\Collection([
            'placeId' => [
                new Assert\NotBlank(),
                new Assert\Positive(),
                new ContainsIdOfEntityClass(Place::class),
            ],
            'name' => [
                new Assert\NotBlank(),
            ],
            'isBoss' => [
                new Assert\Type('bool'),
                new Assert\NotNull(),
            ],
            'hasBooster' => [
                new Assert\Type('bool'),
                new Assert\NotNull(),
            ],
            'level' => [
                new Assert\Positive(),
                new Assert\NotNull(),
            ],
            'picture' => [
                new Assert\Type('string'),
            ],
            'caracteristics' => new Assert\Required([
                new Assert\Collection([
                    'armor' => [
                        new Assert\Positive(),
                        new Assert\NotNull(),
                    ],
                    'lifePoints' => [
                        new Assert\Positive(),
                        new Assert\NotNull(),
                    ],
                    'actions' => new Assert\Required([
                        new Assert\Type('array'),
                        new Assert\Count(['min' => 1]),
                        new Assert\All([
                            new Assert\Collection([
                                'damages' => [
                                    new Assert\Positive(),
                                    new Assert\NotNull(),
                                ],
                                'distance' => [
                                    new Assert\Type('bool'),
                                    new Assert\NotNull(),
                                ],
                                'frequency' => [
                                    new Assert\Positive(),
                                    new Assert\NotNull(),
                                ],
                                'heal' => [
                                    new Assert\Type('bool'),
                                    new Assert\NotNull(),
                                ],
                                'isSpecial' => [
                                    new Assert\Type('bool'),
                                    new Assert\NotNull(),
                                ],
                            ]),
                        ]),
                    ]),
                ]),
            ]),
        ]);

        // return [];
        $validationErrors = $this->validator->validate($datas, $constraints);
        // $errorsString = (string) $validationErrors;
        // dd($errorsString);
        $errors = [];
        /** @var ConstraintViolation $error */
        foreach ($validationErrors as $error) {
            // dd($error->getRoot());
            $errors[$error->getPropertyPath()] = $error->getMessage();
        }

        return $errors;
    }
}