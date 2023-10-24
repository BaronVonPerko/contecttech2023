import { Component, Input } from '@angular/core';
import {AsyncPipe, CurrencyPipe, NgForOf} from '@angular/common';
import { Item } from '../models/item';
import { CartItemComponent } from '../cart-item/cart-item.component';
import {Title} from '@angular/platform-browser';
import {BehaviorSubject, map, tap} from 'rxjs';

@Component({
  selector: 'binx-cart',
  standalone: true,
  imports: [NgForOf, CurrencyPipe, CartItemComponent, AsyncPipe],
  template: `
    <h2>Cart</h2>
    <binx-cart-item
      *ngFor="let item of _items | async as items; index as i"
      [item]="item"
      (remove)="remove(items, i)"
      (changeQuantity)="changeQuantity(items, i, $event)"
    />
    <h3>Total: {{ total$ | async | currency }}</h3>
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
  _items = new BehaviorSubject<Item[]>([]);
  @Input() set items(value: Item[]) {
    this._items.next(value);
  }
  total$ = this._items.asObservable().pipe(
      tap((items) => {
        const numItems = items.reduce((acc, item) => acc + item.quantity, 0);
        this.title.setTitle(`Cart (${numItems})`);
      }),
      map((items) => items.reduce((acc, item) => acc + item.price * item.quantity, 0))
  );

  constructor(private title: Title) {}

  changeQuantity(items: Item[], i: number, amount: 1 | -1) {
    items[i].quantity += amount;
    this._items.next(items);
  }

  remove(items: Item[], i: number) {
    items.splice(i, 1);
    this._items.next(items);
  }
}
