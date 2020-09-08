import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-contacts',
  templateUrl: './client-contacts.component.html',
  styleUrls: ['./client-contacts.component.css']
})
export class ClientContactsComponent implements OnInit {
  projectlist
  projectID
  paramID
  ClientContacts
  typeID
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  UserID
  ngOnInit() {
    this.UserID = localStorage.getItem('UserID');
    this.projectID = localStorage.getItem('ProjectID');
    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.Get_ClientContactsByID(this.paramID);
      }
    }
    );

    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id == localStorage.getItem('ProjectID'));
    })
  }
  public Get_ClientContactsByID(ProjectID) {
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.companyID == this.UserID);
    })

    this.fmsservice.Get_ClientContacts().subscribe(data => {
      debugger
      let temp: any = data;
      this.ClientContacts = temp.filter(x => x.id == ProjectID);
      let Project = this.ClientContacts[0];
      this.projectID = Project["projectID"];
      this.FirstName = Project["firstName"];
      this.LastName = Project["lastName"];
      this.Title = Project["title"];
      this.emailID = Project["emailID"];
      this.phoneno = Project["phoneNo"];
      this.Address = Project["address"];
    })

  }

  public GetProjectID(event) {
    this.projectID = event.target.value;
  }
  FirstName
  LastName
  Title
  emailID
  phoneno
  Address
  public Save() {
    let object = {
      'ProjectID': this.projectID,
      'FirstName': this.FirstName,
      'LastName': this.LastName,
      'Title': this.Title,
      'EmailID': this.emailID,
      'PhoneNo': this.phoneno,
      'Address': this.Address,
    }

    this.fmsservice.Insert_ClientContacts(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Client Contacts Saved Successfully!');
      location.href = "#/clientContactdash";
    })

  }
  public Update() {
    let object = {
      'Id': this.paramID,
      'ProjectID': this.projectID,
      'FirstName': this.FirstName,
      'LastName': this.LastName,
      'Title': this.Title,
      'EmailID': this.emailID,
      'PhoneNo': this.phoneno,
      'Address': this.Address,
    }

    this.fmsservice.Update_ClientContacts(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Client Contacts Updated Successfully!');
      location.href = "#/clientContactdash";
    })

  }

}
