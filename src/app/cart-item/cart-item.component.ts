import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Item} from '../models/item';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'binx-cart-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
  <mat-card>
    <mat-card-header>
      <mat-card-title>{{item.name}} ({{item.quantity}})</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <p>{{item.price | currency}} each</p>
    </mat-card-content>
    <mat-card-actions align="end">
      <button mat-icon-button (click)="changeQuantity.emit(1)"><mat-icon>add</mat-icon></button>
      <button mat-icon-button (click)="changeQuantity.emit(-1)"><mat-icon>remove</mat-icon></button>
      <button mat-icon-button (click)="remove.emit()"><mat-icon color="warn">delete</mat-icon></button>
    </mat-card-actions>
  </mat-card>
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
