<?php

namespace App\Validator;

use Symfony\Component\Validator\Constraint;

class ContainsIdOfEntityClass extends Constraint
{
    public $message = 'L\'id "{{ id }}" ne correspond à aucun objet de la classe "{{ className }}"';
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