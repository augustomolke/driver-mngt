/* prettier-ignore-start */

/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as bookings from "../bookings.js";
import type * as crons from "../crons.js";
import type * as events from "../events.js";
import type * as feedbacks from "../feedbacks.js";
import type * as gsheet from "../gsheet.js";
import type * as locations from "../locations.js";
import type * as preferences from "../preferences.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  bookings: typeof bookings;
  crons: typeof crons;
  events: typeof events;
  feedbacks: typeof feedbacks;
  gsheet: typeof gsheet;
  locations: typeof locations;
  preferences: typeof preferences;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

/* prettier-ignore-end */
