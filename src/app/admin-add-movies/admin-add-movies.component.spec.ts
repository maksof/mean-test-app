import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddMoviesComponent } from './admin-add-movies.component';

describe('AdminAddMoviesComponent', () => {
  let component: AdminAddMoviesComponent;
  let fixture: ComponentFixture<AdminAddMoviesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAddMoviesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
