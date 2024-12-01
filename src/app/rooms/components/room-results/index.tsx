import { VoteCard } from '../vote-card'
import { calculateAverageVotes } from '@/utils/calculate-average-votes'
import { useRoom } from '../../providers/room-provider'
import { calculateBestAcceptanceVote } from '@/utils/calculate-best-acceptance-vote'
import { ConfettiFireworks } from './confetti-fireworks'
import { cx } from 'class-variance-authority'

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

  const isBetterAcceptance = Number(betterAcceptance) === votesAverage
  const isConfettiTime = (areVotesRevealed && isBetterAcceptance) || false
  console.log({ areVotesRevealed, betterAcceptance, votesAverage })

  return (
    <div className="flex object-center self-center justify-center flex-row gap-4 fixed bottom-0 right-0 w-full">
      <ConfettiFireworks trigger={isConfettiTime} />

      {betterAcceptance && (
        <div
          className={cx(
            areVotesRevealed
              ? 'animate-in slide-in-from-bottom'
              : 'animate-out slide-out-to-bottom hidden',
            'flex mb-5 gap-2 flex-col items-center justify-center',
            'duration-300 '
          )}
        >
          <VoteCard>{betterAcceptance}</VoteCard>
          <span className="text-lg font-semibold">Melhor escolha</span>
        </div>
      )}

      {!!votesAverage && (
        <div
          className={cx(
            areVotesRevealed
              ? 'animate-in slide-in-from-bottom'
              : 'animate-out slide-out-to-bottom hidden',
            'flex mb-5 gap-2 flex-col items-center justify-center',
            'duration-300'
          )}
        >
          <VoteCard>{formattedAverageVotes}</VoteCard>
          <h3 className="text-lg font-semibold">Média</h3>
        </div>
      )}

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
