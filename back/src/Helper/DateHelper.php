<?php

namespace App\Helper;

use DateTime;
use DateTimeZone;

class DateHelper
{
    public static $timeZone = 'Europe/Paris';

    public static function now()
    {
        $dateTimeZone = new DateTimeZone(self::$timeZone);

        $date = new DateTime('now');
        $date->setTimeZone($dateTimeZone);

        return $date;
    }
}