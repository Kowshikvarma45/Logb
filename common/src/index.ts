import { z } from "zod"

export const signupValidation = z.object({
    username:z.string(),
    email:z.string().email(),
    password:z.string(),
})
export type signupValidationType = z.infer<typeof signupValidation>



export const signinValidation = z.object({
    email:z.string().email(),
    password:z.string()
})
export type signinValidationType = z.infer<typeof signinValidation>



export const postValidation = z.object({
    title:z.string(),
    content:z.string(),
})
export type postValidationType = z.infer<typeof postValidation>



export const editValidation = z.object({
    id:z.string(),
    title:z.string().optional(),
    content:z.string().optional()
})
export type editValidationType = z.infer<typeof editValidation>



export const readValidation = z.object({
    id:z.string()
})
export type readValidationType = z.infer<typeof readValidation>