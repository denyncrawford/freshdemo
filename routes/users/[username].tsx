import { Handlers, PageProps } from "$fresh/server.ts";
import { IUser } from "$/services/database/user/model.ts";
import { db } from "$/services/database/mod.ts";

  export const handler: Handlers = {
    async GET(_req, ctx) {
      const user = await db.users.findByPrimaryIndex("username", ctx.params.username);
      if (!user?.value) {
        return ctx.renderNotFound({
          message: "User not found",
          title: "404 - User not found",
        });
      }
      return ctx.render(user.value);
    },
  };
  
  export default function ProjectPage(props: PageProps<IUser>) {
    return (
      <div>
        <h1>{props.data.username}</h1>
        <p>{props.data.age} stars</p>
        <p>{props.data.activities.join(", ")}</p>
      </div>
    );
  }