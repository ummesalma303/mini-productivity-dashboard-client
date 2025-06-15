import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Target, Trash2, Edit3, Check, X } from "lucide-react"

export default function GoalsList({ goals, onToggle, onDelete, onUpdate, editingGoal, setEditingGoal }) {
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")

  const startEditing = (goal) => {
    setEditingGoal(goal.id)
    setEditTitle(goal.title)
    setEditDescription(goal.description)
  }

  const saveEdit = (id) => {
    onUpdate(id, editTitle, editDescription)
    setEditTitle("")
    setEditDescription("")
  }

  const cancelEdit = () => {
    setEditingGoal(null)
    setEditTitle("")
    setEditDescription("")
  }

  if (goals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
        <p>No goals set yet. Add your first goal to get started!</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {goals.map((goal) => (
        <div key={goal.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50">
          <Checkbox checked={goal.completed} onCheckedChange={() => onToggle(goal.id)} className="mt-1" />

          <div className="flex-1 min-w-0">
            {editingGoal === goal.id ? (
              <div className="space-y-2">
                <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <Textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={2} />
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => saveEdit(goal.id)}>
                    <Check className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={cancelEdit}>
                    <X className="h-3 w-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <h4 className={`font-medium ${goal.completed ? "line-through text-gray-500" : ""}`}>{goal.title}</h4>
                {goal.description && (
                  <p className={`text-sm text-gray-600 mt-1 ${goal.completed ? "line-through" : ""}`}>
                    {goal.description}
                  </p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Created {new Date(goal.createdAt).toLocaleDateString()}
                </p>
              </>
            )}
          </div>

          {editingGoal !== goal.id && (
            <div className="flex gap-1">
              <Button size="sm" variant="ghost" onClick={() => startEditing(goal)} className="h-8 w-8 p-0">
                <Edit3 className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(goal.id)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
