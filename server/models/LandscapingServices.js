const { Schema, model } = require("mongoose");

const landscapingServiceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  services: {
    type: [String],
    default: [],
  },
  location: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a geospatial index on the location field
landscapingServiceSchema.index({ location: "2dsphere" });

const LandscapingService = model("Landscaping", landscapingServiceSchema);
module.exports = LandscapingService;
