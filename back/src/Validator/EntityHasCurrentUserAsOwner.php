<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

class EntityHasCurrentUserAsOwner extends Constraint
{
    public $message = 'Vous n\'êtes pas le propriétaire de cette {{ classname }}';
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