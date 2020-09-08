import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-punch-lists',
  templateUrl: './punch-lists.component.html',
  styleUrls: ['./punch-lists.component.css']
})
export class PunchListsComponent implements OnInit {
  Date
  Time
  Location
  Remarks
  Name
  Description
  Descipline
  Observation
  projectlist
  paramID
  Punch_List
  typeID
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {


    this.projectID = localStorage.getItem('ProjectID')
    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.GetPunch_ListById(this.paramID);
      }
    }
    );

    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist = data.filter(x => x.id == localStorage.getItem('ProjectID'));
    })
  }


  public GetPunch_ListById(ProjectID) {
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.projectlist = data;
    })

    this.fmsservice.GetPunch_List().subscribe(data => {
      debugger
      let temp: any = data;
      this.Punch_List = temp.filter(x => x.id == ProjectID);
      let Project = this.Punch_List[0];
      this.projectID = Project["projectID"];
      this.Name = Project["name"];
      this.Location = Project["location"];
      this.Description = Project["description"];
      this.Descipline = Project["descipline"];
    })

  }

  projectID
  memberlist
  public GetProjectID(event) {
    this.projectID = event.target.value;

  }



  public Save() {
    debugger
    let object = {
      'ProjectID': this.projectID,
      'Description': this.Description,
      'Descipline': this.Descipline,
      'Location': this.Location,
      'Name': this.Name,


    }
    this.fmsservice.Insert_Punch_List(object).subscribe(res => {
      debugger;
      Swal.fire('Punch List Saved Successfully!');
      location.href = "#/punchlistdash";
    })
  }

  public Update() {

    let object = {
      'Id': this.paramID,
      'ProjectID': this.projectID,
      'Description': this.Description,
      'Descipline': this.Descipline,
      'Location': this.Location,
      'Name': this.Name,
    }
    this.fmsservice.UpdatePunch_List(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Punch List Updated Successfully!');
      location.href = "#/punchlistdash";
    })
  }

}
