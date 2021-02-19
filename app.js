import express from "express"
import bodyParser from "body-parser"
import dotenv from 'dotenv'
import {graphqlHTTP} from "express-graphql"; // middleware
import { buildSchema } from 'graphql'
dotenv.config()

const app = express();

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
    //! - required
    schema: buildSchema(`

    type RootQuery {
        events: [String!]! 
    }

    type RootMutation {
        createEvent(name: String): String
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `), //valid graphql schema
    rootValue: {
        events: () => {
            return ['Sailing', 'Coding'];
        },
        createEvent: (args) => {
            const eventName = args.name;
            return eventName;
        }
    },
    graphiql: true
}))

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Api listening on port: " + port)
})