import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { OdooService } from 'app/serveices/odoo.service';
import { ConfigService } from 'app/serveices/config.service';

@Component({
  selector: 'app-insurance-request-stepper',
  templateUrl: './insurance-request-stepper.component.html',
  styleUrls: ['./insurance-request-stepper.component.css']
})
export class InsuranceRequestStepperComponent implements OnInit {
  private stepper: Stepper;
  application_id
  appInfo: any
  constructor(
    private router: Router,
    public routerActive: ActivatedRoute,
    public odoo: OdooService,
    public config: ConfigService
  ) {
    this.application_id = this.routerActive.snapshot.paramMap.get("id")
    console.log("application_id", this.application_id)
    this.odoo.search(this.config.insuranceQuotationModel, [[
      "id", "=", parseInt(this.application_id)
    ]], false)
      .then(res => {
        this.appInfo=JSON.parse(JSON.stringify(res)).data[0]

        console.log(res)
      })
  }

  ngOnInit(): void {
    /*  this.stepper = new Stepper(document.querySelector("#stepper1"), {
       linear: false,
       animation: true
     }); */
  }
  next(e) {
    e.preventDefault()
    this.stepper.next();
  }
  onSubmit() {
    return false;
  }
}
