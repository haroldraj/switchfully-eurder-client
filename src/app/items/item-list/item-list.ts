import { Component, computed, inject, signal } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { StockUrgency } from '../../model/StockUrgency';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [DecimalPipe, FormsModule],
  selector: 'app-item-list',
  styleUrl: './item-list.css',
  templateUrl: './item-list.html',
})
export class ItemList {
  private readonly itemService = inject(ItemService);
  protected readonly items = rxResource({
    stream: () => this.itemService.getItems(),
    defaultValue: [],
  });

  protected readonly itemImageSrc = '/item-image.png';

  protected readonly urgencyImages: Record<StockUrgency, string> = {
    LOW: '/warning-icon-red.png',
    MEDIUM: '/warning-icon-orange.png',
    HIGH: '/warning-icon-green.png',
  };

  searchTerm = signal<string>('');
  selectedUrgency = signal<string>('ALL');

  filteredItems = computed(() => {
    const query = this.searchTerm().trim().toLowerCase();
    const urgency = this.selectedUrgency();

    return this.items.value().filter((item) => {
      const matchesName = item.name.toLowerCase().includes(query);
      const matchesUrgency = urgency === 'ALL' || item.stockUrgency === urgency;
      return matchesName && matchesUrgency;
    });
  });
}
