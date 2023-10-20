import {Item} from '../models/item';
import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {Title} from '@angular/platform-browser';
import {map, tap} from 'rxjs';

interface CartState {
    items: Item[];
}

@Injectable()
export class CartStore extends ComponentStore<CartState> {
    items$ = this.select(state => state.items);
    total$ = this.select(state => state.items.reduce((acc, item) => acc + item.quantity * item.price, 0));

    constructor(private title: Title) {
        super({
            items: []
        });
    }

    changeQuantity(index: number, amount: 1 | -1) {
        this.setState(state => {
            state.items[index].quantity += amount;
            return {items: [...state.items]}
        })
    }

    remove = this.updater((state, index: number) => {
        state.items.splice(index, 1);
        return {items: [...state.items]};
    });

    private readonly updateTitle = this.effect(() =>
        this.items$.pipe(
            map(items => items.reduce((acc, item) => acc + item.quantity, 0)),
            tap(numItems => this.title.setTitle(`Cart (${numItems})`))
        )
    );

}