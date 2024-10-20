import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
  },
});

const Service = mongoose.model("Service", serviceSchema);
export default Service;
