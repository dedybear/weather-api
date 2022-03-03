import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeolocationService, OpenWeatherMapService, SubscriptionService } from '../services';

@Component({
  selector: 'app-five-day',
  templateUrl: './five-day.component.html',
  styleUrls: ['./five-day.component.scss']
})
export class FiveDayComponent implements OnInit, OnDestroy {

  public daily: any = {};
  public dailyMap: Array<string> = [];
  public name = '';
  private subscriptions: Subscription[] = [];

  constructor(
    private weather: OpenWeatherMapService,
    private subscriber: SubscriptionService) {
      this.subscriptions = this.subscriber.getSubscriber();
  }

  ngOnInit(): void {
    this.subscriptions[0] = this.weather.get5DayForcast(GeolocationService.latitude, GeolocationService.longitude).subscribe((res: any)=>{
      if ( 'name' in res ) {
        this.name = res['name'];
      }
      if ( 'list' in res ) {
        for ( let item of res['list']) {
          let dtBreak = item['dt_txt'].split(' ');
          let exists = this.dailyMap.indexOf(dtBreak[0]);
          if (  exists == -1 ) {
            if ( this.dailyMap.length == 5 ) {
              break;
            }
            this.dailyMap.push(dtBreak[0]);
            exists =  (this.dailyMap.length-1);
            this.daily[exists] = [];
          }
          this.daily[exists].push(item);
        }
      }
    });
  }

  ngOnDestroy() {
    this.subscriber.clean(this.subscriptions);
  }

}
