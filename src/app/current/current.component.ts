import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeolocationService, SubscriptionService } from '../services';
import { OpenWeatherMapService } from '../services/open-weather-map.service';
import { Util } from '../utilities/util';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit, OnDestroy {

  public date = '';
  public icon = '';
  public name = '';
  public feelsLike: number | null = null;
  public humidity: number | null = null;
  public pressure: number | null = null;
  public temp: number | null = null;
  public tempMax: number | null = null;
  public tempMin: number | null = null;
  public weatherLabel = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private weather: OpenWeatherMapService,
    private subscriber: SubscriptionService) {
      this.subscriptions = this.subscriber.getSubscriber();
  }

  ngOnInit(): void {
    const d = new Date();

    this.date = d.getFullYear() + '-' + Util.padd((d.getMonth()+1).toString(), '0', 2) + '-' + Util.padd(d.getDay().toString(), '0', 2);

    this.subscriptions[0] = this.weather.getCurrentForcast(GeolocationService.latitude, GeolocationService.longitude).subscribe((res: any)=>{
      if ( 'weather' in res && res['weather'].length ) {
        this.icon = this.weather.iconUrl.replace('%icon%', res['weather'][0].icon);
        this.weatherLabel = res['weather'][0].main;
      }
      if ( 'name' in res ) {
        this.name = res['name'];
      }
      if ( 'main' in res ) {
        this.feelsLike = res['main'].feels_like;
        this.humidity = res['main'].humidity;
        this.pressure = res['main'].pressure;
        this.temp = res['main'].temp;
        this.tempMax = res['main'].temp_max;
        this.tempMin = res['main'].temp_min;
      }

      if ( 'name' in res ) {
        this.name = res['name'];
      }
    });
  }

  ngOnDestroy() {
    this.subscriber.clean(this.subscriptions);
  }

}
