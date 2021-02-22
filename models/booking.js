import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const bookingSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      autopopulate: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      autopopulate: true,
    },
  },
  { timestamps: true }
);

bookingSchema.plugin(autopopulate);

export default mongoose.model("Booking", bookingSchema);
