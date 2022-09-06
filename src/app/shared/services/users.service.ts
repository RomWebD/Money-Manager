import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { map, Observable } from 'rxjs';
import { BaseApi } from '../core/base-api';

@Injectable()

export class UsersService extends BaseApi {
  constructor(public override http: HttpClient) {
    super(http);
  }

  public getUserByEmail(email: string): Observable<User> {
    const apiURL = `users?email=${email}`;
    return this.get(apiURL)
    .pipe(
      map((users: User[]) => (users.length ? users[0] : null))
    );
  }

  public createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }
}
