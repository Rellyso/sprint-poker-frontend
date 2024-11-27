import { Player } from '../../page'
import { PlayerVoteCard } from './player-vote-card'

interface PlayerVotesProps {
  players: Player[]
}


export function PlayerVotes({
  players
}: PlayerVotesProps) {


  return (
    <div className="flex items-center gap-2 pt-8 justify-center">
      {players.map((player) => (
        <PlayerVoteCard
          key={player.userId}
          user={player}
        />
      ))}
    </div>
  )
}
