import { IVote } from '@/domain/session'

export function calculateAverageVotes(list: IVote[]): number | undefined {
  let count: number = 0
  const numbers = list
    .filter((item) => item.vote !== null)
    .map((item) => Number(item.vote))
    .filter((n) => !isNaN(n))
  if (!numbers) return undefined
  for (let index = 0; index < numbers.length; index++) {
    count = numbers[index] + count
  }

  return count / numbers.length
}
