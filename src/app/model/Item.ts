import { StockUrgency } from './StockUrgency';

export interface Item {
  id: number,
  name: string,
  description: string,
  price: number,
  stockAmount: number,
  stockUrgency: StockUrgency
}
