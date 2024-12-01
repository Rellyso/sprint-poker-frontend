import { ChevronDown, Sun } from 'lucide-react'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Avatar, AvatarFallback } from './ui/avatar'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate } from 'react-router-dom'
import { AppLogo } from './app-logo'

export function Header() {
  const navigate = useNavigate()
  const { session, signOut } = useAuth()

  const userName = session?.user.name
  const avatarFallback = session?.user.name[0].toLocaleUpperCase()

  const handleSignOut = () => {
    signOut()
    navigate('/login')
  }

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        <AppLogo />
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon">
            <Sun className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-6 w-6">
                  {/* <AvatarImage src="/placeholder.svg" alt="User" /> */}
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
                {userName}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigate('/rooms/enter')}>
                Sair da sala
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:bg-red-200 focus:text-red-600"
                onClick={handleSignOut}
              >
                Desconectar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
