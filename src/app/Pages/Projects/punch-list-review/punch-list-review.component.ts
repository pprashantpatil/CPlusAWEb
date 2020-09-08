import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
import { ExportToCsv } from '../../../../../node_modules/export-to-csv';

@Component({
  selector: 'app-punch-list-review',
  templateUrl: './punch-list-review.component.html',
  styleUrls: ['./punch-list-review.component.css']
})
export class PunchListReviewComponent implements OnInit {
  Observation
  public filenamedetails = [];
  public filetypedetails = [];
  public base64textStringdetails = [];
  constructor(public fmsservice: FmsService) { }
  Search
  options
  projectlist1
  projectID;
  value: any;
  Count: any;
  ngOnInit() {
    this.projectID = 0
    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,

    };
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist1 = temp.filter(x => x.id == localStorage.getItem('ProjectID'));

    })

    this.GetPunch_List_Assign();
  }

  GetProjectID(event) {
    this.projectID = event.target.value;
    if (event.target.value == 0) {
      this.GetPunch_List_Assign();
    }
    else {
      this.fmsservice.GetPunch_List_Assign().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x => x.projectID == this.projectID);
        this.Count = this.projectlist.length;
      })
    }
  }
  projectlist
  public GetPunch_List_Assign() {
    this.fmsservice.GetPunch_List_Assign().subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.staffID == localStorage.getItem('userid') && x.projectID == localStorage.getItem('ProjectID') && x.observation == null);
      this.Count = this.projectlist.length;
    })
  }
  FileName
  FileType
  base64textString
  handleFileSelect1(evt) {
    debugger
    for (var i = 0; i < evt.target.files.length; i++) {
      debugger
      //console.log(evt);
      var File = evt.target.files[i];
      debugger
      // console.log(File);
      //let subStringData=File.substr(12,27);
      //console.log(X);
      var FileName = File.name.split('.')[0];
      var FileType = File.name.split('.')[1];

      debugger
      console.log(FileName);
      console.log(FileType);
      this.FileName = FileName;
      this.FileType = FileType;
      //this.filenamedetails.push({fname:this.FileName,ffile:this.FileType,base:this.base64textString});
      //this.filetypedetails.push(this.FileType);

      var files = evt.target.files;
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded1.bind(this);
        reader.readAsBinaryString(file);


      }

      this.filenamedetails.push({ fname: this.FileName, ffile: this.FileType, base: this.base64textStringdetails });
      debugger
    }


  }
  _handleReaderLoaded1(readerEvt) {

    debugger
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.base64textStringdetails.push(this.base64textString)
    console.log(this.base64textString);
    debugger

  }
  ReviewID
  public Attachment(project) {
    this.ReviewID = project.id;

  }
  buildingID
  public Save() {

    let object = {
      'ReviewID': this.ReviewID,
      'Observation': this.Observation,
    }
    this.fmsservice.InsertPunchListReview(object).subscribe(res => {
      debugger
      if (res != undefined) {
        this.buildingID = res;
        if (this.filenamedetails.length != null || this.filenamedetails.length != undefined) {
          this.saveInsertBuildingDocument(this.buildingID);
        }
      }
      Swal.fire('PunchList Review Saved Successfully!');
      this.Observation = '';
      location.href = "#/punchListReview";
    })
  }



  saveInsertBuildingDocument(id) {
    debugger
    for (let j = 0; j < this.filenamedetails.length; j++) {
      var obj = {
        "BuildingID": this.ReviewID,
        "FileType": this.filenamedetails[j].ffile,
        "FileName": this.filenamedetails[j].fname,
        "modifieddate": new Date(),
        "Base64Data": this.filenamedetails[j].base[j],
        "ModifiedBy": 'Test Name',
        "PDF": "pdf"
      }
      debugger;
      this.fmsservice.Insert_PunchListReviewDocument(obj).subscribe((data) => {
        if (data != null && data != undefined) {
          debugger;

        }
      })

    }

  }


  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Punch List Reports ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Punch List Reports'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.projectlist);
  }


}
