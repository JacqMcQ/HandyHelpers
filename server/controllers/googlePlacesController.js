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

  // Log the API key
  console.log("Google Places API Key:", process.env.GOOGLE_PLACES_API_KEY);

  const url = `${GOOGLE_PLACES_API_URL}?location=${location}&radius=${radius}&keyword=${keyword}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  console.log("Cleaning Services API URL:", url);

  try {
    const response = await axios.get(url);
    if (!response.data.results || response.data.results.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }
    const services = response.data.results.map((service) => ({
      name: service.name,
      description: service.vicinity,
      price: service.price_level || "N/A",
    }));
    res.json(services);
  } catch (error) {
    console.error(
      "Error fetching services from Google Places:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ message: "Error fetching services" });
  }
};
// Function to search for handyman services using Google Places API
export const getHandymanServices = async (req, res) => {
  const location = req.query.location; 
  const keyword = req.query.keyword || "repair services"; 
  const url = `${GOOGLE_PLACES_API_URL}?location=${location}&radius=20000&keyword=${keyword}&key=${process.env.GOOGLE_PLACES_API_KEY}`;

  console.log("Handyman Services API URL:", url);
  
  try {
    const response = await axios.get(url);

    // Check if there are no results
    if (!response.data.results || response.data.results.length === 0) {
      return res.status(404).json({ message: "No services found" });
    }

    // Send the results
    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching handyman services:", error);
    res.status(500).json({ error: "Failed to fetch handyman services" });
  }
};