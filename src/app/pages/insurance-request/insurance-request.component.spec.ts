import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceRequestComponent } from './insurance-request.component';

describe('InsuranceRequestComponent', () => {
  let component: InsuranceRequestComponent;
  let fixture: ComponentFixture<InsuranceRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
