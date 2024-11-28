import { PlayerVoteCard } from './player-vote-card'
import { useRoom } from '../../providers/room-provider'

export function PlayerVotes() {
  const { players, roomInfo } = useRoom()

  return (
    <div className="flex items-center gap-2 md:gap-6 pt-8 justify-center">
      {players.map((player) => (
        <PlayerVoteCard
          reveled={roomInfo?.result_revealed}
          key={player.userId}
          player={player}
        />
      ))}
    </div>
  )
}
