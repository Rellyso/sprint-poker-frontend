import { z } from "zod";

export const enterRoomSchema = z.object({
  token: z.string().min(10, 'O token deve ter pelo menos 10 caracteres'),
});

export type EnterRoomSchema = z.infer<typeof enterRoomSchema>;