import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = 'pk.eyJ1IjoiYXJub2xkYmFjYSIsImEiOiJjbTAxb2Z2d3cxZzRhMm5vcWh1bmo0MDhjIn0._PnY7vxxQe4PfOTr_-90LA'


platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true
})
  .catch(err => console.error(err));

  if (!navigator.geolocation) {
    alert('Navegador no soporta la Geolocalización')
     console.error( "Navegador no soporta la Geolocation");

  }
