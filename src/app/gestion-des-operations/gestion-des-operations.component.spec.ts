import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDesOperationsComponent } from './gestion-des-operations.component';

describe('GestionDesOperationsComponent', () => {
  let component: GestionDesOperationsComponent;
  let fixture: ComponentFixture<GestionDesOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDesOperationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDesOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
