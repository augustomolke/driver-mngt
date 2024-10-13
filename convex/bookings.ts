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
    const promises = args.booking.map((payload) => {
      if (!payload.booking_id) {
        return ctx.db.insert("bookings", payload);
      } else {
        return ctx.db.patch(payload.booking_id, { info: payload.info });
      }
    });

    const pref = await Promise.all(promises);
  },
});

export const deleteBooking = mutation({
  args: {
    ids: v.array(v.id("bookings")),
  },
  handler: async (ctx, args) => {
    const promises = args.ids.map((id) => {
      return ctx.db.delete(id);
    });

    const pref = await Promise.all(promises);
  },
});
