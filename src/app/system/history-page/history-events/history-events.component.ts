import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Category } from '../../shared/models/category.models';
import { MMEvent } from '../../shared/models/event.models';

@Component({
  selector: 'mm-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss'],
})

export class HistoryEventsComponent implements OnInit {
@Input() categories:Category[] = []
@Input() events:MMEvent[] = []

public searchValue=''
public searchPlaceHolder='Сума'
public searchfield='amount'

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => 
    {
      e.catName = this.categories.find(c => +c.id === e.category).name
    })
  }


public  getEventClass(e:MMEvent){
    return{
      'label':true,
      'label-danger': e.type==='outcome',
      'label-success': e.type==='income'
    }
  }


public  changeCriteria(field:string){
    const namesMap = {
      amount:'Сума',
      date:'Дата',
      category:'Категорія',
      type:'Тип'
    }
    this.searchPlaceHolder = namesMap[field]
    this.searchfield = field
  }

}
