/**
 * Const eart radius
 */
const R = 6371;

class geomath {
  constructor() {}

  static toRadians(value) {
    return value * (Math.PI / 180);
  }

  /**
   *
   * @param {*} coordenada
   * @returns
   */
  static haversine(coordenada_A, coordenada_B) {
    let Lat1 = this.toRadians(coordenada_A.getLatitude());
    let Lon1 = this.toRadians(coordenada_A.getLongitude());

    let Lat2 = this.toRadians(coordenada_B.getLatitude());
    let Lon2 = this.toRadians(coordenada_B.getLongitude());

    let d = 0;
    let lats_2 = (Lat2 - Lat1) / 2;
    let lons_2 = (Lon2 - Lon1) / 2;

    let sin2_lats = Math.pow(Math.sin(lats_2), 2);
    let sin2_lons = Math.pow(Math.sin(lons_2), 2);

    let cosL1 = Math.cos(Lat1);
    let costL2 = Math.cos(Lat2);

    let value_right = cosL1 * costL2 * sin2_lons;
    let intern_add = sin2_lats + value_right;

    let sqrt = Math.sqrt(intern_add);
    let arcsin = Math.asin(sqrt);

    let r2 = 2*R;

    d = r2 * arcsin;
    return d;
  }
}

export { geomath, R };
