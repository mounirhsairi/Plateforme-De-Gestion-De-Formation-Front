import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQualificationComponent } from './dialog-qualification.component';

describe('DialogQualificationComponent', () => {
  let component: DialogQualificationComponent;
  let fixture: ComponentFixture<DialogQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogQualificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
