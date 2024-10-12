import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: { station: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("events")
      .withIndex("by_station", (q) => q.eq("location", args.station))
      .collect();
  },
});
