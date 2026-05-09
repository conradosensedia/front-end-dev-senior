<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\DTOs\TaskDTO;
use App\Models\Task;
use App\Enums\TaskStatus;
use App\Repositories\Contracts\TaskRepositoryInterface;
use Illuminate\Support\Collection;

class TaskRepository implements TaskRepositoryInterface
{
    public function create(TaskDTO $data): Task
    {
        return Task::create($data->toArray());
    }

    public function updateStatus(int $taskId, string $newStatus): Task
    {
        $task = Task::findOrFail($taskId);
        // Validação rigorosa via Enum antes do persist
        $status = TaskStatus::from($newStatus);
        
        $task->update(['status' => $status->value]);
        return $task;
    }

    public function getByBoard(int $boardId): Collection
    {
        return Task::where('board_id', '=', $boardId, 'and')->get();
    }

    public function delete(int $taskId): bool
    {
        $task = Task::findOrFail($taskId);
        return (bool) $task->delete();
    }
}
