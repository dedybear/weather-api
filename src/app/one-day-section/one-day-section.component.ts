import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { OpenWeatherMapService } from '../services';
import { Util } from '../utilities/util';

@Component({
  selector: 'app-one-day-section',
  templateUrl: './one-day-section.component.html',
  styleUrls: ['./one-day-section.component.scss']
})
export class OneDaySectionComponent implements OnInit {
  @Input() section: any = {};
  public icon = '';
  public temp: number | null = null;
  public weatherLabel = '';
  public time = '';

  constructor(
    private weather: OpenWeatherMapService) {
    }

  ngOnInit(): void {
    this.parseSection(this.section);

  }

  ngOnChanges(changes: SimpleChanges) {
    this.parseSection(changes.section.currentValue);
  }

  parseSection(sect: any) {
    if ( 'dt_txt' in sect ) {
      this.time = Util.getReadableTime(sect['dt_txt']);
    }
    if ( 'weather' in sect && sect['weather'].length ) {
      this.icon = this.weather.iconUrl.replace('%icon%', sect['weather'][0].icon);
      this.weatherLabel = sect['weather'][0].main;
    }
    if ( 'main' in sect ) {
      this.temp = sect['main'].temp;
    }
  }

}
