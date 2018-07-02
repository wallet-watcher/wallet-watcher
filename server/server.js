const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require("./schema/schema");

// TODO: Functions here
//
//

// Some fake test data
const users = [
  {
    address: '0xf5b483fd49a2e1cf215c049423f10003e84bd006',
    number: 9243001031,
    balance: 50
  },
  {
    address: '0xf5b483fd49a2e1cf215c049423f10003e84bd006',
    number: 9203001031,
    balance: 50
  },
];

// The resolvers
const resolvers = {
  Query: {
    users: () => users,
  },
  
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();
const PORT = 3000;

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(PORT, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});