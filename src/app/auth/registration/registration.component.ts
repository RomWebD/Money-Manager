import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { UsersService } from 'src/app/shared/services/users.service';

const passLength = 8;

@Component({
  selector: 'mm-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})

export class RegistrationComponent implements OnInit {

  public form: FormGroup;
  public serverErrors: { forbiddenEmail?: boolean } = {};
  private route: ActivatedRoute

  constructor(private usersService: UsersService, 
              private router: Router,
              private title:Title,
              private meta:Meta) {
        
                title.setTitle('Реєстрація');
                meta.addTags([
                  {
                    name:'keyword',
                    content:'реєстрація, створення нового користувача'
                  },
                  {
                    name:'description',
                    content:'Реєстрація нового користувача'
                  }
                ])
              }

  ngOnInit() {
    this.form = this.initForm();
  }

  public onSubmit() {
    const { email, password, name } = this.form.value;
    const user = new User(email, password, name);
    this.usersService
      .getUserByEmail(email)
      .pipe(
        switchMap((userDb: User) => {
          if (userDb) {
            this.serverErrors.forbiddenEmail = true;
            console.log(this.serverErrors);
            return of(null);
          }
          return this.usersService.createNewUser(user);
        })
      )
      .subscribe((user: User) => {
        if (user) {
          this.router.navigate(['/login'], {
            queryParams: {
              nowCanLogin: true,
            },
          });
        }
      });
  }

  private initForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(passLength),
        Validators.maxLength(passLength),
      ]),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(255),
      ]),
      agree: new FormControl(false, [Validators.requiredTrue]),
    });
  }
}
