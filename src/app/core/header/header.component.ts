import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {FilterInterface} from '../../shared/models/interfaces/filter.interface';
import {WarrantyOptionsEnum} from '../../shared/models/enums/warranty-option.enum';
import {TagsService} from '../services/tags.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public userIsAuthenticated: Observable<boolean>;
  public isMobile: boolean;
  private filter: FilterInterface;

  constructor(private authService: AuthService, private tagsService: TagsService) { }

  ngOnInit() {
    this.onResize();
    this.userIsAuthenticated = this.authService.getAuthStatusListener();
  }

  refresh(): void {
    const filter: FilterInterface = {
      searchIdList: [],
      warrantyFrom: null,
      warrantyTo: null,
      selectedWarranty: WarrantyOptionsEnum.NONE,
      categoryList: this.filter.categoryList.map(category => {
        category.selected = false;
        return category;
      }),
      selectedPriceFrom: null,
      selectedPriceTo: null,
      purchaseDateFrom: null,
      purchaseDateTo: null
    };
    this.tagsService.filter.next(filter);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    const innerWidth = window.innerWidth;
    this.isMobile = innerWidth < 600;
  }

  onLogout() {
    this.authService.logout();
  }
}
