import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.models';
import { CategoriesService } from '../shared/services/categories.service';

@Component({
  selector: 'mm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss'],
})

export class RecordsPageComponent implements OnInit {
  public categories: Category[] = [];
  public isLoaded = false;

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.categoriesService
      .getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.isLoaded = true;
      });
  }

  public newCategoryAdded(category: Category) {
    this.categories.push(category);
  }
  
  public categoryWasEdited(category: Category) {
    const idx = this.categories
    .findIndex((c) => c.id === category.id);
    this.categories[idx] == category;
  }
}
