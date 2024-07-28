import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramformationConducteurMachineComponent } from './programformation-conducteur-machine.component';

describe('ProgramformationConducteurMachineComponent', () => {
  let component: ProgramformationConducteurMachineComponent;
  let fixture: ComponentFixture<ProgramformationConducteurMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramformationConducteurMachineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramformationConducteurMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
