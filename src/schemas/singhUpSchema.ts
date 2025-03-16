import {z} from "zod"

export const userNameValidation = z
.string()
.min(2, "atleat have 2 chars")
.max(20, "can't be longer than 20 chars")
.regex(/^[a-zA-Z0-9_]+$/, "special chars are not allowed.")

export const signUpSchema = z.object({//bcz it have 3 attributes.
    userName: userNameValidation,
    email: z.string().email({message : "invalid email address"}),
    password: z.string().min(6, {message: "password must be atleast 6 char long"})
})