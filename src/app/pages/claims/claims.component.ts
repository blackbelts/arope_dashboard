import { Component, OnInit } from '@angular/core';
import { OdooService } from 'app/serveices/odoo.service';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {
  claims = []
  offset = 0
  limit = 10
  count = 0
  searchQuery = ''
  constructor(
    public odoo: OdooService
  ) {
    this.getClaims()
  }
  getClaims() {
    this.odoo.getClaims(this.limit, this.offset, this.searchQuery)
      .then(res => {
        this.offset += this.limit
        console.log(res)
        this.count = parseInt(JSON.parse(JSON.stringify(res)).data.count)
        this.claims = JSON.parse(JSON.stringify(res)).data.claims
      })
  }
  ngOnInit(): void {
  }
  previous() {
    this.offset = this.offset - this.limit
    if (this.offset <= this.count) {
      this.offset = this.offset - this.limit
      this.getClaims()
    }
    else {
    }

  }
  next() {
    if (this.offset < this.count) {
      this.getClaims()
    } else {
    }

  }
  searchClaim(event) {
    this.searchQuery = event.target.value
    this.offset = 0
    this.getClaims()
  }

}
