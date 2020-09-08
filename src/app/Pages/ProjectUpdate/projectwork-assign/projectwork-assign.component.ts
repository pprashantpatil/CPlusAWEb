import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projectwork-assign',
  templateUrl: './projectwork-assign.component.html',
  styleUrls: ['./projectwork-assign.component.css']
})
export class ProjectworkAssignComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  ProjectID
  paramID
  Buildinglist
  StaffTypelist
  StageList
  StaffList
  StageID
  StartDate
  EndDate
  Comments
  ngOnInit() {

    this.ProjectID = localStorage.getItem('ProjectID');
    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.GetProjectWorkAssignByID(this.paramID);
      }
    }
    );
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.Buildinglist = data.filter(x => x.id == localStorage.getItem('ProjectID'));
    })
    this.fmsservice.GetArchitecturalStages().subscribe(data => {
      debugger
      this.StageList = data;
    })

    this.fmsservice.GetStaffType(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffTypelist = temp.filter(x => x.id > 11);
      }
    )
  }
  projectlist
  public GetProjectWorkAssignByID(id) {
    debugger

    this.fmsservice.GetProjectWorkAssign('2020/01/01', '2022/01/01').subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp;
      this.fmsservice.GetBuildinglist(1).subscribe(data => {
        debugger
        this.Buildinglist = data.filter(x => x.id == localStorage.getItem('ProjectID'));
      })
      let project = this.projectlist[0];
      this.ProjectID = project['projectID'];
      this.fmsservice.GetArchitecturalStages().subscribe(data => {
        debugger
        this.StageList = data;
      })
      this.StageID = project['stageID'];
      this.fmsservice.GetStaffType(1).subscribe(
        res => {
          debugger;
          let temp: any = res
          this.StaffTypelist = temp.filter(x => x.id > 11);
        }
      )
      this.StaffTypeID = project['staffTypeID'];
      this.fmsservice.GetStaff(1).subscribe(
        res => {
          debugger;
          let temp: any = res
          this.StaffList = temp.filter(x => x.staffTypeID == this.StaffTypeID);
        }
      )
      this.StaffID = project['staffID'];
      this.StartDate = this.datepipe.transform(project["startDate"], 'yyyy-MM-dd');
      this.EndDate = this.datepipe.transform(project["endDate"], 'yyyy-MM-dd');
      this.Comments = project['comments'];
    })
  }


  StaffTypeID
  public getStaffTypeID(event) {
    debugger
    this.StaffTypeID = event.target.value;
    this.fmsservice.GetStaff(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffList = temp.filter(x => x.staffTypeID == this.StaffTypeID);
      }
    )
  }
  StaffID
  public getStaffID(event) {
    this.StaffID = event.target.value;
  }

  Save() {
    debugger
    let filetr =
    {
      'ProjectID': this.ProjectID,
      'StageID': this.StageID,
      'StaffTypeID': this.StaffTypeID,
      'StaffID': this.StaffID,
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      'Comments': this.Comments
    }

    this.fmsservice.InsertProjectWorkAssign(filetr).subscribe(data => {
      debugger
      if (data != undefined) {
        Swal.fire("Project Work Assign Saved Successfully")
        location.href = "#/ProjectworkAssignDash";
      }

    })

  }
  Update() {
    debugger
    let filetr =
    {
      'ID': this.paramID,
      'ProjectID': this.ProjectID,
      'StageID': this.StageID,
      'StaffTypeID': this.StaffTypeID,
      'StaffID': this.StaffID,
      'StartDate': this.StartDate,
      'EndDate': this.EndDate,
      'Comments': this.Comments
    }

    this.fmsservice.UpdateProjectWorkAssign(filetr).subscribe(data => {
      debugger
      if (data != undefined) {
        Swal.fire("Project Work Assign Updated Successfully")
        location.href = "#/ProjectworkAssignDash";
      }

    })

  }



}
