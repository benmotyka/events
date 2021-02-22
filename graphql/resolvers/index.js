import Event from "../../models/event.js";
import User from "../../models/user.js";
import Booking from "../../models/booking.js";
import bcrypt from "bcryptjs";

export default {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map((event) => {
        return { ...event._doc, date: new Date(event._doc.date).toISOString() };
      });
    } catch (error) {
      throw error;
    }
  },
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map((booking) => {
        return {
          ...booking._doc,
          createdAt: new Date(booking._doc.createdAt).toISOString(),
          updatedAt: new Date(booking._doc.createdAt).toISOString(),
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
  createUser: async (args) => {
    try {
      const hashedPassword = await bcrypt.hash(args.userInput.password, 15);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
      });
      const result = await user.save();
      return { ...result._doc, password: null, _id: result.id };
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args) => {
    const bookedEvent = await Event.findOne({ _id: args.eventId });
    try {
      const newBooking = new Booking({
        user: "6030fb4ca04219226045c610",
        event: bookedEvent,
      });
      const result = await newBooking.save();
      return {
        ...result._doc,
        createdAt: new Date(result._doc.createdAt).toISOString(),
        updatedAt: new Date(result._doc.createdAt).toISOString(),
      };
    } catch (error) {
      throw error;
    }
  },
  cancelBooking: async (args) => {
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
