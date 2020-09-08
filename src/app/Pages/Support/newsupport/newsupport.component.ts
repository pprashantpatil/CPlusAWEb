import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-newsupport',
  templateUrl: './newsupport.component.html',
  styleUrls: ['./newsupport.component.css']
})
export class NewsupportComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;
  RoleTypeList: any[];
  userRoletype: any;
  ModuleList: any[];


  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }

  public pageMenuTitle;
  public support_PageTitle;
  public support_BreadChrumb;
  public support_Name;
  public support_Country;
  public support_State;
  public support_City;
  public support_Date;
  public support_Building;
  public support_Floor;
  public support_Notes;
  public support_Attachment;
  public support_Save;
  public support_Unit;
  public CountryTypeList: any;
  public Statelist;
  public Citylist;
  public Buildinglist;
  public Floorlist;
  floorID: any;
  unitlist: any;
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public SupportEntity = {
    CityID: 1,
    BuildingID: 1,
    UserID: 0,
    Short: "",
    Description: "",
    PhotoURL: "NULL",
    date: Date,
    LanguageID: 1,
    Floor: 0,
    unit: 0,
    RoleType: '',
    CompanyID: 0
  }


  ngOnInit() {

    this.SupportEntity.RoleType = localStorage.getItem('username');

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
    this.GetSupportLanguage(selectedlanguage);

    this.GetBuildinglist(selectedlanguage);
    this.GetUserRoleType(selectedlanguage);
  }
  public GetSupportLanguage(languageid) {
    this.fmsservice.GetSupportLanguage(languageid).subscribe(
      res => {

        this.pageMenuTitle = res[0].pageMenuTitle;
        this.support_PageTitle = res[0].support_PageTitle;
        this.support_BreadChrumb = res[0].support_BreadChrumb;
        this.support_Name = res[0].support_Name;
        this.support_Country = res[0].support_Country;
        this.support_State = res[0].support_State;
        this.support_City = res[0].support_City;
        this.support_Date = res[0].support_Date;
        this.support_Building = res[0].support_Building;
        this.support_Floor = res[0].support_Floor;
        this.support_Notes = res[0].support_Notes;
        this.support_Attachment = res[0].support_Attachment;
        this.support_Save = res[0].support_Save;
        this.support_Unit = res[0].support_Unit;
        this.GetCountryType(languageid);
      }
    )
  }

  filterrole(RoleType) {
    this.SupportEntity.RoleType = RoleType.target.value;

  }

  public GetCountryType(languageid) {
    debugger;
    this.fmsservice.GetCountryType(languageid).subscribe(
      data => {
        debugger;
        this.CountryTypeList = data;
      }
    )
  }


  public GetState(evn) {
    debugger;
    let CountryID = evn.target.value;
    this.fmsservice.GetStateType(1, CountryID).subscribe(
      res => {
        debugger;
        this.Statelist = res;
      }
    )
  }


  public GetCity(evn) {
    debugger;
    let StateID = evn.target.value;
    this.fmsservice.GetCityType(1, StateID).subscribe(
      res => {
        debugger;
        this.Citylist = res;
      }
    )
  }


  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }
  public GetUserRoleType(languageid) {
    this.fmsservice.GetUserrole(languageid).subscribe(
      res => {
        debugger;
        this.ModuleList = res;
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

  getunitlist(id) {
    debugger
    this.floorID = id.target.value;

    this.fmsservice.GetUnit_MasterbyfloorID(this.floorID).subscribe(data => {
      debugger

      this.unitlist = data;
    })

  }
  InsertSupportMob


  Isempty = false;
  public InsertSupport() {
    debugger;
    this.SupportEntity.UserID = Number(localStorage.getItem('userid').toString());
    this.SupportEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'));
    this.SupportEntity.CompanyID = Number(localStorage.getItem('userid'));
    let test = this.SupportEntity;

    let mandatoryfields = {
      CityID: this.SupportEntity.CityID,
      BuildingID: this.SupportEntity.BuildingID,
      RoleType: this.SupportEntity.RoleType
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {
      debugger;
      this.fmsservice.InsertSupport(this.SupportEntity).subscribe(res => {
        debugger;
        Swal.fire('Successfully Saved!');
        this.Clear();
        location.href = "#/Supportdash";
      })
    }
  }

  public Clear() {
    this.SupportEntity.CityID = 0,
      this.SupportEntity.BuildingID = 0,
      this.SupportEntity.UserID = 0,
      this.SupportEntity.Short = "",
      this.SupportEntity.Description = "",
      this.SupportEntity.RoleType = '',
      //this.SupportEntity.PhotoURL= "",
      this.SupportEntity.date = Date

  }

  onFilesAdded(files: File[]) {
    this.fmsservice.SupportPhotoUpload(files).subscribe(res => {
      this.SupportEntity.PhotoURL = res.toString();

    })


    //   console.log(files);
    //  debugger;
    //   files.forEach(file => {
    //     const reader = new FileReader();

    //     reader.onload = (e: ProgressEvent) => {
    //       const content = (e.target as FileReader).result;

    //       // this content string could be used directly as an image source
    //       // or be uploaded to a webserver via HTTP request.
    //       console.log(content);
    //     };

    //     // use this for basic text files like .txt or .csv
    //     reader.readAsText(file);

    //     // use this for images
    //     // reader.readAsDataURL(file);
    //   });
  }

}
