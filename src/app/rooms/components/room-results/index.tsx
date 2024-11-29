import { VoteCard } from '../vote-card'
import { calculateAverageVotes } from '@/utils/calculate-average-votes'
import { useRoom } from '../../providers/room-provider'
import { calculateBestAcceptanceVote } from '@/utils/calculate-best-acceptance-vote'
import { ConfettiFireworks } from './confetti-fireworks'

export function RoomResults() {
  const { roomInfo } = useRoom()

  const votes = roomInfo?.votes || []
  const areVotesRevealed = roomInfo?.result_revealed

  const votesAverage = calculateAverageVotes(votes)

  const formattedAverageVotes =
    votesAverage !== undefined
      ? new Intl.NumberFormat('pt-BR', {
          maximumFractionDigits: 2,
        }).format(votesAverage)
      : undefined

  const { betterAcceptance, isCoffeeTime } = calculateBestAcceptanceVote(votes)

  const isBetterAcceptance = betterAcceptance === votesAverage
  const isConfettiTime = (areVotesRevealed && isBetterAcceptance) || false

  return (
    <div className="flex object-center self-center flex-row gap-4 fixed bottom-0">
      <ConfettiFireworks trigger={isConfettiTime} />

      {betterAcceptance && (
        <div
          className={`
            ${areVotesRevealed ? 'flex' : 'hidden'} 
            items-center justify-center 
            mb-5 gap-2 
            animate-slide-in-up 
            animate-delay-200
          `}
        >
          <h2 className="text-2xl font-bold">Escolha sugerida:</h2>
          <VoteCard>{betterAcceptance}</VoteCard>
        </div>
      )}

      {!!votesAverage && (
        <div
          className={`
            ${areVotesRevealed ? 'flex' : 'hidden'} 
            items-center justify-center 
            mb-5 gap-2 
            animate-slide-in-up 
            animate-delay-200
          `}
        >
          <h2 className="text-2xl font-bold">Média:</h2>
          <p className="text-2xl font-bold">{formattedAverageVotes}</p>
        </div>
      )}

      {/* Coffee Time */}
      {isCoffeeTime && (
        <div
          className={`
            ${areVotesRevealed ? 'flex' : 'hidden'} 
            items-center justify-center 
            mb-5 gap-2 
            animate-slide-in-up 
            animate-delay-200
          `}
        >
          Que tal uma pausa?
        </div>
      )}
    </div>
  )
}
