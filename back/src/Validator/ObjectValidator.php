<?php

namespace App\Validator;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Validator\ConstraintViolationList;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ObjectValidator
{
    protected $validator;
    protected $serializer;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
        $this->serializer = new Serializer([new ObjectNormalizer()], [new JsonEncoder()]);
    }

    /**
     * Format list of errors
     *
     * @param array $formatedErrorsList
     * @param ConstraintViolationList $errorsList
     * @return void
     */
    protected function formatErrors(array &$formatedErrorsList, ConstraintViolationList $errorsList)
    {
        foreach ($errorsList as $error) {
            $formatedErrorsList[] = $error->getMessage();
        }
    }
}