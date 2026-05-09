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
        return Board::all();
    }

    public function create(BoardDTO $data): Board
    {
        return Board::create($data->toArray());
    }

    public function findById(int $id): ?Board
    {
        return Board::find($id, $this->columns);
    }
}
