import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEvaluationMaintenanceComponent } from './dialog-evaluation-maintenance.component';

describe('DialogEvaluationMaintenanceComponent', () => {
  let component: DialogEvaluationMaintenanceComponent;
  let fixture: ComponentFixture<DialogEvaluationMaintenanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEvaluationMaintenanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEvaluationMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
