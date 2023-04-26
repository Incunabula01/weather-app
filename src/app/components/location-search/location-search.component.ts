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


  locationQuery!: string;
  options: string[] = [];
  filteredOptions!: Observable<string[]>;

  searchControl = new FormControl();

  @Output()
  selectedResult = new EventEmitter<LatLong>;


  locationResults: LatLongArray = [];

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

    console.log("query", target);
    if(target.length > 3){
      this.locationService.searchCity(target).subscribe({
        next: (data: LocationSearchResults) => {
          if (data.features.length > 0) {
            const { features } = data;
            console.log('response', features);
            this.locationResults = features.map(item => {
              return {
                latitude: Number(item.center[1]),
                longitude: Number(item.center[0]),
                locationName: item.place_name
              }
            });
            console.log("locationResults", this.locationResults);
            this.options = features.map(item => item.place_name);
            console.log("options", this.options);

          } else {
            console.log(`No results found for ${this.locationQuery}`);
          }
        }

      });
    } 
    
  }
  
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  displayFn(option: any): string {
    return option && option.display_name ? option.display_name : '';
  }

  onSelectOption(event: MatAutocompleteSelectedEvent): void {
    const filteredOption = this.locationResults.filter(result => result.locationName === event.option.value);
    console.log('filtered options', filteredOption);
    this.selectedResult.emit(filteredOption[0]);
  }
  
}
