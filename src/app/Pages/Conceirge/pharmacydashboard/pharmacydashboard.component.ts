import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pharmacydashboard',
  templateUrl: './pharmacydashboard.component.html',
  styleUrls: ['./pharmacydashboard.component.css']
})
export class PharmacydashboardComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;
  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
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
    //this.GetPharmacyrequestLanguage(selectedlanguage);
    this.GetPharmacyRequests(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
   // this.GetVendorType(selectedlanguage);
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
        this.FilteredPharmacyList=this.PharmacyList.filter(x=>x.delivered==true);
      }
    )
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;

        this.Buildinglist.sort(function(a, b) {
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
        this.FilteredPharmacyList=this.PharmacyList.filter(x=>x.buildingID==this.BuildingID);
      }
    )
  }

  public FilteredFloorList(evn){
    debugger;
    this.FilteredPharmacyList=this.PharmacyList.filter(x=>x.buildingID==this.BuildingID && x.floorID==evn.target.value);
  }



}
