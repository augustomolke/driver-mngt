import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  args: { driver_id: v.string() },
  handler: async (ctx, args) => {
    const tasks = await ctx.db
      .query("preferences")
      // .filter((q) => q.eq(q.field("taskListId"), args.taskListId))
      .filter((q) => q.eq(q.field("driver_id"), args.driver_id))
      .take(5);
    return tasks;
  },
});

export const updatePreferences = mutation({
  args: {
    user: v.any(),
    preferences: v.array(
      v.object({
        cep: v.string(),
        neighbor: v.string(),
        city: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    if (!!args.user._id) {
      const pref = await ctx.db.patch(args.user._id, {
        preferences: args.preferences,
      });
      return pref;
    } else {
      const pref = await ctx.db.insert("preferences", args.user);
      return pref;
    }
  },
});
