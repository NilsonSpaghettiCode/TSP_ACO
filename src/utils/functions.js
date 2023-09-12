function initMap(lat, lon, zoom) {
    map = L.map("map", {
      center: [lat, lon],
      zoom: zoom,
    });
    return map
  }

export {initMap}