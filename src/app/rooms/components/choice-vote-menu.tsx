import { VoteCard } from './vote-card'
import { useRoom } from '../providers/room-provider'
import { GameType } from '@/domain/session'

const fibonacciChoices = ['1', '2', '3', '5', '8', '13', '21', '34', '55', '89']
const decimalChoices = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

const choices = {
  [GameType.fibonacci]: fibonacciChoices,
  [GameType.decimal]: decimalChoices,
}

export function ChoiceVoteMenu() {
  const { player, submitVote, roomInfo } = useRoom()

  const gameType = roomInfo?.game_type || GameType.fibonacci

  const handleVote = (inputVote: string) => {
    submitVote(inputVote)
  }

  return (
    <div className="w-full flex justify-center items-center gap-2 md:gap-3">
      {choices[gameType].map((choice) => (
        <VoteCard
          isSelected={choice === player?.vote}
          onClick={() => handleVote(choice)}
          key={choice}
        >
          {choice}
        </VoteCard>
      ))}
    </div>
  )
}
