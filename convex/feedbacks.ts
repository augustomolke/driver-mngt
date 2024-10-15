import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const createFeedback = mutation({
  args: {
    answers: v.any(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("feedbacks", args.answers);
  },
});
