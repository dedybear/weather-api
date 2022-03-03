import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeolocationService } from '../services';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  public locationForm: FormGroup = this.fb.group({});
  public postalCode = 49684;
  public isLocationFound = false;

  constructor(
    private geolocationService: GeolocationService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.geolocationService.getLocation().then(coords => {
      this.isLocationFound = true;
    },
    error => {
      this.isLocationFound = false;
    });

    this.locationForm = this.fb.group({
      postal_code: [this.postalCode, Validators.required]
    });
  }

  addZipCode() {
    alert('For this example, I am assuming the browser actually found your location.');
  }



}
