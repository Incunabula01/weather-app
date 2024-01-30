import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroments';
import { PositionData, LocationData } from '../models/location.model';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  static getWeatherData: any;

  constructor(private http: HttpClient) { }

  getLocation(position: PositionData): Observable<LocationData> {
    const { apiBasedUrl } = enviroment;
    const { latitude, longitude } = position;
  
    return this.http.get<LocationData>(`${apiBasedUrl}/points/${latitude},${longitude}`);
  }

  getForecast(forecastUrl: string): Observable<WeatherData>{
    return this.http.get<WeatherData>(forecastUrl);
  }
}


