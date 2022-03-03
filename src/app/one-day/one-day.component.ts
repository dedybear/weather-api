import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-one-day',
  templateUrl: './one-day.component.html',
  styleUrls: ['./one-day.component.scss']
})
export class OneDayComponent implements OnInit {
  @Input() date: string = '';
  @Input() data: Array<any> = [];

  constructor() { }

  ngOnInit(): void {
  }

}
