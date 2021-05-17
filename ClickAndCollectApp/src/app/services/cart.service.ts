import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  currentQuantity: number;
  productQuantity: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }



  data: Product[] = [];

  private cart = [];
  private cartItemCount = new BehaviorSubject(0);


  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  // Increment quantity
  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.productQuantity += product.currentQuantity;
        added = true;
        break;
      }
    }
    if (!added) {
      product.productQuantity = product.currentQuantity;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }

  // Decrement quantity
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.productQuantity -= 1;
        if (p.productQuantity == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  // Remove from cart
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.productQuantity);
        this.cart.splice(index, 1);
      }
    }
  }
}