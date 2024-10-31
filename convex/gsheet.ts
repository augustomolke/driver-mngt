import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";
import { Doc } from "../convex/_generated/dataModel";

const EVENTS_API_URL = process.env.EVENTS_API || "";
const SECRET = process.env.SECRET || "";

export const actionDumpData = action({
  args: {},
  handler: async (ctx, args) => {
    const data = await ctx.runQuery(api.bookings.getAvailability);

    const result = await Promise.all(
      data.map(async (item) => {
        const event = (await ctx.runQuery(api.events.get, {
          id: item.event_id,
        })) as Doc<"events">;

        return {
          driver_id: item.driver_id,
          instance: item.instance,
          info: JSON.stringify(item.info.shifts),
          station: event.location,
        };
      })
    );

    const body = JSON.stringify(
      result.map((item) => {
        return {
          method: "POST",
          sheet: "enrollments2",
          key: SECRET,
          payload: item,
        };
      })
    );
    const gsheetCreate = await fetch(EVENTS_API_URL, {
      method: "POST",
      body,
    });
  },
});
