import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Item} from '../models/item';

@Component({
  selector: 'binx-cart-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="remove.emit()">Remove</button>{{item.name}}
    <button (click)="changeQuantity.emit(1)">+</button>
    {{item.quantity}}
    <button (click)="changeQuantity.emit(-1)">-</button>
  `,
  styles: [`
      :host {
          display: block
      }
  `
  ]
})
export class CartItemComponent {
  @Input() item!: Item;
  @Output() remove = new EventEmitter();
  @Output() changeQuantity = new EventEmitter<1 | -1>;
}
