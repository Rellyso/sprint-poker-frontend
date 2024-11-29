import { IVote } from '@/domain/session'
import { calculateAverageVotes } from './calculate-average-votes'

interface BestOccurrenceFunction {
  betterAcceptance: string | number | null
  isCoffeeTime: boolean
}

export function calculateBestAcceptanceVote(
  votes: IVote[]
): BestOccurrenceFunction {
  if (!votes.length)
    return {
      betterAcceptance: null,
      isCoffeeTime: false,
    }

  const occurrences = votes
    .map((vote) => vote.vote)
    .filter((vote, index, self) => self.indexOf(vote) === index)
    .filter((vote) => vote)
    .map((vote) => ({
      value: vote,
      count: votes.filter((v) => v.vote === vote).length,
    }))
    .sort((a, b) => b.count - a.count)

  const mostFrequentVote = occurrences[0]?.value
  const average = calculateAverageVotes(votes)

  if (average === undefined) {
    return {
      betterAcceptance: '?',
      isCoffeeTime: false,
    }
  }

  let closestVote = null
  let smallestDifference = Number.POSITIVE_INFINITY

  for (const vote of votes) {
    const currentVote = Number(vote.vote)

    if (isNaN(currentVote)) continue

    const difference = Math.abs(currentVote - average)

    if (difference < smallestDifference) {
      smallestDifference = difference
      closestVote = currentVote
    }
  }

  const bestOccurrence = closestVote

  const betterAcceptance = mostFrequentVote ?? bestOccurrence

  return {
    betterAcceptance,
    isCoffeeTime: mostFrequentVote === '☕' && !bestOccurrence,
  }
}
