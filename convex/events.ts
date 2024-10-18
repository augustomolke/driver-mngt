import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
  args: {
    station: v.optional(v.string()),
    id: v.optional(v.id("events")),
    event_id: v.optional(v.string()),
  },
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

    if (args.event_id) {
      return await ctx.db
        .query("events")
        .withIndex("by_eventId", (q) => q.eq("event_id", args.event_id || ""))
        .collect();
    }
  },
});
