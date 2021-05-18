import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  url = 'http://chezgaelleapp.herokuapp.com/api/auth/';
  // url = 'http://127.0.0.1:8000/api/auth/';

  constructor(private http: HttpClient) { }


  register(form) {
    return this.http.post(`${this.url}register`, form);
  }

  login(form) {
    return this.http.post(`${this.url}login`, form);
  }

  logout() {
    let form = "";
    return this.http.post(`${this.url}logout`, form);
  }

  updatePassword(password) {
    return this.http.post(`${this.url}updatepass`, password);
  }
}
