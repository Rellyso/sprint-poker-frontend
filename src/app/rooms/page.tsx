import { Header } from "@/components/header";
import { CommandsMenu } from "./components/commands-menu";

export function RoomPage() {

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-6">
        <CommandsMenu />
      </div>
    </div>
  )
}