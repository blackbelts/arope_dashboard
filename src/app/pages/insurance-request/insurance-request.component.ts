import { Component, OnInit } from '@angular/core';
import Stepper from "bs-stepper";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OdooService } from 'app/serveices/odoo.service';
import { SharedService } from 'app/serveices/shared.service';

@Component({
  selector: 'app-insurance-request',
  templateUrl: './insurance-request.component.html',
  styleUrls: ['./insurance-request.component.css'],
})
export class InsuranceRequestComponent implements OnInit {
  private stepper: Stepper;
  public application: FormGroup
  lobList: []
  products: []
  selectedProducts = []
  quoteProducts = []
  selectedQuoteProducts = []
  medicalProducts = []
  selectedLobName = ''
  peopleGroup = []
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public odoo: OdooService,
    public shared: SharedService
  ) {
    console.log(this.shared.user_token)
    this.odoo.getLobAndProducts()
      .then(res => {
        console.log(JSON.parse(JSON.stringify(res)))
        this.lobList = JSON.parse(JSON.stringify(res)).data.lob
        this.products = JSON.parse(JSON.stringify(res)).data.products
        this.quoteProducts = JSON.parse(JSON.stringify(res)).data.quote
      })
    this.application = this.fb.group({
      lob: ['', Validators.required],
      packageFor: ['', Validators.required],
    })
  }

  ngOnInit(): void {

  }
  lobChange(e) {
    this.lobList.forEach(lob => {
      if (lob["id"] == this.application.get("lob").value) {
        this.selectedLobName = lob["name"]
      }
    })
    this.selectedQuoteProducts = []
    this.selectedProducts = []
    this.products.forEach(product => {
      if (product["lob_id"] == this.application.get("lob").value)
        this.selectedProducts.push(product)
    })
    this.quoteProducts.forEach(product => {
      if (product["lob_id"] == this.application.get("lob").value)
        this.selectedQuoteProducts.push(product)
    })
  }
  packageForChange(e) {
    this.medicalProducts = []
    let searchQuery = this.application.get("packageFor").value == 'family' ? 'individual' : this.application.get("packageFor").value
    if (this.application.get("packageFor").value == "family" || this.application.get("packageFor").value == "sme") {
      this.peopleGroup = []
      this.peopleGroup.push({
        name: '',
        type: '',
        gender: '',
        birthOfDate: '',
      })
    }
    this.selectedQuoteProducts.forEach(product => {
      if (product["package"] == searchQuery) {
        this.medicalProducts.push(product)
      }
    })
  }
  addAnotherPerson(e) {
    /*  e.preventDefault() */
    this.peopleGroup.push({
      name: '',
      type: '',
      gender: '',
      birthOfDate: '',
    })
  }
  deletePerson(index) {
    if (index > 0) {
      this.peopleGroup.splice(index, 1)
    }
  }
  create() {
    console.log(this.application.value)
    this.router.navigateByUrl('/dashboard/ins-application-status')
  }

}
