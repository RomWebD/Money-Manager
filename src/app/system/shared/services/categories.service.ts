import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from 'src/app/shared/core/base-api';
import { Category } from '../models/category.models';

@Injectable()

export class CategoriesService extends BaseApi {
  constructor(public override http: HttpClient) {
    super(http);
  }

  public addCategory(category: Category): Observable<Category> {
    return this.post('categories', category);
  }
  public getCategories(): Observable<Category[]> {
    return this.get('categories');
  }
  public updateCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }

  public getCategoriesById(id:number):Observable<Category>{
    return this.get(`categories/${id}`)
  }

}
