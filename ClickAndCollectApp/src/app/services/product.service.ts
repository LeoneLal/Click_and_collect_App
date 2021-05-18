import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = 'http://chezgaelle.herokuapp.com/api/';

  constructor(private http: HttpClient) { }


  getAllProducts() {
    return this.http.get(`${this.url}products`);
  }

  getProductDetails(id) {
    return this.http.get(`${this.url}products/${id}`);
  }

  getCategories() {
    return this.http.get(`${this.url}category`);
  }


}
