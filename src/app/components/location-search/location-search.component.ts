import { Component,  EventEmitter,  Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, of } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LocationSearchResults, LatLongArray, LatLong } from 'src/app/models/location-search.model';
import { LocationSearchService } from 'src/app/services/location-search.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss']
})
export class LocationSearchComponent {

  searchControl = new FormControl();

  locationQuery: string = '';
  options: string[] = [];
  filteredOptions: Observable<string[]> = of([]);
  locationResults: LatLongArray = [];

  @Output()
  selectedResult = new EventEmitter<LatLong>;

  constructor(
    private locationService: LocationSearchService
  ) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(' '),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );
  }

  search(event: Event): void {
    const target = (event.target as HTMLInputElement).value;

    if(target.length > 3){
      this.locationService.searchCity(target).subscribe({
        next: (data: LocationSearchResults) => {
          if (data.features.length > 0) {
            const { features } = data;
            this.locationResults = features.map(item => {
              return {
                latitude: Number(item.center[1]),
                longitude: Number(item.center[0]),
                locationName: item.place_name
              }
            });
            
            this.options = features.map(item => item.place_name);
           

          } else {
            console.error(`No results found for ${this.locationQuery}`);
          }
        }

      });
    } 
    
  }
  
  private _filter(name: string): string[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  displayFn(option: any): string {
    return option && option.locationName ? option.locationName : '';
  }


  onSelectOption(event: MatAutocompleteSelectedEvent): void {
    const filteredOption = this.locationResults.filter(result => result.locationName === event.option.value);
    
    if (filteredOption.length > 0) {
      this.selectedResult.emit(filteredOption[0]);
    }
  }
  
}
