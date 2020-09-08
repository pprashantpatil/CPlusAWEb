import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.css']
})
export class JobPostingComponent implements OnInit {

  constructor(public fmsservice: FmsService,private route: ActivatedRoute) { }
 public date:any;
 public jobtitle:any;
 public jobdescription:any;
 public yearsofexp:any;
 public department:any;
 public worklocation:any;
 public worktimings:any;
 public requirements:any;
 public buildinglist:any;
 public buildingid:any;
 public salaryrange:any;
 public expstartdate:any;
 public contractid:any;
 public details:any;
 public id:any;

  ngOnInit() {

    this.route.params.subscribe(params => {
      debugger;
      this.id = params['id'];
    }
    )
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.buildinglist = data;
    })
    this.getdetails();
  }

  public GetBuildingId(even)
  {
    this.buildingid=even.target.value;
  }
public GetContractTypeID(even)
{
  this.contractid=even.target.value;
}

  public insertdetails()
  {
    debugger
    var entity={
      'Date':this.date,
      'JobDescription':this.jobdescription,
      'YearsOfExp':this.yearsofexp,
      'Department':this.department,
      'WorkLocation':this.worklocation,
      'WorkTimings':this.worktimings,
      'AdditionalRequirements':this.requirements,
      'JobTitle':this.jobtitle,
      'BuildingID':this.buildingid,
      'SalaryRange':this.salaryrange,
      'ExpectedStartDate':this.expstartdate,
      'ContractType':this.contractid
    }
    this.fmsservice.InsertJobPostings(entity).subscribe(data=>{
      debugger
      if(data!=undefined){
 
       Swal.fire("Saved Successfully");
       this.clear();
      }
    })
 
  }
public clear()
{
  this.date="";
  this.jobdescription="";
  this.yearsofexp="";
   this.department="";
   this.worklocation="";
    this.requirements=""; 
    this.jobtitle="";
    this.salaryrange="";
    this.expstartdate="";
    this.contractid="";
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
    this.requirements=this.details.additionalRequirements,
    this.buildingid=this.details.buildingID,
    this.salaryrange=this.details.salaryRange,
    this.expstartdate=this.details.expectedStartDate,
    this.contractid=this.details.contractType

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
    'JobTitle':this.jobtitle,
    'BuildingID':this.buildingid,
    'SalaryRange':this.salaryrange,
    'ExpectedStartDate':this.expstartdate,
    'ContractType':this.contractid
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
