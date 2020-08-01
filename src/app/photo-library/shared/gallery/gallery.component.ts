import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { splitArrayIntoChunks } from '../utils/utils';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { GALLERY_COLUMNS, IMAGE_HEIGHT } from './gallery.const';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnChanges {
  @Input() photos: string[];
  @Input() noFetch: boolean;
  @Output() photoClick: EventEmitter<string> = new EventEmitter();
  @Output() fetch: EventEmitter<number> = new EventEmitter();

  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  /**
   * list with images splited into chunks. One chunk means one row in galery.
   * And rows then are rendered in virtual scrolling list.
   * (angular material cdk-virtual-scroll does not support columns)
   */
  photoList: any[] = [];
  loading = false;
  theEnd = false;

  imageHeight = IMAGE_HEIGHT + 40;

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof changes.photos.currentValue === 'undefined') {
      return;
    }
    if (changes.photos.previousValue !== changes.photos.currentValue) {
      this.photoList = [
        ...this.photoList,
        ...splitArrayIntoChunks(changes.photos.currentValue, GALLERY_COLUMNS),
      ];
      this.loading = false;
    }
    if (changes.photos.currentValue.length === 0) {
      this.theEnd = true;
    }
  }

  scrollHandler(): void {
    if (this.noFetch) {
      this.theEnd = true;
      return;
    }
    const end = this.viewport.getRenderedRange().end;
    if (!this.theEnd && end === this.photoList.length) {
      this.loading = true;
      this.fetch.emit(end * GALLERY_COLUMNS);
    }
  }
}
