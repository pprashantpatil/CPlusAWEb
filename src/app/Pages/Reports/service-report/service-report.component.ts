import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';
@Component({
  selector: 'app-service-report',
  templateUrl: './service-report.component.html',
  styleUrls: ['./service-report.component.css']
})
export class ServiceReportComponent implements OnInit {

  public ageingMonths = [
    { id: 1, Name: "Jan", Noofday: 31 },
    { id: 1, Name: "Feb", Noofday: 28 },
    { id: 1, Name: "March", Noofday: 31 },
    { id: 1, Name: "April", Noofday: 30 },
    { id: 1, Name: "May", Noofday: 31 },
    { id: 1, Name: "June", Noofday: 30 },
    { id: 1, Name: "July", Noofday: 30 },
    { id: 1, Name: "Aug", Noofday: 31 },
    { id: 1, Name: "Sep", Noofday: 30 },
    { id: 1, Name: "October", Noofday: 31 },
    { id: 1, Name: "Nov", Noofday: 30 },
    { id: 1, Name: "Dec", Noofday: 31 },
  ]

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }

  ngOnInit() {
    //this.GetAgingReport();
    this.GetRentType(1);
    this.RentTypeID = 1;



    this.RentForTheMonth = 11;
    this.GetAgingReport(this.RentForTheMonth, this.RentTypeID);
  }




  Rentlist
  public GetRentType(languageid) {
    this.fmsservice.GetRentType(languageid).subscribe(
      res => {
        this.Rentlist = res;
      }
    )
  }


  RentTypeID
  public FilterByRent(evn) {
    this.RentTypeID = evn.target.value;
  }

  RentForTheMonth
  public GetRentPaymentMontn(evn) {
    this.RentForTheMonth = evn.target.value;
    this.GetAgingReport(this.RentForTheMonth, this.RentTypeID);
  }

  AgeingReport;
  TenantPaidCount;
  TenantsUnpaidCount;
  TenantList;
  public UnpaidTenents = [];
  public GetAgingReport(RentForTheMonth, RentTypeID) {
    debugger;
    RentForTheMonth
    // let oneDay = 24 * 60 * 60 * 1000;
    // let year = new Date().getFullYear();
    // var date1 = new Date(2019, 1, 31);
    // var date2 = new Date();
    // var Difference_In_Time = Math.round(Math.abs((Number(date1) - Number(date2)) / oneDay));


    let agingdays = 0;

    let currentmonth = new Date().getMonth() + 1;

    for (let k = 0; k < (currentmonth - (Number(RentForTheMonth))); k++) {
      debugger;
      agingdays = agingdays + this.ageingMonths[k].Noofday;
    }

    this.fmsservice.GetAgingReport(RentForTheMonth, RentTypeID).subscribe(
      res => {

        this.AgeingReport = res;
        this.TenantPaidCount = this.AgeingReport.length;


        for (let k = 0; k < this.AgeingReport.length; k++) {
          this.AgeingReport[k]["status"] = "paid";
        }
        this.fmsservice.GetTenantList(1).subscribe(
          res => {
            this.TenantList = res;
            //Merge logic
            this.UnpaidTenents.length = 0;
            for (let i = 0; i < this.TenantList.length; i++) {
              let RentPaidReport = {
                tenantName: "",
                rentTypeID: 0,
                buildingName: "",
                floor: "",
                unitID: "",
                rentAmount: 0,
                penalty: "",
                date: "",
                rentAging: agingdays + new Date().getDate(),
                status: "pending"
              }
              let ispaid = this.AgeingReport.filter(x => x.id == this.TenantList[i].id);
              if (ispaid.length == 0) {
                RentPaidReport.tenantName = this.TenantList[i].tenantName;
                RentPaidReport.buildingName = this.TenantList[i].buildingName;
                RentPaidReport.floor = this.TenantList[i].floor1;
                RentPaidReport.unitID = this.TenantList[i].unitID;
                this.UnpaidTenents.push(RentPaidReport);
                this.TenantsUnpaidCount = this.UnpaidTenents.length;
              }


            }

          }
        )

      }
    )
  }




}
