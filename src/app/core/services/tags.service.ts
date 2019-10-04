import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Tag } from '../../shared/models/interfaces/tag.interface';
import { tap } from 'rxjs/operators';
import { AuthService} from './auth.service';
import { FilterInterface } from '../../shared/models/interfaces/filter.interface';
import { WarrantyOptionsEnum } from '../../shared/models/enums/warranty-option.enum';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  API_URL = environment.API_URL;
  public filter = new BehaviorSubject<FilterInterface>({
    warrantyFrom: null,
    warrantyTo: null,
    selectedWarranty: WarrantyOptionsEnum.NONE,
    categoryList: [],
    selectedPriceFrom: null,
    selectedPriceTo: null,
    purchaseDateFrom: null,
    purchaseDateTo: null,
    searchIdList: []
  });
  public currentFilter = this.filter.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.API_URL}/tags/userTags`);
  }

  getBasicTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.API_URL}/tags/basic`).pipe(
      tap((tags: Tag[]) => {
        tags.forEach((tag: Tag) => {
          const newTag = {
            label: tag.label,
            type: tag.type,
            belongToLabel: tag.belongToLabel,
            createdById: this.authService.userId
          };
          this.addTag(newTag).subscribe();
        });
      })
    );
  }

  addTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(`${this.API_URL}/tags/create`, tag);
  }
  removeTag(id: string): Observable<Tag> {
    return this.http.delete<Tag>(`${this.API_URL}/tags/delete/${id}`);
  }
}
