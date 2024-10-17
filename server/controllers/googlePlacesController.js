
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const GOOGLE_PLACES_API_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

// Function to search for cleaning services using Google Places API
export const getCleaningServices = async (req, res) => {
  const { location } = req.query; // Get location from query params
  const keyword = "cleaning services"; // Search keyword
  const radius = 10000; // Search radius in meters

  const url = `${GOOGLE_PLACES_API_URL}?location=${location}&radius=${radius}&keyword=${keyword}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  try {
    const response = await axios.get(url);
    const services = response.data.results.map((service) => ({
      name: service.name,
      description: service.vicinity,
      price: service.price_level || "N/A", 
    }));
    res.json(services);
  } catch (error) {
    console.error("Error fetching services from Google Places:", error);
    res.status(500).json({ message: "Error fetching services" });
  }
};
