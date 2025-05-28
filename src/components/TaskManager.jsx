import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";

export default function TaskManager() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Complete project documentation",
      description: "Write comprehensive documentation for the new feature implementation",
      completed: false,
      priority: "high",
      dueDate: "2024-01-15",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      title: "Review code changes",
      description: "Review pull requests from team members",
      completed: true,
      priority: "medium",
      dueDate: "2024-01-12",
      createdAt: "2024-01-08",
    },
  ]);

  const [editingTaskId, setEditingTaskId] = useState(null);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const startEditing = (id) => {
    setEditingTaskId(id);
  };

  const saveEdit = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)));
    setEditingTaskId(null);
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Task Manager</h1>

<AddTask/>

        
      </div>
      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No tasks yet. Add your first task to get started!</p>
            </CardContent>
          </Card>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              isEditing={editingTaskId === task.id}
              onToggleCompletion={toggleTaskCompletion}
              onStartEditing={startEditing}
              onDelete={deleteTask}
              onSaveEdit={saveEdit}
              onCancelEdit={cancelEdit}
            />
          ))
        )}
      </div>
      <div className="text-center text-sm text-muted-foreground">
        {tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed
      </div>
    </div>
  );
}