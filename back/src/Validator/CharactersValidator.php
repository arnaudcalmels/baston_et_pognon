<?php

namespace App\Validator;

use App\Entity\Race;
use App\Entity\Characters;
use App\Entity\Profession;
use App\Validator\ObjectValidator;
use Symfony\Component\Validator\Constraints as Assert;

class CharactersValidator extends ObjectValidator
{
    /**
     * Validate datas required for character object
     *
     * @param string $requestContent
     * @return array
     */
    public function validateRequestDatas(string $requestContent): array
    {
        $datas = $this->serializer->decode($requestContent, 'json');

        $constraints = new Assert\Collection([
            'professionId' => new ContainsIdOfEntityClass(Profession::class),
            'raceId' => new ContainsIdOfEntityClass(Race::class),
            'sex' => [
                new Assert\NotBlank([
                    'message' => 'sex.not_blank',
                ]),
                new Assert\Choice([
                'choices' => ['M', 'F'],
                'message' => 'sex.choice'
                ]),
            ],
            'name' => new Assert\NotBlank([
                'message' => 'name.not_blank',
            ]),
            'picture' => new Assert\Type('array'),
        ]);
        
        $validationErrors = $this->validator->validate($datas, $constraints);

        $formatedErrorsList = [];

        $this->formatErrors($formatedErrorsList, $validationErrors);

        return $formatedErrorsList;
    }
}