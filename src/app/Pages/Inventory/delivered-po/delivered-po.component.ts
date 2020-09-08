import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';

@Component({
  selector: 'app-delivered-po',
  templateUrl: './delivered-po.component.html',
  styleUrls: ['./delivered-po.component.css']
})
export class DeliveredPOComponent implements OnInit {

  pickeroptions: NgDateRangePickerOptions;
  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public pageMenuTitle;
  public pO_PageTitle;
  public pO_BreadChrumb;
  public pO_Button;
  public pO_SelectDate;
  public pO_SelectVendor;
  public pO_SelectStatus;
  public pO_PONo;
  public pO_Type;
  public pO_Vendor;
  public pO_Date;
  public pO_User;
  public pO_Status;
  public pO_Details;
  public POList: any;
  public StatusList;
  public FilteredPOList;
  public VendorList;
  public selectedVendor;
  public inventoryid: any;
  public polist = [];
  ProjectID: any
  ngOnInit() {
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd-MM-yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,

    };
    this.ProjectID = localStorage.getItem('ProjectID');
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetPOLanguage(selectedlanguage);
    this.GetVendorForPurchase(selectedlanguage);
    this.GetPODashboard(selectedlanguage);
    this.GetStatusType();
  }

  public GetPOLanguage(languageid) {
    this.fmsservice.GetPOLanguage(languageid).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.pO_PageTitle = res[0].pO_PageTitle;
        this.pO_BreadChrumb = res[0].pO_BreadChrumb;
        this.pO_Button = res[0].pO_Button;
        this.pO_SelectVendor = res[0].pO_SelectVendor;
        this.pO_SelectStatus = res[0].pO_SelectStatus;
        this.pO_PONo = res[0].pO_PONo;
        this.pO_Type = res[0].pO_Type;
        this.pO_Vendor = res[0].pO_Vendor;
        this.pO_Date = res[0].pO_Date;
        this.pO_User = res[0].pO_User;
        this.pO_Status = res[0].pO_Status;
        this.pO_Details = res[0].pO_Details;
      }
    )
  }


  public GetVendorForPurchase(languageid) {
    this.fmsservice.GetVendorForPurchase(languageid).subscribe(
      res => {
        debugger;
        this.VendorList = res;

        this.VendorList.sort(function (a, b) {
          var nameA = a.short.toUpperCase(); // ignore upper and lowercase
          var nameB = b.short.toUpperCase(); // ignore upper and lowercase
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

  public GetStatusType() {
    this.fmsservice.GetStatusType().subscribe(
      res => {
        debugger;
        this.StatusList = res;
      }
    )
  }

  Count: any;
  public GetPODashboard(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetPODashboard("2020-01-01", "2020-12-31", languageid).subscribe(
      res => {
        debugger;
        this.POList = res;
        for (let i = 0; i < this.POList.length; i++) {
          debugger
          this.inventoryid = this.POList[i].inventoryType
        }
        this.FilteredPOList = this.POList.filter(x => x.status == 'Delivered' && x.buildingID == this.ProjectID);
        this.Count = this.FilteredPOList.length;
      }
    )
  }


  public FilterByVendors(evn) {
    debugger;
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
     this.FilteredPOList = this.POList.filter(x => x.status == 'Delivered' && x.buildingID == this.ProjectID);
      this.Count = this.FilteredPOList.length;
    }
    else {
      this.selectedVendor = evn.target.value;
      this.FilteredPOList = this.POList.filter(x => x.vendor == this.selectedVendor && x.status == 'Delivered');
      this.Count = this.FilteredPOList.length;
    }
  }

  public FilterByStatus(evn) {
    debugger;
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
     this.FilteredPOList = this.POList.filter(x => x.status == 'Delivered' && x.buildingID == this.ProjectID);
      this.Count = this.FilteredPOList.length;
    }
    else {
      let selected = evn.target.value;
      this.FilteredPOList = this.POList.filter(x => x.status == selected && x.vendor == this.selectedVendor);
      this.Count = this.FilteredPOList.length;
    }
  }

  public Information(evn) {
    debugger;
    this.GetPOItemDetails(evn.poid)
  }


  public GetPOItemDetails(POID) {
    this.fmsservice.GetPOItemDetails(POID).subscribe(
      res => {
        debugger;
        this.POList = res;
      }
    )
  }

  public Service(evn) {
    debugger;
    this.polist.length = 0
    this.polist.push(evn);
  }


}
