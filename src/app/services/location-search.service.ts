import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocationSearchResults } from '../models/location-search.model';
import { Observable } from 'rxjs/internal/Observable';
import { enviroment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class LocationSearchService {
  constructor(private http: HttpClient) { }
  // Todo: Add MapBox search
  searchCity(query: string): Observable<LocationSearchResults> {
    const { apiMapboxToken, apiSearchUrl } = enviroment;
    const searchText: URLSearchParams = new URLSearchParams(query);
    const searchTypes = ['place', 'postcode', 'neighborhood'];
    const queryTypeParams = searchTypes.join(',');

    return this.http.get<LocationSearchResults>(`${apiSearchUrl}/${searchText}.json?access_token=${apiMapboxToken}&autocomplete=true&limit=8&country=us&types=${queryTypeParams}`);
  }
}
