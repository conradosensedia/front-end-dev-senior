<?php

declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\Contracts\BoardRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use App\Http\Requests\StoreBoardRequest;
use App\DTOs\BoardDTO;
use OpenApi\Attributes as OA;

#[OA\Info(title: "KanbanFlow API", version: "1.0.0")]
#[OA\Server(url: "/api/v1")]
class BoardController extends Controller
{
    public function __construct(
        private readonly BoardRepositoryInterface $boardRepository
    ) {}

    #[OA\Get(
        path: "/boards",
        summary: "Lists all boards",
        tags: ["Boards"],
        responses: [
            new OA\Response(
                response: 200,
                description: "List of boards retrieved successfully",
                content: new OA\JsonContent(
                    type: "object",
                    properties: [
                        new OA\Property(
                            property: "data",
                            type: "array",
                            items: new OA\Items(ref: "#/components/schemas/Board")
                        ),
                        new OA\Property(property: "message", type: "string", example: "Boards retrieved successfully")
                    ]
                )
            )
        ]
    )]
    public function index(): JsonResponse
    {
        $boards = $this->boardRepository->all();

        return response()->json([
            'data' => $boards,
            'message' => 'Boards retrieved successfully',
        ]);
    }

    #[OA\Post(
        path: "/boards",
        summary: "Createa a new board",
        tags: ["Boards"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: "#/components/schemas/BoardDTO")
        ),
        responses: [
            new OA\Response(response: 201, description: "Board created successfully"),
            new OA\Response(response: 422, description: "Validation error")
        ]
    )]
    public function store(StoreBoardRequest $request): JsonResponse
    {
        $dto = BoardDTO::fromRequest($request);
        $board = $this->boardRepository->create($dto);

        return response()->json([
            'data' => $board,
            'message' => 'Board created successfully',
        ], Response::HTTP_CREATED);
    }

    #[OA\Get(
        path: "/boards/{id}",
        summary: "Fetches a specific board",
        tags: ["Boards"],
        parameters: [
            new OA\Parameter(
                name: "id",
                in: "path",
                description: "ID do board",
                required: true,
                schema: new OA\Schema(type: "integer")
            )
        ],
        responses: [
            new OA\Response(
                response: 200, 
                description: "Board found and retrieved successfully",
                content: new OA\JsonContent(ref: "#/components/schemas/Board")
            ),
            new OA\Response(response: 404, description: "Board not found")
        ]
    )]
    public function show(int $id): JsonResponse
    {
        $board = $this->boardRepository->findById($id);

        if (! $board) {
            return response()->json(['message' => 'Board not found'], Response::HTTP_NOT_FOUND);
        }

        return response()->json(['data' => $board]);
    }

    #[OA\Delete(
        path: "/api/v1/boards/{id}",
        summary: "Delete a board",
        tags: ["Boards"],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 204, description: "Board deleted successfully"),
            new OA\Response(response: 404, description: "Board not found")
        ]
    )]
    public function destroy(int $id): JsonResponse
    {
        $deleted = $this->boardRepository->delete($id);

        if (!$deleted) {
            return response()->json(['message' => 'Board not found")'], 404);
        }

        return response()->json(null, 204);
    }

    #[OA\Get(
        path: "/api/v1/boards/{id}/tasks",
        summary: "List tasks in a board",
        tags: ["Boards"],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 200, description: "Tasks retrieved successfully"),
            new OA\Response(response: 404, description: "Board not found")
        ]
    )]
    public function tasks(int $id): \Illuminate\Http\JsonResponse
    {
        $boardWithTasks = $this->boardRepository->getTasksByBoard($id);

        if (!$boardWithTasks) {
            return response()->json(['message' => 'Board not found'], 404);
        }
    
        return response()->json([
            'data' => $boardWithTasks
        ]);
    }
}
