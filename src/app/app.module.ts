import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule} from "@angular/common/http";
import { WeatherService } from './services/weather.service';
import { IconSpriteModule } from 'ng-svg-icon-sprite';
import { WeatherCardComponent } from './components/weather-card/weather-card.component';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { LocationSearchService } from './services/location-search.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
    LocationSearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    IconSpriteModule,
    IconSpriteModule.forRoot({ path: 'assets/sprites/sprite.svg' }),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [WeatherService, LocationSearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
