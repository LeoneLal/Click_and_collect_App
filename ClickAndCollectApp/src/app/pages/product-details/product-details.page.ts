import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  information = null;
  categories = null;

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
 
    // Get product categories from the API
    this.productService.getCategories().subscribe(result =>{
      this.categories = result
      console.log(this.categories)
    });

    // Get the information from the API
    this.productService.getProductDetails(id).subscribe(result => {
      this.information = result;

      this.categories.forEach(category => {
        if(this.information.category_id == category.id) {
          this.information.category_id = category.name
        }
      });
    });    
  }
}
