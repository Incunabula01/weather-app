import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { PositionData } from './models/location.model';
import { WeatherData, Period } from './models/weather.model';
import { formatDate } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
      <svg-icon iconName={{icon}} class="icon"></svg-icon>
  `
})
export class AppComponent implements OnInit {
  constructor(
    private weatherService: WeatherService
  ){}
  
  title = 'weather-app';
  cityName = 'Baltimore';
  positionData = <PositionData>{};
  weatherData = <Period>{};
  
  get getWeatherData(){
    if (Object.keys(this.weatherData).length > 0){
      return true;
    }
    return false;
  }
  
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      const positionData = {
        'latitude': position.coords.latitude,
        'longitude': position.coords.longitude
      }
      // Get Location Data
      this.weatherService.getLocation(positionData).subscribe({
        next: (res) => {
          const forecastUrl = res.properties.forecast;
          // Get Forecast Data from Location
          this.weatherService.getForecast(forecastUrl).subscribe({
            next: (res: WeatherData) => {
              const { temperatureUnit, dewpoint, probabilityOfPrecipitation } = res.properties.periods[0];
              this.weatherData = {
                ...res.properties.periods[0],
                chanceOfRain: probabilityOfPrecipitation.value ? `${probabilityOfPrecipitation.value}%` : `0%`,
                dewPoint: temperatureUnit === 'F' ? 
                  Math.round(dewpoint.value * 9.0 / 5.0 + 32) : Math.round(dewpoint.value)
              }
              console.log("forecast!", this.weatherData);
            }
          });
        }
      });
    });
  }

  getFieldData(fieldName: string | number | undefined): number | string {
    if(fieldName){
      return fieldName;
    }
    return "N/A";
  }

  getWeatherDataImg(): string {
    if(this.weatherData){
      return this.weatherData.icon;
    }
    return "na"
  }

  getTime(time: string | number): string | null {
    if (this.weatherData && time !== "N/A"){
      return formatDate(time, 'shortTime', 'en-US');
    }
    return null;
  }

 
}
