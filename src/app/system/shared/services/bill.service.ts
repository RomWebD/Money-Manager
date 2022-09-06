import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from 'src/app/shared/core/base-api';
import { Bill } from '../models/bill.model';

@Injectable()

export class BillService extends BaseApi {
  constructor(public override http: HttpClient) {
    super(http);
  }

  public getBill(): Observable<Bill> {
    return this.get('bill');
  }
  public updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }

  public getCurrency(base: string = 'UAH'): Observable<any> {
    return this.http.get(`https://api.exchangerate.host/latest?base=${base}`);
  }
}

