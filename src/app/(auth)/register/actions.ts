'use server'

import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function register(prevState: unknown, formData: FormData) {
  const supabase = await createClient()

  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 1. Create user in Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  // 2. Insert user into Prisma database
  if (data.user) {
    try {
      await prisma.user.create({
        data: {
          email: data.user.email!,
          fullName: fullName,
        }
      })
    } catch (err) {
      // User might already exist in Prisma from a previous test
      console.log("Prisma User creation error:", err)
    }
  }

  // 3. Inform user to check email if confirmation is required by Supabase, 
  // otherwise redirect them.
  if (data?.session) {
    redirect('/')
  } else {
    // If Supabase is configured to require email confirmations, session will be null here
    return { error: "Success! Please check your email to confirm your account, then log in." }
  }
}
