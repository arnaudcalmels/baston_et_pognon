<?php

namespace App\Validator;

use Doctrine\ORM\EntityManager;
use App\Validator\ContainsIdOfEntityClass;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class ContainsIdOfEntityClassValidator extends ConstraintValidator
{
    private $em;

    public function __construct(EntityManager $entityManager)
    {
        $this->em = $entityManager;
    }

    public function validate($value, Constraint $constraint)
    {  
        if (!$constraint instanceof ContainsIdOfEntityClass) {
            throw new UnexpectedTypeException($constraint, ContainsIdOfEntityClass::class);
        }

        // custom constraints should ignore null and empty values to allow
        // other constraints (NotBlank, NotNull, etc.) to take care of that
        if (null === $value || '' === $value) {
            return;
        }

        if ($value <= 0) {
            // throw this exception if your validator cannot handle the passed type so that it can be marked as invalid
            throw new UnexpectedValueException($value, 'id');
        }

        $className = $constraint->className;
        $repository = $this->em->getRepository($className);

        $object = $repository->find($value);

        if(!$object) {
            $this->context->buildViolation($constraint->message)
                ->setParameters([
                    '{{ id }}'=> $value,
                    '{{ className }}'=> $className,
                ])
                ->addViolation();
        }
    }
}
