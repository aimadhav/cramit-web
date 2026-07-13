'use client'

import { useState, Suspense } from 'react'
import { createClient } from '@/utils/supabase-client'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const errorParam = searchParams.get('error')
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    
    // Clear any existing session first just in case
    await supabase.auth.signOut()

    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: 'select_account', // Forces Google to ask which account to use
        }
      },
    })

    if (signInError) {
      setIsLoading(false)
      console.error('Google login error:', signInError)
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg border-[#5e6ad2]/20">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold tracking-tight text-center text-[#5e6ad2]">
          Cramit Creator Portal
        </CardTitle>
        <CardDescription className="text-center">
          Sign in with your Teacher account to manage educational content.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center pt-4">
        {errorParam && (
          <div className="w-full p-3 mb-6 bg-red-50 border border-red-200 rounded-md text-sm text-red-600 font-medium text-center">
            {errorParam}
          </div>
        )}
        
        <Button 
          type="button" 
          variant="outline"
          className="w-full h-12 flex items-center justify-center gap-3 text-base border-gray-300 hover:bg-gray-50" 
          disabled={isLoading}
          onClick={handleGoogleLogin}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                  <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                  <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                  <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                  <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 41.939 C -8.804 40.009 -11.514 38.989 -14.754 38.989 C -19.444 38.989 -23.494 41.689 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                </g>
              </svg>
              Continue with Google
            </>
          )}
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-2">
         <p className="text-xs text-gray-500 text-center px-4">
           Student? Please use the Cramit mobile app. Only authorized teachers can access this portal.
         </p>
      </CardFooter>
    </Card>
  )
}

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <Suspense fallback={<Loader2 className="h-8 w-8 animate-spin text-[#5e6ad2]" />}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
