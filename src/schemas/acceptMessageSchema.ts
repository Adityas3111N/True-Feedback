import {z} from "zod"

export const acceptMassegesSchema = z.object({
   acceptMasseges: z.boolean()
})