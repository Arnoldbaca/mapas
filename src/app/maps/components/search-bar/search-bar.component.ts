import { Component } from '@angular/core';
import { debounceTime } from 'rxjs';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})

export class SearchBarComponent {

  debounceTimer?: NodeJS.Timeout

constructor(
  private placesService: PlacesService
){}

onQueryChanged(query:string = ''){

  if (this.debounceTimer) clearTimeout(this.debounceTimer)

  this.debounceTimer=setTimeout(() => {
    this.placesService.getPlacesByQuery(query)
  }, 350);



}

}
