export interface IVote {
  userId: string;
  vote: string | null;
}

export enum GameType {
  fibonacci = 'Fibonacci',
  decimal = 'Decimal',
}


export interface Session {
  title: string;
  token: string;
  owner: string;
  result_revealed: boolean;
  votes: IVote[];
  closed: boolean;
  game_type: GameType;
  selected_story: string | null;
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