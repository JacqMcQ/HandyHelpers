import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const TIDY_API_URL = "https://api.tidy.com/api/v1/booking-availabilities";

// Function to get services by ID
export const getServices = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters
  const serviceTypeKey = "regular_cleaning.one_hour"; 
  const url = `${TIDY_API_URL}?service_type_key=${serviceTypeKey}&id=${id}`; // Add id to the URL

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.TIDY_API_KEY}`,
        Accept: "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching services from Tidy:", error);
    res.status(500).json({ message: "Error fetching services" });
  }
};
