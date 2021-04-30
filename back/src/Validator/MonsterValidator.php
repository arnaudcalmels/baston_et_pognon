<?php

namespace App\Validator;

use App\Entity\Monster;
use App\Entity\Place;
use App\Entity\Scenario;
use App\Entity\WanderingMonsterGroup;
use App\Validator\ContainsIdOfEntityClass;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\ConstraintViolationList;
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

    /**
     * Validate datas required for monster object
     *
     * @param string $requestContent
     * @param boolean $isNew
     * @param string $parentEntityName
     * @return array
     */
    public function validateRequestDatas(string $requestContent, $isNew = false, string $parentEntityName = null): array
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

        $formatedErrorsList = [];

        if (isset($parentValidationErrors)) {
            $this->formatErrors($formatedErrorsList, $parentValidationErrors);
        }

        $this->formatErrors($formatedErrorsList, $validationErrors);

        return $formatedErrorsList;
    }

    /**
     * Validate the monster object
     *
     * @param Monster $monster
     * @return array
     */
    public function validateObject(Monster $monster): array
    {
        $errors = $this->validator->validate($monster);

        $formatedErrorsList = [];

        if (count($errors) > 0) {
            $this->formatErrors($$formatedErrorsList, $errors);
        }

        return $$formatedErrorsList;
    }

    /**
     * Format list of errors
     *
     * @param array $formatedErrorsList
     * @param ConstraintViolationList $errorsList
     * @return void
     */
    private function formatErrors(array &$formatedErrorsList, ConstraintViolationList $errorsList)
    {
        foreach ($errorsList as $error) {
            $formatedErrorsList[$error->getPropertyPath()] = $error->getMessage();
        }
    }
}