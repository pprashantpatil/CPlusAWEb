import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'
import { NgDateRangePickerOptions } from 'ng-daterangepicker';

@Component({
  selector: 'app-employee-salary-dashboard',
  templateUrl: './employee-salary-dashboard.component.html',
  styleUrls: ['./employee-salary-dashboard.component.css']
})
export class EmployeeSalaryDashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }

  public paymentsTitle;
  public employeesalarydashboardLanguage_pageTitle;
  public employeesalarydashboardLanguage_breadchrumb;
  public employeesalarydashboardLanguage_TotalSalary;
  public employeesalarydashboardLanguage_Building;
  public employeesalarydashboardLanguage_staffName;
  public employeesalarydashboardLanguage_GrossSalary;
  public employeesalarydashboardLanguage_Deductions;
  public employeesalarydashboardLanguage_NetSalary;
  public employeesalarydashboardLanguage_PaidDate;
  public employeesalarydashboardLanguage_PaidFortheMonth;
  public employeesalList: any;
  Buildinglist: any;
  selectedlanguage: any;
  BuildingSearch: any;
  BuildingID: any;
  value: any;
  options: NgDateRangePickerOptions;
  startdate: any;
  enddate: any;
  datelist = [];
  staffsalerylist: any;
  total: number;

  ngOnInit() {

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yMd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };


    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetemployeesalarydashboardByLanguageID(this.selectedlanguage);
    // this.GetStaffSalarybymonth(this.selectedlanguage);


    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(data => {
      debugger
      this.Buildinglist = data;
    })

  }

  public GetemployeesalarydashboardByLanguageID(languageid) {
    this.fmsservice.GetemployeesalarydashboardByLanguageID(languageid).subscribe(
      res => {
        debugger;
        this.paymentsTitle = res[0].paymentsTitle;
        this.employeesalarydashboardLanguage_pageTitle = res[0].employeesalarydashboardLanguage_pageTitle;
        this.employeesalarydashboardLanguage_breadchrumb = res[0].employeesalarydashboardLanguage_breadchrumb;
        this.employeesalarydashboardLanguage_TotalSalary = res[0].employeesalarydashboardLanguage_TotalSalary;
        this.employeesalarydashboardLanguage_Building = res[0].employeesalarydashboardLanguage_Building;
        this.employeesalarydashboardLanguage_staffName = res[0].employeesalarydashboardLanguage_staffName;
        this.employeesalarydashboardLanguage_GrossSalary = res[0].employeesalarydashboardLanguage_GrossSalary;
        this.employeesalarydashboardLanguage_Deductions = res[0].employeesalarydashboardLanguage_Deductions;
        this.employeesalarydashboardLanguage_NetSalary = res[0].employeesalarydashboardLanguage_NetSalary;
        this.employeesalarydashboardLanguage_PaidDate = res[0].employeesalarydashboardLanguage_PaidDate;
        this.employeesalarydashboardLanguage_PaidFortheMonth = res[0].employeesalarydashboardLanguage_PaidFortheMonth;


      }
    )
  }

  selectedDate(value) {
    this.datelist.pop()
    this.total = 0
    debugger
    this.datelist = value.split('-')

    this.startdate = this.datelist[0]
    this.enddate = this.datelist[1]
    debugger

    this.fmsservice.GetStaffSalarybymonth(this.startdate, this.enddate, this.BuildingID != undefined ? this.BuildingID : '', this.selectedlanguage).subscribe(data => {
      debugger
      this.employeesalList = data;

      if (this.employeesalList.length == 0) {

        this.total = 0

      }

      else {
        this.employeesalList.forEach(element => {
          debugger
          this.total = this.total + parseInt(element.netSalary)
        });
      }
    })
  }


  // public GetStaffSalarybymonth(languageid){

  //   let startdate=new Date();
  //   startdate.setDate(startdate.getMonth()-1);
  //   let enddate=new Date();
  //   debugger;
  //   let sdate =  this.datePipe.transform(startdate, 'yyyy-MM-dd');
  //   let edate =  this.datePipe.transform(enddate, 'yyyy-MM-dd');

  //   this.fmsservice.GetStaffSalarybymonth("2019-01-01","2019-12-31","The Civic",languageid).subscribe(
  //     res => {
  //       debugger;
  //       this.employeesalList=res;
  //     }
  //   )
  // }


  FilterBuilding(BuildingID) {
    this.total = 0
    debugger
    this.BuildingID = BuildingID.target.value

    if (this.BuildingID == '') {

      this.fmsservice.GetStaffSalarybymonth(this.startdate, this.enddate, this.BuildingID != undefined ? this.BuildingID : '', this.selectedlanguage).subscribe(data => {
        debugger
        this.employeesalList = data;

        if (this.employeesalList.length == 0) {

          this.total = 0

        }

        else {
          this.employeesalList.forEach(element => {
            debugger
            this.total = this.total + parseInt(element.netSalary)
          });
        }
      })
    }

    else {

      this.fmsservice.GetStaffSalarybymonth(this.startdate, this.enddate, this.BuildingID != undefined ? this.BuildingID : '', this.selectedlanguage).subscribe(data => {
        debugger
        this.employeesalList = data;

        var list = this.employeesalList.filter(x => x.building == this.BuildingID)
        debugger
        this.employeesalList = list
        debugger
        if (this.employeesalList.length == 0) {

          this.total = 0

        }

        else {
          this.employeesalList.forEach(element => {
            debugger
            this.total = this.total + parseInt(element.netSalary)
          });
        }


      })

    }

  }

}
