import { Component, OnInit } from '@angular/core';
import { Tag } from '../../../shared/models/interfaces/tag.interface';
import { TagsService } from '../../../core/services/tags.service';


@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.scss']
})
export class TagsListComponent implements OnInit {

  public tagsPurchaseType: Tag[] = [];
  public tagsPrice: Tag[] = [];
  public tagsWarranty: Tag[] = [];
  public tagsProduct = [];
  public tagsBrand = [];
  public tagsShop = [];

  constructor(private tagsService: TagsService) { }

  ngOnInit() {
    this.getTags();
  }

  getTags(): void {
    this.tagsService.getTags().subscribe((tags: Tag[]) => {
      this.filterTags(tags);
    });
  }

  filterTags(tags: Tag[]): void {
    this.tagsPurchaseType = tags.filter((tag: Tag) => tag.type === 'purchaseType');
    this.tagsPrice = tags.filter((tag: Tag) => tag.type === 'price');
    this.tagsPrice = this.tagsPrice.sort(
      (a, b) => parseFloat(a.label.replace(/\D/g, '')) - parseFloat(b.label.replace(/\D/g, ''))
    );
    this.tagsWarranty = tags.filter((tag: Tag) => tag.type === 'warranty');
    this.tagsPurchaseType.forEach((tag: Tag, index: number) => {
      this.tagsProduct[index] = tags.filter(t => t.type === 'product' && t.belongToLabel.toString() === tag.label);
      this.tagsBrand[index] = tags.filter(t => t.type === 'brand' && t.belongToLabel.toString() === tag.label);
      this.tagsShop[index] = tags.filter(t => t.type === 'shop' && t.belongToLabel.toString() === tag.label);
    });
  }

  addTag(tag: Tag): void {
    this.tagsService.addTag(tag).subscribe(
      () => {this.getTags(); },
      error => console.warn('err: ' + error)
    );
  }

  removeTag(id: string): void {
    this.tagsService.removeTag(id).subscribe(
      () => {
        this.getTags();
      },
      err => console.error('HTTP Error', err)
    );
  }
}
