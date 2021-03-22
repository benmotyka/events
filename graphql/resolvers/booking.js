import Booking from "../../models/booking.js";
import Event from "../../models/event.js";

import { dateToString } from "../../functions/date.js";

export default {
  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const bookings = await Booking.find({ user: req.userId });
      return bookings.map((booking) => {
        return {
          ...booking._doc,
          createdAt: dateToString(booking._doc.createdAt),
          updatedAt: dateToString(booking._doc.createdAt),
        };
      });
    } catch (error) {
      throw error;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const bookedEvent = await Event.findOne({ _id: args.eventId });
    try {
      const newBooking = new Booking({
        user: req.userId,
        event: bookedEvent,
      });
      const result = await newBooking.save();
      return {
        ...result._doc,
        updatedAt: dateToString(result._doc.createdAt),
        createdAt: dateToString(result._doc.createdAt),
      };
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const booking = await Booking.findById(args.bookingId);
      const event = { ...booking.event._doc };
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (error) {
      throw error;
    }
  },
};
