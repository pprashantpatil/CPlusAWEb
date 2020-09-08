import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
import { ExportToCsv } from '../../../../../node_modules/export-to-csv';

@Component({
  selector: 'app-project-update-menu',
  templateUrl: './project-update-menu.component.html',
  styleUrls: ['./project-update-menu.component.css']
})
export class ProjectUpdateMenuComponent implements OnInit {

  constructor(public fmsservice: FmsService, ) { }
  LoginTypeID
  ProjectID
  pickeroptions;
  StageList: any
  value: any;
  ProjectTeamList: any
  ngOnInit() {
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.StageName = 0;
    this.StaffName = 0;
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.GetProjectUpdateMenu();
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      this.ProjectTeamList = data.filter(x => x.projectID == this.ProjectID);
    })

    this.fmsservice.GetArchitecturalStages().subscribe(data => {
      debugger
      this.StageList = data;
    })
  }
  projectlist;
  Count: any;
  public GetProjectUpdateMenu() {
    debugger
    this.fmsservice.GetProjectUpdateMenu().subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
      this.Count = this.projectlist.length;
    })
  }
  public DeleteProject(id) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.fmsservice.DeleteProjectUpdateMenu(id).subscribe(res => {
          let test = res;
          this.GetProjectUpdateMenu()
        })
        Swal.fire(
          'Deleted!',
          'Project Work Update has been deleted.',
          'success'
        )
      }
      else {
        this.GetProjectUpdateMenu()
      }
    })
  }
  NewList: any
  photo: any
  supportlist1 = []
  photo1: any;
  ImagesOne: any;
  public GetPhotos(evn) {
    debugger
    let id = evn.id;
    this.fmsservice.GetProjectUpdateMenuPhotos().subscribe(data => {
      debugger
      let temp: any = data;
      this.supportlist1 = temp.filter(x => x.projectUpdateMenuID == id);
      for (var i = 0; i < this.supportlist1.length; i++) {
        debugger
        if (this.supportlist1[i].photos.includes(".pdf")) {
          this.supportlist1[i]['frame'] = 1
        }
        else {
          this.supportlist1[i]['frame'] = 0
        }
      }
      this.ImagesOne = this.supportlist1[0].photos;
    })
  }
  Newlistq = [];
  video: any
  videolist: any
  video1: any;
  VedioOne: any;
  public GetVideos(evn) {
    debugger
    let id = evn.id;
    this.fmsservice.GetProjectUpdateMenuVideos().subscribe(data => {
      debugger
      let temp: any = data;
      this.Newlistq = temp.filter(x => x.projectUpdateMenuID == id);
      this.VedioOne = this.Newlistq[0].videos;
    })
  }


  StageName
  public GetStageID(event) {
    debugger

    if (event.target.value == '0') {
      this.fmsservice.GetProjectUpdateMenu().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
        this.Count = this.projectlist.length;
      })
    } else {
      this.fmsservice.GetProjectUpdateMenu().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.ProjectID && x.stage == event.target.value);
        this.Count = this.projectlist.length;
      })
    }
  }
  StaffName
  public GetStaff(event) {
    debugger

    if (event.target.value == '0') {
      this.fmsservice.GetProjectUpdateMenu().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
        this.Count = this.projectlist.length;
      })
    } else {
      this.fmsservice.GetProjectUpdateMenu().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.ProjectID && x.staffName == event.target.value);
        this.Count = this.projectlist.length;
      })
    }
  }


  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Project Update ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Project Update'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.projectlist);
  }

}
