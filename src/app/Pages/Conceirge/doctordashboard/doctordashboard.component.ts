import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-doctordashboard',
  templateUrl: './doctordashboard.component.html',
  styleUrls: ['./doctordashboard.component.css']
})
export class DoctordashboardComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;


  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }

  public pageMenuTitle;
  public doctorrequest_PageTitle;
  public doctorrequest_breadchrumb;
  public doctorrequest_Search;
  public doctorrequest_Tenant;
  public doctorrequest_Building;
  public doctorrequest_Floor;
  public doctorrequest_Unit;
  public doctorrequest_Patient;
  public doctorrequest_PatientAge;
  public doctorrequest_Doctor;
  public doctorrequest_Reason;
  public doctorrequest_Status;
  public DoctorList: any;
  public Buildinglist;
  public BuildingID;
  public Floorlist;
  public FilteredDoctorList;
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
   // this.GetDoctorrequestLanguage(selectedlanguage);
    this.GetDoctorRequest(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
  }


  public GetDoctorRequest(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetDoctorVisitedlistWeb("2019-01-01", "2019-12-31", languageid).subscribe(
      res => {
        debugger;
        this.DoctorList = res;
        this.FilteredDoctorList = this.DoctorList;
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
        this.FilteredDoctorList = this.DoctorList.filter(x => x.buildingID == this.BuildingID);
      }
    )
  }


  public FilteredFloorList(evn) {
    debugger;
    this.FilteredDoctorList = this.DoctorList.filter(x => x.buildingID == this.BuildingID && x.floorID == evn.target.value);
  }

}
