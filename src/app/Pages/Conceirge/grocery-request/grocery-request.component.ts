import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-grocery-request',
  templateUrl: './grocery-request.component.html',
  styleUrls: ['./grocery-request.component.css']
})
export class GroceryRequestComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;


  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public pageMenuTitle;
  public groceryrequest_PageTitle;
  public groceryrequest_BreadChrumb;
  public groceryrequest_Search;
  public groceryrequest_Date;
  public groceryrequest_Tenant;
  public groceryrequest_Building;
  public groceryrequest_Floor;
  public groceryrequest_Unit;
  public groceryrequest_Grocery;
  public groceryrequest_Status;
  public GroceryList: any;
  public Buildinglist;
  public BuildingID;
  public Floorlist;
  public FilteredGroceryList;
  public Search;

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
    this.GetGroceryrequestLanguage(selectedlanguage);
    this.GetGroceryRequest(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.GetVendorType(selectedlanguage);
  }

  public GetGroceryrequestLanguage(languageid) {
    this.fmsservice.GetGroceryrequestLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.groceryrequest_PageTitle = res[0].groceryrequest_PageTitle;
        this.groceryrequest_BreadChrumb = res[0].groceryrequest_BreadChrumb;
        this.groceryrequest_Search = res[0].groceryrequest_Search;
        this.groceryrequest_Date = res[0].groceryrequest_Date;
        this.groceryrequest_Tenant = res[0].groceryrequest_Tenant;
        this.groceryrequest_Building = res[0].groceryrequest_Building;
        this.groceryrequest_Floor = res[0].groceryrequest_Floor;
        this.groceryrequest_Unit = res[0].groceryrequest_Unit;
        this.groceryrequest_Grocery = res[0].groceryrequest_Grocery;
        this.groceryrequest_Status = res[0].groceryrequest_Status;
      }
    )
  }


  public GetGroceryRequest(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetGroceryRequest("2019-01-01", "2019-12-31", languageid).subscribe(
      res => {
        debugger;
        this.GroceryList = res;
        this.FilteredGroceryList = this.GroceryList;
      }
    )
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
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

  public GetFloor(evn) {
    debugger;
    this.BuildingID = evn.target.value;
    this.fmsservice.GetFloor(this.BuildingID).subscribe(
      res => {
        debugger;
        this.Floorlist = res;
        this.FilteredGroceryList = this.GroceryList.filter(x => x.buildingID == this.BuildingID);
      }
    )
  }


  public FilteredFloorList(evn) {
    debugger;
    this.FilteredGroceryList = this.GroceryList.filter(x => x.buildingID == this.BuildingID && x.floorID == evn.target.value);
  }


  public ID;
  public GroceryAssign(evn){
    this.ID = evn.id;
  }

  Vendlist;
  VendorID;
  VendorsByIDList;
  public GetVendorType(languageid) {
    debugger;
    this.fmsservice.GetVendorType(languageid).subscribe(
      res => {
        debugger;
        this.Vendlist = res;
      }
    )
  }

  public VendorByID(evn) {
    debugger;
    this.VendorID = evn.target.value
    this.GetVendorByTypeID(this.VendorID)
  }

  public GetVendorByTypeID(VendorID) {
    debugger;
    this.fmsservice.GetVendorByTypeID(VendorID).subscribe(
      res => {
        debugger;
        this.VendorsByIDList = res;
      }
    )
  }


  aaa;
  FileteredVendorsByIDList;
  vendorname;
  vendorphno;
  public VendorName(evn) {
    debugger;
    this.aaa = evn.target.value;
    this.FileteredVendorsByIDList = this.VendorsByIDList.filter(x => x.id == this.aaa);
    this.vendorname = this.FileteredVendorsByIDList[0].emailID;
    this.vendorphno = this.FileteredVendorsByIDList[0].phoneNo;
  }



  AssignedTo
  public UpdateAssignedTo() {
    debugger;
    var Entity =
    {
      'ID': this.ID,
      'AssignedTo': this.aaa,
    }
    this.fmsservice.UpdateGroceryAssigin(this.ID, this.aaa, Entity).subscribe(res => {
      debugger;
      Swal.fire('Grocery Request Assigned Successfully');
      //this.Clear();
      this.GetGroceryRequest(1);
    })
  }


  public CancelEntity = {
    ID: 0,
    CancelBit: 1,
    CancelReason: ""
  }



  CancelID
  public CancelRequest(evn) {
    debugger;
    this.CancelEntity.ID = evn.id;
   
  }


  public savecancelreason() {
    debugger;
    this.fmsservice.UpdateGroceryCancelbit(this.CancelEntity.ID, this.CancelEntity.CancelBit, this.CancelEntity.CancelReason, this.CancelEntity).subscribe(res => {
      debugger;
      Swal.fire('Grocery Request Cancelled Successfully');
      //this.Clear();
      this.GetGroceryRequest(1);
    })
  }


  groceryimg;
  public getimage(evn){
    debugger;
    this.groceryimg=evn;
  }

}
