import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeolocationService, OpenWeatherMapService, SubscriptionService } from '../services';

@Component({
  selector: 'app-rain-check',
  templateUrl: './rain-check.component.html',
  styleUrls: ['./rain-check.component.scss']
})
export class RainCheckComponent implements OnInit, OnDestroy {

  public bringUmbrella = false;
  public name = '';
  public rainCheck = 'rain';
  private subscriptions: Subscription[] = [];

  constructor(
    private weather: OpenWeatherMapService,
    private subscriber: SubscriptionService) {
      this.subscriptions = this.subscriber.getSubscriber();
    }

  ngOnInit(): void {

    this.subscriptions[0] = this.weather.getCurrentForcast(GeolocationService.latitude, GeolocationService.longitude)
      .subscribe((res: any)=>{
        for ( let i = 0; i < res['weather'].length; i++ ) {
          this.name = res['weather'][i]['main'].toLowerCase();
          this.name = this.rainCheck;
          if ( this.name === this.rainCheck ) {
            this.bringUmbrella = true;
          }
        }
    });
  }

  ngOnDestroy() {
    this.subscriber.clean(this.subscriptions);
  }

}
