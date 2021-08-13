<?php

namespace App\Validator;

use App\Entity\Place;
use App\Entity\Scenario;
use App\Entity\WanderingMonsterGroup;
use Doctrine\ORM\EntityManager;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Security\Core\Security;
use App\Validator\ScenarioHasCurrentUserAsOwner;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\Exception\UnexpectedTypeException;
use Symfony\Component\Validator\Exception\UnexpectedValueException;

class ScenarioHasCurrentUserAsOwnerValidator extends ConstraintValidator
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
        if (!$constraint instanceof ScenarioHasCurrentUserAsOwner) {
            throw new UnexpectedTypeException($constraint, ScenarioHasCurrentUserAsOwner::class);
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

        if (!$object) {
            return;
        } elseif ($object instanceof Scenario) {
            $scenario = $object;
        } elseif ($object instanceof WanderingMonsterGroup || $object instanceof Place) {
            $scenario = $object->getScenario();
        }

        if ($scenario->getOwner() !== $this->security->getUser()) {
            $this->context->buildViolation($constraint->message)
                ->setParameters([
                    '{{ classname }}' => $className,
                ])
                ->addViolation();
        }
    }
}
