import { Tag } from '../src/app/shared/models/interfaces/tag.interface';
import { Bill } from '../src/app/shared/models/interfaces/bill.interface';

export const mockedTags: Tag[] = [
  {belongToLabel: [], selected: false, createdById: '5cde6a1561298b08dea45d58', label: 'Dom i ogród', type: 'purchaseType', _id: '1'},
  {belongToLabel: [], selected: false, createdById: '5cde6a1561298b08dea45d58', label: 'Dziecko', type: 'purchaseType', _id: '2'},
  {belongToLabel: [], selected: false, createdById: '5cde6a1561298b08dea45d58', label: 'Elektronika', type: 'purchaseType', _id: '31'},
  {belongToLabel: [], selected: false, createdById: '5cde6a1561298b08dea45d58', label: 'Moda', type: 'purchaseType', _id: '41'},

  {belongToLabel: ['Elektronika'], selected: false, createdById: '5cde6a1561298b08dea45d58', label: 'lampa', type: 'product', _id: '3'},
  {belongToLabel: ['Elektronika'], selected: false, createdById: '5cde6a1561298b08dea45d58', label: 'Telewizor', type: 'product', _id: '4'},
  {belongToLabel: ['Moda'], selected: false, createdById: '5cde6a1561298b08dea45d58', label: 'Buty', type: 'product', _id: '5'},
  {belongToLabel: ['Dziecko'], selected: false, createdById: '5cde6a1561298b08dea45d58', label: 'Domek', type: 'product', _id: '6'},

  {belongToLabel: ['Dziecko'], selected: false, createdById: '5cde6a1561298b08dea45d58', label: 'Mama i ja', type: 'shop', _id: '7'},
  {belongToLabel: ['Dom i ogród'], selected: false, createdById: '5cde6a1561298b08dea45d58', label: 'Agata Meble', type: 'shop', _id: '8'},

  {belongToLabel: ['Elektronika'], selected: false, createdById: '5cde6a1561298b08dea45d58', label: 'Sony', type: 'brand', _id: '9'},
];

export const mockedBills: Bill[] = [{
  brand: ['Nikon'],
  createdAt: '2019-05-29T12:36:08.903Z',
  createdById: '5cde6a1561298b08dea45d58',
  description: 'damski',
  imageBillPath: '3cde8b107299473d4c102b7c22b6a2e37d.jpg',
  price: 3200,
  product: ['Aparat'],
  purchaseDate: '2019-05-03T00:00:00.000Z',
  purchaseType: 'Elektronika',
  shop: 'Media Markt',
  updatedAt: '2019-09-26T06:55:37.707Z',
  updatedById: '5cde6a1561298b08dea45d58',
  warranty: 180,
  warrantyEndDate: '2034-05-03T00:00:00.000Z',
  _id: '5'
}];
