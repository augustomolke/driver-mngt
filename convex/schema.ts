import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  locations: defineTable({
    city: v.string(),
    incentive: v.optional(v.string()),
    priority: v.optional(v.string()),
    state: v.string(),
    station: v.string(),
    neighbor: v.string(),
    zipcode: v.string(),
    zipcode_prefix: v.string(),
  }).index("by_station", ["station"]),
  preferences: defineTable({
    driver_id: v.string(),
    driver_name: v.string(),
    phone: v.string(),
    station: v.string(),
    vehicle: v.string(),
    preferences: v.array(
      v.object({
        cep: v.string(),
        neighbor: v.string(),
        city: v.string(),
      })
    ),
  }).index("by_driver", ["driver_id"]),

  events: defineTable({
    event_type: v.string(),
    event_id: v.string(),
    duration: v.string(),
    location: v.string(),
    cron_exp: v.string(),
    current_date: v.string(),
    end_date: v.string(),
    timezone: v.string(),
    options: v.any(),
  }).index("by_station", ["location"]),

  bookings: defineTable({
    driver_id: v.string(),
    event_id: v.id("events"),
    instance: v.string(),
    info: v.optional(v.any()),
  })
    .index("by_driver", ["driver_id"])
    .index("by_event", ["event_id"])
    .index("by_event_driver", ["event_id", "driver_id"]),
});
