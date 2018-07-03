// const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const typeDefs = require('./schema/schema');
const resolvers = require('./resolvers/resolvers');

const app = express();
const PORT = 8000;
const URL = 'http://localhost';
const MONGO_URL =
  process.env.MONGOLAB_URI || 'mongodb://localhost:27017/walletwatcher';
const db = MongoClient.connect(MONGO_URL, { useNewUrlParser: true });
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

app.use(cors());
app.use(bodyParser.json());

// The GraphQL endpoint
app.use('/graphql', graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.get('/', (req, res) => res.send('hello world'));

// Function that converts mongo objectID to a string
const prepare = o => {
  o._id = o._id.toString();
  return o;
};

// const start = async () => {
//   try {
//     // TODO: MONGODB
//     const db = await MongoClient.connect(MONGO_URL)
//
//     const Users = db.collection('users')
//
//     // TODO: MONGOOSE
//     // mongoose.connect(MONGO_URL)
//     // const db = mongoose.connection;
//     // db.on('error', ()=> {console.log( '---FAILED to connect to mongoose')})
//     // db.once('open', () => {
//     //   console.log( '+++Connected to mongoose')
//     // })
//
//     // TODO: Functions here
//     //
//     //
//
//     // Put together a schema
//     const schema = makeExecutableSchema({
//       typeDefs,
//       resolvers
//     });
//
//     // Initialize the app
//     // const app = express();
//     app.use(cors())
//
//     // The GraphQL endpoint
//     app.use("/graphql", bodyParser.json(), graphqlExpress({ schema }));
//
//     // GraphiQL, a visual editor for queries
//     app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));
//
//     // Start the server
//     app.listen(PORT, () => {
//       console.log(`Visit ${URL}:${PORT}/graphiql`);
//     });
//   } catch (e) {
//     console.log(e)
//   }
// }
// start();

db
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Visit ${URL}:${PORT}/graphiql`);
    });
  })
  .catch(err => {
    console.log('error connecting to mongodb');
  });
