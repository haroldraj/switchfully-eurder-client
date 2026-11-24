import { Component, inject, input, signal } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UpdateItem } from '../update-item/update-item';

@Component({
  imports: [FormsModule, RouterLink, UpdateItem],
  selector: 'app-item-detail',
  styleUrl: './item-detail.css',
  templateUrl: './item-detail.html',
})
export class ItemDetail {
  readonly id = input.required<number>();
  private readonly itemService = inject(ItemService);
  protected readonly isUpdateItemFormOpen = signal<boolean>(false);
  protected readonly item = rxResource({
    stream: () => this.itemService.getItemById(this.id()),
  });

  openUpdateItemForm(): void {
    this.isUpdateItemFormOpen.set(true);
  }

  closeUpdateItemForm(): void {
    this.isUpdateItemFormOpen.set(false);
  }
}
