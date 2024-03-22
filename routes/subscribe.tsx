import { Handlers } from "$fresh/server.ts";
import { db } from "$/services/database/mod.ts";
import { z } from "npm:zod";

export const handler: Handlers = {
  async GET(req, ctx) {
    return await ctx.render();
  },
  async POST(req, ctx) {
    try {
      const form = await req.formData();
      const username = form.get("username")?.toString()!;
      const age = Number(form.get("age")?.toString());
      const activity = form.get("activity")?.toString()!;

      console.log({ username, age, activity });

      // Add email to list.

      const result = await db.users.add({
        username,
        age,
        activities: [activity],
      });

      console.log({ result });

      if (!result.ok) {
        return new Response("Username already exists", { status: 409 });
      }

      // Redirect to user page.

      const headers = new Headers();
      headers.set("location", `/users/${username}`);
      return new Response(null, {
        status: 303, // See Other
        headers,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return new Response(JSON.stringify(error.issues, null, 2), { status: 422 });
      }
      return new Response("Something went wrong", { status: 500 });
    }
  },
};

export default function Subscribe() {
  return (
    <div class="flex flex-col items-center justify-center w-full h-screen">
      <form method="post" class="flex gap-4 flex-col items-start">
        <div class="flex flex-col gap-0">
          <label class="text-lg font-bold">Username</label>
          <input
            className={"px-2 py-1 border-gray-500 border-2 rounded-xl"}
            placeholder={"Username"}
            // required={true}
            name="username"
            value=""
          />
        </div>
        <div class="flex flex-col gap-0">
          <label class="text-lg font-bold">Age</label>
          <input
            className={"px-2 py-1 border-gray-500 border-2 rounded-xl"}
            placeholder={"Age"}
            required={true}
            name="age"
            type="number"
            value=""
          />
        </div>
        <div class="flex flex-col gap-0">
          <label class="text-lg font-bold">Activity</label>
          <input
            className={"px-2 py-1 border-gray-500 border-2 rounded-xl"}
            placeholder={"Activity"}
            name="activity"
            required={true}
            value=""
          />
        </div>
        <button
          class="px-4 py-1 bg-blue-500 text-white rounded-xl"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}
