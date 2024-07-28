import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFIFComponent } from './dialog-fif.component';

describe('DialogFIFComponent', () => {
  let component: DialogFIFComponent;
  let fixture: ComponentFixture<DialogFIFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFIFComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogFIFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
