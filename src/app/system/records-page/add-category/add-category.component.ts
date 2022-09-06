import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Category } from '../../shared/models/category.models';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'mm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})

export class AddCategoryComponent implements OnDestroy {
  @Output() onCategoryAdd = new EventEmitter<Category>();
  private sub1: Subscription;

  constructor(private catogoriesService: CategoriesService) {}

  public onSubmit(form: NgForm) {
    let { name, capacity } = form.value;
    if (capacity < 0) {
      capacity *= -1;
    }
    const category = new Category(name, capacity);
    this.sub1 = this.catogoriesService
      .addCategory(category)
      .subscribe((category: Category) => {
        form.reset;
        form.form.patchValue({ capacity: 1 });
        this.onCategoryAdd.emit(category);
      });
  }
  
  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }
}
