import mongoose from "mongoose";
import autopopulate from 'mongoose-autopopulate'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: 'This E-mail is already registered'
    },
    password: {
        type: String,
        required: true
    },
    createdEvents: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event',
      autopopulate: true 

        }
    ]
})

userSchema.plugin(autopopulate);

export default mongoose.model('User', userSchema);