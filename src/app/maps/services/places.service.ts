import { Injectable } from '@angular/core';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  // public useLocation:[number,number] | undefined
  public userLocation?:[number,number]
  public isLoadingPlaces:boolean=false
  public places:Feature[]=[]


  get isUserLocationReady():boolean{
    return !!this.userLocation
  }

  constructor(
    private placesApi:PlacesApiClient,
    private mapService: MapService
  ) {
    this.getUserLocation()
  }


  public async getUserLocation(): Promise<[number,number]>{
    return new Promise((resolve, reject)=>{

      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          this.userLocation=[coords.longitude,coords.latitude]
          resolve(this.userLocation)
        },
        (err) => {
          alert('No se pudo obtener la geolocalizacion')
          console.log(err)
          reject()
        }
      )

    })
  }

  getPlacesByQuery(query:string=''){
    //todo: Evaluar cuando el query esté vacio o nulo

    if (query.length===0){
      this.isLoadingPlaces=false
      this.places=[]
      return
    }


    if(!this.userLocation) throw Error('No hay userLocation')
    this.isLoadingPlaces=true

    this.placesApi.get<PlacesResponse>(`/forward`,{
      params: {
        q:query,
        proximity: this.userLocation.join(',')
      }
    })
    .subscribe(resp => {

      this.isLoadingPlaces=false
      this.places=resp.features
      this.mapService.createMarkersFromPlaces(this.places,this.userLocation!)
    })

  }

  deletePlaces(){
    this.places=[]
  }


}
