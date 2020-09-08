import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-job-posting-dash',
  templateUrl: './job-posting-dash.component.html',
  styleUrls: ['./job-posting-dash.component.css']
})
export class JobPostingDashComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }

  public detailslist: any;
  public term:any;
  public jobname:any;

  ngOnInit() {

    this.getdetails()
  }
  public Deletejobpost(id) {
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
        this.fmsservice.DeleteJobPostings(id).subscribe(res => {
          let test = res;
          this.getdetails()
        })
        Swal.fire(
          'Deleted!',
          'Job Post been deleted.',
          'success'
        )
      }
      else {
        this.getdetails()
    
      }
    })
  }
  public getdetails()
  {
    this.fmsservice.GetJobPostings().subscribe(data => {
      debugger
      this.detailslist = data;
    })
  }
  public GetJobID(even)
  {
    debugger
    this.jobname=even.target.value;
  }
}
