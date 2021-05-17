<?php

namespace App\Validator;

use App\Validator\ObjectValidator;
use Symfony\Component\Validator\Constraints as Assert;

class ScenarioValidator extends ObjectValidator
{
    /**
     * Validate datas required for scenario object
     *
     * @param string $requestContent
     * @return array
     */
    public function validateRequestDatas(string $requestContent): array
    {
        $datas = $this->serializer->decode($requestContent, 'json');

        $constraints = new Assert\Collection([
            'name' => new Assert\NotBlank([
                'message' => 'name.not_blank',
            ]),
            'description' => new Assert\Type('string'),
            'maxPlayers' => new Assert\Positive([
                'message' => 'maxPlayers.positive',
            ]),
            'characterLevel' => new Assert\Positive([
                'message' => 'characterLevel.positive',
            ]),
            'picture' => new Assert\Type('array'),
        ]);
        
        $validationErrors = $this->validator->validate($datas, $constraints);

        $formatedErrorsList = [];

        $this->formatErrors($formatedErrorsList, $validationErrors);

        return $formatedErrorsList;
    }
}