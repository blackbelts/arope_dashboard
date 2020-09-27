import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class OdooService {
  headers = {
    "Content-Type": "application/json",
  }
  constructor(
    public config: ConfigService,
    public http: HttpClient,
    public shared: SharedService
  ) { }
  login(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.config.login, {
        "url": this.config.odooUrl,
        "port": this.config.odooPort,
        "db": this.config.odooDBName,
        "username": data.username,
        "password": data.password
      },
        { headers: this.headers })
        .subscribe(res => {
          let user = JSON.parse(JSON.stringify(res))
          this.headers["Authorization"] = "Bearer " + user.token
          resolve(res);
        }, e => {
          reject(e)
        })
    })
  }
  updateToken() {
    this.headers["Authorization"] = "Bearer " + this.shared.user_token
  }
  /* ///////////////////////////////////////////////////////////////////// */
  /* ///////////////////////////General Methods/////////////////////////// */
  /* ///////////////////////////////////////////////////////////////////// */
  /* 
    this methods contains main functions at any model in Odoo like
    1- Create => to create a record in odoo model
    2- Unlink => to delete a record from odoo model
    3- Write =>  to update a record in odoo model
    4- Search Count => to retrieve Count of any data depend on search filter using odoo db
    5- Search Read => to retrieve information of any data depend on search filter using odoo db
   */
  create(model, data) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + model
        + this.config.create, {
        "paramlist": [data]
      },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
      })
    })
  }

  unlink(id, model) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + model
        + this.config.delete, {
        "paramlist": [id]
      },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
      })
    })
  }
  update(model, id, lead) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + model
        + this.config.write, {
        "paramlist": {
          id: [id],
          edit: lead
        }
      },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
      })
    })
  }
  /* if count == true using search count method else using search read method  */
  search(model, filters, count: boolean) {
    let method = count ? this.config.searchCount : this.config.searchRead
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + model
        + (count ? this.config.searchCount : this.config.searchRead), {
        "paramlist": {
          filter: filters
        }
      },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
      })
    })
  }
  /* ///////////////////////////////////////////////////////////////////// */
  /* ///////////Custom functions By Black Belts Odoo Developers/////////// */
  /* ///////////////////////////////////////////////////////////////////// */
  get_dashboard() {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.aropeBrokerModel
        + this.config.getDashboard, {
        "paramlist": {
          user: parseInt(this.shared.user_id),
        }
      },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error)
      })
    })
  }
  getLobAndProducts() {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.aropeBrokerModel
        + this.config.LobAndProducts, {
        "paramlist": {
        }
      },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error)
      })
    })
  }
  getPolicies(limit, offset, policy_num) {
    if (policy_num == '')
      policy_num = false
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.aropeBrokerModel
        + this.config.getPolicies, {
        "paramlist": {
          data: {
            id: parseInt(this.shared.user_id),
            limit: limit,
            offset: offset,
            policy_num: policy_num
          }
        }
      },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error)
      })
    })
  }
  getClaims(limit, offset, claim_num) {
    if (claim_num == '')
      claim_num = false
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.aropeBrokerModel
        + this.config.getClaims, {
        "paramlist": {
          data: {
            id: parseInt(this.shared.user_id),
            limit: limit,
            offset: offset,
            claim_no: claim_num
          }
        }
      },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error)
      })
    })
  }
  getCollections(limit, offset, policy_num) {
    if (policy_num == '')
      policy_num = false
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.aropeBrokerModel
        + this.config.getCollections, {
        "paramlist": {
          data: {
            id: parseInt(this.shared.user_id),
            limit: limit,
            offset: offset,
            policy_num: policy_num
          }
        }
      },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error)
      })
    })
  }
  createInsuranceApplication(data) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.config.allMethode
        + this.config.aropeBrokerModel
        + this.config.createInsuranceApplication, {
        "paramlist": {
          data: data
        }
      },
        { headers: this.headers }
      ).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error)
      })
    })

  }
}

