<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\Contracts\BoardRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Http\Requests\StoreBoardRequest;
use App\DTOs\BoardDTO;

class BoardController extends Controller
{
    public function __construct(
        private readonly BoardRepositoryInterface $boardRepository
    ) {}

    public function index(): JsonResponse
    {
        $boards = $this->boardRepository->all();

        return response()->json([
            'data' => $boards,
            'message' => 'Boards retrieved successfully',
        ]);
    }

    public function store(StoreBoardRequest $request): JsonResponse
    {
        $dto = BoardDTO::fromRequest($request);
        $board = $this->boardRepository->create($dto);

        return response()->json([
            'data' => $board,
            'message' => 'Board created successfully',
        ], Response::HTTP_CREATED);
    }

    public function show(int $id): JsonResponse
    {
        $board = $this->boardRepository->findById($id);

        if (! $board) {
            return response()->json(['message' => 'Board not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(['data' => $board]);
    }
}
