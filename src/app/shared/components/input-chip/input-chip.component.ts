import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BillsService } from '../../../core/services/bills.service';
import { Tag } from '../../models/interfaces/tag.interface';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { TagsService } from '../../../core/services/tags.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-input-chip',
  templateUrl: './input-chip.component.html',
  styleUrls: ['./input-chip.component.scss']
})
export class InputChipComponent {

  @Input() category: string;
  @Input() tagsByType: Tag[];
  @Input() tagType: string;
  @Input() catType;
  @Input() removable;
  @Output() addNewTag: EventEmitter<Tag> = new EventEmitter<Tag>();
  @Output() removeSelectedTag: EventEmitter<string> = new EventEmitter<string>();
  @Output() getSelectedTag: EventEmitter<Tag> = new EventEmitter<Tag>();
  visible = true;
  selectable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(private billsService: BillsService,
              private tagService: TagsService,
              private authService: AuthService) { }

  addTag(event: MatChipInputEvent, index): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      if (index === 'xxx') {
        const newTag = {
          label: value.trim(),
          type: this.tagType,
          belongToLabel: this.tagsByType[0].belongToLabel,
          createdById: this.authService.userId
        };
        this.addNewTag.emit(newTag);
      } else {
        const newTag = {
          label: value.trim(),
          type: this.tagType,
          belongToLabel: index === undefined ? [this.catType] : this.catType[index][0].belongToLabel,
          createdById: this.authService.userId
        };
        this.addNewTag.emit(newTag);
      }
    }
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: Tag): void {
    this.removeSelectedTag.emit(tag._id);
  }

  selectTag(tag: Tag): void {
    this.getSelectedTag.emit(tag);
  }
}
