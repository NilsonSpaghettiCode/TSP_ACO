function initMap(lat, lon, zoom) {
    map = L.map("map", {
      center: [lat, lon],
      zoom: zoom,
    });
    return map
  }
function randomHour(min,max) {
  return (Math.random() * (max-min) + min)/3600
}
export {initMap, randomHour}