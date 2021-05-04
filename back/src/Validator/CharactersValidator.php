<?php

namespace App\Validator;

use App\Entity\Race;
use App\Entity\Characters;
use App\Entity\Profession;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CharactersValidator
{
    private $validator;
    private $serializer;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
        $this->serializer = new Serializer([new ObjectNormalizer()], [new JsonEncoder()]);
    }

    /**
     * Undocumented function
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
            'sex' => new Assert\Choice([
                'choices' => ['M', 'F'],
                'message' => 'sex.choice'
            ]),
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

    /**
     * Validate the characters object
     *
     * @param Characters $character
     * @return array
     */
    public function validateObject(Characters $character): array
    {
        $errors = $this->validator->validate($character);

        $formatedErrorsList = [];

        if (count($errors) > 0) {
            $this->formatErrors($$formatedErrorsList, $errors);
        }

        return $formatedErrorsList;
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