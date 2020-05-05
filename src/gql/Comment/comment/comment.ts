import { IResolvers } from "graphql-tools";
import { Context } from "../../../context";

const query: IResolvers = {
  Comment: {
    CommentlikesCount: async ({ id }, _, ctx: Context) => {
      const { user, prisma } = ctx;
      return await prisma.commentLike.count({
        where: { comment: { id }, user: { id: user.id } },
      });
    },
    isCommentLiked: async ({ id }, _, ctx: Context) => {
      const { user, prisma } = ctx;
      if (user) {
        const filterOptions = {
          comment: { id },
          user: { id: user.id },
        };
        const commentLikes = await prisma.commentLike.findMany({
          where: filterOptions,
        });
        return commentLikes.length > 0 ? true : false;
      } else {
        return false;
      }
    },
    user: async ({ id }, __, ctx: Context) => {
      const { prisma } = ctx;
      const users = await prisma.user.findMany({
        where: {
          comments: {
            every: { id },
          },
        },
      });
      return users[0];
    },
  },
};
export default query;
