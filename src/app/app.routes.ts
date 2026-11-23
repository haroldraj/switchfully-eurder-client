import { Routes } from '@angular/router';
import { ItemList } from './items/item-list/item-list';
import { CreateItem } from './items/create-item/create-item';

export const routes: Routes = [
  { path: '', component: ItemList },
  { path: 'items/new', component: CreateItem },
  // { path: 'items/:id', component: }
];
