import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationSearchResults } from '../models/location-search.model';
import { Observable } from 'rxjs/internal/Observable';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class LocationSearchService {

  constructor(private http: HttpClient) { }
  sessionToken: string = uuidv4();
  apiToken: string = "pk.eyJ1IjoiandpZGVuZXIwOCIsImEiOiJjbGd3aXc1MXgyeHJ4M2lsdW40cWs4eHQ3In0.pOdh-CWOysuqqstumtNWpg";
  types: URLSearchParams = new URLSearchParams(`city`);
  // Todo: Add MapBox search
  searchCity(query: string): Observable<LocationSearchResults> {
    const searchText: URLSearchParams = new URLSearchParams(query);
    return this.http.get<LocationSearchResults>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchText}.json?access_token=${this.apiToken}&autocomplete=true&limit=8&country=us`);
  }
}
