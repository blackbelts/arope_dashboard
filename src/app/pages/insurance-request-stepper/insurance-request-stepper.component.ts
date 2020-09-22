import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-insurance-request-stepper',
  templateUrl: './insurance-request-stepper.component.html',
  styleUrls: ['./insurance-request-stepper.component.css']
})
export class InsuranceRequestStepperComponent implements OnInit {
  private stepper: Stepper;
  constructor() { }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true
    });
  }
  next(e) {
    e.preventDefault()
    this.stepper.next();
  }
  onSubmit() {
    return false;
  }
}
