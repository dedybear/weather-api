import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class OpenWeatherMapService {

  public iconUrl: string = 'http://openweathermap.org/img/wn/%icon%@2x.png';

  private url: string = 'https://api.openweathermap.org/data/2.5';
  private units: string = 'imperial';
  private callCurrent = 'weather';
  private call5Dat = 'forecast';
  /**
   * With any sort of URL detection or even url parameters
   * We could leverage our data service to get specific API keys based
   * on a specific user
   */
  private apiKey = 'ab709c008a4f6185e49dde6838f426db';

  constructor(private http: DataService) { }

  /**
   * getCurrentForcast
   *
   * Grabs the current forcast from the open weather ap API
   * @param lat: number | null
   * @param lon: number | null
   * @returns Observable
   */
  getCurrentForcast(lat: number | null, lon: number | null) {
    if ( lat == null || lon == null ) {
      return of('error');
    }
    return this.http.get(`${this.url}/${this.callCurrent}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${this.units}`);
  }

  /**
   * get5DayForcast
   *
   * Grabs the 5 day forcast from the open weather ap API
   * (3 hour increments)
   * @param lat: number | null
   * @param lon: number | null
   * @returns Observable
   */
  get5DayForcast(lat: number | null, lon: number | null) {
    if ( lat == null || lon == null ) {
      return of('error');
    }
    return this.http.get(`${this.url}/${this.call5Dat}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${this.units}`);
  }

}
