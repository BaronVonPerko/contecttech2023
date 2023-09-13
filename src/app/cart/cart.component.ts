import {Component, Input, OnInit, signal, computed, effect} from '@angular/core';
import {CurrencyPipe, NgForOf} from '@angular/common';
import {Item} from '../models/item';
import {CartItemComponent} from '../cart-item/cart-item.component';

@Component({
  selector: 'binx-cart',
  standalone: true,
  imports: [NgForOf, CurrencyPipe, CartItemComponent],
  template: `
      <h2>Cart</h2>
      <binx-cart-item *ngFor="let item of items" [item]="item"
                      (remove)="remove(item)"
                      (changeQuantity)="changeQuantity(item, $event)"/>
      <h3>Total: {{total | currency}}</h3>
  `,
  styles: [
  ]
})
export class CartComponent implements OnInit {
  @Input() items: Item[] = [];
  total = 0;

  ngOnInit() {
    this.calculateTotal();
  }

  changeQuantity(item: Item, amount: 1 | -1) {
    item.quantity += amount;
    this.calculateTotal();
  }

  remove(item: Item) {
    this.items = this.items.filter(i => i !== item);
    this.calculateTotal();
  }

  private calculateTotal = () => {
    this.total = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
