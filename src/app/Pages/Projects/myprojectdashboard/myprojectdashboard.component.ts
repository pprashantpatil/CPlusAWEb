import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
@Component({
  selector: 'app-myprojectdashboard',
  templateUrl: './myprojectdashboard.component.html',
  styleUrls: ['./myprojectdashboard.component.css']
})
export class MyprojectdashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService, ) { }

  ngOnInit() {
    this.Get_Projects();
  }
  projectlist
  public Get_Projects() {
    this.fmsservice.Get_Projects().subscribe(data => {
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
        this.fmsservice.Delete_Projects(id).subscribe(res => {
          let test = res;
          this.Get_Projects();
        })
        Swal.fire(
          'Deleted!',
          'Project been deleted.',
          'success'
        )
      }
      else {
        this.Get_Projects();
      }
    })
  }


  ShowAllProjects: boolean;
  ShowMyProjects: boolean;
  public GetMyProjects() {
    debugger;
    this.ShowMyProjects = true;
    this.ShowAllProjects = false;
  }

  public GetAllProjects() {
    debugger;
    this.ShowMyProjects = false;
    this.ShowAllProjects = true;
  }
}