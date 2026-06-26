'use client'

import { useActionState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { register } from './actions'

/* --------------------------------------------------------------------------
   Standard Input matching the design
   -------------------------------------------------------------------------- */
function StandardInput({
  id,
  name,
  type = 'text',
  label,
  autoComplete,
  required,
  minLength,
}: {
  id: string
  name: string
  type?: string
  label: string
  autoComplete?: string
  required?: boolean
  minLength?: number
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-bold text-[#0B1215]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        className="w-full rounded-3xl border border-[#E5E5E5] bg-transparent px-5 py-3.5 text-sm text-[#0B1215] outline-none transition-all placeholder:text-[#A0AEC0] hover:border-[#CBD5E1] focus:border-[#004C97] focus:ring-1 focus:ring-[#004C97]"
      />
    </div>
  )
}

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(register, null)
  const isSuccess = state?.error?.startsWith('Success')

  return (
    <div className="relative min-h-screen w-full bg-[#F5F8FC] font-sans flex flex-col overflow-hidden">
      
      {/* Soft Blurred Gradient Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#C2E0FF] blur-[140px] opacity-80 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-[#D4E8FF] blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute top-[20%] right-[10%] w-[35%] h-[45%] rounded-full bg-[#E5F0FF] blur-[100px] opacity-60 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto w-full px-6 lg:px-12 gap-12 lg:gap-28 py-10">
        
        {/* Left Side: Text */}
        <div className="flex-1 w-full max-w-xl self-center pt-8 lg:pt-0">
          <Link href="/" className="inline-block mb-12">
            <Image
              src="/images/pureplastlogonobg.PNG"
              alt="PurePlast"
              width={260}
              height={96}
              className="h-64 w-auto object-contain"
              priority
            />
          </Link>

          <h1 className="text-4xl lg:text-[44px] font-extrabold tracking-tight text-[#0B1215] leading-[1.15]">
            Start building your ideas
          </h1>
          <p className="mt-6 text-[#56616B] text-[17px] font-medium leading-relaxed max-w-md">
            Fast quotes, custom jobs, and full order visibility tailored specifically for your production needs.
          </p>

          <div className="hidden lg:flex items-center gap-5 mt-16 text-[13px] font-bold text-[#004C97]">
            <Link href="#" className="hover:underline">Terms</Link>
            <Link href="#" className="hover:underline">Plans</Link>
            <Link href="#" className="hover:underline">Contact Us</Link>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <div className="flex-1 w-full max-w-[520px]">
          <div className="bg-white rounded-3xl shadow-[0_12px_60px_rgb(0,0,0,0.06)] p-8 sm:p-12 border border-white/60">
            
            <div className="mb-7">
              <h2 className="text-[26px] font-extrabold text-[#0B1215] tracking-tight">Sign Up</h2>
              <p className="text-[13px] font-semibold text-[#7A8793] mt-1.5">Create your account</p>
            </div>

            <form action={formAction} className="space-y-5">
              <StandardInput
                id="fullName"
                name="fullName"
                type="text"
                label="Full name"
                autoComplete="name"
                required
              />
              <StandardInput
                id="email"
                name="email"
                type="email"
                label="Email address"
                autoComplete="email"
                required
              />
              <StandardInput
                id="password"
                name="password"
                type="password"
                label="Password"
                autoComplete="new-password"
                required
                minLength={6}
              />

              {state?.error && (
                <p className={`text-[13px] font-bold p-3.5 rounded-xl border ${
                  isSuccess ? 'text-green-700 bg-green-50 border-green-200' : 'text-red-600 bg-red-50 border-red-100'
                }`}>
                  {state.error}
                </p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full mt-2 rounded-3xl bg-[#114CF4] py-4 text-[15px] font-bold text-white transition-colors hover:bg-[#0B3CD9] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(17,76,244,0.3)]"
              >
                {pending ? 'Creating account…' : 'Create account'}
              </button>
              
            </form>

            <p className="mt-7 text-center text-[13px] font-semibold text-[#7A8793]">
              Already have an account?{' '}
              <Link href="/login" className="text-[#114CF4] font-bold hover:underline">
                Sign In
              </Link>
            </p>
            
            <p className="mt-6 text-center text-[11px] font-medium text-[#A0AEC0]">
              By creating an account you agree to PurePlast&apos;s{' '}
              <Link href="/terms" className="underline hover:text-[#0B1215]">Terms</Link> and{' '}
              <Link href="/privacy" className="underline hover:text-[#0B1215]">Privacy</Link>
            </p>

          </div>
        </div>
      </div>
      
      {/* Mobile Footer Links */}
      <div className="lg:hidden flex items-center justify-center gap-5 py-6 mt-auto text-[13px] font-bold text-[#004C97]">
        <Link href="#" className="hover:underline">Terms</Link>
        <Link href="#" className="hover:underline">Plans</Link>
        <Link href="#" className="hover:underline">Contact Us</Link>
      </div>

    </div>
  )
}