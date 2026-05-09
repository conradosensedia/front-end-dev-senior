<?php

declare(strict_types=1);

namespace App\Repositories\Eloquent;

use App\DTOs\BoardDTO;
use App\Models\Board;
use App\Repositories\Contracts\BoardRepositoryInterface;
use Illuminate\Support\Collection;

class BoardRepository implements BoardRepositoryInterface
{
    private array $columns = ['*'];

    /** @return Collection<int, Board> */
    public function all(): Collection
    {
        return Board::withCount('tasks')->get();
    }

    public function create(BoardDTO $data): Board
    {
        return Board::create($data->toArray());
    }

    public function findById(int $id): ?Board
    {
        return Board::withCount('tasks')->find($id, $this->columns);
    }

    public function delete(int $id): bool
    {
        $board = Board::find($id, $this->columns);;

        if (!$board) {
            return false;
        }

        return (bool) $board->delete();
    }

    public function getTasksByBoard(int $boardId): array 
    {
        $board = Board::with(['tasks' => function($query) {
            $query->orderBy('created_at', 'asc');
        }])->find($boardId);
    
        return $board ? $board->toArray() : [];
    }
}
