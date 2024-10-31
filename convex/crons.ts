import { cronJobs } from "convex/server";
import { api } from "./_generated/api";

const crons = cronJobs();
// An alternative way to create the same schedule as above with cron syntax
crons.cron("dump availability", "0 23 * * *", api.gsheet.actionDumpData, {});

export default crons;
