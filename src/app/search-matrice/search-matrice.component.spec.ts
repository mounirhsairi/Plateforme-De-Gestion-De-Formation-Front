import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMatriceComponent } from './search-matrice.component';

describe('SearchMatriceComponent', () => {
  let component: SearchMatriceComponent;
  let fixture: ComponentFixture<SearchMatriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMatriceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchMatriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
