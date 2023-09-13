import {Component} from '@angular/core';
import {Item} from './models/item';
import {CartComponent} from './cart/cart.component';

@Component({
    selector: 'binx-root',
    standalone: true,
    imports: [
        CartComponent
    ],
    template: `
        <binx-cart [items]="items" />
    `,
    styles: [],
})
export class AppComponent {
    items: Item[] = [
        {name: 'Dead Man\'s Toe', price: 24.95, quantity: 3},
        {name: 'Newt Saliva', price: 9.99, quantity: 1},
        {name: 'Pox', price: 14.85, quantity: 1},
        {name: 'Bit of Witche\'s Tongue', price: 59.99, quantity: 1}
    ];
}
