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

function getTomorrowDate() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const day = String(tomorrow.getDate()).padStart(2, "0");
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
  const year = tomorrow.getFullYear();

  return `${day}/${month}/${year}`;
}

export const getAvailability = query({
  args: {},
  handler: async (ctx, args) => {
    // const bookings = await ctx.db
    //   .query("bookings")
    //   .filter((q) => q.eq(q.field("instance"), getTomorrowDate()))
    //   .order("desc")
    //   .collect();

    const mockBooking = {
      driver_id: "111",
      event_id: "js7fasbcqrj3f4ffk28z63gv6h72gcgw",
      info: { shifts: ["AM"] },
      instance: getTomorrowDate(),
    };
    return Array(500).fill(mockBooking);
  },
});

export const createBooking = mutation({
  args: {
    booking: v.array(v.any()),
  },
  handler: async (ctx, args) => {
    console.log("createbooking", args);
    // const promises = args.booking.map(async (payload) => {
    //   const exists = await ctx.db
    //     .query("bookings")
    //     .withIndex("by_event_driver", (q) =>
    //       q.eq("event_id", payload.event_id).eq("driver_id", payload.driver_id)
    //     )
    //     .filter((q) => q.eq(q.field("instance"), payload.instance))
    //     .collect();

    //   if (!(exists.length > 0)) {
    //     return ctx.db.insert("bookings", payload);
    //   }

    //   return ctx.db.patch(exists[0]._id, { info: payload.info });
    // });

    // const pref = await Promise.all(promises);
  },
});

export const deleteBooking = mutation({
  args: {
    ids: v.array(v.id("bookings")),
  },
  handler: async (ctx, args) => {
    console.log("deleteBooking", args);

    // const promises = args.ids.map((id) => {
    //   return ctx.db.delete(id);
    // });

    // const pref = await Promise.all(promises);
  },
});
