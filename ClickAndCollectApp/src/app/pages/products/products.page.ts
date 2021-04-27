import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  productTab: any = [];
  categories: any = [];
  currentQuantity: number = 1;

  constructor(private http: HttpClient, private productService: ProductService) {  }
  ngOnInit() {
    this.productService.getCategories().subscribe(result =>{
      this.categories = result
      console.log(this.categories)
    });

    this.productService.getAllProducts().subscribe(result => {
      this.productTab = result;

      this.productTab.forEach(product => {
        let categ = product.category_id;
        product.currentquantity = 1
        this.categories.forEach(category => {
          if( categ === category.id) {
            product.category = category.name
          }
        });
      });
    });
  }

  decrement(i) {
    if (i.currentquantity > 0) {
      i.currentquantity--;
    }
  }
  
  increment(i) {
    i.currentquantity++;
  }

}
