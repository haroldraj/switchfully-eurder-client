import { Component, inject, output, signal } from '@angular/core';
import { ItemService } from '../../service/item.service';
import { Item } from '../../model/Item';
import { form, FormField, FormRoot, maxLength, min, required } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormRoot, FormsModule, FormField],
  selector: 'app-create-item',
  styleUrl: './create-item.css',
  templateUrl: './create-item.html',
})
export class CreateItem {
  private readonly itemService = inject(ItemService);
  private readonly router = inject(Router);
  protected readonly newItem = signal<Item>(emptyItem);
  readonly closeForm = output<void>();

  protected readonly itemForm = form(
    this.newItem,
    (item) => {
      required(item.name, { message: 'Name is required' });
      maxLength(item.name, 50, {message: 'Name cannot exceed 50 characters'});
      required(item.description, {message: 'Description is required'});
      maxLength(item.description, 255, {message: 'Description cannot exceed 255 characters'});
      required(item.price, { message: 'Price is required' });
      min(item.price, 0.01, {message: 'Price must be at least 0.01'})
      required(item.stockAmount, { message: 'Stock amount is required' });
      min(item.stockAmount, 1, {message: 'Stock must be at leat 1'})
    },
    {
      submission: {
        action: async () => {
          try {
            const result = await firstValueFrom(this.itemService.addItem(this.newItem()));
            alert('Item added');
            this.itemForm().reset();
            await this.router.navigate(['/items', result.id]);
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
    return this.itemForm.name().invalid() || this.itemForm.stockAmount().invalid()
      || this.itemForm.description().invalid() || this.itemForm.price().invalid();
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
