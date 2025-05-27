import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import SocialLogin from "./socialLogin/socialLogin"
import { useContext } from "react"
import { AuthContext } from "@/providers/AuthProvider"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"

export function RegisterForm({ className,...props})
{
  const {createNewUser,updateUserProfile} = useContext(AuthContext);
  const navigate = useNavigate()
 const {
        register,
        formState: { errors },
        
        handleSubmit,
      } = useForm()
    
      const onSubmit = (data) => {
        console.log(data)
        const updateData ={
            displayName: data?.name, 
            photoURL: data?.photo
        }
       
        createNewUser(data?.email,data?.password)
        .then(res=>{
            console.log(res)
            updateUserProfile(updateData)
            // setUser({...user,...updateData})
            console.log(updateData)
            //  Swal.fire({
            //               title: "Success",
            //               text: "user successfully register",
            //               icon: "success",
            //             //   timer: 1000
            //             });
                      
         
        
            navigate('/')
            // window.location.reload()
            // reset()
        })
        .catch(err=>console.log(err))

    }
    
  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome Task Bite</h1>
                <p className="text-muted-foreground text-balance">
                  Create your Task Bite account
                </p>
              </div>
              <div className="grid gap-3">
                {/* <Input id="email" type="email" placeholder="m@example.com" required /> */}
                <Label htmlFor="Name">Name</Label>
                <Input type="text" placeholder="Name" required {...register("name", { required: true })}/>
                 {errors.name && <span className='text-red-500'>This field is required</span>}
              </div>
              <div className="grid gap-3">
                <Label htmlFor="PhotoUrl">Photo URL</Label>
                <Input type="url" placeholder="PhotoURL" {...register("photo", { required: true })}/>
                 {errors.email && <span className='text-red-500'>This field is required</span>} 
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
               <Input type="email" placeholder="Email" {...register("email", { required: true })}/>
                   {errors.email && <span className='text-red-500'>This field is required</span>} 
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  
                </div>
                 <Input type="Password" placeholder="Password" {...register("password", { required: true })}/>
                    {errors.email && <span className='text-red-500'>This field is required</span>} 
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
              <div
                className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <SocialLogin/>
              <div className="text-center text-sm">
               If Already have an account?{" "}
                <a href="/sign-in" className="underline underline-offset-4">
                  Sign In
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
          </div>
        </CardContent>
      </Card>
      
    </div>)
  );
}
