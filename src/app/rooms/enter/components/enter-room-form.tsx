import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Session } from "@/domain/session";
import { useForm } from "@/hooks/use-form";
import { useToast } from "@/hooks/use-toast";
import { EnterRoomSchema, enterRoomSchema } from "@/schemas/enter-room";
import api from "@/services/api";
import { isAxiosError } from "axios";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SessionExistsResponse {
  message: string
  exists: boolean
  session?: Session
}

export function EnterRoomForm() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const { register, handleSubmit } = useForm<EnterRoomSchema>({
    schema: enterRoomSchema,
  })

  const handleEnterRoom = async (data: EnterRoomSchema) => {
    try {

      const response = await api.get<SessionExistsResponse>(`/api/session/exists/${data.token}`)

      if (!response.data.exists) {
        toast({
          description: response.data.message,
          variant: 'destructive',
        })
      }
      if (response.data.session) {
        navigate(`/rooms/${data.token}`)
      }
    } catch (error) {
      const err = isAxiosError(error)
      if (err) {
        toast({
          description: error.response?.data.message,
          variant: 'destructive',
        })
      }
    }
  }

  return (
    <form id="enter-room-form" onSubmit={handleSubmit(handleEnterRoom)}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="token">Código da sala</Label>
          <div className="flex items-center gap-2">
            <Input id="token" type="text" placeholder="FD7SXASDSD" maxLength={10} {...register('token')} />
            <Button type="submit"><MoveRight /></Button>
          </div>
        </div>
      </div>
    </form>
  )
}