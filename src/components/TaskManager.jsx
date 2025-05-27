import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Checkbox } from "./ui/checkbox"
import { Badge } from "./ui/badge"
import { Plus, Edit2, Trash2, Save, X, Calendar, Clock } from "lucide-react"

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
  ])

  const [isAddingTask, setIsAddingTask] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  })

  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        completed: false,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", description: "", priority: "medium", dueDate: "" })
      setIsAddingTask(false)
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const startEditing = (id) => {
    setEditingTaskId(id)
  }

  const saveEdit = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task)))
    setEditingTaskId(null)
  }

  const cancelEdit = () => {
    setEditingTaskId(null)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const TaskCard = ({ task }) => {
    const [editForm, setEditForm] = useState({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate,
    })

    const isEditing = editingTaskId === task.id

    return (
      <Card className={`transition-all duration-200 hover:shadow-md ${task.completed ? "opacity-75 bg-gray-50" : ""}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 flex-1">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <Input
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    placeholder="Task title"
                  />
                ) : (
                  <CardTitle
                    className={`text-lg leading-tight ${task.completed ? "line-through text-muted-foreground" : ""}`}
                  >
                    {task.title}
                  </CardTitle>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {!isEditing && (
                <>
                  <Button variant="ghost" size="icon" onClick={() => startEditing(task.id)} className="h-8 w-8">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </>
              )}
              {isEditing && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => saveEdit(task.id, editForm)}
                    className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                  >
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={cancelEdit} className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {isEditing ? (
            <div className="space-y-3">
              <Textarea
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                placeholder="Task description"
                className="min-h-[80px]"
              />
              <div className="flex gap-3">
                <select
                  value={editForm.priority}
                  onChange={(e) => setEditForm({ ...editForm, priority: e.target.value })}
                  className="px-3 py-1 border rounded-md text-sm"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <Input
                  type="date"
                  value={editForm.dueDate}
                  onChange={(e) => setEditForm({ ...editForm, dueDate: e.target.value })}
                  className="flex-1"
                />
              </div>
            </div>
          ) : (
            <>
              {task.description && (
                <p className={`text-sm text-muted-foreground mb-3 ${task.completed ? "line-through" : ""}`}>
                  {task.description}
                </p>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                  {task.dueDate && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {task.dueDate}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {task.createdAt}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <Button onClick={() => setIsAddingTask(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      {isAddingTask && (
        <Card className="border-2 border-dashed border-primary/20">
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Task title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <Textarea
              placeholder="Task description (optional)"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="min-h-[80px]"
            />
            <div className="flex gap-3">
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="px-3 py-2 border rounded-md"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <Input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="flex-1"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addTask} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Task
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsAddingTask(false)
                  setNewTask({ title: "", description: "", priority: "medium", dueDate: "" })
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No tasks yet. Add your first task to get started!</p>
            </CardContent>
          </Card>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>

      <div className="text-center text-sm text-muted-foreground">
        {tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed
      </div>
    </div>
  )
}
