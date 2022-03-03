/**
 * Util class is created to group reusable functions
 */
export class Util {

  /**
   * padd
   *
   * This function is designed to return a string with a fixed length padded to the front.
   * Used in this app generally for padding dates and times with "0"s forcing them to a certain
   * appearance
   * @param toPadd: string
   * @param paddWith: string
   * @param paddLength: number
   * @returns string
   */
  static padd(toPadd: string, paddWith: string = '0', paddLength: number = 2): string {
    let left = '';
    for ( let i = 0; i < paddLength; i++ ) {
      left += paddWith;
    }
    const padded = left + toPadd;
    return padded.substring((padded.length - paddLength), padded.length);
  }

  /**
   * getReadableTime
   *
   * This function is built to take a standard SQL date time and extract the time
   * into a readable format.
   *
   * @param date: string
   * @returns string
   */
  static getReadableTime(date: string): string {
    const d = new Date(date);
    let hour = d.getHours();
    const ap = ( hour > 11 ) ? 'pm' :'am';

    if ( hour > 12 ) {
      hour -= 12;
    } else if ( hour == 0 ) {
      hour = 12;
    }

    return hour.toString() + ':' + Util.padd(d.getMinutes().toString(), '0', 2) + ' ' + ap;
  }

}
