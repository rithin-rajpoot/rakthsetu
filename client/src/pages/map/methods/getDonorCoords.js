
export const getDonorCoords = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const donorLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        resolve(donorLocation);
      },
      (error) => {
        reject(error);
      }
    );
  });
};