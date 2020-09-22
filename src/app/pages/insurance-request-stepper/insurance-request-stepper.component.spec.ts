import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceRequestStepperComponent } from './insurance-request-stepper.component';

describe('InsuranceRequestStepperComponent', () => {
  let component: InsuranceRequestStepperComponent;
  let fixture: ComponentFixture<InsuranceRequestStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceRequestStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceRequestStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
