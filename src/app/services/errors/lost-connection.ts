import { AppError } from './app-error';

export class LostConnection extends AppError {
  constructor(public override originalError ?: any) {
    super(originalError);
  }

  public override getError() {
    return 'Your connection has been lost. ' +
      'Will try to reconnect every 30 seconds.';
  }
}
