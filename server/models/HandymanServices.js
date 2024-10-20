const { Schema, model } = require("mongoose");

const handymanSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  rating: Number,
  services: [String],
  location: {
    type: { type: String, default: "Point" },
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

handymanSchema.index({ location: "2dsphere" }); 

const Handyman = model("Handyman", handymanSchema);
module.exports = Handyman;
