import { Label } from '@radix-ui/react-dropdown-menu'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Check, X } from 'lucide-react'

const AddGoals = ({isAddingGoal, setIsAddingGoal}) => {
    // const [newGoal, setNewGoal] = useState({ title: "", description: "" })
     const {
          register,
          handleSubmit,
          reset,
          formState: { errors },
        } = useForm()
      
        
    
     const onSubmit = (data) => {
    const goalsData ={...data, completed:false}
    console.log(goalsData)
    // axios.post('http://localhost:5000/', taskData)
    //   .then(res => {
    //     console.log(res)
    //     if(res?.status===201){
    //       toast.success('successfully add your task')
    //       reset()
    //       setOpen(false)

    //     }
    //   })
    //   .catch(err => console.log(err))
  }
  return (
    <div>
 <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="goal_title">Goal Title</Label>

                   <Input placeholder="Enter your goal..." {...register("goal_title", )} required />
                    
                  
                </div>
                 <div>
                  <Label htmlFor="goal description">Description</Label>
                  <Textarea
                      placeholder="goal description" required
                    {...register("goal_description",)}
                    rows={3}
                              />
                              
                
                </div>
                <div className="flex gap-2">
                  <Button type='submit' size="sm">
                    <Check className="h-4 w-4 mr-1" />
                    Add Goal
                  </Button>
                  <Button type="false" variant="outline" onClick={() => setIsAddingGoal(false)} size="sm">
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
               </form>
    </div>
  )
}

export default AddGoals
