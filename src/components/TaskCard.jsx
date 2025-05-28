import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { Edit2, Trash2, Save, X, Calendar, Clock } from "lucide-react";
import axios from "axios";
import { format } from "date-fns";
import { toast } from 'sonner';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

export default function TaskCard({
  task,
  isEditing,
//   onToggleCompletion,
  onStartEditing,
  
  // onSaveEdit,
  onCancelEdit,
   refetch
})
{
  const [completedTask, setCompletedTask] = useState(false)
  const {
        register,
        formState: { errors },
        // reset,
        handleSubmit,
      } = useForm()

  
  // complete mark mark task feature
const onToggleCompletion = (id) => {
    
    console.log(task,id,completedTask)
    setCompletedTask(!completedTask)

    axios.patch(`http://localhost:5000/${id}`,{completedTask})
    .then(res=>{
      console.log(res)
      toast.success("update your task.")

       refetch()
    })
    .catch(err=>console.log(err))
  };

  // update task
 const onSubmit = (data ) => {
  axios.patch(`http://localhost:5000/task/${task._id}`, data)
  .then(res => {
    toast.success('Task successfully update')
    console.log(res)
  })
  .catch(err=>console.log(err))
  console.log(data,task._id)
 }

// delete task
 const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/task/${id}`)
          .then((res) => {
            refetch();
            if (res.message) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      }
    });
  };
 
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${task.completed ? "opacity-75 bg-gray-50" : ""}`}>

      <form  onSubmit={handleSubmit(onSubmit)}>
      <CardHeader className="pb-3 ">
        <div className="flex items-start justify-between gap-3 ">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              checked={task.completed}
              // onChange={()=>onToggleCompletion(task?._id)}
              onCheckedChange={() => onToggleCompletion(task?._id)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              {isEditing ? (
               <>
                <input
                  defaultValue={task?.title}
                 {...register("title", { required: true })}
                  placeholder="Task title"
                  className="w-full px-3 py-2 border rounded-md"
                />
                 {errors.title && <span className='text-red-500'>This field is required</span>}</>
              ) : (
                <CardTitle
                  className={`text-lg leading-tight ${task?.completed ? "line-through text-muted-foreground" : ""}`}
                >
                  {task.title}
                </CardTitle>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 ">
            {!isEditing && (
              <>
                <Button type="button" variant="ghost" size="icon" onClick={() => onStartEditing(task._id)} className="h-8 w-8">
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(task._id)}
                  className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
            {isEditing && (
              <>
                <Button type="submit"
                  variant="ghost"
                  size="icon"
                  
                  className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <Save className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" onClick={onCancelEdit} className="h-8 w-8">
                  <X className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 ">
        {isEditing ? (
          <div className="space-y-3">
            <textarea
              defaultValue={task?.description}
              {...register("description", { required: true })}
              placeholder="Task description"
              className="w-full min-h-[80px] px-3 py-2 border rounded-md"
            />
            {errors.description && <span className='text-red-500'>This field is required</span>}

            <div className="flex gap-3">
              <select
               defaultValue={task?.priority}
               {...register("priority")}
                className="px-3 py-1 border rounded-md text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input
                type="date"
                defaultValue={task?.date}
                 {...register("date")}
                className="flex-1 px-3 py-2 border rounded-md"
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
                  {task?.priority}
                </Badge>
                {task?.date && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    { format(new Date(task.date), "yyyy-MM-dd")}
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

      </form>
    </Card>
  );
}