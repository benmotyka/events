import authResolver from "./auth.js";
import eventsResolver from "./events.js";
import bookingResolver from "./booking.js";

export default {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
};
