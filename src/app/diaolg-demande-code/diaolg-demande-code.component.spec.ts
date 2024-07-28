import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaolgDemandeCodeComponent } from './diaolg-demande-code.component';

describe('DiaolgDemandeCodeComponent', () => {
  let component: DiaolgDemandeCodeComponent;
  let fixture: ComponentFixture<DiaolgDemandeCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaolgDemandeCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiaolgDemandeCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
