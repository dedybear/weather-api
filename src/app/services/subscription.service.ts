import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

/**
 * SubscriptionService
 * I have found that when working with Observables throughout an application
 * it is nice to create a single means of collecting and cleaning up remnant observables
 * that occupy memory.
 *
 * (garbage cleanup)
 */
@Injectable()
export class SubscriptionService {
  public data: any = {};
  private uniqueIdName: string = '__guid';

  constructor() {
  }

  public getSubscriber(): Subscription[] {
    let guid: string = this.guid();
    while ( !this._isUnique(guid) ) {
      guid = this.guid();
    }
    this.data[guid] = [];
    this.data[guid][this.uniqueIdName] = guid;
    return this.data[guid];
  }

  public cleanAll() {
    for ( const usedId of Object.keys(this.data)) {
      this.unSubscribeFor(usedId);
    }
    this.data = [];
  }

  public clean(subscriptions: any) {
    if ( subscriptions[this.uniqueIdName] !== undefined ) {
      this.unSubscribeFor(subscriptions[this.uniqueIdName]);
    }
    subscriptions = [];
  }

  private unSubscribeFor(guid: string) {
    if ( this.data[guid] !== undefined &&
      this.data[guid][this.uniqueIdName] !== undefined ) {
      for ( const usedId of Object.keys(this.data[guid]) ) {
        if (this.data[guid][usedId]) {
          if ( typeof this.data[guid][usedId]  === 'object' ) {
            this.data[guid][usedId].unsubscribe();
          }
          this.data[guid][usedId] = '';
          delete this.data[guid][usedId];
        }
      }
      this.data[guid] = [];
      delete this.data[guid];
    }
  }
  private _isUnique(guid: string): boolean {
    let temp = '|';
    let isUnique = false;
    for ( const usedId of Object.keys(this.data)) {
      temp += usedId + '|';
    }
    isUnique = (temp.indexOf('|' + guid + '|') === -1);
    temp = '';
    return isUnique;
  }

  public guid(): string {
    return this.s4() + this.s4() + '-' +
      this.s4() + '-' + this.s4() + '-' + this.s4() +
      '-' + this.s4() + this.s4() + this.s4();
  }

  public s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

}
