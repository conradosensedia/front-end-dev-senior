<?php

declare(strict_types=1);

namespace App\DTOs;

use OpenApi\Attributes as OA;

use App\Http\Requests\StoreBoardRequest;

#[OA\Schema(
    title: "BoardDTO",
    description: "Data transfer object for board creation",
    required: ["name", "theme_color", "icon_key"]
)]
readonly class BoardDTO
{
    public function __construct(
        #[OA\Property(example: "Marketing Launch")]
        public string $name,

        #[OA\Property(example: "Q4 Campaign execution and asset tracking.")]
        public ?string $description,

        #[OA\Property(property: "theme_color", example: "#2563eb")]
        public string $themeColor,

        #[OA\Property(property: "icon_key", example: "megaphone")]
        public string $iconKey,
    ) {}

    public static function fromRequest(StoreBoardRequest $request): self
    {
        return new self(
            name: $request->validated('name'),
            description: $request->validated('description'),
            themeColor: $request->validated('theme_color'),
            iconKey: $request->validated('icon_key'),
        );
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'description' => $this->description,
            'theme_color' => $this->themeColor,
            'icon_key' => $this->iconKey,
        ];
    }
}