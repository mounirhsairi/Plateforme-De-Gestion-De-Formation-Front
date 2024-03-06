import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriceDeCompetenceComponent } from './matrice-de-competence.component';

describe('MatriceDeCompetenceComponent', () => {
  let component: MatriceDeCompetenceComponent;
  let fixture: ComponentFixture<MatriceDeCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatriceDeCompetenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriceDeCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
