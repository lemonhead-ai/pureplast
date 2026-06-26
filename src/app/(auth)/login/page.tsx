'use client'

import { useActionState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { login } from './actions'

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
}: {
  id: string
  name: string
  type?: string
  label: string
  autoComplete?: string
  required?: boolean
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
        className="w-full rounded-3xl border border-[#E5E5E5] bg-transparent px-5 py-3.5 text-sm text-[#0B1215] outline-none transition-all placeholder:text-[#A0AEC0] hover:border-[#CBD5E1] focus:border-[#004C97] focus:ring-1 focus:ring-[#004C97]"
      />
    </div>
  )
}

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, null)

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
            Fast, Efficient and Productive
          </h1>
          <p className="mt-6 text-[#56616B] text-[17px] font-medium leading-relaxed max-w-md">
            Manage your orders, track custom parts, and process quotes all in one clean workspace tailored for production.
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
              <h2 className="text-[26px] font-extrabold text-[#0B1215] tracking-tight">Sign In</h2>
              <p className="text-[13px] font-semibold text-[#7A8793] mt-1.5">Your Customer Portal</p>
            </div>

            <form action={formAction} className="space-y-5">
              <StandardInput
                id="email"
                name="email"
                type="email"
                label="Email"
                autoComplete="email"
                required
              />
              <StandardInput
                id="password"
                name="password"
                type="password"
                label="Password"
                autoComplete="current-password"
                required
              />

              <div className="flex items-center justify-between pt-1 pb-1">
                <label className="flex items-center gap-2 text-[13px] font-medium text-[#56616B] cursor-pointer hover:text-[#0B1215] transition-colors">
                  <input type="checkbox" className="w-4 h-4 rounded border-[#D7E2EA] text-[#004C97] focus:ring-[#004C97] cursor-pointer" />
                  I accept the Terms
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[13px] font-bold text-[#004C97] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {state?.error && (
                <p className="text-[13px] font-bold text-red-600 bg-red-50 p-3.5 rounded-xl border border-red-100">{state.error}</p>
              )}

              <div className="relative py-3 flex items-center">
                <div className="flex-grow border-t border-[#E5E5E5]"></div>
                <span className="flex-shrink-0 mx-4 text-[11px] uppercase tracking-wider text-[#7A8793] font-bold">Or with</span>
                <div className="flex-grow border-t border-[#E5E5E5]"></div>
              </div>

              <div className="grid grid-cols-2 gap-3 pb-2">
                <button type="button" className="flex items-center justify-center gap-2 rounded-3xl border border-[#E5E5E5] py-3 text-[13px] font-bold text-[#0B1215] hover:bg-[#FAFAF8] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    <path fill="none" d="M1 1h22v22H1z"/>
                  </svg>
                  Sign In with Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 rounded-3xl border border-[#E5E5E5] py-3 text-[13px] font-bold text-[#0B1215] hover:bg-[#FAFAF8] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.09 2.31-.86 3.63-.71 1.54.17 2.87.84 3.69 2.07-3.13 1.86-2.58 6.16.42 7.34-.7 1.73-1.6 3.38-2.82 3.47zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.35 2.38-1.92 4.31-3.74 4.25z"/>
                  </svg>
                  Sign In with Apple
                </button>
              </div>

              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-3xl bg-[#114CF4] py-4 text-[15px] font-bold text-white transition-colors hover:bg-[#0B3CD9] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(17,76,244,0.3)]"
              >
                {pending ? 'Signing In…' : 'Sign In'}
              </button>
              
            </form>

            <p className="mt-7 text-center text-[13px] font-semibold text-[#7A8793]">
              Don't have an account?{' '}
              <Link href="/register" className="text-[#114CF4] font-bold hover:underline">
                Sign Up
              </Link>
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