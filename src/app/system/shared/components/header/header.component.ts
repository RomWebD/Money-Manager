import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'mm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  date: Date = new Date();
  user: User;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }
  onLogOut() {
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
