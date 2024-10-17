import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  address_line_1: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

const Address = mongoose.model("Address", addressSchema);
export default Address;
