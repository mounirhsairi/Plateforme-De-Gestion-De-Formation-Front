import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDemandeDetailsComponent } from './dialog-demande-details.component';

describe('DialogDemandeDetailsComponent', () => {
  let component: DialogDemandeDetailsComponent;
  let fixture: ComponentFixture<DialogDemandeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDemandeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDemandeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
