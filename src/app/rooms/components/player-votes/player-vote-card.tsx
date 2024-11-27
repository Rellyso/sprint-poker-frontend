import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { UserInRoom } from "../../page"

interface CardProps {
  reveled?: boolean
  user: UserInRoom
}

const randomPhases = [
  'sorria, você está sendo filmado 🧐',
  '4️⃣0️⃣4️⃣ not found',
  '👀',
  'cadê o voto? 🤔',
  'estamos com problemas para carregar informações ao usuário curioso 😯',
  'não há bug aqui, continue procurando 🪲',
  'boa tentativa, mas não há nada aqui 😛',
  '89 + 55 😎',
]

function generateRandomPhase() {
  return randomPhases[Math.floor(Math.random() * randomPhases.length)]
}

export function PlayerVoteCard({ user, reveled }: CardProps) {
  const avatarFallback = user.name[0].toLocaleUpperCase()
  const userVote = '?'
  const hasVote = reveled

  const cardFrontClasses = cn(
    'absolute inset-0 flex items-center justify-center',
    'backface-hidden bg-white dark:bg-gray-800',
    'border-2 border-gray-300 dark:border-gray-600 rounded-lg',
    'transform-y-180'
  )

  const cardBackClasses = cn(
    'absolute inset-0 flex items-center justify-center',
    'backface-hidden bg-white dark:bg-gray-800',
    'border-2 border-gray-300 dark:border-gray-600 rounded-lg',
    {
      'border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20': hasVote
    },
    'transform-y-0'
  )


  return (
    <div className={cn(
      'flex flex-col items-center justify-center gap-1'
    )}>
      <div className={cn(
        'relative transition-transform duration-700 w-14 h-20 md:w-16 md:h-24',
        'transform-3d preserve-3d',
        reveled ? 'transform-y-180' : '',
      )}>
        <div className={cardFrontClasses}>
          {!reveled && <span className="text-xs text-gray-500 text-center p-2 hidden">
            {generateRandomPhase()}
          </span>}
          {reveled && <span className="text-3xl md:text-4xl font-bold">
            {userVote}
          </span>}
        </div>
        <div className={cardBackClasses}>
          <Avatar className="h-6 w-6">
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <strong className="mt-1 text-sm md:text-base">
        {user.name}
      </strong>
    </div>
  )
}