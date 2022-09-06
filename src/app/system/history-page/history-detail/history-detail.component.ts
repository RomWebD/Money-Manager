import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoriesService } from '../../shared/services/categories.service';
import { EventServices } from '../../shared/services/events.service';
import { mergeMap, Subscription } from 'rxjs';
import { MMEvent } from '../../shared/models/event.models';
import { Category } from '../../shared/models/category.models';

@Component({
  selector: 'mm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})

export class HistoryDetailComponent implements OnInit, OnDestroy {

  public event:MMEvent
  public category:Category
  public isLoaded = false 
  private sub1 : Subscription
  constructor(private route:ActivatedRoute,
              private eventService:EventServices,
              private categoriesService:CategoriesService) {}


  ngOnInit() {
    this.sub1 =  this.route.params.pipe(
      mergeMap((params:Params)=>
      this.eventService.getEventById(params['id'])),
      mergeMap((event:MMEvent)=>
        {
      this.event = event
      return this.categoriesService.getCategoriesById(event.category)
        }
      ))
    .subscribe(
      (category:Category)=>{
        this.category = category
        this.isLoaded = true
      }
    )
  }
  
  ngOnDestroy() {
    if(this.sub1)
    this.sub1.unsubscribe()
  }

}
