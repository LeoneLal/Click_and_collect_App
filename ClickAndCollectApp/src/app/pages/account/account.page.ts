import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { empty } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  loggedInUser = JSON.parse(sessionStorage.getItem("user"));

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    sessionStorage.clear();

    this.router.navigateByUrl('/login');

  }

  updatePassword(pass) {
    this.authService.updatePassword(pass)
  }
}
