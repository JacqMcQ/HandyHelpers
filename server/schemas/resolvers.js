import { User, Address, Service } from "../models/index.js";
import { AuthenticationError } from "apollo-server-express";
import { signToken } from "../utils/auth.js";

const resolvers = {
  Query: {
    getUsers: async () => await User.find(),
    getAddresses: async (_, __, { user }) => {
      if (!user) throw new AuthenticationError("Authentication required");
      return await Address.find({ user: user._id }).populate("user");
    },
    getServices: async () => await Service.find(),
  },
  Mutation: {
    signup: async (_, { firstName, lastName, email, password, username }) => {
      const userExists = await User.findOne({ email });
      if (userExists)
        throw new AuthenticationError("User with this email already exists");

      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        username,
      });
      await newUser.save();

      const token = signToken(newUser);
      return { token, user: newUser };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password)))
        throw new AuthenticationError("Invalid credentials");

      const token = signToken(user);
      return { token, user };
    },

    addAddress: async (
      _,
      { nickname, address_line_1, city, state, zip, country },
      context
    ) => {
      if (!context.user) {
        throw new AuthenticationError("Authentication required");
      }

      try {
        const newAddress = await Address.create({
          nickname,
          address_line_1,
          city,
          state,
          zip,
          country,
          user: context.user._id,
        });

        // Optionally, populate user in the response
        return await Address.findById(newAddress._id).populate("user");
      } catch (error) {
        throw new Error("Failed to create address: " + error.message);
      }
    },
    
    addService: async (_, { name, description, price }) => {
      const newService = new Service({ name, description, price });
      await newService.save();
      return newService;
    },
  },

  User: {
    addresses: async (user) => await Address.find({ user: user._id }),
  },
};

export default resolvers;