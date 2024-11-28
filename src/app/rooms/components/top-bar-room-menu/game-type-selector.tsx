import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'
import { GameType } from '@/domain/session'
import { useRoom } from '../../providers/room-provider'

export function GameTypeSelector() {
  const { roomInfo, changeGameType } = useRoom()

  if (!roomInfo) return

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          {roomInfo?.game_type}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem onClick={() => changeGameType(GameType.fibonacci)}>
          Fibonacci
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeGameType(GameType.decimal)}>
          Decimal
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
