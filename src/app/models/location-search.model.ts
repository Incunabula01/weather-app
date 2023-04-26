export interface LocationSearchResults {
    type: string
    query: string[]
    features: Feature[]
    attribution: string
}

export interface Feature {
    id: string
    type: string
    place_type: string[]
    relevance: number
    properties: Properties
    text: string
    place_name: string
    bbox: number[]
    center: number[]
    geometry: Geometry
    context: Context[]
}

export interface Properties {
    mapbox_id: string
    wikidata?: string
}

export interface Geometry {
    type: string
    coordinates: number[]
}

export interface Context {
    id: string
    mapbox_id: string
    text: string
    wikidata?: string
    short_code?: string
}


export type LatLongArray = LatLong[];

export interface LatLong {
    [x: string]: any
    latitude: number;
    longitude: number;
    locationName: string;
}