import { useState } from "react";
import { Card, CardContent } from "./ui/card";

import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
// import axios from "axios";

export default function TaskManager() {
  // const [completeTask, setCompeleteTask] =useState(null)
  const [editingTaskId, setEditingTaskId] = useState(null);

   const {data:tasks=[],isLoading,refetch} =useQuery({
        queryKey:["tasks"],
        queryFn: async () => {
    const res = await axios.get(`http://localhost:5000/task`)
    console.log(res.data)
         return res.data   
        }
    })

    if (isLoading) {
      return  <Loading/>
    }
  
  

  const startEditing = (id) => {
    setEditingTaskId(id);
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
          tasks?.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              isEditing={editingTaskId === task._id}
              
              onStartEditing={startEditing}
              // onDelete={deleteTask}
              // onSaveEdit={saveEdit}
              onCancelEdit={cancelEdit}
              refetch={refetch}
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