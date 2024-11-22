export interface IVote {
  userId: string;
  vote: number;
}

export interface Session {
  title: string;
  token: string;
  owner: string;
  votes: IVote[];
  closed: boolean;
}

export interface SessionCreateResponse {
  message: string
  session: Session
}

export interface SessionExistsResponse {
  message: string
  exists: boolean
  session?: Session
}