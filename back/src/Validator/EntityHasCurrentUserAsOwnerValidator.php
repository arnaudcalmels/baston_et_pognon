<?php

namespace App\Validator;

use Doctrine\ORM\EntityManager;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Security\Core\Security;
use App\Validator\EntityHasCurrentUserAsOwner;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class EntityHasCurrentUserAsOwnerValidator extends ConstraintValidator
{
    private $em;
    private $security;

    public function __construct(EntityManager $entityManager, Security $security)
    {
        $this->em = $entityManager;
        $this->security = $security;
    }

    public function validate($value, Constraint $constraint)
    {  
        if (!$constraint instanceof EntityHasCurrentUserAsOwner) {
            throw new UnexpectedTypeException($constraint, EntityHasCurrentUserAsOwner::class);
        }

        // custom constraints should ignore null and empty values to allow
        // other constraints (NotBlank, NotNull, etc.) to take care of that
        if (null === $value || '' === $value) {
            return;
        }

        if (!is_int($value) || $value <= 0) {
            // throw this exception if your validator cannot handle the passed type so that it can be marked as invalid
            throw new UnexpectedValueException($value, 'id');
        }

        $className = $constraint->className;
        $repository = $this->em->getRepository($className);

        $object = $repository->find($value);

        if (!$object) {
            return;
        }

        if ($object->getOwner() !== $this->security->getUser()) {
            $this->context->buildViolation($constraint->message)
                ->setParameters([
                    '{{ classname }}' => $className,
                ])
                ->addViolation();
        }
    }
}
