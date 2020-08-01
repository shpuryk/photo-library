import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { routes } from './app-routing.module';

describe('AppComponent', () => {

  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'PhotoLibrary'`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('PhotoLibrary');
  });

  it('navigate to "favorites" takes you to /favorites', fakeAsync(() => {
    router.navigate(['/favorites']).then(() => {
      tick();
      expect(location.path()).toBe('/favorites');
    });
  }));

  it('navigate to "/" takes you to /', fakeAsync(() => {
    router.navigate(['/']).then(() => {
      tick();
      expect(location.path()).toBe('/');
    });
  }));

});
