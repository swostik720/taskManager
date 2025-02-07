<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = $request->user()->tasks;

        if ($tasks->isEmpty()) {
            return response()->json([
                'message' => 'No tasks found.'
            ], 404);
        }

        return response()->json($tasks, 200);
    }

    public function show(Request $request, $id)
    {
        $task = $request->user()->tasks()->find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found.'
            ], 404);
        }

        return response()->json($task, 200);
    }

    public function store(Request $request)
    {
        $task = $request->user()->tasks()->create($request->all());

        return response()->json([
            'message' => 'Task created successfully',
            'task' => $task
        ], 201);
    }

    public function update(Request $request, $id)
    {
        // Find the task associated with the authenticated user
        $task = $request->user()->tasks()->find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found.'
            ], 404);
        }

        // Update the task
        $task->update($request->all());

        return response()->json([
            'message' => 'Task updated successfully',
            'task' => $task
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        // Find the task associated with the authenticated user
        $task = $request->user()->tasks()->find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found.'
            ], 404);
        }

        // Delete the task
        $task->delete();

        return response()->json([
            'message' => 'Task deleted successfully',
            'task' => $task
        ], 200);
    }


    public function updateStatus(Request $request, $id)
    {
        // Find the task associated with the authenticated user
        $task = $request->user()->tasks()->find($id);

        if (!$task) {
            return response()->json([
                'message' => 'Task not found.'
            ], 404);
        }

        // Update the task completion status
        $task->is_complete = $request->is_complete;
        $task->save();

        return response()->json([
            'message' => 'Task completion status updated successfully',
            'task' => $task
        ], 200);
    }
}
