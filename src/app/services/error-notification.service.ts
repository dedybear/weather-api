import { Injectable, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorNotificationService {
  public static SEVERITY_HIGH = 3;
  public static SEVERITY_MEDIUM = 2;
  public static SEVERITY_LOW = 1;

  @Output('error') public error: EventEmitter<any> = new EventEmitter();

  constructor(private snackbar: MatSnackBar ) { }

  public clearNotification() {
    this.error.emit({
      message: ''
    });
  }

  public notify(msg: string, severity ?: number) {
    severity = ( severity ) ? severity : ErrorNotificationService.SEVERITY_LOW;

    switch ( severity ) {
      case ErrorNotificationService.SEVERITY_HIGH:
        this.error.emit({
          message: msg
        });
        return null;
      case ErrorNotificationService.SEVERITY_MEDIUM:
        return this.snackbar.open(msg, 'Close');
      default:
        return this.snackbar.open(msg, 'Close', {duration: 1500});
    }
  }
}
