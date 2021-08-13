<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

class ScenarioHasCurrentUserAsOwner extends Constraint
{
    public $message = 'Vous n\'êtes pas le propriétaire de ce scénario';
    public $className;

    public function __construct($className, array $groups = null, $payload = null, array $options = [])
    {
        $this->className = $className;

        parent::__construct($options, $groups, $payload);
    }

    /**
     * {@inheritdoc}
     */
    public function getDefaultOption()
    {
        return 'className';
    }
}