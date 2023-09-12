class Coordinate {
    constructor(latitude, longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    getLongitude() {
        return this.longitude;
    }

    getLatitude() {
        return this.latitude;
    }
}

export {Coordinate}