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
    getAddresses: async (parents,args,context) => {
      try {
        if (!context.user) {
          throw new AuthenticationError("Not authenticated");
        }
        return await User.findById(context.user._id).populate("addresses");
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

    addAddress: async (_, { nickname, street, city, state, zip, country, userId }) => {
      console.log("Adding address with data:", {
        nickname,
        street,
        city,
        state,
        zip,
        country,
        userId,
      });
    
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new AuthenticationError("User not found");
        }
    
        // Create a new Address instance
        const address = new Address({
          nickname,
          street,
          city,
          state,
          zip,
          country,
        });
    
        // Save the address to the database
        const savedAddress = await address.save();
        console.log("Saved Address:", savedAddress); // Log the saved address to verify its contents
    
        // Return the saved address including the _id
        return {
          _id: savedAddress._id.toString(), // Ensure you include the _id field
          nickname: savedAddress.nickname,
          street: savedAddress.street,
          city: savedAddress.city,
          state: savedAddress.state,
          zip: savedAddress.zip,
          country: savedAddress.country,
        };
      } catch (error) {
        console.error("Error in addAddress:", error);
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
