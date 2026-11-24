import { Component, inject, input, linkedSignal, model, output, signal } from '@angular/core';
import { form, FormField, FormRoot, maxLength, min, required } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../service/item.service';
import { Router } from '@angular/router';
import { Item } from '../../model/Item';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [FormRoot, FormsModule, FormField],
  selector: 'app-update-item',
  styleUrl: './update-item.css',
  templateUrl: './update-item.html',
})
export class UpdateItem {
  private readonly itemService = inject(ItemService);
  private readonly router = inject(Router);

  readonly itemToUpdate = input<Item>();
  readonly closeForm = output<void>();

  protected readonly editableItem = linkedSignal<Item>(() =>
    this.itemToUpdate()!
  );

  protected readonly itemForm = form(
    this.editableItem,
    (item) => {
      required(item.name, { message: 'Name is required' });
      maxLength(item.name, 50, { message: 'Name cannot exceed 50 characters' });
      required(item.description, { message: 'Description is required' });
      maxLength(item.description, 255, { message: 'Description cannot exceed 255 characters' });
      required(item.price, { message: 'Price is required' });
      min(item.price, 0.01, { message: 'Price must be at least 0.01' });
      required(item.stockAmount, { message: 'Stock amount is required' });
      min(item.stockAmount, 1, { message: 'Stock must be at least 1' });
    },
    {
      submission: {
        action: async () => {
          try {
            const updatedItem = this.editableItem();
            await firstValueFrom(this.itemService.updateItem(updatedItem));
            alert('Item updated');
            this.itemForm().reset();
            await this.router.navigate(['/items', updatedItem.id]);
          } catch (err) {
            const httpErr = err as HttpErrorResponse;
            alert(httpErr.error?.message || 'An error occurred');
          }
        },
      },
    },
  );

  onCancel(): void {
    this.closeForm.emit();
  }

  isItemFormInvalid() {
    return this.itemForm().invalid();
  }
}

const emptyItem: Item = {
  id: 0,
  name: '',
  description: '',
  price: 0.0,
  stockAmount: 0,
  stockUrgency: 'MEDIUM'
}
