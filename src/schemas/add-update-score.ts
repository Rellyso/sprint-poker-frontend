import { z } from "zod";

export const addUpdateScoreSchema = z.object({
  score: z.string({
    required_error: 'O voto é obrigatório',
  })
  .min(1, {
    message: 'O voto não deve ser vazio',
  })
  .max(3, {
    message: 'O voto deve ter no máximo 3 caracteres',
  }),
});

export type AddUpdateScoreSchema = z.infer<typeof addUpdateScoreSchema>;