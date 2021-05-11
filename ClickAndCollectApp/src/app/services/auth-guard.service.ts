import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log(route)


    if (!sessionStorage.getItem("authToken")) {
      this.router.navigate(["login"]);
      return false
    }

    return true
  }
}
