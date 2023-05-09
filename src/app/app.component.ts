import { Component, HostListener, OnChanges, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';
import { PositionData, LocationData } from './models/location.model';
import { LatLong } from './models/location-search.model';
import { WeatherData } from './models/weather.model';

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
  isMobile: boolean = false;
  isAccordionExpanded: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: number; }; }) {
    if (event.target.innerWidth <= 600) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  toggleAccordion(){
    this.isAccordionExpanded = !this.isAccordionExpanded;
  }
  
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
      this.positionData = {
        'latitude': position.coords.latitude,
        'longitude': position.coords.longitude
      }
      this.getLocationForecast(this.positionData);
    });
  }

  onItemSelected(event: LatLong){
    this.positionData = {
      'latitude': event.latitude,
      'longitude': event.longitude
    }
    this.getLocationForecast(this.positionData);
    if(this.isMobile){
      this.toggleAccordion()
    }
  }

  get getCurrentLocation(){
    return this.currentLocation.length > 0;
  }

  get getForecast(){
    return this.weatherData.length > 0;
  }

  get getMobileMenu(){
    return this.isMobile;
  }
  
  getLocationForecast(location: PositionData){
    // Get Location Data
    this.weatherService.getLocation(location).subscribe({
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
          }
        });
      }
    });
  }
}
