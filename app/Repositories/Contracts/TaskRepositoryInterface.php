<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Task;
use Illuminate\Support\Collection;
use App\DTOs\TaskDTO;

interface TaskRepositoryInterface
{
    public function create(TaskDTO $data): Task;
    public function updateStatus(int $taskId, string $newStatus): Task;
    public function getByBoard(int $boardId): Collection;
    public function delete(int $taskId): bool;
}