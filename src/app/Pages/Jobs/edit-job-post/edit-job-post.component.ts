import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-job-post',
  templateUrl: './edit-job-post.component.html',
  styleUrls: ['./edit-job-post.component.css']
})
export class EditJobPostComponent implements OnInit {

  constructor(public fmsservice: FmsService,private route: ActivatedRoute) { }
  public date:any;
  public jobtitle:any;
  public jobdescription:any;
  public yearsofexp:any;
  public department:any;
  public worklocation:any;
  public worktimings:any;
  public requirements:any;
  public details: any;
  public id:any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      debugger;
      this.id = params['id'];
    }
    )
    this.getdetails()
  }
  public getdetails()
  {
    debugger
    this.fmsservice.GetJobPostingsByID(this.id).subscribe(data => {
      debugger
      this.details = data[0];
      this.date=this.details.date,
      this.jobtitle=this.details.jobTitle,
      this.jobdescription=this.details.jobDescription,
      this.yearsofexp=this.details.yearsOfExp,
      this.department=this.details.department,
      this.worklocation=this.details.workLocation,
      this.worktimings=this.details.workTimings,
      this.requirements=this.details.additionalRequirements
    })
  }
  
  public updatedetails()
  {
    var entity={
      'ID':this.id,
      'Date':this.date,
      'JobDescription':this.jobdescription,
      'YearsOfExp':this.yearsofexp,
      'Department':this.department,
      'WorkLocation':this.worklocation,
      'WorkTimings':this.worktimings,
      'AdditionalRequirements':this.requirements,
      'JobTitle':this.jobtitle
    }
    this.fmsservice.updateJobPostings(entity).subscribe(data=>{
      debugger
  
      if(data!=undefined){
        Swal.fire("Updated Successfully")
        this.getdetails()
      
      }
    })
  }
}
