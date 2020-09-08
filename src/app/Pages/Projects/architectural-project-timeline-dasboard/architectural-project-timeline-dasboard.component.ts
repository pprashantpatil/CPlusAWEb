import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
import { ExportToCsv } from '../../../../../node_modules/export-to-csv';
@Component({
  selector: 'app-architectural-project-timeline-dasboard',
  templateUrl: './architectural-project-timeline-dasboard.component.html',
  styleUrls: ['./architectural-project-timeline-dasboard.component.css']
})
export class ArchitecturalProjectTimelineDasboardComponent implements OnInit {

  constructor(public fmsservice: FmsService,) { }
  LoginTypeID: any;
  ProjectID: any;
  projectlist: any
  StageList
  ProjectTeamList
  pickeroptions;
  value: any;
  Count: any;

  ngOnInit() {
    this.StaffName = 0;
    this.StageName = 0;
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsservice.GetArchitecturalStages().subscribe(data => {
      debugger
      this.StageList = data;
    })
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      this.ProjectTeamList = data.filter(x => x.projectID == this.ProjectID);
    })
    this.fmsservice.Get_ArchitecturalProjectTimeLine().subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
      this.Count = this.projectlist.length;
    })
  }
  StageName
  public GetStageID(event) {
    debugger
    this.StageName = event.target.value;

  }
  StaffName
  public GetStaff(event) {
    debugger
    this.StaffName = event.target.value;

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
        this.fmsservice.DeleteArchitecturalProjectTimeline(id).subscribe(res => {
          let test = res;
          this.fmsservice.Get_ArchitecturalProjectTimeLine().subscribe(data => {
            debugger
            let temp: any = data;
            this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
            this.Count = this.projectlist.length;
          })
        })
        Swal.fire(
          'Deleted!',
          'Architectural ProjectTimeline has been deleted.',
          'success'
        )
      }
      else {
        this.fmsservice.Get_ArchitecturalProjectTimeLine().subscribe(data => {
          debugger
          let temp: any = data;
          this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
          this.Count = this.projectlist.length;
        })
      }
    })
  }

  datelist;
  startdate: Date;
  enddate: Date;

  public selectedDate(value) {
    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger
    //Date date= new Date('dd-MM-yyyy');
    this.fmsservice.Get_ArchitecturalProjectTimeLineByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
      this.Count = this.projectlist.length;
    })
  }


  AccUpateID: any;
  Accomplishment: any;
  stage: any
  name: any
  public GetAccomplishetID(ptoject) {
    debugger
    this.AccUpateID = ptoject.id;
    this.Accomplishment = 0;
    this.stage = ptoject.stage;
    this.name = ptoject.name
  }


  public AddAccomplishment() {
    debugger;
    let object = {
      'ID': this.AccUpateID,
      'Accomplishment': this.Accomplishment,
    }

    this.fmsservice.Update_ArchitecturalProjectTimeLineAddAccomplishment(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Accomplishment Added Successfully!');
      this.Accomplishment = 0;
      this.fmsservice.Get_ArchitecturalProjectTimeLine().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.ProjectID);
        this.Count = this.projectlist.length;
      })
    })
    if (this.Accomplishment == '100%') {
      this.InsertNotification();
    }
  }


  InsertNotification() {
    debugger

    var Filter = {
      'Date': new Date(),
      'Event': 'Action Item',
      'FromUser': 'Company',
      'ToUser': '10231',
      'Message': this.stage + ' has been Completed 100% by ' + this.name + '. Please Raise the PO .',
      'Photo': 'photo',
      'Building': this.ProjectID,
      'NotificationTypeID': 14
    }
    this.fmsservice.InsertNotification(Filter).subscribe(data => {
      debugger

    })
  }


  exporttoexcel() {
    debugger;
    var ExportData = [];
    for (let i = 0; i < this.projectlist.length; i++) {
      let singleData = {
        StartDate: '',
        EndDate: '',
        Stage: String,
        ProcessCheck: String,
        CareOf: String,
        Comments: String,
        Accomplishment: "",
      }

      singleData.StartDate = this.projectlist[i].s_Date;
      singleData.EndDate = this.projectlist[i].e_Date;
      singleData.Stage = this.projectlist[i].stage;
      singleData.ProcessCheck = this.projectlist[i].processCheck;
      singleData.CareOf = this.projectlist[i].name;
      singleData.Comments = this.projectlist[i].description;
      singleData.Accomplishment = this.projectlist[i].accomplishment
      ExportData.push(singleData);
    }

    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Project Timeline',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Project Timeline'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(ExportData);
  }
}
