import { Component, Input } from '@angular/core';
import {AsyncPipe, CurrencyPipe, NgForOf} from '@angular/common';
import { Item } from '../models/item';
import { CartItemComponent } from '../cart-item/cart-item.component';
import {CartStore} from './cart.store';

@Component({
  selector: 'binx-cart',
  standalone: true,
  imports: [NgForOf, CurrencyPipe, CartItemComponent, AsyncPipe],
  providers: [CartStore],
  template: `
    <h2>Cart</h2>
    <binx-cart-item
      *ngFor="let item of store.items$ | async; index as i"
      [item]="item"
      (remove)="store.remove(i)"
      (changeQuantity)="store.changeQuantity(i, $event)"
    />
    <h3>Total: {{ store.total$ | async | currency }}</h3>
  `,
  styles: [
    `
      :host {
        display: block;
        background-image: url('../../assets/paper-bg.png');
        background-size: cover;
        width: 600px;
        margin: 0 auto;
        min-height: 80vh;
      }

      h2 {
        text-align: center;
      }

      h3 {
        text-align: right;
        padding: 20px;
        background: rgba(0,0,0,0.5);
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
  @Input() set items(value: Item[]) {
    this.store.setState({items: value})
  }

  constructor(protected store: CartStore) {
  }
}
