import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-punch-list-dashboard',
  templateUrl: './punch-list-dashboard.component.html',
  styleUrls: ['./punch-list-dashboard.component.css']
})
export class PunchListDashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService, ) { }
  projectlist1
  projectID
  ngOnInit() {
    this.projectID = 0

    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist1 = data;
    })
    this.GetPunch_List();
  }
  projectlist
  public GetPunch_List() {
    this.fmsservice.GetPunch_List().subscribe(data => {
      debugger
      this.projectlist = data.filter(x => x.projectID == localStorage.getItem('ProjectID'));
    })
  }

  GetProjectID(event) {
    this.projectID = event.target.value;
    if (event.target.value == 0) {
      this.GetPunch_List();
    }
    else {
      this.fmsservice.GetPunch_List().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.projectID);
      })
    }
  }


  Attachmentlist
  public Attachment(evn) {
    let id = evn.id;
    this.fmsservice.GetPunch_List().subscribe(data => {
      debugger
      let temp: any = data;
      this.Attachmentlist = temp.filter(x => x.id == id);

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
        this.fmsservice.Delete_Punch_List(id).subscribe(res => {
          let test = res;
          this.GetPunch_List();
        })
        Swal.fire(
          'Deleted!',
          'Punch List has been deleted.',
          'success'
        )
      }
      else {
        this.GetPunch_List();
      }
    })
  }


}
