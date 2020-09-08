import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
@Component({
  selector: 'app-site-visit-reports',
  templateUrl: './site-visit-reports.component.html',
  styleUrls: ['./site-visit-reports.component.css']
})
export class SiteVisitReportsComponent implements OnInit {

  projectlist
  Date
  Time
  Location
  Remarks
  Observation
  Name
  
  constructor(public fmsservice: FmsService) { }

  ngOnInit() {

    this.fmsservice.Get_Projects().subscribe(data => {
      debugger
      this.projectlist = data;
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
 
  FileName2
  filenamedetails
  FileType2
  base64textStringdetails
  handleFileSelect2(evt) {
    debugger
    //console.log(evt);
    var File2 = evt.target.value;
    // console.log(File);
    let subStringData = File2.substr(12, 10000);
    //console.log(X);
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


 

  
 

  public Save(){
   debugger
    let object={
      'ProjectID':this.projectID,
      'Name':this.Name,
      'Date':this.Date,
      'Time':this.Time,
      'Observation': this.Observation,
      'FileName2': this.FileName2,
      'FileType2': this.FileType2,
      'modifieddate2': new Date(),
      'Base64Data2': this.base64textString2 != undefined ? this.base64textString2 : "",
    }
    this.fmsservice.Insert_SiteVisitReports(object).subscribe(res => {
      debugger;
      Swal.fire('Site Visit Report Saved Successfully!');
      location.href = "#/sitevisitreportdash";
    })
  }

}
