import { Component, OnInit } from '@angular/core';
import { Product, CartService } from 'src/app/services/cart.service';
import { ModalController, AlertController } from '@ionic/angular';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss', '../products/products.page.scss'],
})
export class CartPage implements OnInit {
  
  cart: Product[] = [];

  selectedDate;
  
  myDate = new Date(); // assign your selected date to this Object
 
  datePickerObj: any = {};

  constructor(private cartService: CartService, private modalCtrl: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.datePickerObj = {
      dateFormat: 'DD-MM-YYYY',
      weeksList: ["M", "Tu", "W", "Th", "F", "Sa", "Su"],
      fromDate: new Date(),
      disableWeekDays: [6]
    };
  }
 
  decreaseCartItem(product) {
    this.cartService.decreaseProduct(product);
  }
 
  increaseCartItem(product) {
    this.cartService.addProduct(product);
  }
 
  removeCartItem(product) {
    this.cartService.removeProduct(product);
  }
 
  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.productQuantity, 0);
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
 
  async checkout(products) {
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'You can track your order in the "Orders" tab',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
    this.cart = [];
  }

  async openDatePicker() {
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { 
         'objConfig': this.datePickerObj, 
         'selectedDate': this.selectedDate,
         'weeksList': this.datePickerObj.weeksList,
      }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss()
      .then((data) => {
        console.log(data);
        this.selectedDate = data.data.date;
      });
  }

}
