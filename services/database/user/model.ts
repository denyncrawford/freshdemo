import { z } from "npm:zod"
import { zodModel } from "jsr:@olli/kvdex/ext/zod"

export type IUser = z.infer<typeof UserSchema>

export const UserSchema = z.object({
  username: z.string().min(1).max(32),
  age: z.number().min(1).max(200),
  activities: z.array(z.string().min(1).max(32)),
  address: z.object({
    country: z.string(),
    city: z.string(),
    street: z.string(),
    houseNumber: z.number().nullable(),
  }).optional(),
})

export const UserModel = zodModel(UserSchema)