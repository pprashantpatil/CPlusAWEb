import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
import { ExportToCsv } from '../../../../../node_modules/export-to-csv';
@Component({
  selector: 'app-punch-list-assign-dashboard',
  templateUrl: './punch-list-assign-dashboard.component.html',
  styleUrls: ['./punch-list-assign-dashboard.component.css']
})
export class PunchListAssignDashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }
  Search
  pickeroptions
  projectlist1
  projectID
  value;
  memberlist;
  StaffId;
  LoginTypeID;
  StaffID;
  ProjectID: any;
  Count: any;
  ngOnInit() {

    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.StaffID = localStorage.getItem('UserID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.StaffId = '0'
    this.Status = "0";
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data
      this.memberlist = temp.filter(x => x.projectID == this.ProjectID);
    })
    this.projectID = 0;
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };



    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist1 = data;
    })
    this.GetPunch_List_Assign();
  }
  GetProjectID(event) {
    let projectID = event.target.value;
    if (event.target.value == 0) {
      this.GetPunch_List_Assign();
    }
    else {
      this.fmsservice.GetPunch_List_Assign().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == projectID && x.status != 'Completed');
        this.Count = this.projectlist.length;
      })
    }
  }

  projectlist
  public GetPunch_List_Assign() {

    if (this.LoginTypeID == '1') {
      this.fmsservice.GetPunch_List_Assign().subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID && x.status != 'Completed');
        this.Count = this.projectlist.length;
      })
    } else {
      this.fmsservice.GetPunch_List_Assign().subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.projectID == this.ProjectID && x.status != 'Completed');
        this.Count = this.projectlist.length;
      })
    }

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
    if (this.LoginTypeID == '1') {
      this.fmsservice.GetPunch_List_AssignByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID && x.status != 'Completed');
        this.Count = this.projectlist.length;
      })
    } else {
      this.fmsservice.GetPunch_List_AssignByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.projectID == this.ProjectID && x.status != 'Completed');
        this.Count = this.projectlist.length;
      })
    }
    //Date date= new Date('dd-MM-yyyy');

  }

  Status: any;
  public GetStatus(evn) {
    debugger;
    this.Status = evn.target.value;
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
        this.fmsservice.Delete_Punch_List_Assign(id).subscribe(res => {
          let test = res;
          this.GetPunch_List_Assign();
        })
        Swal.fire(
          'Deleted!',
          'PunchList Assign been deleted.',
          'success'
        )
      }
      else {
        this.GetPunch_List_Assign();
      }
    })
  }

  StaffName
  public GetMemberID(evn) {
    this.StaffName = evn.target.value;
  }
  supportlist1 = []
  photo1: any;
  ImagesOne: any;
  public GetPhotos(evn) {
    debugger
    let id = evn.id;
    this.fmsservice.GetPunchListReviewDocument(evn.id).subscribe(data => {
      debugger
      let temp: any = data;
      this.supportlist1 = temp;
      this.ImagesOne = this.supportlist1[0].attachment;
    })
  }


  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Punch Lists ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Punch Lists'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.projectlist);
  }

}
