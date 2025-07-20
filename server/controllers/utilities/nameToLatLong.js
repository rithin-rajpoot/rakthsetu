export const getCoordinates = async (locationName) => {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationName)}&format=json&limit=1`,
            {
                headers: {
                    'User-Agent': 'UberForBlood/1.0 (rithinrajpoot@gmail.com)', // ← required!
                }
            }
        );

        const data = await response.json();

        if (data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            return [lat, lon];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        return null;
    }
};
