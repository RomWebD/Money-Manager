import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventServices } from '../shared/services/events.service';
import {forkJoin, Subscription} from 'rxjs'
import { Category } from '../shared/models/category.models';
import { MMEvent } from '../shared/models/event.models';
import * as moment from 'moment';


@Component({
  selector: 'mm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  public categories: Category [] = []
  private events: MMEvent[] = []
  public filteredEvents: MMEvent[] = []
  public isLoaded: boolean = false
  public chartData: any[] = []
  public subscr1 : Subscription
  public isFilterVisible: boolean = false

  constructor(
      private categoriesService:CategoriesService,
      private eventService:EventServices
    ) { }

  ngOnInit() {
    this.subscr1 =  
    forkJoin([this.categoriesService.getCategories(),
    this.eventService.getEvents()])
    .subscribe((data:[Category[],MMEvent[]]) =>
    {
      this.categories = data[0]
      this.events = data[1]
      this.setOriginalEvents()
      this.calculateChartData()
      this.isLoaded = true
      
    })
  }
  
  private setOriginalEvents(){
    this.filteredEvents = [...this.events]
  }


  public calculateChartData(): void{
    this.chartData =
    this.categories
    .map((cat)=>{
      const catEvent = this.filteredEvents
      .filter(e =>
        e.category.toString() === cat.id.toString() && e.type === 'outcome')        
          return {
          name : cat.name,
          value : catEvent.reduce((total,e)=>
          {
            total += e.amount
            return total
          }, 0)} 
    })

  }

    private toggleFilterVisability(dir:boolean){
      this.isFilterVisible = dir
    }


  openFilter(){
    this.toggleFilterVisability(true)
  }

  
  public onFilterApply(filterData){    
    this.toggleFilterVisability(false)
    this.setOriginalEvents()
    const startPeriod = moment()
    .startOf(filterData.period).startOf('d')
    const endPeriod = moment()
    .endOf(filterData.period)
    .endOf('d')

    const filtered = this.filteredEvents
    .filter((e)=>{
      const momentDate = moment(e.date,'DD.MM.YYYY HH:mm:ss')
      return filterData.types.includes(e.type) || filterData.categories.includes(e.category.toString()) || momentDate.isBetween(startPeriod,endPeriod)
    })
    
    this.filteredEvents = filtered
    this.calculateChartData()
  }


  public onFilterCancel(){
    this.toggleFilterVisability(false)
    this.setOriginalEvents()
    this.calculateChartData()
  }


  ngOnDestroy() {
    if(this.subscr1)
    this.subscr1.unsubscribe()
  }

}
