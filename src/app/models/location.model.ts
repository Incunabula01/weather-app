export interface LocationData {
    properties: Properties
    geometry: Geometry2
    id: string
}

export interface Properties {
    cwa: string
    gridX: number
    gridY: number
    forecast: string
    forecastHourly: string
    forecastGridData: string
    observationStations: string
    relativeLocation: RelativeLocation
    forecastZone: string
    county: string
    fireWeatherZone: string
    timeZone: string
    radarStation: string
}

export interface RelativeLocation {
    type: string
    geometry: Geometry
    properties: Properties2
}

export interface Geometry {
    type: string
    coordinates: number[]
}

export interface Properties2 {
    city: string
    state: string
    distance: Distance
    bearing: Bearing
}

export interface Distance {
    value: number
    unitCode: string
}

export interface Bearing {
    value: number
    unitCode: string
}

export interface Geometry2 {
    type: string
    coordinates: number[]
}

export type PositionData = {
    latitude: number;
    longitude: number
};