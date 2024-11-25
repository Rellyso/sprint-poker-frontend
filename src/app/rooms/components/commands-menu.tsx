import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Check, ChevronDown, Copy } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

enum GameType {
  fibonacci = 'Fibonacci',
  decimal = 'Decimal'
}

export function CommandsMenu() {
  const { roomId } = useParams<{ roomId: string }>()
  const [copied, setCopied] = useState(false)
  const [selectedGameType, setSelectedGameType] = useState<GameType>(GameType.fibonacci)

  const handleChangeGameType = (gameType: GameType) => {
    setSelectedGameType(gameType)
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(roomId!)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="mb-8 flex items-center gap-4">
      <Button>Revelar</Button>
      <Button variant="secondary">Resetar</Button>
      <Check className="h-5 w-5 text-green-500" />

      <div className="ml-auto flex items-center gap-4">
        <Button
          variant="outline"
          className="gap-2"
          onClick={copyToClipboard}
        >
          <Copy className={copied ? "hidden" : "h-4 w-4"} />
          <Check className={copied ? "h-4 w-4" : "hidden"} />
          <span className="hidden md:inline">{roomId}</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              {selectedGameType}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuItem onClick={() => handleChangeGameType(GameType.fibonacci)}>
              Fibonacci
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleChangeGameType(GameType.decimal)}>
              Decimal
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}