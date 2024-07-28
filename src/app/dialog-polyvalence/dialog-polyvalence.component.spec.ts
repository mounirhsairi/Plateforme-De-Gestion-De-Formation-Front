import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPolyvalenceComponent } from './dialog-polyvalence.component';

describe('DialogPolyvalenceComponent', () => {
  let component: DialogPolyvalenceComponent;
  let fixture: ComponentFixture<DialogPolyvalenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPolyvalenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogPolyvalenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
