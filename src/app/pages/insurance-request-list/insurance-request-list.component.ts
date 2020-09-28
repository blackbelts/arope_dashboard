import { Component, OnInit } from '@angular/core';
import { OdooService } from 'app/serveices/odoo.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-insurance-request-list',
  templateUrl: './insurance-request-list.component.html',
  styleUrls: ['./insurance-request-list.component.css']
})
export class InsuranceRequestListComponent implements OnInit {
  applications = []
  application_id
  offset = 0
  limit = 10
  count = 0
  searchQuery = ''
  constructor(
    public odoo: OdooService,
    public router: Router,

  ) {

    this.getApplications()
  }
  getApplications() {
    this.odoo.getInsuranceAppList(this.limit, this.offset, this.searchQuery)
      .then(res => {
        this.offset += this.limit
        console.log(res)
        this.count = parseInt(JSON.parse(JSON.stringify(res)).data.count)
        this.applications = JSON.parse(JSON.stringify(res)).data.apps
      })
  }
  ngOnInit(): void {
  }
  previous() {
    this.offset = this.offset - this.limit
    if (this.offset <= this.count) {
      this.offset = this.offset - this.limit
      this.getApplications()
    }
    else {
    }

  }
  next() {
    if (this.offset < this.count) {
      this.getApplications()
    } else {
    }

  }
  searchApplication(event) {
    this.searchQuery = event.target.value
    this.offset = 0
    this.getApplications()
  }

  applicationDetails(app) {
    this.router.navigate(['/dashboard/ins-application-status', app.id])
  }

}
