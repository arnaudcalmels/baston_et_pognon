<?php

namespace App\Validator;

use App\Entity\Characters;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CharactersValidator
{
    private $validator;

    public function __construct(ValidatorInterface $validator)
    {
        $this->validator = $validator;
    }

    public function validate(\StdClass $requestContent, Characters $character)
    {
        $errors = [];
        if (!isset($requestContent->professionId)) {
            $errors[] = 'La profession doit-être définie';
        }

        if (!isset($requestContent->raceId)) {
            $errors[] = 'La race doit-être définie';
        }

        $errorsValidator = $this->validator->validate($character);

        if (count($errorsValidator) > 0) {
            foreach ($errorsValidator as $error) {
                /* @var ConstraintViolation $error */
                $errors[] = $error->getMessage();
            }
        }

        return $errors;
    }
}