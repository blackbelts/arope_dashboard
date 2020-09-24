import { Component, OnInit } from '@angular/core';
import { OdooService } from 'app/serveices/odoo.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  policies = []
  offset = 0
  limit = 10
  count = 0
  searchQuery = ''
  constructor(
    public odoo: OdooService
  ) {
    this.getPolicies()
  }
  getPolicies() {
    this.odoo.getPolicies(this.limit, this.offset, this.searchQuery)
      .then(res => {
        console.log(res)
        this.offset += this.limit
        this.count = parseInt(JSON.parse(JSON.stringify(res)).data.count)
        this.policies = JSON.parse(JSON.stringify(res)).data.policies
      })
  }
  ngOnInit(): void {
  }
  previous() {
    this.offset = this.offset - this.limit
    if (this.offset <= this.count) {
      this.offset = this.offset - this.limit
      this.getPolicies()
    }
    else {
    }

  }
  next() {
    if (this.offset < this.count) {
      this.getPolicies()
    } else {
    }

  }
  searchPolicy(event) {
    this.searchQuery = event.target.value
    this.offset = 0
    this.getPolicies()
  }
}
