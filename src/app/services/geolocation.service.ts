import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  static latitude: number | null = null;
  static longitude: number | null = null;

  options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };

  constructor() { }

  /**
   * getLocation()
   *
   * This method checks the browser to identify your current location
   * @returns promise
   */
  getLocation() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          if ( !('coords' in position) ) {
            reject('no-coordinates-returned');
          }
          GeolocationService.latitude = position.coords.latitude;
          GeolocationService.longitude = position.coords.longitude;
          resolve({
            lat: GeolocationService.latitude,
            lon: GeolocationService.longitude
          });
        },
        (err => {
          reject('error');
        }),
        this.options);
    });

  }
}
