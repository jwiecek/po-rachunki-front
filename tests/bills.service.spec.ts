import { TestBed } from '@angular/core/testing';
import { BillsService } from '../src/app/core/services/bills.service';

describe('BillsService', () => {
  let service: BillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ BillsService ]
    });
    service = TestBed.get(BillsService);
  });

  test('should exist', () => {
    expect(service).toBeDefined();
  });
});
