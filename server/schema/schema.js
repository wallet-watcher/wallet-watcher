const typeDefs = `
    type User { 
        _id: String!,
        address: String!,
        number: Int!,
        balance: Int!
    }

    type Query {
        users: [User],
        user(_id: String): User
    }

    type Mutation {
        createUser(address: String, number: String, balance: Int): User
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;

module.exports = typeDefs;