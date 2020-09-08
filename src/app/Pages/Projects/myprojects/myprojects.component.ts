import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.css']
})
export class MyprojectsComponent implements OnInit {
  paramID
  projectlist
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.Get_ProjectsByID(this.paramID);
      }
    }
    );

    this.GetBuildinglist(1);

  }
  public Get_ProjectsByID(ProjectID){

    this.fmsservice.Get_Projects().subscribe(data => {
      debugger
      this.GetBuildinglist(1);
      let temp:any=data;
      this.projectlist = temp.filter(x=>x.id==ProjectID);
      let Project=this.projectlist[0];
      this.ProjectName=Project["project"];
      this.BuildingID=Project["buildingId"];
      this.fmsservice.GetStaff(1).subscribe(
        res => {
          debugger;
          let temp: any = res
          this.stafflist = temp.filter(x => x.staffTypeID == 10026 && x.buildingid == this.BuildingID);
        }
      );
      this.ProjectNumber=Project["number"];
      this.ProjectManagerId=Project["projectManagerId"];
      this.description=Project["description"];
      
    })

  }


  Buildinglist;
  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        this.Buildinglist = res;
      }
    )
  }
  BuildingID
  GetBuildingID(event) {
    this.BuildingID = event.target.value;
    this.GetStaff(1)
  }
  stafflist;
  public GetStaff(languageid) {
    this.fmsservice.GetStaff(languageid).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.stafflist = temp.filter(x => x.staffTypeID == 10026 && x.buildingid == this.BuildingID);
      }
    )
  }
  GetStaffID(event) {
    this.ProjectManagerId = event.target.value;
  }
  ProjectName
  ProjectNumber
  ProjectManagerId
  description
  public Save() {
    let object = {
      'Project': this.ProjectName,
      'Number': this.ProjectNumber,
      'BuildingId': this.BuildingID,
      'ProjectManagerId': this.ProjectManagerId,
      'Description': this.description
    }
    this.fmsservice.Insert_Projects(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Project Saved Successfully!');
      location.href = "#/myprojectdash";
    })

  }

  public Update() {
    let object = {
      "Id":this.paramID,
      'Project': this.ProjectName,
      'Number': this.ProjectNumber,
      'BuildingId': this.BuildingID,
      'ProjectManagerId': this.ProjectManagerId,
      'Description': this.description
    }
    this.fmsservice.Update_Projects(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Project Updated Successfully!');
      location.href = "#/myprojectdash";
    })

  }

}
