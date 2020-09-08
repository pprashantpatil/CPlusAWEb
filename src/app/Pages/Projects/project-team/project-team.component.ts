import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-project-team',
  templateUrl: './project-team.component.html',
  styleUrls: ['./project-team.component.css']
})
export class ProjectTeamComponent implements OnInit {
  ProjectID: any;
  StaffTypeID = 0;
  StaffID = 0;
  projectlist: any;
  StaffTypelist: any;
  Stafflist: any;
  paramID
  Rolelist: any;
  PID: any;
  FilteredApplicationlist: any;
  dropdownSettings = {};
  ProjectType:any;
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {
    this.ProjectID = localStorage.getItem('ProjectID');
    this.ProjectType = localStorage.getItem('ProjectType');
    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.GetProjectTeamByID(this.paramID);
      }
    }
    );
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist = data.filter(x => x.id == localStorage.getItem('ProjectID'));
    })

    this.fmsservice.GetStaffType(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffTypelist = temp.filter(x => x.id > 11);
      }
    )
  }
  ProjectTeam
  public GetProjectTeamByID(ProjectID) {

    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist = data;
    })

    this.fmsservice.GetStaffType(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffTypelist = temp.filter(x => x.id > 11);
      }
    )
    this.fmsservice.Get_Projects().subscribe(data => {
      debugger
      this.projectlist = data;
    })

    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectTeam = temp.filter(x => x.id == ProjectID);
      let Project = this.ProjectTeam[0];
      this.ProjectID = Project["projectID"];
      this.TypeofStaff = Project["typeofStaff"];
      this.StaffTypeID = Project["staffTypeID"];
      this.fmsservice.GetStaff(1).subscribe(
        res => {
          debugger;
          let temp: any = res
          this.StaffList = temp.filter(x => x.staffTypeID == Project["staffTypeID"]);
        }
      )
      this.StaffID = Project["staffID"];
      this.RoleID = Project["role"];
      
    })

  }

  StaffList
  public getStaffTypeID(event) {
    debugger
    this.StaffTypeID = event.target.value;
    this.fmsservice.GetStaff(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffList = temp.filter(x => x.staffTypeID == this.StaffTypeID );
      }
    )
  }
  public getStaffID(event) {
    this.StaffID = event.target.value;
  }
  public GetProjectID(event) {
    this.ProjectID = event.target.value;
  }
  RoleID;
  TypeofStaff: any;
  Save() {
    debugger
    let filetr =
    {
      'Role': this.RoleID,
      'StaffID': this.StaffID,
      'ProjectID': this.ProjectID,
      'StaffTypeID': this.StaffTypeID,
      'TypeofStaff': this.TypeofStaff
    }

    this.fmsservice.InsertProjectTeam(filetr).subscribe(data => {
      debugger
      if (data != undefined) {
        Swal.fire("Project Team Saved Successfully")
        location.href = "#/projectTeamdash";
      }

    })

  }


  public Update() {

    let object = {
      'Id': this.paramID,
      'Role': this.RoleID,
      'StaffID': this.StaffID,
      'ProjectID': this.ProjectID,
      'StaffTypeID': this.StaffTypeID,
      'TypeofStaff': this.TypeofStaff

    }
    this.fmsservice.Update_ProjectTeam(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Project Team  Updated Successfully!');
      location.href = "#/projectTeamdash";
    })
  }

}


