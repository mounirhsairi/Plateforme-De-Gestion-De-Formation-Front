import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogupdateOperationComponent } from './dialogupdate-operation.component';

describe('DialogupdateOperationComponent', () => {
  let component: DialogupdateOperationComponent;
  let fixture: ComponentFixture<DialogupdateOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogupdateOperationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogupdateOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
