import { Header } from '@/components/header'
import { ChoiceVoteMenu } from './components/choice-vote-menu'
import { PlayerVotes } from './components/player-votes'
import { TopBarRoomMenu } from './components/top-bar-room-menu'
import { RoomProvider } from './providers/room-provider'
import { RoomResults } from './components/room-results'

export function RoomPage() {
  return (
    <RoomProvider>
      <div className="flex flex-col h-screen bg-background">
        <Header />
        <div className="container space-y-4 mx-auto px-4 pt-6">
          <TopBarRoomMenu />
          <ChoiceVoteMenu />
          <PlayerVotes />
          <RoomResults />
        </div>
      </div>
    </RoomProvider>
  )
}
