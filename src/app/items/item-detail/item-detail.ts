import { Component, inject, input } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-item-detail',
  styleUrl: './item-detail.css',
  templateUrl: './item-detail.html',
})
export class ItemDetail {
  readonly id = input.required<number>();
  private readonly itemService = inject(ItemService);
  protected readonly item = rxResource({
    stream: () => this.itemService.getItemById(this.id()),
  });
}
