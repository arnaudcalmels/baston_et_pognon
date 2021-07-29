<?php

namespace App\Validator;

use App\Entity\Scenario;
use App\Validator\ObjectValidator;
use App\Validator\ContainsIdOfEntityClass;
use Symfony\Component\Validator\Constraints as Assert;

class GameValidator extends ObjectValidator
{
    /**
     * Validate datas required for Game object
     *
     * @param string $requestContent
     * @param boolean $isNew
     * @param string $parentEntityName
     * @return array
     */
    public function validateRequestDatas(string $requestContent, $isNew = false, string $parentEntityName = null): array
    {
        $datas = $this->serializer->decode($requestContent, 'json');

        $constraints = new Assert\Collection([
            'allowExtraFields' => true,
            'fields' => [
                'scenarioId' => [
                    new Assert\NotBlank(),
                    new ContainsIdOfEntityClass(Scenario::class),
                    new ScenarioHasCurrentUserAsOwner(Scenario::class)
                ],    
                'comment' => [
                    new Assert\Type('string'),
                ],
                'finished' => new Assert\Type('boolean'),
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