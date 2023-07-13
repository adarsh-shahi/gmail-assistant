import jobScheduler from "./jobScheduler.js";
import mailer from "./mailer.js";

// made a utility function jobscheduler which runs mailer function between 45 to 120 seconds (any random number) periodically.
jobScheduler(mailer, 45, 120);
