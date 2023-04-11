import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroments';
import { WeatherData } from '../models/weather.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  static getWeatherData: any;

  constructor(private http: HttpClient) { }

  getWeatherData(cityName: string): Observable<WeatherData>{
    const { apiBasedUrl, XRapidAPIHeaderValue, XRapidAPIHostHeaderName, XRapidAPIKeyHeaderName, XRapidAPIKeyHeaderValue } = enviroment;
    const options = {
      headers: {
        [XRapidAPIHostHeaderName]: XRapidAPIHeaderValue,
        [XRapidAPIKeyHeaderName]: XRapidAPIKeyHeaderValue
      }
    };
    return this.http.get<WeatherData>(`${apiBasedUrl}/city/${cityName}`, options);
   
  }
}


