'use client'

import { useActionState } from 'react'
import { register } from './actions'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export default function RegisterPage() {
  const [state, formAction] = useActionState(register, null)

  return (
    <div className="max-w-md mx-auto mt-20 mb-20 p-6 bg-white border border-[#E5E5E5] rounded-xl shadow-sm">
      <h1 className="text-2xl font-bold mb-2 text-center text-[#0B1215]">Create an Account</h1>
      <p className="text-center text-gray-500 mb-6 text-sm">Join PurePlast to track orders and request quotes.</p>
      
      <form action={formAction} className="space-y-4">
        <div>
          <Input 
            id="fullName" 
            name="fullName" 
            type="text" 
            placeholder="Full Name" 
            required 
          />
        </div>
        <div>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            placeholder="Email Address" 
            required 
          />
        </div>
        <div>
          <Input 
            id="password" 
            name="password" 
            type="password" 
            placeholder="Password (min 6 chars)" 
            required 
            minLength={6}
          />
        </div>

        {state?.error && (
           <div className={`text-sm p-3 rounded-lg border ${state.error.startsWith('Success') ? 'text-green-700 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-100'}`}>
            {state.error}
          </div>
        )}

        <Button type="submit" className="w-full">
          Sign Up
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="text-[#004C97] hover:underline font-medium">
          Sign In
        </Link>
      </div>
    </div>
  )
}
