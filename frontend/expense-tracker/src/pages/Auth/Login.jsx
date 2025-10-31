import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'

const Login = () => {
  return (
    <AuthLayout>
      <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Pleace enter your login details to access your account.
        </p>
      </div>
    </AuthLayout>
  )
}

export default Login