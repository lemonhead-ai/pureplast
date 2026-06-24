'use client'

import { useActionState } from 'react'
import { login } from './actions'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export default function LoginPage() {
  const [state, formAction] = useActionState(login, null)

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white border border-[#E5E5E5] rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-center text-[#0B1215]">Welcome Back</h1>
      
      <form action={formAction} className="space-y-4">
        <div>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="Email Address" 
            required 
            aria-label="Email Address" 
          />
        </div>
        <div>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Password" 
            required 
            aria-label="Password" 
          />
        </div>

        {state?.error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
            {state.error}
          </div>
        )}

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <a href="/register" className="text-[#004C97] hover:underline font-medium">
          Sign Up
        </a>
      </div>
    </div>
  )
}
