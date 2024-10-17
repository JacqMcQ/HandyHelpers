import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLFloat,
} from "graphql"; 
import User from "../models/User.js";
import Service from "../models/Service.js"; 

// Define the User Type
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLString },
    username: { type: GraphQLString },
  }),
});

// Define the Service Type
const ServiceType = new GraphQLObjectType({
  name: "Service",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findById(args.id);
      },
    },
    services: {
      type: new GraphQLList(ServiceType), 
      resolve(parent, args) {
        return Service.find(); 
      },
    },
  },
});

// Mutations
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        password: { type: GraphQLString }, // Remember to hash this!
      },
      resolve(parent, args) {
        const user = new User({
          username: args.username,
          password: args.password,
        });
        return user.save();
      },
    },
  },
});

// Export the schema as default
export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
