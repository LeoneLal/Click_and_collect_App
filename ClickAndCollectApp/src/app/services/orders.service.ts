import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url = 'http://127.0.0.1:8000/api/';

  constructor(private http: HttpClient) { }

  getUserOrders(id) {
    return this.http.get(`${this.url}orders/${id}`);
  }

  getOrderDetails(id) {
    return this.http.get(`${this.url}orderlines/${id}`);
  }

  postOrder(form) {
    console.log(form)
    return this.http.post(`${this.url}orders/store/`, form);
  }

}
