import { User, Address, Service } from "../models/index.js"; // Import models using destructured imports

const resolvers = {
  Query: {
    getUsers: async () => await User.find(),
    getAddresses: async () => await Address.find().populate("user"), // Populate to get user details
    getServices: async () => await Service.find(), // Get all services from the database
  },
  Mutation: {
    signup: async (_, { firstName, lastName, email, password, username }) => {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password,
        username,
      });
      await newUser.save();
      return newUser;
    },
 async addAddress(_, { address_line_1, city, state, zip, userId }) {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      // Create the new address
      const address = new Address({
        address_line_1,
        city,
        state,
        zip,
        user: userId, // Assuming userId is being passed correctly
      });

      // Save the address to the database
      await address.save();

      // Return the address with the user ID converted to a string
      return {
        id: address._id.toString(),
        address_line_1,
        city,
        state,
        zip,
        user: {
          id: user._id.toString(), // Convert user ID to string
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      };
    },

addService: async (_, { name, description, price }) => {
      const newService = new Service({ name, description, price });
      await newService.save();
      return newService; 
    },
  },

  User: {
    addresses: async (user) => await Address.find({ user: user.id }), 
  },
};

export default resolvers;
