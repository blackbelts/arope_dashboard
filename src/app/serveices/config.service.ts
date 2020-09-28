import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  /* General Configration */
  public host = "http://207.154.195.214:4002";
  public baseurl = "http://207.154.195.214:4002/api/";
  public odooUrl = "http://207.154.195.214"
  public odooPort = 7070
  public odooDBName = "arope-space01"
  /* Api short cuts */
  public login = this.baseurl + "login"
  public allMethode = this.baseurl + "call_method/"
  /* Models names */
  public employeeModel = "hr.employee/"
  public policyModel = "policy.broker/"
  public claimsModel = "insurance.claim/"
  public partnerModel = "res.partner/"
  public countryModel = "res.country/"
  public stateModel = "res.country.state/"
  public insuranceSetupModel = "insurance.setup/"
  public userModel = "res.users/"
  public aropeBrokerModel = "arope.broker/"
  public insuranceQuotationModel = "insurance.quotation/"
  /* methods names */
  public searchRead = "search_read"
  public searchCount = "search_count"
  public create = "create"
  public delete = "unlink"
  public write = "write"
  public getDashboard = "get_dashboard"
  public LobAndProducts = "get_lob_and_products"
  public getPolicies = "get_policy"
  public getClaims = "get_claim"
  public getCollections = "get_unpaid"
  public createInsuranceApplication = "create_insurance_app"
  public approvePrice = "approve_price"
  public rejectPrice = "reject_price"
  public insuranceApplicationsList = "get_insurance_app_list"
  /* filters */
  constructor(
    public shared: SharedService
  ) {
    /* console.log(this.shared.user_id) */
  }



}
