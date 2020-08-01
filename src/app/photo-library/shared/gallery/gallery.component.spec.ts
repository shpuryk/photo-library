import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GalleryComponent } from './gallery.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import * as faker from 'faker';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SimpleChanges, SimpleChange } from '@angular/core';
import { ListRange } from '@angular/cdk/collections';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;

  const newPhotos = Array.from({ length: 6 }).map((i) => faker.image.image());

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryComponent, PhotoCardComponent],
      imports: [ScrollingModule, MatProgressSpinnerModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should init photoList', () => {
    const changes: SimpleChanges = {
      photos: new SimpleChange([], newPhotos, false),
    };
    component.ngOnChanges(changes);
    expect(component.photoList.length).toBe(2);
  });

  it('should show loading on scrollDown', () => {
    const changes: SimpleChanges = {
      photos: new SimpleChange([], newPhotos, false),
    };
    spyOn(component.viewport, 'getRenderedRange').and.returnValue({
      end: 2,
    } as ListRange);
    component.ngOnChanges(changes);
    component.scrollHandler();
    expect(component.loading).toBe(true);
  });

  it('should call fetch on scrollDown', () => {
    const changes: SimpleChanges = {
      photos: new SimpleChange([], newPhotos, false),
    };
    spyOn(component.viewport, 'getRenderedRange').and.returnValue({
      end: 2,
    } as ListRange);
    spyOn(component.fetch, 'emit');
    component.ngOnChanges(changes);
    component.scrollHandler();
    expect(component.fetch.emit).toHaveBeenCalledWith(6);
  });

  it('should not call fetch on scrollDown', () => {
    component.noFetch = false;
    spyOn(component.fetch, 'emit');
    component.scrollHandler();
    expect(component.fetch.emit).not.toHaveBeenCalledWith(6);
  });
});
