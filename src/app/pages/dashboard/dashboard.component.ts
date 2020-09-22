import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { OdooService } from 'app/serveices/odoo.service';


@Component({
  selector: 'dashboard-cmp',
  moduleId: module.id,
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']

})

export class DashboardComponent implements OnInit {

  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public dashboard
  constructor(public odoo: OdooService) {
    this.odoo.updateToken()
    this.odoo.get_dashboard()
      .then(res => {
        this.dashboard = JSON.parse(JSON.stringify(res)).data
        console.log(res)
        this.chartColor = "#FFFFFF";
        this.canvas = document.getElementById("targetProduction");
        this.ctx = this.canvas.getContext("2d");
        this.chartHours = new Chart(this.ctx, {
          type: 'bar',
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            datasets: [{
              label: 'Target',
              data: this.dashboard.targetVsProduction.target,
              borderColor: '#3EB650',
              borderWidth: 2,
              type: 'line',
              backgroundColor: 'rgba(0, 0, 0, 0)'

            }, {
              label: 'Production',
              data: this.dashboard.targetVsProduction.production,
              backgroundColor: '#3778C2',
              borderColor: '#3778C2',
              borderWidth: 1
            }
            ]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
        let canvas2: any = document.getElementById("currentVsLast"),
          ctx2 = canvas2.getContext("2d");
        this.chartHours = new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
            datasets: [{
              label: 'Current Year',
              data: this.dashboard.lastVsCurrentYear.current_year,
              borderColor: '#3EB650',
              borderWidth: 2,
              backgroundColor: 'rgba(0, 0, 0, 0)'

            }, {
              label: 'Last Year',
              data: this.dashboard.lastVsCurrentYear.last_year,
              backgroundColor: '#3778C2',
              borderColor: '#3778C2',
              borderWidth: 1
            }
            ]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            }
          }
        });
      }).catch(error => {
        console.log(error)
      })
  }

  ngOnInit() {
  }
}
