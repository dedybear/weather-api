export class AppError {
  constructor(public originalError ?: any) {}

  public getError() {
    return 'An unexpected error has occurred';
  }
}
