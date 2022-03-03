import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Material Buttons & Indicators
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

// Material Form Controls
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DataService, ErrorNotificationService, GeolocationService, OpenWeatherMapService, SubscriptionService } from './services';

// Material Popups & Modals
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { AppComponent } from './app.component';
import { CurrentComponent } from './current/current.component';
import { FiveDayComponent } from './five-day/five-day.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LocationComponent } from './location/location.component';
import { OneDayComponent } from './one-day/one-day.component';
import { OneDaySectionComponent } from './one-day-section/one-day-section.component';
import { RainCheckComponent } from './rain-check/rain-check.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentComponent,
    FiveDayComponent,
    NotFoundComponent,
    LocationComponent,
    OneDayComponent,
    OneDaySectionComponent,
    RainCheckComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    DataService,
    ErrorNotificationService,
    GeolocationService,
    OpenWeatherMapService,
    SubscriptionService
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }
