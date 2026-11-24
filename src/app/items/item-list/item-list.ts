import { Component, computed, inject, signal } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { StockUrgency } from '../../model/StockUrgency';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateItem } from '../create-item/create-item';
import { Router } from '@angular/router';
import { Item } from '../../model/Item';

@Component({
  imports: [DecimalPipe, FormsModule, CreateItem],
  selector: 'app-item-list',
  styleUrl: './item-list.css',
  templateUrl: './item-list.html',
})
export class ItemList {
  private readonly itemService = inject(ItemService);
  private readonly router = inject(Router);
  protected readonly searchTerm = signal<string>('');
  protected readonly selectedUrgency = signal<string>('ALL');
  protected readonly itemImageSrc = '/item-image.png';
  protected readonly isNewItemFormOpen = signal<boolean>(false);

  protected readonly urgencyImages: Record<StockUrgency, string> = {
    LOW: '/warning-icon-red.png',
    MEDIUM: '/warning-icon-orange.png',
    HIGH: '/warning-icon-green.png',
  };

  protected readonly items = rxResource({
    stream: () => this.itemService.getItems(),
    defaultValue: [],
  });

  filteredItems = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();
    const urgency = this.selectedUrgency();

    return this.items.value().filter((item) => {
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesUrgency = urgency === 'ALL' || item.stockUrgency === urgency;
      return matchesName && matchesUrgency;
    });
  });

  openNewItemForm(): void {
    this.isNewItemFormOpen.set(true);
  }

  closeNewItemForm(): void {
    this.isNewItemFormOpen.set(false);
  }

  async selectItem(item: Item) {
    await this.router.navigate(['/items', item.id]);
  }
}
