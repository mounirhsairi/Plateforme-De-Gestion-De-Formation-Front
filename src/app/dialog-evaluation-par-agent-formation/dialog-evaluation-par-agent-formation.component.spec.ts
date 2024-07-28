import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEvaluationParAgentFormationComponent } from './dialog-evaluation-par-agent-formation.component';

describe('DialogEvaluationParAgentFormationComponent', () => {
  let component: DialogEvaluationParAgentFormationComponent;
  let fixture: ComponentFixture<DialogEvaluationParAgentFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEvaluationParAgentFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEvaluationParAgentFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
