const typeDefs = `
    type User { 
        address: String!,
        number: Int!,
        balance: Int!
    }

    type Query {
        users: [User]
    }
`;

module.exports = typeDefs;