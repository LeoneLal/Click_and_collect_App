import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {

  productTab: any = [];
  categories: any = []

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
        this.categories.forEach(category => {
          if( categ === category.id) {
            product.category_id = category.name
          }
        });
      });
    });
  }


}
