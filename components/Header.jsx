'use client'

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { userLoginEntry } from '@/redux/actions/userActions'

export default function Header() {
  const router = useRouter()
  const { isSignedIn, user} = useUser()


  const dispatch = useDispatch();

  useEffect(() => {
    if (isSignedIn) {
      const  clerkId = user.id;
      const email = user.primaryEmailAddress?.emailAddress || ""
      const firstName = user.firstName || ""
      const lastName = user.lastName || ""

      dispatch(userLoginEntry({ clerkId, email, firstName, lastName }))
      router.push('/additionalinfo')
    }
  }, [isSignedIn, user, router, dispatch])

  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      <SignedOut>
        <SignInButton>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign In
          </button>
        </SignInButton>

        <SignUpButton>
          <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
            Sign Up
          </button>
        </SignUpButton>
      </SignedOut>

      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}
