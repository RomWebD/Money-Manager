import { Component, OnDestroy, OnInit } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventServices } from '../shared/services/events.service';
import {  forkJoin, Subscription } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.models';
import { MMEvent } from '../shared/models/event.models';

@Component({
  selector: 'mm-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss'],
})

export class PlanningPageComponent implements OnInit, OnDestroy {
  public isLoaded = false;
  private sub1: Subscription;
  public bill: Bill;
  public categories: Category[] = [];
  public events: MMEvent[] = [];

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventServices
  ) {}

ngOnInit() {
    this.sub1 = forkJoin([
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents(),
    ]).subscribe((data: [Bill, Category[], MMEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    });
  }

public getCategoryCost(category:Category):number{
    const categoryEvents = this.events.filter((event)=>
    event.category.toString() === category.id.toString() && event.type ==='outcome')
    return categoryEvents.reduce((total,event)=>{
      total+=event.amount
      return total
    },0)
  }
  
  private getPercent(category:Category):number{
    const percent=(100 * this.getCategoryCost(category))/category.capacity 
    return percent >100 ? 100: percent
  
  }

public getCategoryPercent(category:Category):string{
    return this.getPercent(category) + '%'
  }

public getCategoryColorClass(category:Category):string{
  
    const percent = this.getPercent(category)

      return percent < 60 
      ? 'success': percent >= 100 
      ? 'danger':'warning'
  
  }

ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }
}
