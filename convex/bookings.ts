import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const get = query({
  args: { driver_id: v.string() },
  handler: async (ctx, args) => {
    const bookings = await ctx.db
      .query("bookings")
      // .filter((q) => q.eq(q.field("taskListId"), args.taskListId))
      .filter((q) => q.eq(q.field("driver_id"), args.driver_id))
      .order("desc")
      .take(3);
    return bookings;
  },
});

export const createBooking = mutation({
  args: {
    booking: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    const promises = args.booking.map(async (payload) => {
      const exists = await ctx.db
        .query("bookings")
        .withIndex("by_event_driver", (q) =>
          q.eq("event_id", payload.event_id).eq("driver_id", payload.driver_id)
        )
        .filter((q) => q.eq(q.field("instance"), payload.instance))
        .collect();

      if (!(exists.length > 0)) {
        return ctx.db.insert("bookings", payload);
      } else {
        return ctx.db.patch(exists[0]._id, { info: payload.info });
      }
    });

    const pref = await Promise.all(promises);

    return pref;
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
