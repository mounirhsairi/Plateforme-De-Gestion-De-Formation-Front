import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlldemandesComponent } from './dialog-alldemandes.component';

describe('DialogAlldemandesComponent', () => {
  let component: DialogAlldemandesComponent;
  let fixture: ComponentFixture<DialogAlldemandesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAlldemandesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAlldemandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
