import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgrammeFormationConducteurCMSComponent } from './programme-formation-conducteur-cms.component';

describe('ProgrammeFormationConducteurCMSComponent', () => {
  let component: ProgrammeFormationConducteurCMSComponent;
  let fixture: ComponentFixture<ProgrammeFormationConducteurCMSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgrammeFormationConducteurCMSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgrammeFormationConducteurCMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
