import { Component, OnInit } from '@angular/core';
import Stepper from "bs-stepper";
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Router, NavigationExtras } from '@angular/router';
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
  AppInfo: any
  applicationData: any
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
      id: [false],
      user_id: [parseInt(this.shared.user_id)],
      lob: ['', Validators.required],
      product_id: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      target_price: ['', Validators.required],
      package: ['', Validators.required],
      dob: ["", Validators.required],
      product: ["", Validators.required],
      price: ["", Validators.required],
      brand: ["", Validators.required],
      sum_insured: ["", Validators.required],
      family_age: false,
      deductible: [false]
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
    /* to update validations depend on line of business */
    if (this.selectedLobName == "Fire") {
      const isured = this.application.get("sum_insured")
      console.log("Fire")
      this.application.get("sum_insured").setValidators(null)
      this.application.get("sum_insured").setValue(false)
      this.application.get("sum_insured").updateValueAndValidity()
      this.application.get("brand").setValidators(null)
      this.application.get("brand").setValue(false)
      this.application.get("brand").updateValueAndValidity()
      this.application.get("price").setValidators(null)
      this.application.get("price").setValue(false)
      this.application.get("price").updateValueAndValidity()
      this.application.get("product").setValidators(null)
      this.application.get("product").setValue(false)
      this.application.get("product").updateValueAndValidity()
      this.application.get("dob").setValidators(null)
      this.application.get("dob").setValue(false)
      this.application.get("dob").updateValueAndValidity()
      this.application.get("package").setValidators(null)
      this.application.get("package").setValue(false)
      this.application.get("package").updateValueAndValidity()
    }
    if (this.selectedLobName == "Motor") {
      this.application.get("sum_insured").setValidators(Validators.required)
      this.application.get("sum_insured").updateValueAndValidity()
      this.application.get("product").setValidators(Validators.required)
      this.application.get("product").updateValueAndValidity()
      this.application.get("brand").setValidators(Validators.required)
      this.application.get("brand").updateValueAndValidity()
      this.application.get("price").setValidators(null)
      this.application.get("price").updateValueAndValidity()
      this.application.get("dob").setValidators(null)
      this.application.get("dob").setValue(false)
      this.application.get("dob").updateValueAndValidity()
      this.application.get("package").setValidators(null)
      this.application.get("package").setValue(false)
      this.application.get("package").updateValueAndValidity()

    }
    if (this.selectedLobName == "Medical") {
      this.application.get("price").setValidators(null)
      this.application.get("price").updateValueAndValidity()
      this.application.get("package").setValidators(Validators.required)
      this.application.get("package").updateValueAndValidity()
      this.application.get("dob").setValidators(Validators.required)
      this.application.get("dob").setValue('')
      this.application.get("dob").updateValueAndValidity()
      this.application.get("product").setValidators(Validators.required)
      this.application.get("product").updateValueAndValidity()
      this.application.get("sum_insured").setValidators(null)
      this.application.get("sum_insured").setValue(false)
      this.application.get("sum_insured").updateValueAndValidity()
      this.application.get("brand").setValidators(null)
      this.application.get("brand").setValue(false)
      this.application.get("brand").updateValueAndValidity()
      this.application.get("deductible").setValidators(null)
      this.application.get("deductible").setValue(false)
      this.application.get("deductible").updateValueAndValidity()
    }
  }
  /*
    this method run when change package on medical line of business to hide or show add group of persons 
   */
  packageForChange(e) {
    this.medicalProducts = []
    let searchQuery = this.application.get("package").value == 'family' ? 'individual' : this.application.get("package").value
    if (this.application.get("package").value == "family" || this.application.get("package").value == "sme") {
      this.application.get("dob").setValidators(null)
      this.application.get("dob").setValue(false)
      this.application.get("dob").updateValueAndValidity()
      this.peopleGroup = []
      this.peopleGroup.push({
        name: '',
        type: '',
        gender: '',
        dob: '',
      })
    } else {
      this.application.get("family_age").setValidators(null)
      this.application.get("family_age").setValue(false)
      this.application.get("family_age").updateValueAndValidity()
    }
    this.selectedQuoteProducts.forEach(product => {
      if (product["package"] == searchQuery) {
        this.medicalProducts.push(product)
      }
    })
  }

  brandChange(e) {
    if (this.application.get("brand").value == 'all brands') {
      this.application.get("deductible").setValidators(Validators.required)
      this.application.get("deductible").updateValueAndValidity()
    } else {
      this.application.get("deductible").setValidators(null)
      this.application.get("deductible").setValue(false)
      this.application.get("deductible").updateValueAndValidity()
    }
  }
  /* add item from group (sme) or family in medical line of business */
  addAnotherPerson(e) {
    /*  e.preventDefault() */
    this.peopleGroup.push({
      name: '',
      type: '',
      gender: '',
      dob: '',
    })
  }
  /* delete item from group (sme) or family in medical line of business */
  deletePerson(index) {
    if (index > 0) {
      this.peopleGroup.splice(index, 1)
    }
  }
  /* this method for crate new insurance application */
  create() {

    if (this.application.valid) {
      if (this.application.get("package").value == 'family' || this.application.get("package").value == 'sme') {
        this.application.get("family_age").setValue(this.peopleGroup)
        console.log(this.peopleGroup)
        /* this.application.addControl */
        /* this.peopleGroup.forEach */
      }
      this.application.get("lob").setValue(parseInt(this.application.get("lob").value))
      this.application.get("product_id").setValue(parseInt(this.application.get("product_id").value))
      if (this.application.get("product").value != '')
        this.application.get("product").setValue(parseInt(this.application.get("product").value))
      this.application.get("id").setValue(this.AppInfo != undefined ? parseInt(this.AppInfo.id) : false)
      console.log("form validation", this.application.valid)
      console.log(this.application.value)
      let data = this.application.value
      if (this.AppInfo != undefined) {
        data.lob = this.applicationData.lob
        data.product_id = this.applicationData.product_id
        data.name = this.applicationData.name
        data.phone = this.applicationData.phone
        data.email = this.applicationData.email
        data.target_price = this.applicationData.target_price

      } else {
        this.applicationData = this.application.value
      }
      this.odoo.createInsuranceApplication(data)
        .then(res => {
          if (this.selectedLobName == "Motor" || this.selectedLobName == "Medical") {
            this.AppInfo = JSON.parse(JSON.stringify(res)).data.app[0]
            if (this.AppInfo != undefined) {

              this.application.get("lob").disable()
              this.application.get("product_id").disable()
              this.application.get("name").disable()
              this.application.get("phone").disable()
              this.application.get("email").disable()
              this.application.get("target_price").disable()

            }
          } else {
            this.router.navigateByUrl('/dashboard/ins-application-status')
          }
          console.log(res)
        }).catch(error => {
          console.log(error)
        })
      /* this.router.navigateByUrl('/dashboard/ins-application-status') */
    } else {
      this.getFormErrors()
    }

  }
  /* 
    for development method
    to return controls not valid 
  */
  getFormErrors() {
    console.log("form validation", this.application.valid)
    const result = [];
    Object.keys(this.application.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.application.get(key).errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach(keyError => {
          result.push({
            'control': key,
            'error': keyError,
            'value': controlErrors[keyError]
          });
        });
      }
    });

    console.log(result);
  }
  rejectQuote() {
    this.odoo.rejectPrice(this.AppInfo.id)
      .then(res => {
        console.log(res)
        this.router.navigateByUrl('/dashboard/insurance-list')
      }).catch(error => {
        console.log(error)
      })
  }
  acceptQuote() {
    this.odoo.approvePrice(this.AppInfo.id)
      .then(res => {
        this.router.navigate(['/dashboard/ins-application-status', this.AppInfo.id])
      }).catch(error => {
        console.log(error)
      })

  }
}
