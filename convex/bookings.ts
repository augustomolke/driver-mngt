import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  args: { driver_id: v.string() },
  handler: async (ctx, args) => {
    const bookings = await ctx.db
      .query("bookings")
      // .filter((q) => q.eq(q.field("taskListId"), args.taskListId))
      .filter((q) => q.eq(q.field("driver_id"), args.driver_id))
      .collect();
    return bookings;
  },
});

export const createBooking = mutation({
  args: {
    booking: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    const promises = args.booking.map((payload) =>
      ctx.db.insert("bookings", payload)
    );

    const pref = await Promise.all(promises);

    console.log(pref);

    return pref;
  },
});

export const deleteBooking = mutation({
  args: {
    id: v.id("bookings"),
  },
  handler: async (ctx, args) => {
    const pref = await ctx.db.delete(args.id);
    return pref;
  },
});
