import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from 'src/app/shared/core/base-api';
import { MMEvent } from '../models/event.models';

@Injectable()

export class EventServices extends BaseApi {
  constructor(public override http: HttpClient) {
    super(http);
  }

  public addEvent(event: MMEvent): Observable<MMEvent> {
    return this.post('events', event);
  }
  public getEvents(): Observable<MMEvent[]> {
    return this.get('events');
  }

  public getEventById(id:string):Observable<MMEvent>{
    return this.get(`events/${id}`)
  }
}
