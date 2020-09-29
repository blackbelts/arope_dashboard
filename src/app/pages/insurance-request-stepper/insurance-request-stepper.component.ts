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
  appInfo: any = {
    name: "",
    phone: "",
    email: "",
    application_number: "",
    application_date: "",
    target_price: "",
    lob: ["", ""],
    product_id: ["", ""]
  }
  constructor(
    private router: Router,
    public routerActive: ActivatedRoute,
    public odoo: OdooService,
    public config: ConfigService
  ) {
    this.application_id = this.routerActive.snapshot.paramMap.get("id")
    this.odoo.getApplicationInfo(parseInt(this.application_id))
      .then(res => {
        this.appInfo = JSON.parse(JSON.stringify(res)).data.app
        console.log(this.appInfo)
      })
  }

  ngOnInit(): void {
    this.stepper = new Stepper(document.querySelector("#application-stepper"), {
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
