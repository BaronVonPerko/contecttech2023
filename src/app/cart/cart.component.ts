import { Component, Input } from '@angular/core';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { Item } from '../models/item';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'binx-cart',
  standalone: true,
  imports: [NgForOf, CurrencyPipe, CartItemComponent],
  template: `
    <h2>Cart</h2>
    <binx-cart-item
      *ngFor="let item of items"
      [item]="item"
      (remove)="remove(item)"
      (changeQuantity)="changeQuantity(item, $event)"
    />
    <h3>Total: {{ total | currency }}</h3>
  `,
  styles: [
    `
      :host {
        display: block;
        background-image: url('../../assets/paper-bg.png');
        background-size: cover;
        width: 600px;
        margin: 0 auto;
      }

      h2 {
        text-align: center;
      }

      h3 {
        text-align: right;
        padding: 20px;
      }

      h2,
      h3 {
        color: rgba(255, 255, 255, 0.8);
      }

      binx-cart-item {
        width: 50%;
        margin: 5px auto;
      }
    `,
  ],
})
export class CartComponent {
  @Input() items: Item[] = [];
  total = 0;

  changeQuantity(item: Item, amount: 1 | -1) {
    item.quantity += amount;
  }

  remove(item: Item) {
    this.items = this.items.filter((i) => i !== item);
  }
}
