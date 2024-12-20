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
      const user = await User.create({ firstName, lastName, email, password, username });
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addAddress: async (
      _,
      { nickname, address_line_1, city, state, zip, country },
      { user }
    ) => {
      if (!user) throw new AuthenticationError("You need to be logged in!");

      const address = await Address.create({
        nickname,
        address_line_1,
        city,
        state,
        zip,
        country,
        user: user._id, // Associate address with user
      });
      return address;
    },
    deleteAddress: async (_, { addressId }, { user }) => {
      if (!user) {
        throw new AuthenticationError("You need to be logged in!");
      }

      const address = await Address.findById(addressId);
      if (!address) {
        throw new Error("Address not found");
      }

      // Ensure the address belongs to the user
      if (address.user.toString() !== user._id.toString()) {
        throw new AuthenticationError("Not authorized to delete this address");
      }

      await Address.findByIdAndDelete(addressId);
      return address; // Return the deleted address if needed
    },
    addServiceToAddress: async (_, { addressId, serviceId }, { user }) => {
      if (!user) throw new AuthenticationError("You need to be logged in!");

      const address = await Address.findById(addressId);
      if (!address) {
        throw new Error("Address not found");
      }

      // Check if the service already exists in the address
      if (!address.services.includes(serviceId)) {
        address.services.push(serviceId);
        await address.save();
      }

      return address.populate("services");
    },
    addService: async (
      _,
      { name, description, price, addressId },
      { user }
    ) => {
      if (!user) throw new AuthenticationError("You need to be logged in!");

      const service = await Service.create({
        name,
        description,
        price,
      });

      // Optionally associate this service with an address if necessary
      const address = await Address.findById(addressId);
      if (address) {
        address.services.push(service._id); // Assuming address has a services array
        await address.save();
      }

      return service;
    },
  },
};


export default resolvers;
