<?php

namespace App\Security;

use App\Entity\User;

class VisitorAccountChecker
{
    public static function isVisitorAccount(User $currentUser)
    {
        $isVisitor = $currentUser->getEmail() === 'visiteur@test.io' ? true : false;

        return $isVisitor;
    }
}
