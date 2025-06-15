import { useState } from "react";
import { Card, CardContent } from "./ui/card";

import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";
// import axios from "axios";

export default function TaskManager() {
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
      <div className="grid ">
        {tasks.length === 0  ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-muted-foreground">No tasks yet. Add your first task to get started!</p>
            </CardContent>
          </Card>
        ) : <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" space-y-4">
           <p className="underline underline-offset-2 text-gray-700">🔄Pending</p>
        {
          
          tasks?.filter((task) => !task.completed)
          .map((task) => (
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
        }
        </div>

           {/* completed task */}
       <div className="space-y-4">
        <p className="underline underline-offset-2 text-gray-700">✔Completed</p>
         {
          
          tasks?.filter((task) => task.completed)
          .map((task) => (
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
        }
       </div>

        </div>
        
        }
      </div>
      <div className="text-center text-sm text-muted-foreground">
        {tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed
      </div>
    </div>
  );
}