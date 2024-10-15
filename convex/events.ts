import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: { station: v.optional(v.string()), id: v.optional(v.id("events")) },
  handler: async (ctx, args) => {
    if (args.id) {
      return await ctx.db.get(args.id);
    }

    if (args.station) {
      return await ctx.db
        .query("events")
        .withIndex("by_station", (q) => q.eq("location", args.station || ""))
        .collect();
    }
  },
});
