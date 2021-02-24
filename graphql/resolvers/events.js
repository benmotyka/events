import Event from "../../models/event.js";
import User from "../../models/user.js";

import { dateToString } from "../../functions/date.js";

export default {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return {
          ...event._doc,
          date: dateToString(event._doc.date),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  createEvent: async (args) => {
    let createdEvent;
    try {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: "6030fb4ca04219226045c610",
      });
      const result = await event.save();
      createdEvent = {
        ...result._doc,
        date: new Date(event._doc.date).toISOString(),
      };
      const user = await User.findById("6030fb4ca04219226045c610");
      user.createdEvents.push(event);
      await user.save();
      return createdEvent;
    } catch (error) {
      throw error;
    }
  },
};
