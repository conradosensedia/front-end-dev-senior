<?php

namespace App\Enums;

enum TaskStatus: string
{
    case TO_DO = 'todo';
    case IN_PROGRESS = 'inprogress';
    case DONE = 'done';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}