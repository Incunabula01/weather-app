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


@NgModule({
  declarations: [
    AppComponent,
    WeatherCardComponent,
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
    MatButtonModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
