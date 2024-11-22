import { Header } from "@/components/header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnterRoomForm } from "./components/enter-room-form";
import { CreateRoomForm } from "./components/create-room-form";

export function EnterRoomPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 pt-12">
        <Card className="w-[350px] mx-auto">
          <CardHeader>
            <CardTitle>Entre em uma sala</CardTitle>
            <CardDescription>Crie uma sala para iniciar uma votação</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <CreateRoomForm />
            <div className="flex flex-col items-center gap-1 px-4">
              <hr className="w-full" />
              <span className="text-xs text-muted-foreground self-center">Ou entre em uma sessão existente</span>
              <hr className="w-full" />
            </div>
            <EnterRoomForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}