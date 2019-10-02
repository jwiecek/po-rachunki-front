import { TestBed } from '@angular/core/testing';
import { BillsService } from '../../src/app/core/services/bills.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Bill } from '../../src/app/shared/models/interfaces/bill.interface';
import { environment } from '../../src/environments/environment';


describe('BillsService', () => {
  let service: BillsService;
  let httpMock: HttpTestingController;

  const response: Bill[] = [{
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

  const newBill: Bill = {
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
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BillsService]
    });
    service = TestBed.get(BillsService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });


  it('BillsService should exist', () => {
    expect(service).toBeDefined();
  });

  it('should get all bills', () => {
    service.getBills().subscribe((data: any) => {
      expect(data[0].shop).toBe('Media Markt');
    });
    const req = httpMock.expectOne(`${environment.API_URL}/bills/allUserBills`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should get the bill by id', () => {
    service.getBillById('5').subscribe((data: any) => {
      expect(data.shop).toBe('Media Markt');
    });
    const req = httpMock.expectOne(`${environment.API_URL}/bills/find/5`, 'call to api');
    expect(req.request.method).toBe('GET');
    req.flush(response[0]);
  });

  it('should create the correct new bill', () => {
    service.createBill(newBill).subscribe((data: Bill) => {
      expect(data.shop).toBe('Media Markt');
    });
    const req = httpMock.expectOne(
      `${environment.API_URL}/bills/create`
    );
    expect(req.request.method).toBe('POST');
    req.flush(newBill);
  });

  it('should delete bill', () => {
    service.removeBill('5').subscribe((data: Bill) => {
      console.log(data);
      expect(data).toBe('5');
    });
    const req = httpMock.expectOne(
      `${environment.API_URL}/bills/delete/5`,
      'delete to api'
    );
    expect(req.request.method).toBe('DELETE');
    req.flush('5');
  });

  it('should update bill data', () => {
    service.updateBill(response[0], '5').subscribe((data: Bill) => {
      expect(data.shop).toBe('Media Markt');
    });
    const req = httpMock.expectOne(
      `${environment.API_URL}/bills/update?id=5`,
      'put to api'
    );
    expect(req.request.method).toBe('PUT');
    req.flush(response[0]);
  });

});
