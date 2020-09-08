import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-stage-complete-menu-dash',
  templateUrl: './stage-complete-menu-dash.component.html',
  styleUrls: ['./stage-complete-menu-dash.component.css']
})
export class StageCompleteMenuDashComponent implements OnInit {

  constructor(public fmsService: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  Search: any;
  pickeroptions: any
  LoginTypeID
  UserID
  ProjectID
  FloorList: any
  ngOnInit() {
    this.FloorID=0;
    this.UnitID=0;
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.UserID = localStorage.getItem('UserID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsService.GetFloorTypebyBID(this.ProjectID).subscribe(
      res => {
        this.FloorList = res;
      }
    )
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.GetDailyUpdateMenu();

  }
  DailyUpdates: any
  public GetDailyUpdateMenu() {
    debugger
    this.fmsService.GetDailyUpdateMenu().subscribe(data => {
      debugger
      let temp: any = data;
      this.DailyUpdates = temp.filter(x => x.uPdateID == 2 && x.projectID == this.ProjectID);
    })
  }

  supportlist1 = [];
  ImagesOne: any;
  public GetPhotos(evn) {
    debugger
    let id = evn.id;
    this.fmsService.GetDailyUpdateMenuPhotos().subscribe(data => {
      debugger
      let temp: any = data;
      this.supportlist1 = temp.filter(x => x.dailyUpdateMenuIDID == id && x.updateID == 2);
      this.ImagesOne = this.supportlist1[0].photos;

    })
  }
  Newlistq = [];
  VedioOne: any;
  public GetVideos(evn) {
    let id = evn.id;
    this.fmsService.GetDailyUpdateMenuVideos().subscribe(data => {
      debugger
      let temp: any = data;
      this.Newlistq = temp.filter(x => x.dailyUpdateMenuIDID == id && x.updateID == 2);

      this.VedioOne = this.Newlistq[0].videos;

    })
  }


  datelist;
  startdate: Date;
  enddate: Date;
  value: any
  public selectedDate(value) {
    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger
    //Date date= new Date('dd-MM-yyyy');
    this.fmsService.GetDailyUpdateMenuByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      let temp: any = data;
      this.DailyUpdates = temp.filter(x => x.uPdateID == 2 && x.projectID == this.ProjectID);
    })
  }
  public GetUnit_MasterbyfloorID(FloorID) {
    this.fmsService.GetUnit_MasterbyfloorID(FloorID).subscribe(
      res => {
        this.UserRoleList = res;
      }
    )
  }
  FloorID
  UserRoleList
  public GetFloorID(evn) {
    this.FloorID = evn.target.value;
    this.GetUnit_MasterbyfloorID(evn.target.value);
    if (this.FloorID == 0) {
      this.GetDailyUpdateMenu();
    }
    else {
      this.fmsService.GetDailyUpdateMenu().subscribe(data => {
        debugger
        let temp: any = data;
        this.DailyUpdates = temp.filter(x => x.uPdateID == 2 && x.projectID == this.ProjectID && x.floorID == this.FloorID);
      })
    }
  }
  UnitID
  public GetUnitID(evn) {
    this.UnitID = evn.target.value;
    if (this.FloorID == 0) {
      Swal.fire('Select Floor First');
    }
    else {
      if (this.UnitID == 0) {
        this.fmsService.GetDailyUpdateMenu().subscribe(data => {
          debugger
          let temp: any = data;
          this.DailyUpdates = temp.filter(x => x.uPdateID == 2 && x.projectID == this.ProjectID && x.floorID == this.FloorID);
        })
      }
      else {
        this.fmsService.GetDailyUpdateMenu().subscribe(data => {
          debugger
          let temp: any = data;
          this.DailyUpdates = temp.filter(x => x.uPdateID == 2 && x.projectID == this.ProjectID && x.floorID == this.FloorID && x.unitID == this.UnitID);
        })
      }
    }
  }

}

