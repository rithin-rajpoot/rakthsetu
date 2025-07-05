export const getSeekerCoords = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const seekerLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        resolve(seekerLocation);
      },
      (error) => {
        reject(error);
      }
    );
  });
};