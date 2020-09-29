import { Component, OnInit } from '@angular/core';
import Stepper from 'bs-stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { OdooService } from 'app/serveices/odoo.service';
import { ConfigService } from 'app/serveices/config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-insurance-request-stepper',
  templateUrl: './insurance-request-stepper.component.html',
  styleUrls: ['./insurance-request-stepper.component.css']
})
export class InsuranceRequestStepperComponent implements OnInit {
  private stepper: Stepper;
  application_id
  offers = []
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
  attachments
  uploadedAttachment = {
    documents: [],
    id: ''
  }
  file
  constructor(
    private router: Router,
    public routerActive: ActivatedRoute,
    public odoo: OdooService,
    public http: HttpClient,
    public config: ConfigService
  ) {
    this.application_id = this.routerActive.snapshot.paramMap.get("id")

  }

  ngOnInit(): void {
    this.odoo.getApplicationInfo(parseInt(this.application_id))
      .then(res => {
        this.appInfo = JSON.parse(JSON.stringify(res)).data.app[0]
        console.log(this.appInfo)
        this.offers = JSON.parse(JSON.stringify(res)).data.offers
        this.attachments = JSON.parse(JSON.stringify(res)).data.attachment
        console.log(this.attachments)
        this.stepper = new Stepper(document.querySelector("#application-stepper"), {
          linear: false,
          animation: true
        });
      })

  }
  next(e) {
    e.preventDefault()
    this.stepper.next();
  }
  onSubmit() {
    return false;
  }
  downloadFile(id) {
    console.log("downloadQuestionnaire")
    window.open(this.config.getDownloadFileById(id))
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.file = reader.result
    };
  }
 
  upload() {

    this.odoo.upload_file(this.file.toString().replace('data:application/pdf;base64,', ''), this.appInfo.id)
      .then(res => {
        console.log(res)
        // console.log(res)
      })
  }
  approveOffer(id) {
    this.odoo.acceptOffer(id)
      .then(res => {
        console.log(res)
      })
  }
  rejectOffer(id) {
    this.odoo.rejectOffer(id)
      .then(res => {
        console.log(res)
      })
  }
  handleUploadAttachment(event, id) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.uploadedAttachment.documents.push({
        id: id,
        file: reader.result.toString().replace('data:application/pdf;base64,', '')
      })
    };
  }
  uploadAttachments() {
    this.uploadedAttachment.id = this.appInfo.id
    this.odoo.uploadAttachmentsDocuments(this.uploadedAttachment)
      .then(res => {
        console.log(res)
      })
    console.log(this.uploadedAttachment)
  }
}
