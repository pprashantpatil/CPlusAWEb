import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css']
})
export class WorkSpaceComponent implements OnInit {

  public pageMenuTitle;
  public workSpaceBooking_PageTitle;
  public workSpaceBooking_BreadChrumb;
  public workSpaceBooking_Building;
  public workSpaceBooking_Floor;
  public workSpaceBooking_Type;
  public workSpaceBooking_WorkStation;
  public workSpaceBooking_Name;
  public workSpaceBooking_Mobile;
  public workSpaceBooking_Email;
  public workSpaceBooking_Company;
  public workSpaceBooking_StartDate;
  public workSpaceBooking_EndDate;
  public workSpaceBooking_StartTime;
  public workSpaceBooking_EndTime;
  public workSpaceBooking_Save;
  public Buildinglist: any;
  public Floorlist: any;
  public Typelist: any;
  public Workspacelist: any;
  public filteredwslist: any;
  public WorkstationID;

  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public workspaceBooking = {
    BuildingID: 0,
    FloorID: 0,
    WsType: 0,
    WorkstationID: 0,
    Name: "",
    MobileNumber: "",
    Email: "",
    Company: "",
    startDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    enddate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    startTime: "",
    endTime: "",
    Facilities: "All",
    Unit: 22,
    RaisedBy: 1,
    LanguageID: 0

  };

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }

  ngOnInit() {

    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetWorkSpaceBookingLanguage(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    // this.GetFloor(1);
    this.Get_WorkStationType_Master(selectedlanguage);
    //  this.GetWorkSpaceDetails(1,276)
    // this.workspaceBooking.BuildingID = "Select Building";
    // this.workspaceBooking.FloorID = "Select Floor";
    // this.workspaceBooking.WsType = "Select Type";
    // this.workspaceBooking.WorkstationID = "Select Workspace";
  }

  GetWorkSpaceBookingLanguage(id) {
    this.fmsservice.GetWorkSpaceBookingLanguage(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.workSpaceBooking_PageTitle = res[0].workSpaceBooking_PageTitle;
        this.workSpaceBooking_BreadChrumb = res[0].workSpaceBooking_BreadChrumb;
        this.workSpaceBooking_Building = res[0].workSpaceBooking_Building;
        this.workSpaceBooking_Floor = res[0].workSpaceBooking_Floor;
        this.workSpaceBooking_Type = res[0].workSpaceBooking_Type;
        this.workSpaceBooking_WorkStation = res[0].workSpaceBooking_WorkStation;
        this.workSpaceBooking_Name = res[0].workSpaceBooking_Name;
        this.workSpaceBooking_Mobile = res[0].workSpaceBooking_Mobile;
        this.workSpaceBooking_Email = res[0].workSpaceBooking_Email;
        this.workSpaceBooking_Company = res[0].workSpaceBooking_Company;
        this.workSpaceBooking_StartDate = res[0].workSpaceBooking_StartDate;
        this.workSpaceBooking_EndDate = res[0].workSpaceBooking_EndDate;
        this.workSpaceBooking_StartTime = res[0].workSpaceBooking_StartTime;
        this.workSpaceBooking_EndTime = res[0].workSpaceBooking_EndTime;
        this.workSpaceBooking_Save = res[0].workSpaceBooking_Save;
      }

    )
  }

  public GetBuildinglist(languageID) {
    this.fmsservice.GetBuildinglist(languageID).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }

  public GetFloor(evn) {
    debugger;
    let BuildingID = evn.target.value;
    this.fmsservice.GetFloor(BuildingID).subscribe(
      res => {
        debugger;
        this.Floorlist = res;
      }
    )
  }

  public Get_WorkStationType_Master(languageid) {
    this.fmsservice.Get_WorkStationType_Master(languageid).subscribe(
      res => {
        debugger;
        this.Typelist = res;
      }
    )
  }
  public GetWorkSpaceDetails(evn) {
    debugger;

    let floordetails = this.Floorlist.filter(x => x.id == evn.target.value)
    let BID = floordetails[0].buildingID;
    let FID = floordetails[0].id;
    this.fmsservice.GetWorkSpaceDetails(BID, FID).subscribe(
      res => {
        debugger;
        this.Workspacelist = res.filter(x => x.booked == 1);
        this.filteredwslist = this.Workspacelist;
      }
    )
  }


  public filterbytype(evn) {
    debugger;
    let wstypeid = evn.target.value;
    if (wstypeid == "none") {
      this.filteredwslist = this.Workspacelist;
    }
    else {
      this.filteredwslist = this.Workspacelist.filter(x => x.workStationType == wstypeid);
    }
  }


  Isempty = false;
  EmailValid;
  PhoneNumberValid;
  public InsertWorkplaceRequest() {
    debugger;
    let mandatoryfields = {
      BuildingID: this.workspaceBooking.BuildingID,
      FloorID: this.workspaceBooking.FloorID,
      Unit: this.workspaceBooking.Unit,
      WsType: this.workspaceBooking.WsType,
      WorkstationID: this.workspaceBooking.WorkstationID,
      startTime: this.workspaceBooking.startTime,
      endTime: this.workspaceBooking.endTime
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {
      this.EmailValid = this.fmsservice.validateEmail(this.workspaceBooking.Email);
      debugger;
      this.PhoneNumberValid = this.fmsservice.phonenumber(this.workspaceBooking.MobileNumber);
      if (this.EmailValid == false || this.PhoneNumberValid == false) {

      } else {

        if (this.workspaceBooking.startDate == this.workspaceBooking.enddate) {
          debugger;
          if(!( new Date(this.workspaceBooking.startTime) < new Date(this.workspaceBooking.endTime))){
            debugger;
            Swal.fire("End Time Cannot be greater than Start Time");
          }
          else{
            this.workspaceBooking.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
            let test = this.workspaceBooking;
            this.fmsservice.InsertWorkplaceRequest(this.workspaceBooking).subscribe(res => {
              Swal.fire('Workspace  Saved Sucessfully');
              this.Clear();

            })
          }
        }
        else {
          if (!(new Date(this.workspaceBooking.startDate) < new Date(this.workspaceBooking.enddate))) {
            Swal.fire("End Date Cannot be greater than Start Date");
          } else {
            this.workspaceBooking.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
            let test = this.workspaceBooking;
            this.fmsservice.InsertWorkplaceRequest(this.workspaceBooking).subscribe(res => {
 
              Swal.fire('Workspace  Saved Sucessfully');
              this.Clear();

            })
          }
        }

      }

    }


  }

  public Clear() {
    this.workspaceBooking.BuildingID = 0;
    this.workspaceBooking.FloorID = 0;
    this.workspaceBooking.WsType = 0;
    this.workspaceBooking.WorkstationID = 0;
    this.workspaceBooking.Name = "";
    this.workspaceBooking.MobileNumber = "";
    this.workspaceBooking.Email = "";
    this.workspaceBooking.Company = "";
    this.workspaceBooking.startDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.workspaceBooking.enddate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.workspaceBooking.startTime = "";
    this.workspaceBooking.endTime = "";
  }

}
