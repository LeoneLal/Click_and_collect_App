import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
  }

  login(form) {
    console.log(form)
    this.authService.login(form.value).subscribe((res) => {
      this.router.navigateByUrl('/');
      sessionStorage.setItem("authToken", res["access_token"]);
      sessionStorage.setItem("user", JSON.stringify(res["user"]));
    });
  }

}
