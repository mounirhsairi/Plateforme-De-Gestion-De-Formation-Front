import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandePolyDetailsDialogComponent } from './demande-poly-details-dialog.component';

describe('DemandePolyDetailsDialogComponent', () => {
  let component: DemandePolyDetailsDialogComponent;
  let fixture: ComponentFixture<DemandePolyDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandePolyDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandePolyDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
