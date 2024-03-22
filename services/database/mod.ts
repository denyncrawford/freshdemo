import { kvdex, collection } from "jsr:@olli/kvdex"
import { UserModel } from "./user/model.ts";

const kv = await Deno.openKv()

export const db = kvdex(kv, {
  // numbers: collection(model<number>()),
  // serializedStrings: collection(model<string>(), {
  //   serialize: "json"
  // }),
  users: collection(UserModel, {
    history: true,
    indices: {
      username: "primary",// unique
      age: "secondary" // non-unique
    }
  }),
  // Nested collections
  // nested: {
  //   strings: collection(model<string>()),
  // }
})