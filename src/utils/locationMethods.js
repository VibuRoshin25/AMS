const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const isWithinRadius = async () => {
  const targetLoc = {
    lat: 13.044737398720983,
    lon: 80.23858444201912,
    radius: 500,
  };
  const position = await getCurrentPosition();
  const { latitude: currentLat, longitude: currentLon } = position.coords;

  const toRad = (value) => (value * Math.PI) / 180;
  const R = 6371e3;
  const dLat = toRad(targetLoc.lat - currentLat);
  const dLon = toRad(targetLoc.lon - currentLon);
  const lat1 = toRad(currentLat);
  const lat2 = toRad(targetLoc.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance <= targetLoc.radius;
};
