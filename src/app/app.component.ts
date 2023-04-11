import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { WeatherData } from './models/weather.model';
import { formatDate } from '@angular/common';

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
  weatherData = <WeatherData>{};
    
  ngOnInit(): void {
    this.weatherService.getWeatherData(this.cityName).subscribe({
      next: (res) => {
        this.weatherData = res;
        console.log("za response!!", this.weatherData);
      }
    })
   
  }

  getWeatherData(fieldName: string | number | undefined): number | string {
    if(fieldName){
      return fieldName;
    }
    return "N/A";
  }

  getWeatherDataImg(): string {
    return `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`;
  }

  getTime(time: string | number | undefined): string | null {
    if(time && typeof time !== 'string'){
      const calculateTimeZone = Math.round(this.weatherData.coord.lon / 15);
      return formatDate(time * 1000, 'shortTime', 'en-US', `UTC${calculateTimeZone}`);
    }
    return null;
  }

 
}
