import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  nickname: { type: "string", required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
  services: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  ],
});

const Address = mongoose.model("Address", addressSchema);
export default Address;
