import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../../shared/models/category.models';

@Component({
  selector: 'mm-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {
@Output() onFilterCancel = new EventEmitter<any>;
@Output() onFilterApply = new EventEmitter<any>;
@Input() categories: Category[] = []

  public timePeriods = [
    {type:'d',label:'День'},
    {type:'w',label:'Неділя'},    
    {type:'M',label:'Місяць'}
  ]
  public selectedPeriod:string ='d'
  public selectedTypes: any[] = []
  public selectedCategories: any[] = []
  public types = [
    {
      type:'income',
      label:'Дохід'
    }
    ,
    {
      type:'outcome',
      label:'Витрати'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

  public closeFilter(){
    this.selectedCategories = []
    this.selectedPeriod = 'd'
    this.onFilterCancel.emit()
  }


public handleChangeType(event)
  {
  
    const value:string = event.target
    const checked:boolean = event.target

    if(checked){
      this.selectedTypes.indexOf(value) === -1 ? this.selectedTypes.push(value) : null
    }
      this.selectedTypes = this.selectedTypes.filter(i=> i !== value) 
  }

  public handleChangeCategory(event){

    const value:string = event.target
    const checked:boolean = event.target 

    if(checked){
      this.selectedCategories.indexOf(value) === -1 ? this.selectedCategories.push(value) : null
    }
      this.selectedCategories = this.selectedCategories.filter(i=> i !== value)       
  }

  public applyFilter(){
    this.onFilterApply.emit({
      types:this.selectedTypes,
      categories:this.selectedCategories,
      period:this.selectedPeriod
    })
  }

}
