import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss'],
})
export class CurrencyCardComponent {
  @Input() currency: any;
  public currencies: string[] = ['USD', 'EUR'];
}
