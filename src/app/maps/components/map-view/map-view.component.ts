import { Component, AfterViewInit, viewChild, ElementRef, ViewChild } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import {Map, Marker, Popup} from 'mapbox-gl';



@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css'
})
export class MapViewComponent implements AfterViewInit{

  @ViewChild('mapDiv')
  mapDivElement!:ElementRef


  constructor(
    private placesService:PlacesService,
    private mapService:MapService
  ){}


  ngAfterViewInit(): void {

    if (!this.placesService.userLocation) throw Error('No hay placeService.userLocation')

    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v9',
      projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
      zoom: 14,
      center: this.placesService.userLocation
    });

    const popup= new Popup()
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span>Estoy en este lugar del mundo</span>
        `)

        // map._addPopup(popup)

        new Marker({color:'red'})
          .setLngLat(this.placesService.userLocation)
          .setPopup(popup)
          .addTo(map)


        this.mapService.setMap(map)

  }


}
