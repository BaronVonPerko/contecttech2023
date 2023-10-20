import { Component, computed, effect, Input, signal } from '@angular/core';
import { AsyncPipe, CurrencyPipe, NgForOf } from '@angular/common';
import { Item } from '../models/item';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'binx-cart',
  standalone: true,
  imports: [NgForOf, CurrencyPipe, CartItemComponent, AsyncPipe],
  template: `
    <h2>Cart</h2>
    <binx-cart-item
      *ngFor="let item of _items(); index as i"
      [item]="item"
      (remove)="remove(i)"
      (changeQuantity)="changeQuantity(i, $event)"
    />
    <h3>Total: {{ total() | currency }}</h3>
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
  _items = signal<Item[]>([]);
  @Input() set items(value: Item[]) {
    this._items.set(value);
  }
  total = computed(() =>
    this._items().reduce((acc, item) => acc + item.price * item.quantity, 0),
  );

  constructor(private title: Title) {
    effect(() => {
      const numItems = this._items().reduce(
        (acc, item) => acc + item.quantity,
        0,
      );
      this.title.setTitle(`Cart (${numItems})`);
    });
  }

  changeQuantity(i: number, amount: 1 | -1) {
    this._items.mutate((items) => (items[i].quantity += amount));
  }

  remove(i: number) {
    this._items.mutate((items) => items.splice(i, 1));
  }
}
