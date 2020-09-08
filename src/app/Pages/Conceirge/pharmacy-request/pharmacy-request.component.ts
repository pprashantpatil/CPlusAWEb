import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-pharmacy-request',
  templateUrl: './pharmacy-request.component.html',
  styleUrls: ['./pharmacy-request.component.css']
})
export class PharmacyRequestComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;


  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public pageMenuTitle;
  public pharmacyrequest_PageTitle;
  public pharmacyrequest_breadchrumb;
  public pharmacyrequest_Date;
  public pharmacyrequest_Tenant;
  public pharmacyrequest_Building;
  public pharmacyrequest_Floor;
  public pharmacyrequest_Unit;
  public pharmacyrequest_Prescription;
  public pharmacyrequest_Status;
  public PharmacyList: any;
  public Buildinglist;
  public BuildingID;
  public Floorlist;
  public Search;
  public FilteredPharmacyList;

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
    this.GetPharmacyrequestLanguage(selectedlanguage);
    this.GetPharmacyRequests(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.GetVendorType(selectedlanguage);
  }
  public GetPharmacyrequestLanguage(languageid) {
    this.fmsservice.GetPharmacyrequestLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.pharmacyrequest_PageTitle = res[0].pharmacyrequest_PageTitle;
        this.pharmacyrequest_breadchrumb = res[0].pharmacyrequest_breadchrumb;
        this.pharmacyrequest_Date = res[0].pharmacyrequest_Date;
        this.pharmacyrequest_Tenant = res[0].pharmacyrequest_Tenant;
        this.pharmacyrequest_Building = res[0].pharmacyrequest_Building;
        this.pharmacyrequest_Floor = res[0].pharmacyrequest_Floor;
        this.pharmacyrequest_Unit = res[0].pharmacyrequest_Unit;
        this.pharmacyrequest_Prescription = res[0].pharmacyrequest_Prescription;
        this.pharmacyrequest_Status = res[0].pharmacyrequest_Status;
      }
    )
  }

  public GetPharmacyRequests(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetPharmacyRequests("2019-01-01", "2019-12-31", languageid).subscribe(
      res => {
        debugger;
        this.PharmacyList = res;
        this.FilteredPharmacyList = this.PharmacyList.filter(x=>x.delivered==false);;


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
        this.FilteredPharmacyList = this.PharmacyList.filter(x => x.buildingID == this.BuildingID);
      }
    )
  }


  public FilteredFloorList(evn) {
    debugger;
    this.FilteredPharmacyList = this.PharmacyList.filter(x => x.buildingID == this.BuildingID && x.floorID == evn.target.value);
  }

  public ID;
  public PharmacyAssign(evn) {
    debugger;
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
    this.fmsservice.UpdatePharmacyAssigin(this.ID, this.aaa, Entity).subscribe(res => {
      debugger;
      Swal.fire('Pharmacy Request Assigned Successfully');
      //this.Clear();
      this.GetPharmacyRequests(1);
    })
  }

  public CancelEntity = {
    ID: 0,
    CancelBit: 1,
    CancelledReason: ""
  }



  CancelID
  public CancelRequest(evn) {
    debugger;
    this.CancelEntity.ID = evn.id;
    //  this.fmsservice.UpdatePharmacyAssigin(this.CancelEntity.ID, this.CancelEntity.CancelledReason, this.CancelEntity).subscribe(res => {
    //   debugger;
    //   Swal.fire('Pharmacy Request Assigned Successfully');
    //   //this.Clear();
    //   this.GetPharmacyRequests(1);
    // })
  }


  public savecancelreason() {
    debugger;
    this.fmsservice.UpdatePharmacyCancelbit(this.CancelEntity.ID, this.CancelEntity.CancelBit, this.CancelEntity.CancelledReason, this.CancelEntity).subscribe(res => {
      debugger;
      Swal.fire('Pharmacy Request Cancelled Successfully');
      //this.Clear();
      this.GetPharmacyRequests(1);
    })
  }


  pharmacyimg;
  public getimage(evn){
    debugger;
    this.pharmacyimg=evn;
  }

}
