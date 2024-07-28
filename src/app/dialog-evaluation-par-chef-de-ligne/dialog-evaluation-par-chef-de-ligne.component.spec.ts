import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEvaluationParChefDeLigneComponent } from './dialog-evaluation-par-chef-de-ligne.component';

describe('DialogEvaluationParChefDeLigneComponent', () => {
  let component: DialogEvaluationParChefDeLigneComponent;
  let fixture: ComponentFixture<DialogEvaluationParChefDeLigneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEvaluationParChefDeLigneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEvaluationParChefDeLigneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
