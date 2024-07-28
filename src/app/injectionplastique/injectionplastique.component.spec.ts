import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InjectionplastiqueComponent } from './injectionplastique.component';

describe('InjectionplastiqueComponent', () => {
  let component: InjectionplastiqueComponent;
  let fixture: ComponentFixture<InjectionplastiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InjectionplastiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InjectionplastiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
