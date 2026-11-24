import { Routes } from '@angular/router';
import { ItemList } from './items/item-list/item-list';
import { CreateItem } from './items/create-item/create-item';
import { ItemDetail } from './items/item-detail/item-detail';

export const routes: Routes = [
  { path: '', component: ItemList },
  {
    path: 'items',
    children: [
      { path: '', component: ItemList },
      { path: 'new', component: CreateItem },
      { path: ':id', component: ItemDetail },
    ],
  },
];
