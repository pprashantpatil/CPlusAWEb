import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-punch-list-assigns',
  templateUrl: './punch-list-assigns.component.html',
  styleUrls: ['./punch-list-assigns.component.css']
})
export class PunchListAssignsComponent implements OnInit {
  projectlist
  paramID
  Punch_List
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  UserID;
  FloorList: any;

  ngOnInit() {
    debugger;
    this.UserID = localStorage.getItem('UserID');
    this.projectID = localStorage.getItem('ProjectID');
    this.UnitID = 0;
    this.Status = 'Assigned';
    this.fmsservice.GetFloorTypebyBID(this.projectID).subscribe(
      res => {
        this.FloorList = res;
      }
    )

    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data
      this.memberlist = temp.filter(x => x.projectID == this.projectID);
    })

    this.fmsservice.GetPunch_List().subscribe(data => {
      debugger
      let temp: any = data
      this.PunchList = temp.filter(x => x.projectID == this.projectID);
    })
    // this.projectID = 0;
    this.PunchListID = 0;
    this.StaffId = 0;
    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];

        this.GetPunch_List_AssignByID(this.paramID);

      }
    }
    );
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp;

    })
  }

  public GetPunch_List_AssignByID(ProjectID) {
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.companyID == this.UserID);
    })

    this.fmsservice.GetPunch_List_Assign().subscribe(data => {
      debugger
      let temp: any = data;
      this.Punch_List = temp.filter(x => x.id == ProjectID);
      let Project = this.Punch_List[0];
      this.projectID = Project["projectID"];
      this.fmsservice.GetProjectTeam().subscribe(data => {
        debugger
        let temp: any = data
        this.memberlist = temp.filter(x => x.projectID == Project["projectID"]);
      })

      this.fmsservice.GetPunch_List().subscribe(data => {
        debugger
        let temp: any = data
        this.PunchList = temp.filter(x => x.projectID == Project["projectID"]);
      })


      this.fmsservice.GetFloorTypebyBID(this.projectID).subscribe(
        res => {
          this.FloorList = res;
        }
      )

      this.fmsservice.GetUnit_MasterbyfloorID(Project['floorID']).subscribe(
        res => {
          this.UserRoleList = res;
        }
      )



      this.FloorID = Project["floorID"];
      this.UnitID = Project["unitsID"];
      this.Status = Project["status"];
      this.PunchListID = Project["punchListID"];
      this.StaffId = Project["staffID"];
      this.Date = this.datepipe.transform(Project["date"], 'yyyy-MM-dd');
      this.EndDate = this.datepipe.transform(Project["endDate"], 'yyyy-MM-dd');
      this.Time = Project["tTime"];
      this.Remarks = Project["remarks"];
    })

  }





  BuildingID
  UserRoleList: any;
  FloorID
  public GetBuildingID(evn) {
    this.BuildingID = evn.target.value;
    // this.GetUnit_MasterByBuildingID(this.BuildingID)
  }
  public GetFloorID(evn) {
    this.FloorID = evn.target.value;
    this.GetUnit_MasterbyfloorID(evn.target.value)
  }

  public GetUnit_MasterbyfloorID(FloorID) {
    this.fmsservice.GetUnit_MasterbyfloorID(FloorID).subscribe(
      res => {
        this.UserRoleList = res;
      }
    )
  }

  UnitID: any;
  public GetUnits(evn) {
    debugger;
    this.UnitID = evn.target.value;
  }



  projectID
  memberlist
  PunchList
  public GetProjectID(event) {
    this.projectID = event.target.value;

    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data
      this.memberlist = temp.filter(x => x.projectID == this.projectID);
    })

    this.fmsservice.GetPunch_List().subscribe(data => {
      debugger
      let temp: any = data
      this.PunchList = temp.filter(x => x.projectID == this.projectID);
    })
  }
  StaffId
  PunchListID
  public GetPunchListID(event) {
    this.PunchListID = event.target.value;
  }
  public GetMemberID(event) {
    this.StaffId = event.target.value;
  }



  Status: any;
  public GetStatus(evn) {
    debugger;
    this.Status = evn.target.value;
  }




  Name
  Date
  Remarks
  Time
  EndDate
  public Save() {
    debugger


    let object = {
      'ProjectID': this.projectID,
      'StaffId': this.StaffId,
      'Date': this.Date,
      'EndDate': this.EndDate,
      'Remarks': this.Remarks,
      'PunchListID': this.PunchListID,
      'FloorID': this.FloorID,
      'Status': this.Status
    }
    this.fmsservice.InsertPunch_List_Assign(object).subscribe(res => {
      debugger;
      Swal.fire('Punch List Saved Successfully!');
      location.href = "#/PunchListAssignDashboard";
    })
  }

  public Update() {
    debugger

    let object = {
      'Id': this.paramID,
      'ProjectID': this.projectID,
      'StaffId': this.StaffId,
      'Date': this.Date,
      'EndDate': this.EndDate,
      'Remarks': this.Remarks,
      'PunchListID': this.PunchListID,
      'FloorID': this.FloorID,
      'UnitID': this.UnitID != null ? this.UnitID : 0,
      'Status': this.Status
    }
    this.fmsservice.UpdatePunch_List_Assign(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Punch ListAssign Updated Successfully!');
      location.href = "#/PunchListAssignDashboard";
    })
  }


}
