export const getLocationName = async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error("Error fetching location name:", error);
      return null;
    }
  }
  