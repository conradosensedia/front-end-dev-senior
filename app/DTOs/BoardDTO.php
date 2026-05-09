<?php

declare(strict_types=1);

namespace App\DTOs;

use App\Http\Requests\StoreBoardRequest;

readonly class BoardDTO
{
    public function __construct(
        public string $name,
        public ?string $description,
        public string $themeColor,
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