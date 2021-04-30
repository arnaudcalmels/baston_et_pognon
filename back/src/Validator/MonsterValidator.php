<?php

namespace App\Validator;

use App\Entity\Monster;
use App\Entity\Place;
use App\Entity\Scenario;
use App\Entity\WanderingMonsterGroup;
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

    public function validateRequestDatas(string $requestContent, $isNew = false, string $parentEntityName = null)
    {
        $datas = $this->serializer->decode($requestContent, 'json');

        if ($isNew) {
            // S'il s'agit d'une création on vérifie que l'entité parent est définie et existe
            $availableParentEntity = [
                'scenario' => Scenario::class,
                'place' => Place::class,
                'wanderGroup' => WanderingMonsterGroup::class,
            ];
    
            $className = $availableParentEntity[$parentEntityName];

            $parentConstraints = new Assert\Collection([
                'allowExtraFields' => true,
                'fields' => [
                    $parentEntityName.'Id' => [
                        new Assert\NotBlank(),
                        new Assert\Positive(),
                        new ContainsIdOfEntityClass($className),
                    ],    
                ],
            ]);

            $parentValidationErrors = $this->validator->validate($datas, $parentConstraints);
        } else {
            // Sinon on vérifie que le monstre est défini et existe
            $parentConstraints = new Assert\Collection([
                'allowExtraFields' => true,
                'fields' => [
                    'monsterId' => [
                        new Assert\NotBlank(),
                        new Assert\Positive(),
                        new ContainsIdOfEntityClass(Monster::class),
                    ],    
                ],
            ]);
        }


        $constraints = new Assert\Collection([
            'allowExtraFields' => true,
            'fields' => [
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
    
            ],
        ]);

        $validationErrors = $this->validator->validate($datas, $constraints);

        $errors = [];

        if ($parentValidationErrors) {
            /** @var ConstraintViolation $error */
            foreach ($parentValidationErrors as $error) {
                $errors[$error->getPropertyPath()] = $error->getMessage();
            }
        }
        /** @var ConstraintViolation $error */
        foreach ($validationErrors as $error) {
            $errors[$error->getPropertyPath()] = $error->getMessage();
        }

        return $errors;
    }
}