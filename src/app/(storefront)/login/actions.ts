'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function login(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Note: in a production app using Supabase Auth, you don't use Prisma for the password!
  // Supabase handles the password.
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // Return error to the form
    return { error: error.message }
  }

  // Find user role in Prisma to determine redirect
  if (data.user) {
    const dbUser = await prisma.user.findUnique({
      where: { email: data.user.email },
      select: { role: true }
    })

    if (dbUser?.role === 'ADMIN') {
      redirect('/admin')
    } else {
      redirect('/')
    }
  }
}
