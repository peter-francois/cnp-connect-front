import { z } from "zod";

export const newAssigmentConductorSchema = z.object({
  lines: z.string(),
});

export type UseFormNewAssigmentConductorSchema = z.infer<typeof newAssigmentConductorSchema>;
