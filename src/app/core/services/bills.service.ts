import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Bill } from '../../shared/models/interfaces/bill.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BillsService {

  API_URL = environment.API_URL;
  loggedUserId;

  public elementsView = new BehaviorSubject<object>([
    { price: true },
    { purchaseType: false },
    { shop: false },
    { description: false },
    { warrantyEndDate: false }
  ]);

  public resultCount = new BehaviorSubject<number>(0);
  public currentResultCount = this.resultCount.asObservable();

  constructor(private http: HttpClient) {
    this.loggedUserId = BillsService.getLoggedUserId();
  }

  static getLoggedUserId(): number {
    if (localStorage.getItem('currentUser')) {
      return JSON.parse(localStorage.getItem('currentUser')).userId;
    }
  }

  getBills(): Observable<Bill[]> {
    // return this.http.get(`${this.API_URL}/bills/all`).pipe(tap(bill => new Bill(bill)));
    const apiURL = `${this.API_URL}/bills/allUserBills`;

    return this.http.get(apiURL).pipe(
      tap((bills: Bill[]) => {
        bills.forEach((bill) => {
            bill.warrantyEndDate = new Date(bill.warrantyEndDate).toLocaleString('en-US');
            bill.expand = false;
          });
      })
    );
  }

  createBill(bill: Bill): Observable<Bill> {
    bill.createdById = this.loggedUserId;
    return this.http.post<Bill>(`${this.API_URL}/bills/create`, bill);
  }

  updateBill(bill: Bill, id: string): Observable<Bill> {
    bill.updatedById = this.loggedUserId;
    return this.http.put<Bill>(`${this.API_URL}/bills/update?id=${id}`, bill);
  }

  getBillById(id: string): Observable<Bill> {
    return this.http.get<Bill>(`${this.API_URL}/bills/find/${id}`);
  }

  filterAll(filterObject): Observable<Bill[]> {
    return this.http.post<Bill[]>(`${this.API_URL}/bills/filterAll`, filterObject);
  }

  removeBill(id: string): Observable<Bill> {
    return this.http.delete<Bill>(`${this.API_URL}/bills/delete/${id}`);
  }

  uploadPhoto(fileToUpload) {
    const formData: FormData = new FormData();
    formData.append('images', fileToUpload, fileToUpload.name);
    return this.http.post(`${this.API_URL}/bills/uploadPhoto`, formData);
  }
}
