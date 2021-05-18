import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/services/orders.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  orderDetails: any;
  productDetails: any;

  constructor(private activatedRoute: ActivatedRoute, private ordersService: OrdersService, private productService: ProductService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')

    this.ordersService.getOrderDetails(id).subscribe(res => {
      this.orderDetails = res;

      this.orderDetails.forEach(line => {
        this.productService.getProductDetails(line.product_id).subscribe(result => {
          line.name = result["name"]
          line.picture_slug = result["picture_slug"]
        });
      });
    });
  }

}


