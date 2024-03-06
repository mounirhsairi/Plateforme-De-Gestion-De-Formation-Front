import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationdemandeComponent } from './creationdemande.component';

describe('CreationdemandeComponent', () => {
  let component: CreationdemandeComponent;
  let fixture: ComponentFixture<CreationdemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationdemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationdemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
