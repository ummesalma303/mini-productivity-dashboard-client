import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from './ui/textarea'
import { Plus, Save } from 'lucide-react'
import { CardContent } from './ui/card'
import { toast } from 'sonner'

const AddTask = () => {
  const [open, setOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    const taskData ={...data, completed:true}
    axios.post('http://localhost:5000/', taskData)
      .then(res => {
        console.log(res)
        toast.success('successfully add your task')
        reset()
        setOpen(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button><Plus className="h-4 w-4" /> Add Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Task</DialogTitle>
          <DialogDescription>
            Add your task.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <Input placeholder="Task title" {...register("title", { required: true })} />
            {errors.title && <span className='text-red-500'>This field is required</span>}

            <Textarea
              placeholder="Task description"
              {...register("description", { required: true })}
              className="min-h-[80px]"
            />
            {errors.description && <span className='text-red-500'>This field is required</span>}

            <div className="flex gap-3">
              <select {...register("priority")} className="px-3 py-2 border rounded-md">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>

              <Input
                type="date"
                {...register("date")}
                className="flex-1"
              />
            </div>

            <div className="flex gap-2">
              <Button type='submit' className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Task
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Close</Button>
              </DialogClose>
            </div>
          </CardContent>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddTask
