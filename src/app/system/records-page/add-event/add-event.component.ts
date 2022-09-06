import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { Category } from '../../shared/models/category.models';
import { MMEvent } from '../../shared/models/event.models';
import * as moment from 'moment';
import { EventServices } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from 'src/app/shared/models/message.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'mm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categories: Category[] = [];

  constructor(
    private eventsService: EventServices,
    private billServise: BillService
  ) {}

  public types = [
    { type: 'income', label: 'Дохід' },
    { type: 'outcome', label: 'Витрати' },
  ];
  
  public message: Message;
  private sub1: Subscription;
  private sub2: Subscription;

  ngOnInit() {
    this.message = new Message(`danger`, '');
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => (this.message.text = ''), 5000);
  }

  public onSubmit(form: NgForm) {
    let { amount, description, category, type } = form.value;
    if (amount < 0) amount *= -1;

    const event = new MMEvent(
      type,
      amount,
      +category,
      moment().format('DD.MM.YYYY HH:mm:ss'),
      description
    );

    this.sub1 = this.billServise.getBill().subscribe((bill: Bill) => {
      let value = 0;
      if (type === 'outcome') {
        if (amount > bill.value) {
          this.showMessage(
            `На рахунку недостатньо коштів. Вам не вистачає: ${
              amount - bill.value
            } UAH`
          );
          return;
        } else {
          value = bill.value - amount;
        }
      } else {
        value = bill.value + amount;
      }

      this.sub2 = this.billServise
        .updateBill({ value, currency: bill.currency })
        .pipe(mergeMap(() => this.eventsService.addEvent(event)))
        .subscribe(() => {
          form.setValue({
            amount: 0,
            description: ' ',
            category: 1,
            type: 'outcome',
          });
        });
    });
  }


  ngOnDestroy() {
    if(this.sub1) this.sub1.unsubscribe()    
    if(this.sub2) this.sub2.unsubscribe()
  }
}
