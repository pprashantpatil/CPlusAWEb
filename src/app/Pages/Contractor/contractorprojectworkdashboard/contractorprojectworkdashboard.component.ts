import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contractorprojectworkdashboard',
  templateUrl: './contractorprojectworkdashboard.component.html',
  styleUrls: ['./contractorprojectworkdashboard.component.css']
})
export class ContractorprojectworkdashboardComponent implements OnInit {

  constructor(public fmsService: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  ProjectAssignedLists: any
  Contractorid
  Contractorlist
  BuildingList: any
  ProjectID: any
  pickeroptions: any
  ngOnInit() {
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.statusid = 0;
    this.Contractorid = 0;
    //this.ProjectID =80;
    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsService.Get_SubContractor().subscribe(data => {
      debugger
      let temp: any = data;
      this.Contractorlist = temp;
    })
    this.fmsService.GetBuildinglist(1).subscribe(
      res => {
        debugger;
        this.BuildingList = res;
      }
    )

    this.fmsService.GetDailyUpdateMenu().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectAssignedLists = temp.filter(x => x.projectID == this.ProjectID && x.uPdateID == 1);
    })

  }
  photos: any
  public getphpto(id) {
    debugger
    this.fmsService.GetProjectContractorAssign_workPhotos().subscribe(data => {
      debugger
      let temp: any = data;
      this.photos = temp.filter(x => x.projectContractorAssignID == id);
    })
  }


  Search
  public GetContractorID(event) {
    debugger
    this.Contractorid = event.target.value;
    if (this.Contractorid == 0) {
      this.fmsService.GetDailyUpdateMenu().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.projectID == this.ProjectID && x.uPdateID == 1);
      })
    }
    else {
      this.fmsService.GetDailyUpdateMenu().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.projectID == this.ProjectID && x.contractorID == this.Contractorid && x.uPdateID == 1);
      })
    }
  }

  statusid
  public StageFilter(event) {
    debugger
    this.statusid = event.target.value;
    if (this.statusid == 0) {
      this.fmsService.GetDailyUpdateMenu().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.projectID == this.ProjectID);
      })
    }
    else if (this.statusid == 1) {
      this.fmsService.GetDailyUpdateMenu().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.projectID == this.ProjectID && x.uPdateID == 1);
      })
    }
    else {
      this.fmsService.GetDailyUpdateMenu().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.projectID == this.ProjectID && x.uPdateID == 2);
      })
    }

  }

  supportlist1 = [];
  Imagesone: any;
  public GetPhotos(evn) {
    let id = evn.id;
    let updateid = evn.uPdateID;
    this.fmsService.GetDailyUpdateMenuPhotos().subscribe(data => {
      debugger
      let temp: any = data;
      this.supportlist1 = temp.filter(x => x.dailyUpdateMenuIDID == id && x.updateID == updateid);
      this.Imagesone = this.supportlist1[0].photos

    })
  }
  Newlistq = [];
  VedioOne: any;
  public GetVideos(evn) {
    let id = evn.id;
    let updateid = evn.uPdateID;
    this.fmsService.GetDailyUpdateMenuVideos().subscribe(data => {
      debugger
      let temp: any = data;
      this.Newlistq = temp.filter(x => x.dailyUpdateMenuIDID == id && x.updateID == updateid);
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
      this.ProjectAssignedLists = temp.filter(x => x.projectID == this.ProjectID && x.uPdateID == 1);
    })

  }

}
