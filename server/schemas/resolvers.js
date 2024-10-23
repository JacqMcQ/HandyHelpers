import { User, Address, Service } from "../models/index.js";
import { AuthenticationError } from "apollo-server-express";
import { signToken } from "../utils/auth.js";

const resolvers = {
  Query: {
    getUsers: async () => {
      try {
        return await User.find();
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch users");
      }
    },
    getAddresses: async () => {
      try {
        return await Address.find().populate("user");
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch addresses");
      }
    },
    getServices: async () => {
      try {
        return await Service.find();
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch services");
      }
    },
  },

  Mutation: {
    signup: async (_, { firstName, lastName, email, password, username }) => {
      try {
        const userExists = await User.findOne({ email });
        if (userExists) {
          throw new AuthenticationError("User with this email already exists");
        }

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
      } catch (error) {
        console.error(error);
        throw new Error("Signup failed");
      }
    },

    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError("User not found");
        }

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
          throw new AuthenticationError("Invalid credentials");
        }

        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error("Login failed");
      }
    },

    addAddress: async (_, { nickname, address_line_1, city, state, zip, userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new AuthenticationError("User not found");
        }

        const address = new Address({
          nickname,
          address_line_1,
          city,
          state,
          zip,
          user: userId,
        });

        await address.save();

        return {
          id: address._id.toString(),
          nickname,
          address_line_1,
          city,
          state,
          zip,
          user: {
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
        };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add address");
      }
    },

    addService: async (_, { name, description, price }) => {
      try {
        const newService = new Service({ name, description, price });
        await newService.save();
        return newService;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add service");
      }
    },
  },

  User: {
    addresses: async (user) => {
      try {
        return await Address.find({ user: user.id });
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch addresses for user");
      }
    },
  },
};

export default resolvers;
