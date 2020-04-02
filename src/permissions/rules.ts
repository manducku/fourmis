import { rule } from "graphql-shield";

export const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, ctx, info) => {
    if (ctx.user) {
      return true;
    }
    return false;
  }
);
