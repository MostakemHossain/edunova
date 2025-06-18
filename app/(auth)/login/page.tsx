import React from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Label } from "@/components/ui/label"
import {GithubIcon,Globe} from "lucide-react"
import { Input } from "@/components/ui/input"


const LoginPage = () => {
  return (
    <Card>
        <CardHeader>
            <CardTitle className='text-xl'>
                Welcome back!
            </CardTitle>
            <CardDescription className=''>
                Login with your github and email
            </CardDescription>
        </CardHeader>
        <CardContent className='flex flex-col gap-4'>
            <Button className='w-full' variant={"outline"}>
                <GithubIcon  className='size-4'/>
                Sign in With Github
            </Button>
            <Button className='w-full' variant={"outline"}>
                <Globe  className='size-4'/>
                Sign in With Google
            </Button>
            <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border mt-2'>
                <span className='relative z-10 bg-card px-2 text-muted-foreground'>Or Continue with</span>
            </div>
            <div className='grid gap-3'>
                <div className='grid gap-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' placeholder='mosta@example.com'/>
                </div>
                <Button>
                    Continue with Email
                </Button>

            </div>
        </CardContent>

    </Card>
  )
}

export default LoginPage