<?php

namespace App\Validator;

use App\Entity\CategoryPlaces;
use App\Entity\Scenario;
use App\Validator\ObjectValidator;
use App\Validator\ContainsIdOfEntityClass;
use App\Validator\ScenarioHasCurrentUserAsOwner;
use Symfony\Component\Validator\Constraints as Assert;

class PlaceValidator extends ObjectValidator
{
    /**
     * Validate datas required for place object
     *
     * @param string $requestContent
     * @return array
     */
    public function validateRequestDatas(string $requestContent, $isNew = false): array
    {
        $datas = $this->serializer->decode($requestContent, 'json');

        if ($isNew) {
            // S'il s'agit d'une création on vérifie que l'entité parent est définie et existe
            // Et que l'utilisateur est bien l'auteur du scénario correspondant
            $parentConstraints = new Assert\Collection([
                'allowExtraFields' => true,
                'fields' => [
                    'scenarioId' => [
                        new Assert\NotBlank([
                            'message' => 'scenario.not_blank',
                        ]),
                        new ContainsIdOfEntityClass(Scenario::class),
                        new ScenarioHasCurrentUserAsOwner(Scenario::class),
                    ],    
                ],
            ]);
        }

        $constraints = new Assert\Collection([
            'allowExtraFields' => true,
            'fields' => [
                'categoryId' => [
                    new Assert\NotBlank([
                        'message' => 'category.not_blank',
                    ]),
                    new ContainsIdOfEntityClass(CategoryPlaces::class),
                ],
                'name' => new Assert\NotBlank([
                    'message' => 'name.not_blank',
                ]),
                'description' => new Assert\Type('string'),
                'hiddenBoosterCount' => [
                    new Assert\NotBlank([
                        'message' => 'hiddenBoostCount.not_blank',
                    ]),
                    new Assert\PositiveOrZero([
                        'message' => 'hiddenBoostCount.positive_or_zero',
                    ]),
                ],
                'picture' => new Assert\Type('array'),
            ],
            
        ]);
        
        $validationErrors = $this->validator->validate($datas, $constraints);

        $formatedErrorsList = [];

        if (isset($parentConstraints)) {
            $parentValidationErrors = $this->validator->validate($datas, $parentConstraints);
            $this->formatErrors($formatedErrorsList, $parentValidationErrors);
        }

        $this->formatErrors($formatedErrorsList, $validationErrors);

        return $formatedErrorsList;
    }
}