import { Component, OnInit, TemplateRef } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';
// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
  // modalRef: BsModalRef;
  InputId: any;

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  public pageMenuTitle;
  public buildingPageTitle;
  public building_BreadChrumb;
  public building_AddNewButton;
  public building_Photo;
  public building_Name;
  public building_Address;
  public building_Country;
  public building_State;
  public building_City;
  public building_Contact_Name;
  public building_Phone_Number;
  public building_Email;
  public building_Actions;


  public name;
  public address;
  public phoneNo;
  public typeID;
  public contactPersonName;
  public contactPersonPhoneNo;
  public contactPersonEmail;
  public noOfFloors;
  public totalNoUnits;
  public noOfUnitsPerFloor;
  public areaSqFt;
  public builtYear;
  public attachment;
  public country;
  public state;
  public city;
  public BuildingList: any;
  public BuildingSearch;
  photourllist: any;
  selectedlanguage: any;
  FileName: any;
  FileType: any;
  base64textString: any;
  buildingName: any;

  ImageID: any;
  nophoto: any;
  noimage: any;

  public filenamedetails = [];
  public filetypedetails = [];
  public base64textStringdetails = [];
  buildingID: any;
  llll: any;
  Countrylist: any;
  countryID1: any;
  LoginTypeID: any;
  ProjectID: any;
  projectlist: any;
  ProjectType: any
  UserID: any;
  ngOnInit() {
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.countryID1 = 'none';
    this.UserID = localStorage.getItem('UserID');
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    // this.fmsservice.GetBuildinglist(1).subscribe(data => {
    //   debugger
    //   this.projectlist = data;
    //   this.ProjectID = this.projectlist[0].id;
    //   localStorage.setItem('ProjectID', this.ProjectID);
    //   localStorage.setItem('ProjectName', this.projectlist[0].name);
    //   localStorage.setItem('ProjectType', this.projectlist[0].projectType);
    //   this.ProjectType = localStorage.getItem('ProjectType');


    // })
    this.fmsservice.GetCountryType(this.selectedlanguage).subscribe(data => {
      debugger
      this.Countrylist = data;
    });

    this.getBuildingdashboardbyLanguage(this.selectedlanguage);
    this.GetBuildinglist(this.selectedlanguage);

    this.llll(this.BuildingList);


  }

  stateID1;
  countryID;
  stateID;
  Statelist;
  getcountryID(eve) {
    debugger;

    this.stateID1 = ''
    this.countryID = eve.target.value;
    if (this.countryID == 2) {
      debugger;
      this.stateID = 6
      this.getphilipinesstateID(6);
    }

    this.fmsservice.GetStateType(this.selectedlanguage, this.countryID).subscribe(data => {
      debugger
      this.Statelist = data;
    })
  }


  cityID1: any;
  getstateID(eve) {
    debugger;
    this.cityID1 = ''
    this.stateID = eve.target.value
    this.fmsservice.GetCityType(this.selectedlanguage, this.stateID).subscribe(data => {
      debugger

      this.citylist = data;
    })

  }


  citylist
  public getphilipinesstateID(stateID) {
    debugger;
    this.fmsservice.GetCityType(this.selectedlanguage, stateID).subscribe(data => {
      debugger
      this.citylist = data;
    })
  }

  // export(){
  //   debugger

  //   const options = { 
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalSeparator: '.',
  //     showLabels: true, 
  //     showTitle: true,
  //     title: 'My Awesome CSV',
  //     useTextFile: false,
  //     useBom: true,
  //     useKeysAsHeaders: true,
  //     // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  //   };



  // const csvExporter = new ExportToCsv(options);

  // csvExporter.generateCsv(this.BuildingList);

  // }








  handleFileSelect(evt) {
    //console.log(evt);
    var File = evt.target.value;
    // console.log(File);
    let subStringData = File.substr(12, 10000);
    //console.log(X);
    var FileName = subStringData.split('.')[0];
    var FileType = subStringData.split('.')[1];
    console.log(FileName);
    console.log(FileType);
    this.FileName = FileName;
    this.FileType = FileType;
    var files = evt.target.files;
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }


  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(this.base64textString);
  }




  getimage(buildingID) {
    debugger

    this.fmsservice.GetBuildingDocument(buildingID).subscribe(data => {
      debugger
      if (data.length == 0) {
        this.photourllist = data;
        this.nophoto = 1


      }

      else {
        this.photourllist = data;
        this.nophoto = 0
        debugger
      }

    })

  }


  public getBuildingdashboardbyLanguage(languageid) {
    this.fmsservice.getbuildingDashboardbyLanguageId(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.buildingPageTitle = res[0].buildingPageTitle;
        this.building_BreadChrumb = res[0].building_BreadChrumb;
        this.building_AddNewButton = res[0].building_AddNewButton;
        this.building_Photo = res[0].building_Photo;
        this.building_Name = res[0].building_Name;
        this.building_Address = res[0].building_Address;
        this.building_Country = res[0].building_Country;
        this.building_State = res[0].building_State;
        this.building_City = res[0].building_City;
        this.building_Contact_Name = res[0].building_Contact_Name;
        this.building_Phone_Number = res[0].building_Phone_Number;
        this.building_Email = res[0].building_Email;
        this.building_Actions = res[0].building_Actions;

      }
    )
  }


  public GetBuildinglist(languageid) {

    if (this.LoginTypeID == 6) {
      this.fmsservice.GetBuildinglist(languageid).subscribe(
        res => {
          debugger;
          this.BuildingList = res.filter(x => x.companyID == 1 && x.id == localStorage.getItem('ProjectID'));
        }
      )
    }
    else if (this.LoginTypeID == 5) {
      this.fmsservice.GetBuildinglist(languageid).subscribe(
        res => {
          debugger;
          this.BuildingList = res.filter(x => x.id == localStorage.getItem('ProjectID'));
        }
      )
    } else {
      this.fmsservice.GetBuildinglist(languageid).subscribe(
        res => {
          debugger;
          this.BuildingList = res.filter(x => x.id == localStorage.getItem('ProjectID'));
        }
      )
    }

  }


  DeleteBuilding(BuildingID, buildingName) {
    debugger
    this.buildingName = buildingName
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover' + ' ' + this.buildingName + ' ' + 'Property!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.DeleteBuilding(BuildingID).subscribe(data => {
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your Property has been deleted.',
              'success'
            )
            this.getBuildingdashboardbyLanguage(this.selectedlanguage);
            this.GetBuildinglist(this.selectedlanguage);
            this.InsertLoginDetails();
          }
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Property is safe :)',
          'error'
        )
      }
    })



  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Property ' + this.buildingName + ' Deleted',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Property",
      "Action": 'Delete Property',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  ///////////////Start photo///////////////////////



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

  ///////////////end photo///////////////////////


  getbuildingid(data) {
    debugger
    this.filenamedetails.length = 0

    this.buildingID = data;

  }

  addBuildingDocument() {
    debugger
    for (let j = 0; j < this.filenamedetails.length; j++) {

      var obj = {
        "BuildingID": this.buildingID,
        "FileType": this.filenamedetails[j].ffile,
        "FileName": this.filenamedetails[j].fname,
        "modifieddate": new Date(),
        "Base64Data": this.filenamedetails[j].base[j],
        "ModifiedBy": 'Test Name',
        "PDF": "pdf"
      }
      debugger;
      this.fmsservice.InsertBuildingDocument(obj).subscribe((data) => {
        if (data != null && data != undefined) {
          debugger;

        }
        this.GetBuildinglist(this.selectedlanguage);
      })

      if ((this.filenamedetails.length - 1) == j) {
        debugger
        Swal.fire("Property Added Successfully")



      }

    }



  }


  updateattachment(ImageID) {
    debugger
    this.ImageID = ImageID
  }

  UpdatebuildingDocument() {
    debugger
    var entity = {
      'ID': this.ImageID,
      'FileName': this.FileName,
      'FileType': this.FileType,
      'modifieddate': new Date(),
      'Base64Data': this.base64textString,
      'pdf': 'pdf'
    };


    this.fmsservice.UpdateBuildingDocuments(entity).subscribe(data => {
      debugger

      if (data != undefined) {

        Swal.fire("Document Updated Successfully")
        this.GetBuildinglist(this.selectedlanguage);
      }
    })
  }





  DeleteBuildingDocuments(ID) {
    debugger

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover Image!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.DeleteBuildingDocuments(ID).subscribe(data => {
          debugger
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your Image has been deleted.',
              'success'
            )

            this.getBuildingdashboardbyLanguage(this.selectedlanguage);
            this.GetBuildinglist(this.selectedlanguage);
          }
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Image file is safe :)',
          'error'
        )
      }
    })



  }





}
