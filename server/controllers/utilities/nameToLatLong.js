import axios from 'axios';

export const  getCoordinates = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Ensure you have set your API key in environment variables
  const encodedAddress = encodeURIComponent(address);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

  const response = await axios.get(url);
//   console.log(response.data);
  const location = response.data.results[0].geometry.location;

  return [location.lat, location.lng]; // Return coordinates in [longitude, latitude] format
}