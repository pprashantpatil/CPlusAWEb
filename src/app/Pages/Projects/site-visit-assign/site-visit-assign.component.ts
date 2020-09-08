import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-site-visit-assign',
  templateUrl: './site-visit-assign.component.html',
  styleUrls: ['./site-visit-assign.component.css']
})
export class SiteVisitAssignComponent implements OnInit {
  projectlist
  paramID
  SiteVisitAssign
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {


    
this.route.params.subscribe(params => {
  debugger;
  if (params['id'] != undefined) {
    this.paramID = params['id'];
    this.Get_SiteVisitAssignByID(this.paramID);
  }
}
);
    this.fmsservice.Get_Projects().subscribe(data => {
      debugger
      this.projectlist = data;
    })

    
  }

  public Get_SiteVisitAssignByID(ProjectID){
    this.fmsservice.Get_Projects().subscribe(data => {
      debugger
      this.projectlist = data;
    })

    this.fmsservice.Get_SiteVisitAssign().subscribe(data => {
      debugger
      let temp:any=data;
      this.SiteVisitAssign = temp.filter(x=>x.id==ProjectID);
      let Project=this.SiteVisitAssign[0];
      this.projectID=Project["projectId"];
      this.fmsservice.GetProjectTeam().subscribe(data => {
        debugger
        let temp: any = data
        this.memberlist = temp.filter(x => x.projectID == Project["projectId"]);
      })
      this.StaffId=Project["staffId"];	
      this.SiteVisitName=Project["siteVisitName"];
      this.Date= this.datepipe.transform(Project["date"],'yyyy-MM-dd');         
      this.Time=Project["tTime"];
      this.Location=Project["location"];
      this.Remarks=Project["remarks"];
    })

  }
  projectID
  memberlist
  public GetProjectID(event) {
    this.projectID = event.target.value;

    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data
      this.memberlist = temp.filter(x => x.projectID == this.projectID);
    })
  }
  StaffId
  public  GetMemberID(event){
    this.StaffId = event.target.value;
   }
  

 

  
  SiteVisitName
  Date
  Time
  Location
  Remarks
  public Save(){
debugger
    let object={
      'ProjectID':this.projectID,
      'StaffId':this.StaffId,
      'SiteVisitName':this.SiteVisitName,
      'Date':this.Date,
      'Time':this.Time,
      'Location': this.Location,
      'Remarks': this.Remarks,
    }
    this.fmsservice.Insert_SiteVisitAssign(object).subscribe(res => {
      debugger;
      Swal.fire('Site VisitAssign Saved Successfully!');
      location.href = "#/sitevisitassigndash";
    })
  }

  
  public Update(){

    let object={
      'Id':this.paramID,
      'ProjectID':this.projectID,
      'StaffId':this.StaffId,
      'SiteVisitName':this.SiteVisitName,
      'Date':this.Date,
      'Time':this.Time,
      'Location': this.Location,
      'Remarks': this.Remarks,
    }
    this.fmsservice.Update_SiteVisitAssign(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('SiteVisitAssign Updated Successfully!');
      location.href = "#/sitevisitassigndash";
    })
  }

}
