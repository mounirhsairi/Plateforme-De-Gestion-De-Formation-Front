import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAjoutUserComponent } from './dialog-ajout-user.component';

describe('DialogAjoutUserComponent', () => {
  let component: DialogAjoutUserComponent;
  let fixture: ComponentFixture<DialogAjoutUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAjoutUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAjoutUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
