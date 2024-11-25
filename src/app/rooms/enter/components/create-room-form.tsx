import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SessionCreateResponse } from "@/domain/session";
import { useForm } from "@/hooks/use-form";
import { useToast } from "@/hooks/use-toast";
import { CreateRoomSchema, createRoomSchema } from "@/schemas/create-room";
import api from "@/services/api";
import { isAxiosError } from "axios";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";



export function CreateRoomForm() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const { register, handleSubmit } = useForm<CreateRoomSchema>({
    schema: createRoomSchema,
  })

  const handleCreateRoom = async (data: CreateRoomSchema) => {
    try {
      const response = await api.post<SessionCreateResponse>(`/api/session/create`, data)

      navigate(`/rooms/${response.data.session.token}`)
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
    <form id="create-room-form" onSubmit={handleSubmit(handleCreateRoom)}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="token">Nome da sala</Label>
          <div className="flex items-center gap-2">
            <Input id="token" type="text" placeholder="Sprint 1..." {...register('title')} />
          </div>
          <Button type="submit" form="create-room-form" className="space-x-2 flex-1">Criar<Plus /></Button>
        </div>
      </div>
    </form>
  )
}