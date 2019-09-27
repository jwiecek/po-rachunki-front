import { Tag } from './tag.interface';

export interface FilterInterface {
  selectedWarranty: string;
  categoryList: Tag[];
  selectedPriceFrom: number;
  selectedPriceTo: number;
  warrantyFrom: string;
  warrantyTo: string;
  purchaseDateFrom: string;
  purchaseDateTo: string;
  searchIdList?: string[];
}
