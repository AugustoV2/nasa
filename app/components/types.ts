// types.ts
export interface Geometry {
    lat: number;
    lng: number;
}

export interface Result {
    formatted: string; // Adjust based on the actual response structure
    geometry: Geometry;
}

export interface LocationData {
    results: Result[];
}
