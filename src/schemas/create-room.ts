import { z } from "zod";

export const createRoomSchema = z.object({
  title: z.string({
    required_error: 'O título da sala é obrigatório',
  }),
});

export type CreateRoomSchema = z.infer<typeof createRoomSchema>;