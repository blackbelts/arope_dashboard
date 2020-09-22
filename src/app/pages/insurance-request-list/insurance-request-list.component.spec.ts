import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceRequestListComponent } from './insurance-request-list.component';

describe('InsuranceRequestListComponent', () => {
  let component: InsuranceRequestListComponent;
  let fixture: ComponentFixture<InsuranceRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsuranceRequestListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
