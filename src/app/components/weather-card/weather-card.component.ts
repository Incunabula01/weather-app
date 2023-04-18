import { formatDate } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { Period } from 'src/app/models/weather.model';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnChanges {
  
  @Input()
  periodData!: string;
  forecastData = <Period>{};


  ngOnChanges(): void {
    if(this.periodData){
      this.forecastData = JSON.parse(this.periodData);
    }
  }

  getTitleIcon(isDaytime: boolean) : string {
    return isDaytime ? 'sun' : 'moon';
  }

  getWeatherDataImg(): string {
    if (this.forecastData) {
      return this.forecastData.icon;
    }
    return "na"
  }

  getTime(time: string | number): string | null {
    if (this.periodData && time !== "N/A") {
      return formatDate(time, 'shortTime', 'en-US');
    }
    return null;
  }
}
