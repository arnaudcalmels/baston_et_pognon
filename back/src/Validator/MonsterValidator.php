<?php

namespace App\Validator;

use App\Entity\Place;
use App\Entity\Scenario;
use App\Validator\ObjectValidator;
use App\Entity\WanderingMonsterGroup;
use App\Validator\ContainsIdOfEntityClass;
use Symfony\Component\Validator\Constraints as Assert;

class MonsterValidator extends ObjectValidator
{
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
            // Et que l'utilisateur est bien l'auteur du scénario correspondant
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
                        new ContainsIdOfEntityClass($className),
                        new ScenarioHasCurrentUserAsOwner($className)
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
                    new Assert\NotNull(),
                    new Assert\Type('bool'),
                ],
                'hasBooster' => [
                    new Assert\NotNull(),
                    new Assert\Type('bool'),
                ],
                'level' => [
                    new Assert\NotNull(),
                    new Assert\Positive(),
                ],
                'picture' => [
                    new Assert\Type('array'),
                ],
                'caracteristics' => new Assert\Required([
                    new Assert\Collection([
                        'armor' => [
                            new Assert\NotNull(),
                            new Assert\Positive(),
                        ],
                        'lifePoints' => [
                            new Assert\NotNull(),
                            new Assert\Positive(),
                        ],
                        'actions' => new Assert\Required([
                            new Assert\Type('array'),
                            new Assert\Count(['min' => 1]),
                            new Assert\All([
                                new Assert\Collection([
                                    'allowExtraFields' => true,
                                    'fields' => [
                                        'damages' => [
                                            new Assert\NotNull(),
                                            new Assert\Positive(),
                                        ],
                                        'distance' => [
                                            new Assert\NotNull(),
                                            new Assert\Type('bool'),
                                        ],
                                        'frequency' => [
                                            new Assert\NotNull(),
                                            new Assert\Positive(),
                                        ],
                                        'heal' => [
                                            new Assert\NotNull(),
                                            new Assert\Type('bool'),
                                        ],
                                        'isSpecial' => [
                                            new Assert\NotNull(),
                                            new Assert\Type('bool'),
                                        ],
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
}