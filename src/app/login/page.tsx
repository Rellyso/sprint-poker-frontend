import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import Particles from '@/components/ui/particles'
import { useAuth } from '@/hooks/use-auth'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { AppLogo } from '@/components/app-logo'

export function LoginPage() {
  const { signIn } = useAuth()

  const handleGoogleLogin = () => {
    signIn('google')
  }

  const handleGithubLogin = () => {
    signIn('github')
  }

  return (
    <div className="flex h-screen items-center justify-center bg-black">
      <Card className="w-[500px]">
        <CardHeader className="flex flex-col items-center">
          <AppLogo size="lg" />
          <CardDescription>
            Continue com sua conta social para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 items-center">
            <Button
              variant="outline"
              className="rounded-lg"
              size="lg"
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mr-2 h-4 w-4" />
              Entrar com Google
            </Button>
            <Button
              variant="outline"
              className="rounded-lg"
              size="lg"
              onClick={handleGithubLogin}
            >
              <FaGithub className="mr-2 h-4 w-4" />
              Entrar com Github
            </Button>
          </div>
        </CardContent>
      </Card>

      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={80}
        color={'#fff'}
        refresh
      />
    </div>
  )
}
