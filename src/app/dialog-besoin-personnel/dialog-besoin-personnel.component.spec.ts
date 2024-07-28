import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBesoinPersonnelComponent } from './dialog-besoin-personnel.component';

describe('DialogBesoinPersonnelComponent', () => {
  let component: DialogBesoinPersonnelComponent;
  let fixture: ComponentFixture<DialogBesoinPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBesoinPersonnelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogBesoinPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
