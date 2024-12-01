export interface Story {
  _id: string
  code: string
  name: string
  link: string
  sessionToken: string
  score: number | null
  createdAt: Date
  updatedAt: Date
}