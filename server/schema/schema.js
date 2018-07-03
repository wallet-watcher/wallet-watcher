const typeDefs = `
    type User {
        _id: String!,
        address: String!,
        number: Int!,
        balance: Int!,
        incoming: Float!,
        outgoing: Float!
    }

    type Query {
        users: [User],
        user(_id: String): User
    }

    type Mutation {
        createUser(address: String, number: String, balance: Int, incoming: Float, outgoing: Float): User
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;

module.exports = typeDefs;
