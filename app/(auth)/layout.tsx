import { buttonVariants } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import Logo from "@/public/logo.avif"
import Image from 'next/image'

export default function AuthLayout ({children}:{
    children:ReactNode
}) {
  return (
   <div className='relative flex min-h-svh flex-col items-center justify-center'>
    <Link href={"/"} className={buttonVariants({
        variant:"outline",
        className:"absolute top-4 left-4"
    })}>
    <ArrowLeft className='size-4'/>
    Go Back!
    </Link>
     <div className='flex w-full max-w-sm flex-col gap-6'>
        <Link className='flex items-center text-3xl gap-2 self-center font-medium' href={"/"}>
        <Image src={Logo} alt='logo' width={32} height={32} className='rounded-md'/> 
        EduNova
         
        </Link>
        {children}
        <div className='text-center text-xs text-muted-foreground'>
            <p className='text-sm text-muted-foreground text-center'>
                By continuing, you agree to our <Link href={"/terms"} className='underline underline-offset-4'>Terms of Service</Link> and <Link href={"/privacy"} className='underline underline-offset-4'>Privacy Policy</Link>.
            </p>

        </div>
    </div>
   </div>
  )
}

