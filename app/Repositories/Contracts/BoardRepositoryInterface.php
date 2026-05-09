<?php

declare(strict_types=1);

namespace App\Repositories\Contracts;

use App\Models\Board;
use Illuminate\Support\Collection;
use App\DTOs\BoardDTO;

interface BoardRepositoryInterface
{
    /** @return Collection<int, Board> */
    public function all(): Collection;

    public function create(BoardDTO $data): Board;

    public function findById(int $id): ?Board;
}
