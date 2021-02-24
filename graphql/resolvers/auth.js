import User from "../../models/user.js";
import bcrypt from "bcryptjs";

export default {
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
};
