const axios = require("axios");
require("dotenv").config();

const getCoordinates = async (location) => {
    const apiKey = process.env.GEO_API_KEY;

    try {
        const response = await axios.get(
            `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(location)}&format=json`
        );
        const { lon, lat } = response.data[0];

        return {
            type: "Point",
            coordinates: [parseFloat(lon), parseFloat(lat)],
        };
    } catch (error) {
        console.error("Geocoding failed:", error.message);
        return {
            type: "Point",
            coordinates: [0, 0], // ✅ Required fallback
        };
    }
};

module.exports = getCoordinates;
