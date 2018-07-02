const resolvers = {
  Query: {
    users: async () => {
      return (await Users.find({}).toArray()).map(prepare)
    },
    user: async (root, {_id}) => {
      return prepare(await Users.findOne(ObjectId(_id)))
    },
  },
  Mutation: {
    createUser: async (root, args, context, info) => {
      const res = await Users.insert(args)
      return prepare(await Users.findOne({_id: res.insertedIds[1]}))
    },
  }
};

module.exports = resolvers;