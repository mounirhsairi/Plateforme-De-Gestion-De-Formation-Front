import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogListOperateursInFormationComponent } from './dialog-list-operateurs-in-formation.component';

describe('DialogListOperateursInFormationComponent', () => {
  let component: DialogListOperateursInFormationComponent;
  let fixture: ComponentFixture<DialogListOperateursInFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogListOperateursInFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogListOperateursInFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
