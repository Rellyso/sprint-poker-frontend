import { VoteCard } from "./vote-card"
import { useRoom } from "../providers/room-provider"

const choices = ['1', '2', '3', '5', '8', '13', '21', '34', '55', '89']

export function ChoiceVoteMenu() {
  const { player, submitVote } = useRoom()

  const handleVote = (inputVote: string) => {
    submitVote(inputVote)
  }

  return (
    <div className="w-full flex justify-center items-center gap-2 md:gap-3">
      {choices.map((choice) => (
        <VoteCard
          isSelected={choice === player?.vote}
          onClick={() => handleVote(choice)}
          key={choice}
        >{choice}</VoteCard>
      ))}
    </div>
  )
}