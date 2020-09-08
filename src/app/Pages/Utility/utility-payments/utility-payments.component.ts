import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';


@Component({
  selector: 'app-utility-payments',
  templateUrl: './utility-payments.component.html',
  styleUrls: ['./utility-payments.component.css']
})
export class UtilityPaymentsComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;
  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public pageMenuTitle;
  public utilityPayments_PageTitle;
  public utilityPayments_BreadChrumb;
  public utilityPayments_Button;
  public utilityPayments_Search;
  public utilityPayments_BillType;
  public utilityPayments_BillDate;
  public utilityPayments_TenantName;
  public utilityPayments_Month;
  public utilityPayments_Amount;
  public utilityPayments_Bulding;
  public utilityPayments_Floor;
  public utilityPayments_Unit;
  public Buildinglist;
  public BuildingSearch;
  public FilteredUtilitiesList;



  public UtilitiesList: any;
  ngOnInit() {

    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,

    };
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetBuildinglist(selectedlanguage);
    this.GetUtilityPaymentsLanguage(selectedlanguage);
    this.GetUtilities(selectedlanguage);

  }

  public GetUtilityPaymentsLanguage(languageid) {
    this.fmsservice.GetUtilityPaymentsLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.utilityPayments_PageTitle = res[0].utilityPayments_PageTitle;
        this.utilityPayments_BreadChrumb = res[0].utilityPayments_BreadChrumb;
        this.utilityPayments_Button = res[0].utilityPayments_Button;
        this.utilityPayments_Search = res[0].utilityPayments_Search;
        this.utilityPayments_BillType = res[0].utilityPayments_BillType;
        this.utilityPayments_BillDate = res[0].utilityPayments_BillDate;
        this.utilityPayments_TenantName = res[0].utilityPayments_TenantName;
        this.utilityPayments_Month = res[0].utilityPayments_Month;
        this.utilityPayments_Amount = res[0].utilityPayments_Amount;
        this.utilityPayments_Bulding = res[0].utilityPayments_Bulding;
        this.utilityPayments_Floor = res[0].utilityPayments_Floor;
        this.utilityPayments_Unit = res[0].utilityPayments_Unit;
      }
    )
  }


  public GetUtilities(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetUtilities("2019-07-07 00:00:00.000", "2019-10-15 12:46:23.513", languageid).subscribe(
      res => {
        debugger;
        this.UtilitiesList = res;
        this.FilteredUtilitiesList = this.UtilitiesList;
      }
    )
  }

  public GetBuildinglist(languageid) {
    debugger;
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        this.Buildinglist = res;

        this.Buildinglist.sort(function (a, b) {
          var nameA = a.name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          // names must be equal
          return 0;
        });


      }
    )
  }


  public FilterByBuildingname(evn) {
    debugger;
    if (evn.target.value == "none") {

      this.FilteredUtilitiesList = this.UtilitiesList;
    }
    else {
      let selectedBuilding = evn.target.value;
      this.FilteredUtilitiesList = this.UtilitiesList.filter(x => x.building == selectedBuilding);

    }
  }


}
