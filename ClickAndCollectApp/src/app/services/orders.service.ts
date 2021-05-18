import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  url = 'http://chezgaelle.herokuapp.com/api/';

  constructor(private http: HttpClient) { }

  getUserOrders(id) {
    return this.http.get(`${this.url}orders/${id}`);
  }

  getOrderDetails(id) {
    return this.http.get(`${this.url}orderlines/${id}`);
  }

  postOrder(form) {
    const order = this.http.post(`${this.url}orders/store/`, form);
    return order;
  }

}
