import { LoginForm } from '@/components/login-form'
import { RegisterForm } from '@/components/register-form'
import React from 'react'

const SignUp = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {/* <LoginForm /> */}
        <RegisterForm/>
      </div>
    </div>
  )
}

export default SignUp
