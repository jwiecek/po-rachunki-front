import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BillsService } from '../../core/services/bills.service';
import { AuthService } from '../../core/services/auth.service';
import { ActivatedRoute, Router} from '@angular/router';
import { Tag } from '../../shared/models/interfaces/tag.interface';
import { TagsService } from '../../core/services/tags.service';
import { forkJoin } from 'rxjs';
import { Bill } from '../../shared/models/interfaces/bill.interface';

@Component({
  selector: 'app-bills-add-edit',
  templateUrl: './bills-add-edit.component.html',
  styleUrls: ['./bills-add-edit.component.scss']
})
export class BillsAddEditComponent implements OnInit {
  public tags: Tag[];
  public billForm: FormGroup;
  private billId: string;
  public maxDate = new Date();
  public headerName: string;
  public tagsPurchaseType: Tag[];
  public selectedPurchaseTypes: string;
  public tagsBrand: Tag[];
  public tagsBrandByType: Tag[];
  public tagsProduct: Tag[];
  public tagsProductByType: Tag[];
  public tagsShop: Tag[];
  public tagsShopByType: Tag[];
  public selectedWarrantyMonth: number;
  private imagePath: Blob = null;
  public selectedBillPhotoUrl: string;
  public selectedProducts: string[];
  public selectedShops: string[];
  public selectedBrands: string[];
  public mode: string;
  public selectedWarrantyLabel;
  public imageBillPath: string;
  public buttonText: string;

  constructor(private billsService: BillsService,
              private authService: AuthService,
              private tagsService: TagsService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params.billId) {
        this.mode = 'edit';
        this.headerName = 'Edytuj: ';
        this.buttonText = 'Zapisz rachunek';
        this.billId = params.billId;
        const getTags = this.tagsService.getTags();
        const getSelectedBill = this.billsService.getBillById(this.billId);
        forkJoin([getTags, getSelectedBill]).subscribe(([tags, bill]) => {
          this.filterTags(tags);
          this.getSelectedBill(bill);
        });
      } else {
        this.mode = 'create';
        this.buttonText = 'Dodaj rachunek';
        this.headerName = 'Dodaj rachunek';
        this.getTags();
      }
    });
    this.billForm = new FormGroup({
      purchaseDate: new FormControl(null, {
        validators: [Validators.required]
      }),
      price: new FormControl(null, {
        validators: [Validators.required]
      }),
      description: new FormControl(null)
    });
  }

  getSelectedBill(bill: Bill): void {
    this.imageBillPath = bill.imageBillPath;
    this.selectedPurchaseTypes = bill.purchaseType.toString();
    this.selectedProducts = [...bill.product];
    this.selectedBrands = [...bill.brand];
    this.selectedShops = [bill.shop];
    this.selectedBillPhotoUrl = `${this.billsService.API_URL}/bills/${bill.imageBillPath}`;
    this.selectedWarrantyMonth = bill.warranty;
    this.selectedWarrantyLabel = bill.warranty >= 24 ? bill.warranty / 12 + 22 : bill.warranty;
    this.billForm.setValue({
      purchaseDate: bill.purchaseDate,
      price: bill.price,
      description: bill.description
    });

    const allSelectedTags = [
      this.selectedPurchaseTypes,
      ...this.selectedProducts,
      ...this.selectedBrands,
      ...this.selectedShops
    ];

    allSelectedTags.forEach(tag => {
      this.tags.forEach(t => {
        if (tag === t.label) {
          t.selected = !t.selected;
        }
      });
    });
    this.groupTagsBySelectedPurchaseTypes();
  }

  getTags(): void {
    this.tagsService.getTags().subscribe((tags: Tag[]) => {
      this.filterTags(tags);
    });
  }

  filterTags(tags: Tag[]): void {
    this.tags = tags;
    this.tagsPurchaseType = tags.filter(tag => tag.type === 'purchaseType');
    this.tagsBrand = tags.filter((tag: Tag) => tag.type === 'brand');
    this.tagsProduct = tags.filter((tag: Tag) => tag.type === 'product');
    this.tagsShop = tags.filter((tag: Tag) => tag.type === 'shop');
  }

  groupTagsBySelectedPurchaseTypes(): void {
    if (this.selectedPurchaseTypes) {
      this.tagsProductByType = this.tagsProduct.filter((tag: Tag) => tag.belongToLabel[0] === this.selectedPurchaseTypes);
      this.tagsBrandByType = this.tagsBrand.filter((tag: Tag) => tag.belongToLabel[0] === this.selectedPurchaseTypes);
      this.tagsShopByType = this.tagsShop.filter((tag: Tag) => tag.belongToLabel[0] === this.selectedPurchaseTypes);
    }
  }

  selectedWarranty(month: number): void {
    this.selectedWarrantyMonth = month;
  }

  onSaveBill(): void {
    if (this.billForm.invalid) {
      return;
    }
    const newBill = this.billForm.value;
    const purchaseDate = new Date(this.billForm.get('purchaseDate').value);
    newBill.imageBillPath = this.imagePath;
    newBill.purchaseType = this.selectedPurchaseTypes;
    newBill.product = this.selectedProducts;
    newBill.brand = this.selectedBrands;
    newBill.shop = this.selectedShops;
    newBill.warranty = this.selectedWarrantyMonth;
    newBill.warrantyEndDate = new Date(purchaseDate.setMonth(purchaseDate.getMonth() + this.selectedWarrantyMonth));
    if (this.mode === 'edit') {
      if (this.imagePath) {
        newBill.imageBillPath = this.imagePath;
      } else {
        newBill.imageBillPath = this.imageBillPath;
      }
      this.billsService.updateBill(newBill, this.billId).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.billsService.createBill(newBill).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  getImage(image: Blob): void {
    this.imagePath = image;
  }

  addTag(tag: Tag, multiple: boolean): void {
    this.tagsService.addTag(tag).subscribe(
      () => {
        this.tags.push(tag);
        this.filterTags(this.tags);
        this.selectTag(tag, multiple);
        },
      error => console.warn('err: ' + error)
    );
  }

  selectTag(tag: Tag, multiple: boolean): void {
    this.tags
      .filter(t => t.type === tag.type)
      .forEach(t => {
        if (!multiple) {
          tag.label === t.label ? (t.selected = true) : (t.selected = false);
        } else {
          if (tag.label === t.label) {
            t.selected = !t.selected;
          }
        }
      });
    this.selectedPurchaseTypes = this.tagsPurchaseType.filter(t => t.selected === true).map(t => t.label).toString();
    this.selectedProducts = this.tagsProduct.filter(t => t.selected === true
      && t.belongToLabel.toString() === this.selectedPurchaseTypes).map(t => t.label);
    this.selectedBrands = this.tagsBrand.filter(t => t.selected === true
      && t.belongToLabel.toString() === this.selectedPurchaseTypes).map(t => t.label);
    this.selectedShops = this.tagsShop.filter(t => t.selected === true
      && t.belongToLabel.toString() === this.selectedPurchaseTypes).map(t => t.label);
    this.groupTagsBySelectedPurchaseTypes();
  }
}
