'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'

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

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false)
  const [pending, setPending] = useState(false)
  const [email, setEmail] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    // Replace with your actual server action / API call
    await new Promise((r) => setTimeout(r, 1200))
    setPending(false)
    setSubmitted(true)
  }

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
            Secure access, anytime
          </h1>
          <p className="mt-6 text-[#56616B] text-[17px] font-medium leading-relaxed max-w-md">
            Get back to your orders and quotes. We'll have you signed back in within a minute.
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
            
            {!submitted ? (
              <>
                <Link
                  href="/login"
                  className="mb-8 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-[#7A8793] transition-colors hover:text-[#0B1215]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>

                <div className="mb-7">
                  <h2 className="text-[26px] font-extrabold text-[#0B1215] tracking-tight">Reset Password</h2>
                  <p className="text-[13px] font-semibold text-[#7A8793] mt-1.5 leading-relaxed">
                    Enter the email address on your account. We'll send you a link to get back in.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <StandardInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email address"
                    autoComplete="email"
                    required
                  />

                  <button
                    type="submit"
                    disabled={pending}
                    onClick={() => {
                      const input = document.getElementById('email') as HTMLInputElement
                      if (input) setEmail(input.value)
                    }}
                    className="w-full mt-2 rounded-3xl bg-[#114CF4] py-4 text-[15px] font-bold text-white transition-colors hover:bg-[#0B3CD9] disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_4px_14px_rgba(17,76,244,0.3)]"
                  >
                    {pending ? 'Sending…' : 'Send reset link'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#E5F0FF]">
                  <CheckCircle className="h-8 w-8 text-[#114CF4]" />
                </div>
                <h2 className="text-[26px] font-extrabold text-[#0B1215] tracking-tight mb-2">Check your inbox</h2>
                <p className="text-[13px] font-semibold text-[#7A8793] leading-relaxed mx-auto max-w-sm mb-8">
                  We've sent a password reset link to <span className="text-[#0B1215]">{email}</span>. It should arrive shortly.
                </p>

                <Link
                  href="/login"
                  className="flex justify-center w-full rounded-3xl bg-[#114CF4] py-4 text-[15px] font-bold text-white transition-colors hover:bg-[#0B3CD9] shadow-[0_4px_14px_rgba(17,76,244,0.3)] mb-4"
                >
                  Back to sign in
                </Link>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-[13px] font-bold text-[#114CF4] hover:underline"
                >
                  Use a different email
                </button>
              </div>
            )}
            
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