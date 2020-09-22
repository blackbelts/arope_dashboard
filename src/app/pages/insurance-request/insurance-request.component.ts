import { Component, OnInit } from '@angular/core';
import Stepper from "bs-stepper";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insurance-request',
  templateUrl: './insurance-request.component.html',
  styleUrls: ['./insurance-request.component.css'],
})
export class InsuranceRequestComponent implements OnInit {
  private stepper: Stepper;
  public application: FormGroup
  constructor(
    public fb: FormBuilder,
    public router: Router
  ) {
    this.application = this.fb.group({
      lob: ['', Validators.required]
    })
  }

  ngOnInit(): void {

  }

  create() {
    console.log(this.application.value)
    this.router.navigateByUrl('/dashboard/ins-application-status')
  }

}
