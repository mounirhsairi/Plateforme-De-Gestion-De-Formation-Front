import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesLignesComponent } from './gestion-des-lignes.component';

describe('GestionDesLignesComponent', () => {
  let component: GestionDesLignesComponent;
  let fixture: ComponentFixture<GestionDesLignesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDesLignesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDesLignesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
