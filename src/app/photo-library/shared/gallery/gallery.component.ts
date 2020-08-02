import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  SimpleChanges,
  HostListener,
  OnInit,
} from '@angular/core';
import { splitArrayIntoChunks } from '../utils/utils';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { GALLERY_COLUMNS, IMAGE_HEIGHT } from './gallery.const';
import { FavoritePhoto } from 'src/app/core/photo-library.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit, OnChanges {
  @Input() photos: string[] | FavoritePhoto[];
  @Input() noFetch: boolean;
  @Output() photoClick: EventEmitter<string | FavoritePhoto[]> = new EventEmitter();
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

  imageHeight: number;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.setImageHeight();
  }

  ngOnInit(): void {
    this.setImageHeight();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (typeof changes.photos.currentValue === 'undefined') {
      return;
    }
    if (!changes.photos.previousValue ||
      !changes.photos.previousValue.some((e) =>
        changes.photos.currentValue.includes(e)
      )
    ) {
      this.photoList = [
        ...this.photoList,
        ...splitArrayIntoChunks(changes.photos.currentValue, GALLERY_COLUMNS),
      ];
      this.loading = false;
    }
    if (changes.photos.currentValue.length === 0) {
      this.theEnd = true;
    }
    if (!this.noFetch &&
      this.photoList.length * this.imageHeight < this.viewport.getViewportSize()
    ) {
      setTimeout(() => this.scrollHandler());
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

  setImageHeight(): void {
    this.imageHeight =
      window.innerWidth < ((IMAGE_HEIGHT + 40) * GALLERY_COLUMNS)
        ? window.innerWidth / GALLERY_COLUMNS
        : IMAGE_HEIGHT + 40;
  }
}
