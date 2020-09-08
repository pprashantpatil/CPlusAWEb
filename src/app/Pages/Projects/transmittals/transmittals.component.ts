import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transmittals',
  templateUrl: './transmittals.component.html',
  styleUrls: ['./transmittals.component.css']
})
export class TransmittalsComponent implements OnInit {
  UserID
  MileStone_Client: any;
  paramID: any;
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  projectlist
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  ngOnInit() {
    this.UserID = localStorage.getItem('UserID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data
      this.memberlist = temp.filter(x => x.projectID == this.ProjectID);

    })

    this.fmsservice.Get_ClientContacts().subscribe(data => {
      let temp: any = data;
      this.ClientContacts = temp.filter(x => x.projectID == this.ProjectID);


    })
    this.From = 0;
    this.To = 0;
    this.PID = 0;
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id == localStorage.getItem('ProjectID'));
    })
    this.SentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');

    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.Get_TransmittalsByID(this.paramID);
      }
    }
    );
  }

  TransmittalsList
  public Get_TransmittalsByID(ID) {
    this.fmsservice.Get_TransmittalsByID(ID).subscribe(
      res => {
        debugger;
        this.fmsservice.GetBuildinglist(1).subscribe(data => {
          debugger
          this.projectlist = data;
        })
        this.TransmittalsList = res;
        this.Subject = res[0].subject;
        this.SentDate = this.datepipe.transform(res[0].sentDate, 'yyyy-MM-dd');
        this.Description = res[0].description;
        this.From = res[0].from;
        this.To = res[0].to;
        this.Remarks = res[0].remarks;
        this.ProjectID = res[0].projectID;
        this.GetProjectID(this.ProjectID);



      }
    )
  }


  Subject: any;
  From: any;
  To: any;
  CC: any;
  Remarks: any;
  SentDate: any;
  Description: any;
  ProjectID: any;
  public Save() {
    debugger;
    let object = {
      'Subject': this.Subject,
      'From': this.From,
      'To': this.To,
      'CC': this.CC,
      'SentDate': this.SentDate,
      'Remarks': this.Remarks,
      'Description': this.Description,
      'ProjectID': this.ProjectID,
      'FileName2': this.FileName2,
      'FileType2': this.FileType2,
      'modifieddate2': new Date(),
      'Base64Data2': this.base64textString2 != undefined ? this.base64textString2 : "",
    }

    this.fmsservice.Insert_Transmittals(object).subscribe(res => {
      debugger
      debugger;
      Swal.fire('Transmittals Saved Successfully!');
      location.href = "#/TransmittalsDashboard";
    })
  }

  memberlist;
  ClientContacts;
  PID
  public GetProjectID(evn) {
    debugger
    if (evn.target) {
      this.PID = evn.target.value;
    } else {
      this.PID = evn;
    }

    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data
      this.memberlist = temp.filter(x => x.projectID == this.PID);
      //this.From = this.memberlist[0].name;
    })

    this.fmsservice.Get_ClientContacts().subscribe(data => {
      let temp: any = data;
      this.ClientContacts = temp.filter(x => x.projectID == this.PID);
      //this.To = this.ClientContacts[0].firstName;

    })
  }



  public Update() {
    let Entity = {
      'Subject': this.Subject,
      'From': this.From,
      'To': this.To,
      'SentDate': this.SentDate,
      'Remarks': this.Remarks,
      'Description': this.Description,
      'ProjectID': this.ProjectID
    }
    this.fmsservice.Update_Transmittals(this.paramID, Entity).subscribe(res => {
      debugger;
      Swal.fire('Updated Successfully!');
      location.href = "#/TransmittalsDashboard";

    })
  }
  FileName2
  filenamedetails
  FileType2
  base64textStringdetails
  handleFileSelect2(evt) {
    debugger
    var File2 = evt.target.value;
    let subStringData = File2.substr(12, 10000);
    var FileName2 = subStringData.split('.')[0];
    var FileType2 = subStringData.split('.')[1];
    console.log(FileName2);
    console.log(FileType2);
    this.FileName2 = FileName2;
    this.FileType2 = FileType2;
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded2.bind(this);
      reader.readAsBinaryString(file);
    }


  }
  base64textString2
  base64textString
  _handleReaderLoaded2(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString2 = btoa(binaryString);
    console.log(this.base64textString);
  }

}
