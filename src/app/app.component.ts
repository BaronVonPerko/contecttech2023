import { Component } from '@angular/core';
import { Item } from './models/item';
import { CartComponent } from './cart/cart.component';

@Component({
  selector: 'binx-root',
  standalone: true,
  imports: [CartComponent],
  template: ` <binx-cart [items]="items" /> `,
  styles: [
    `
      :host {
        display: block;
        background-image: url('../assets/spooky_night_sky.png');
        background-size: cover;
        height: 100vh;
        padding: 200px 0 0;
      }
    `,
  ],
})
export class AppComponent {
  items: Item[] = [
    { name: "Dead Man's Toe", price: 24.95, quantity: 3 },
    { name: 'Newt Saliva', price: 9.99, quantity: 1 },
    { name: 'Vial of Pox', price: 14.85, quantity: 1 },
    { name: "Bit of Witch's Tongue", price: 59.99, quantity: 1 },
  ];
}
