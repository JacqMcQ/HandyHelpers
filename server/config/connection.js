const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||"mongodb+srv://jacqlynmcquade:aqrYQxL6tCXvOJmi@handy-helpers.pql0f.mongodb.net/?retryWrites=true&w=majority&appName=handy-helpers"
);

module.exports = mongoose.connection;
