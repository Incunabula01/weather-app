import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { PositionData } from './models/location.model';
import { WeatherData } from './models/weather.model';
import { LocationData } from './models/location.model';

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
  currentLocation = '';
  positionData = <PositionData>{};
  weatherData = <Array<string>>[];
  periodData = '';
  backgroundColor = '';
  
  
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      const positionData = {
        'latitude': position.coords.latitude,
        'longitude': position.coords.longitude
      }
      // Get Location Data
      this.weatherService.getLocation(positionData).subscribe({
        next: (res: LocationData) => {
          const { forecast, relativeLocation } = res.properties;
          const forecastUrl = forecast;
          this.currentLocation = `${relativeLocation.properties.city}, ${relativeLocation.properties.state}`;
          // Get Forecast Data from Location
          this.weatherService.getForecast(forecastUrl).subscribe({
            next: (res: WeatherData) => {
              this.backgroundColor = res.properties.periods[0].isDaytime ? 'light' : 'dark';
              const weekForecast = res.properties.periods.map(item => {
                const { temperatureUnit, dewpoint, probabilityOfPrecipitation } = item;
                return JSON.stringify({
                  ...item,
                  chanceOfRain: probabilityOfPrecipitation.value ? `${probabilityOfPrecipitation.value}%` : `0%`,
                  dewPoint: temperatureUnit === 'F' ?
                    Math.round(dewpoint.value * 9.0 / 5.0 + 32) : Math.round(dewpoint.value)
                })
              })
              this.weatherData = weekForecast;
              console.log("forecast!", this.weatherData);
            }
          });
        }
      });
    });
  }

  get getCurrentLocation(){
    return this.currentLocation.length > 0;
  }

  get getForecast(){
    return this.weatherData.length > 0;
  }
 
}
