import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/shared/models/message.model';
import { Category } from '../../shared/models/category.models';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'mm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  public currentCategoryId = 1;
  public currentCategory: Category;
  public message: Message;
  private sub1: Subscription;
  
  @Input() categories: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  
  constructor(private categoriesService: CategoriesService) {}

  ngOnInit() {
    this.onCategoryChange();
    this.message = new Message('success', '');
  }

  public onCategoryChange() {
    this.currentCategory = this.categories.find(
      (c) => c.id.toString() === this.currentCategoryId.toString()
    );
  }

  public onSubmit(form: NgForm) {
    let { capacity, name } = form.value;
    if (capacity < 0) capacity *= -1;
    const category = new Category(name, capacity, this.currentCategoryId.toString());
    
    this.sub1 = this.categoriesService
      .updateCategory(category)
      .subscribe((category: Category) => {
        this.onCategoryEdit.emit(category);
        this.message.text = 'Категорія успішно відредагована';
        window.setTimeout(() => (this.message.text = ''), 4000);
      });
  }
  
  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }
}
