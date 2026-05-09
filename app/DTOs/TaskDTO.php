<?php

declare(strict_types=1);

namespace App\DTOs;

use OpenApi\Attributes as OA;
use App\Http\Requests\StoreTaskRequest;

#[OA\Schema(title: "TaskDTO", required: ["board_id", "title", "status"])]
readonly class TaskDTO
{
    public function __construct(
        #[OA\Property(property: "board_id", example: 1)]
        public int $boardId,

        #[OA\Property(example: "Fix Header Layout")]
        public string $title,

        #[OA\Property(example: "Adjusting padding on mobile devices")]
        public ?string $description,

        #[OA\Property(example: "todo")]
        public string $status,
    ) {}

    public static function fromRequest(StoreTaskRequest $request): self
    {
    return new self(
        boardId: $request->validated('board_id'),
        title: $request->validated('title'),
        description: $request->validated('description'),
        status: $request->validated('status'),
    );
    }

    public function toArray(): array
    {
        return [
            'board_id' => $this->boardId,
            'title' => $this->title,
            'description' => $this->description,
            'status' => $this->status,
        ];
    }
}