import axios from 'axios';

export async function getCoordinates(address) {
  try {
    const apiKey = "AIzaSyCOtVbWRTT9363CBuZ7yz3SqEokQ4jXLVk";
    // process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) throw new Error('GOOGLE_MAPS_API_KEY is not set!');
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
    const response = await axios.get(url);
    // Debugging: log the raw API response

    if (
      response.data.status === "OK" &&
      response.data.results &&
      response.data.results.length > 0
    ) {
      const location = response.data.results[0].geometry.location;
      console.log('Latitude:', location.lat);
      console.log('Longitude:', location.lng);
      return [location.lat, location.lng]; // Return as [longitude, latitude]
    } else {
      throw new Error(`Geocoding failed: status=${response.data.status}, error_message=${response.data.error_message || "N/A"}`);
    }
  } catch (error) {
    console.error('Error in getCoordinates:', error.message);
    return null;
  }
}

// getCoordinates('secunderabad')
