import { z } from "zod";

export const createStorySchema = z.object({
  name: z.string({
    required_error: "O nome da historia é obrigatorio",
  }),
  code: z.string({
    required_error: "O codigo da historia é obrigatorio",
  }),
  link: z.string().url({
    message: "O link da historia deve ser uma url",
  }).optional(),
  description: z.string().optional(),
});

export type CreateStorySchema = z.infer<typeof createStorySchema>;