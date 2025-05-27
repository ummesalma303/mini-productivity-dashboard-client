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

export function LoginForm({ className,...props})

{
   const { loginUser} = useContext(AuthContext);
    const navigate = useNavigate()
   const {
        register,
        formState: { errors },
        // reset,
        handleSubmit,
      } = useForm()
     const onSubmit = (data) => {
        // console.log(data)
        
       
        loginUser(data?.email,data?.password)
        .then(res=>{
            console.log(res)
            // Swal.fire({
            //   title: "Success",
            //   text: "user successfully login",
            //   icon: "success",
            //   // timer: 1000
            // });
            navigate('/')
            // reset
        })
        .catch(err=>{
          // Swal.fire({
          //   title: "Error",
          //   text:`${err?.message}`,
          //   icon: "success",
          //   // timer: 1000
          // });
          console.log(err)
        })

    }

  return (
    (<div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8"  onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Task Bite account
                </p>
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
                     {errors.password && <span className='text-red-500'>This field is required</span>}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <div
                className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <SocialLogin/>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/sign-up" className="underline underline-offset-4">
                  Sign up
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
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>)
  );
}
