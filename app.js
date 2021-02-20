import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { graphqlHTTP } from "express-graphql"; // middleware
import { buildSchema } from "graphql";
import Event from "./models/event.js";
import User from "./models/user.js";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHTTP({
    //! - required
    schema: buildSchema(`

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    type User {
        _id: ID!
        email: String!
        password: String 
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        events: [Event!]!
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }
    
    type RootMutation{
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `), //valid graphql schema
    rootValue: {

      events: () => {
        return Event.find()
          .then((events) => {
            return events.map((event) => {
              return { ...event._doc };
            });
          })
          .catch((err) => {
            console.log(err);
          });
      },
      createEvent: (args) => {
        let createdEvent;
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator: "6030fb4ca04219226045c610",
        });
        return event
          .save()
          .then((result) => {
            createdEvent = { ...result._doc };
            return User.findById("6030fb4ca04219226045c610");
          })
          .then((user) => {
            user.createdEvents.push(event);
            return user.save();
          })
          .then((result) => {
            return createdEvent;
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
      createUser: (args) => {
        return bcrypt
          .hash(args.userInput.password, 15)
          .then((hashedPassword) => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword,
            });
            return user.save();
          })
          .then((result) => {
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch((err) => {
            throw err;
          });
      },
    },
    graphiql: true,
  })
);

const port = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.la7tf.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(port, () => {
      console.log("Api listening on port: " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
