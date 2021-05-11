import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  productTab: any = [];
  categories: any = [];
  currentQuantity: number = 1;

  cart = [];
  products = [];
  cartItemCount: BehaviorSubject<number>;

  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;

  constructor(private http: HttpClient, private productService: ProductService, private cartService: CartService, private modalCtrl: ModalController) {  }
  ngOnInit() {
    this.productService.getCategories().subscribe(result => {
      this.categories = result
      console.log(this.categories)
      this.products = this.cartService.getProducts();
      this.cart = this.cartService.getCart();
      this.cartItemCount = this.cartService.getCartItemCount();
    });

    this.productService.getAllProducts().subscribe(result => {
      this.productTab = result;
      this.productTab.forEach(product => {
        let categ = product.category_id;
        product.currentQuantity = 1
        this.categories.forEach(category => {
          if( categ === category.id) {
            product.category = category.name
          }
        });
      });
    });
  }

  decrement(i) {
    if (i.currentQuantity > 0) {
      i.currentQuantity--;
    }
  }
  
  increment(i) {
    i.currentQuantity++;
  }

  addToCart(product) {
    this.cartService.addProduct(product);
    console.log(product);
  }

}
