import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fadeStateTrigger } from 'src/app/shared/animations/fade.animation';
import { Message } from 'src/app/shared/models/message.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'mm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations:[fadeStateTrigger]
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public message: Message;

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private title:Title,
    private meta:Meta
     
  ) {
    title.setTitle('Вхід в систему');
    meta.addTags([
      {
        name:'keyword',
        content:'логін, вхід в систему'
      },
      {
        name:'description',
        content:'Сторінка для входу в систему'
      }
    ])
  }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.route.queryParams.subscribe((params: Params) => {
      if (params['nowCanLogin']) {
        this.showMessage({
          text: 'Тепер ви можете зайти в систему',
          type: 'success',
        });
      }
      if(params['accessDenied']){
        this.showMessage({
          text: 'Для роботи з системою вам потрібно увійти в акаунт',
          type: 'warning',
        });
      }
    });
    
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    
  }

  private showMessage(message: Message) {
    this.message = message;
    window.setTimeout(() => {
      this.message.text = '';
    }, 5000);
  }

  public onSubmit() {
    const formData = this.form.value;
    this.usersService.getUserByEmail(formData.email).subscribe((user) => {
      if (!user) {
        this.showMessage({
          text: 'Такого користувача не існує',
          type: 'danger',
        });
        return;
      }
      if (user.password !== formData.password) {
        this.showMessage({
          text: 'Введений пароль є не вірний',
          type: 'danger',
        });
        return;
      }
      this.message.text = '';
      localStorage.setItem('user', JSON.stringify(user));
      this.authService.login();
      this.router.navigate(['/system', 'bill']);
    });
  }
}
