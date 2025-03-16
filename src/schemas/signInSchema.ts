import {z} from "zod"

export const signInSchema = z.object({
    identifier: z.string(), //userName
    password: z.string()
})