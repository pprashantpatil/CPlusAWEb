import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-site-visit-assign-dashboard',
  templateUrl: './site-visit-assign-dashboard.component.html',
  styleUrls: ['./site-visit-assign-dashboard.component.css']
})
export class SiteVisitAssignDashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }
  projectlist1
  projectID
  options;
  value: any;
  ngOnInit() {

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,

    };
    this.projectID = 0;
    this.Get_SiteVisitAssign();
    this.fmsservice.Get_Projects().subscribe(data => {
      debugger
      this.projectlist1 = data;
    })
  }

  GetProjectID(event) {
    debugger
    this.projectID = event.target.value;
    if (event.target.value == 0) {
      this.Get_SiteVisitAssign();
    }
    else {
      this.fmsservice.Get_SiteVisitAssign().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectId == this.projectID);
      })
    }
  }


  projectlist
  public Get_SiteVisitAssign() {
    this.fmsservice.Get_SiteVisitAssign().subscribe(data => {
      debugger
      this.projectlist = data;
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
        this.fmsservice.Delete_SiteVisitAssign(id).subscribe(res => {
          let test = res;
          this.Get_SiteVisitAssign();
        })
        Swal.fire(
          'Deleted!',
          'SiteVisitAssign has been deleted.',
          'success'
        )
      }
      else {
        this.Get_SiteVisitAssign();
      }
    })
  }


  public selectedDate(value) {

  }
}
