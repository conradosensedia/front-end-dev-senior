<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use OpenApi\Attributes as OA;

#[OA\Schema(
    title: "Board",
    description: "Modelo de Board no banco de dados",
    properties: [
        new OA\Property(property: "id", type: "integer", example: 1),
        new OA\Property(property: "name", type: "string", example: "Developer Sprint"),
        new OA\Property(property: "description", type: "string", nullable: true),
        new OA\Property(property: "theme_color", type: "string", example: "#2563eb"),
        new OA\Property(property: "icon_key", type: "string", example: "rocket"),
        new OA\Property(property: "created_at", type: "string", format: "date-time"),
        new OA\Property(property: "updated_at", type: "string", format: "date-time"),
    ]
)]
class Board extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'theme_color',
        'icon_key',
    ];
}
