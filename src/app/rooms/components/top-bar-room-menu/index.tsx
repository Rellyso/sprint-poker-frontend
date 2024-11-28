import { Button } from '@/components/ui/button'

import { Check, Copy } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRoom } from '../../providers/room-provider'
import { GameTypeSelector } from './game-type-selector'

export function TopBarRoomMenu() {
  const { roomId } = useParams<{ roomId: string }>()
  const { roomInfo, changeVotesAreRevealed } = useRoom()
  const isRevealed = roomInfo?.result_revealed
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(roomId!)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mb-8 flex items-center gap-4">
      <Button onClick={() => changeVotesAreRevealed(!isRevealed)}>
        {isRevealed ? 'Esconder' : 'Revelar'}
      </Button>
      <Button variant="secondary">Resetar</Button>
      <Check className="h-5 w-5 text-green-500" />

      <div className="ml-auto flex items-center gap-4">
        <Button variant="outline" className="gap-2" onClick={copyToClipboard}>
          <Copy className={copied ? 'hidden' : 'h-4 w-4'} />
          <Check className={copied ? 'h-4 w-4' : 'hidden'} />
          <span className="hidden md:inline">{roomId}</span>
        </Button>

        <GameTypeSelector />
      </div>
    </div>
  )
}
