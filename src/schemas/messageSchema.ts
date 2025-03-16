import {z} from "zod"

export const messageSchema = z.object({
    message: z
    .string()
    .min(10, "message should be at least 10 char long.")
    .max(10, "message should be at most 300 char long.")
})