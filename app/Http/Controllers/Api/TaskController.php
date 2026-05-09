<?php
declare(strict_types=1);

namespace App\Http\Controllers\Api;

use App\DTOs\TaskDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Repositories\Contracts\TaskRepositoryInterface;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use OpenApi\Attributes as OA;

class TaskController extends Controller
{
    public function __construct(
        private readonly TaskRepositoryInterface $taskRepository
    ) {}

    #[OA\Get(
        path: "/boards/{boardId}/tasks",
        summary: "Lists all tasks of a specific board",
        tags: ["Tasks"],
        parameters: [
            new OA\Parameter(name: "boardId", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 200, description: "List of tasks")
        ]
    )]
    public function index(int $boardId): JsonResponse
    {
        $tasks = $this->taskRepository->getByBoard($boardId);

        return response()->json([
            'data' => $tasks,
            'message' => 'Tasks retrieved successfully'
        ]);
    }

    #[OA\Post(
        path: "/tasks",
        summary: "Creates a new task",
        tags: ["Tasks"],
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(ref: "#/components/schemas/TaskDTO")
        ),
        responses: [
            new OA\Response(response: 201, description: "Task created successfully"),
            new OA\Response(response: 422, description: "Validation error")
        ]
    )]
    public function store(StoreTaskRequest $request): JsonResponse
    {
        $dto = TaskDTO::fromRequest($request);
        $task = $this->taskRepository->create($dto);

        return response()->json([
            'data' => $task,
            'message' => 'Task created successfully'
        ], Response::HTTP_CREATED);
    }

    #[OA\Patch(
        path: "/tasks/{id}/status",
        summary: "Updates the status of a task (Drag & Drop)",
        tags: ["Tasks"],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        requestBody: new OA\RequestBody(
            content: new OA\JsonContent(
                properties: [
                    new OA\Property(property: "status", type: "string", example: "inprogress")
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: "Status atualizado"),
            new OA\Response(response: 422, description: "Status inválido")
        ]
    )]
    public function updateStatus(int $id, Request $request): JsonResponse
    {
        $request->validate([
            'status' => ['required', 'string']
        ]);

        $task = $this->taskRepository->updateStatus($id, $request->input('status'));

        return response()->json([
            'data' => $task,
            'message' => 'Task status updated successfully'
        ]);
    }

    #[OA\Delete(
        path: "/tasks/{id}",
        summary: "Delete a task",
        tags: ["Tasks"],
        parameters: [
            new OA\Parameter(name: "id", in: "path", required: true, schema: new OA\Schema(type: "integer"))
        ],
        responses: [
            new OA\Response(response: 204, description: "Task deleted successfully"),
            new OA\Response(response: 404, description: "Task not found")
        ]
    )]
    public function destroy(int $id): JsonResponse
    {
        $this->taskRepository->delete($id);

        return response()->json(null, Response::HTTP_NO_CONTENT);
    }
}
