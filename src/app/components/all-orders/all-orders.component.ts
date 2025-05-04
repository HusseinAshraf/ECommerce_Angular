import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';
import { IOrder } from '../../core/interfaces/iorder';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { TermtextPipe } from '../../core/pipes/termtext.pipe';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, TermtextPipe, TranslateModule],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent implements OnInit {
  private readonly _OrdersService = inject(OrdersService);

  private readonly _AuthService = inject(AuthService);

  userId: string = '';

  AllOrdersList: IOrder[] = [];

  ngOnInit(): void {
    this._AuthService.saveUserData();

    this.userId = this._AuthService.userData.id;
    this._OrdersService.getOrders(this.userId).subscribe({
      next: (res) => {
        this.AllOrdersList = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  selectedOrder: any = null;

  showOrderDetails(order: any) {
    this.selectedOrder = order;
  }

  closeOrderDetails() {
    this.selectedOrder = null;
  }
}
