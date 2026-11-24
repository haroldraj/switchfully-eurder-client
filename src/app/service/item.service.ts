import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Item } from '../model/Item';

@Service()
export class ItemService {
  private readonly http = inject(HttpClient);
  private readonly itemsUrl = `${environment.backendUrl}/items`;

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl);
  }

  addItem(item: Omit<Item, 'id' | 'stockUrgency'>): Observable<Item> {
    return this.http.post<Item>(this.itemsUrl, item);
  }

  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.itemsUrl}/${id}`);
  }

  updateItem(item: Item): Observable<void> {
    return this.http.put<void>(`${this.itemsUrl}/${item.id}`, item);
  }
}
