import { useState } from "react"
import { VoteCard } from "./vote-card"

const choices = ['1', '2', '3', '5', '8', '13', '21', '34', '55', '89']

export function ChoiceVoteMenu() {
  const [vote, setVote] = useState<string | undefined>(undefined)

  const handleVote = (_vote: string) => {
    if (_vote === vote) {
      setVote(undefined)
      return
    }

    if (_vote) {
      setVote(_vote)
    }
  }

  return (
    <div className="w-full flex justify-center items-center gap-2">
      {choices.map((choice) => (
        <VoteCard
          isSelected={choice === vote}
          onClick={() => handleVote(choice)}
          key={choice}
        >{choice}</VoteCard>
      ))}
    </div>
  )
}