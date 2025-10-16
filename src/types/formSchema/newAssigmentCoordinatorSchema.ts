import { z } from "zod";

export const newAssigmentCoordinatorSchema = z.object({
   lines: z.array(z.string()).min(1, { message: "Veuillez sélectionner au moins une ligne" }),
});

export type UseFormAssigmentCoordinator = z.infer<typeof newAssigmentCoordinatorSchema>;
