import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import pl from '@angular/common/locales/pl';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthModule } from './modules/auth/auth.module';
import { BillsComponent } from './modules/bills/bills.component';
import { TagsComponent } from './modules/tags/tags.component';
import { BillsListComponent } from './modules/bills/bills-list/bills-list.component';
import { TagsListComponent } from './modules/tags/tags-list/tags-list.component';
import { BillSearchComponent} from './modules/bills/bill-search/bill-search.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { AuthInterceptor } from './modules/auth/auth-interceptor';
import { BillItemComponent } from './modules/bills/bills-list/bill-item/bill-item.component';
import { BillsAddEditComponent } from './modules/bills-add-edit/bills-add-edit.component';
import { BillsFilterComponent } from './modules/bills/bills-filter/bills-filter.component';
import { BillsFilterCategoryComponent } from './modules/bills/bills-filter/bills-filter-category/bills-filter-category.component';
import { BillsFilterPriceComponent } from './modules/bills/bills-filter/bills-filter-price/bills-filter-price.component';
import { BillsFilterDateComponent } from './modules/bills/bills-filter/bills-filter-date/bills-filter-date.component';
import { BillsFilterWarrantyComponent } from './modules/bills/bills-filter/bills-filter-warranty/bills-filter-warranty.component';
import { BillsShowOnListComponent } from './modules/bills/bills-show-on-list/bills-show-on-list.component';
import { BillWarrantyComponent } from './modules/bills-add-edit/bill-warranty/bill-warranty.component';
import { BillImageComponent } from './modules/bills-add-edit/bill-image/bill-image.component';
import {ToolbarComponent} from './modules/bills/bills-filter/toolbar/toolbar.component';
import {FilterDialogComponent} from './modules/bills/bills-filter/filter-dialog/filter-dialog.component';
import { BillsFilterSelectedListComponent } from './modules/bills/bills-filter/bills-filter-selected-list/bills-filter-selected-list.component';

registerLocaleData(pl);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BillsComponent,
    TagsComponent,
    BillsListComponent,
    TagsListComponent,
    BillSearchComponent,
    BillItemComponent,
    BillsAddEditComponent,
    BillsFilterComponent,
    BillsFilterCategoryComponent,
    BillsFilterPriceComponent,
    BillsFilterDateComponent,
    BillsFilterWarrantyComponent,
    BillsShowOnListComponent,
    BillWarrantyComponent,
    BillImageComponent,
    ToolbarComponent,
    FilterDialogComponent,
    BillsFilterSelectedListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pl'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    AuthGuard
  ],
  exports: [
    BillsFilterComponent,
    FilterDialogComponent
  ],
  entryComponents: [FilterDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
