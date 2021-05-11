import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  ordersTab: any = [];
  loggedInUser = JSON.parse(sessionStorage.getItem("user"));



  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.ordersService.getUserOrders((this.loggedInUser).id).subscribe(res => {
      this.ordersTab = res;
    });
  }

}
