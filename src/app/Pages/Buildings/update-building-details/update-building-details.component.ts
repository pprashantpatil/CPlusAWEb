import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-building-details',
  templateUrl: './update-building-details.component.html',
  styleUrls: ['./update-building-details.component.css']
})
export class UpdateBuildingDetailsComponent implements OnInit {
  buildingname: any;
  buildingaddress: any;
  countryID: any;
  stateID: any;
  cityID: any;
  buildingtypeID: any;
  phonenumber: any;
  contactperson: any;
  contactphone: any;
  contactemail: any;
  nooffloor: any;
  noofunit: any;
  unitperfloor: any;
  buildingarea: any;
  buildyear: any;
  buildingphoto: any;
  buildingentrance: any;
  selectedlanguage: any;
  lll: any;
  FileName: any;
  FileType: any;
  base64textString: any;
  Statelist: any;
  NoOfbasement: any;
  list = [];
  vali: any;

  constructor(public fmsservice: FmsService, public activatedRoute: ActivatedRoute, public datepipe: DatePipe) { }
  public pageMenuTitle;
  public addOrUpdateBuilding_BreadChrumb;
  public addOrUpdateBuilding_Building_Name;
  public addOrUpdateBuilding_Building_Address;
  public addOrUpdateBuilding_Country;
  public addOrUpdateBuilding_State;
  public addOrUpdateBuilding_City;
  public addOrUpdateBuilding_Phone_Number;
  public addOrUpdateBuilding_Building_Type;
  public addOrUpdateBuilding_Contact_Person_Name;
  public addOrUpdateBuilding_Contact_Person_Phone;
  public addOrUpdateBuilding_Contact_Person_Email;
  public addOrUpdateBuilding_Number_of_Floors;
  public addOrUpdateBuilding_Total_Number_of_Units;
  public addOrUpdateBuilding_Number_of_Units_Per_Floor;
  public addOrUpdateBuilding_Total_Building_Area;
  public addOrUpdateBuilding_Year_Built;
  public addOrUpdateBuilding_Photo;
  public addOrUpdateBuilding_Entrance;
  public addOrUpdateBuilding_Save;
  basement: any;
  paramid: any;
  BuildingList: any;
  countryID1: any;
  stateID1: any;
  cityID1: any;
  buildingtypeID1: any;
  buildingentrance1: any;
  update: any;
  Document: any;
  typeID: any;
  public filenamedetails = [];
  public filetypedetails = [];
  public base64textStringdetails = [];
  buildingID: any;
  Countrylist: any;
  citylist: any;
  attachment: any;
  a: any;
  b: any;
  c: any;
  d: any;
  valcountryID: any;
  valstateID: any;
  valcityID: any;
  valbuildingtypeID: any;
  valbuildingentrance: any;
  valFileType: any;
  Isempty: any;

  UserID: any;
  ngOnInit() {

    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.UserID = localStorage.getItem('UserID');
    this.ProjectExecutedBy = 'none';
    this.getAddOrUpdateBuildingbyLanguage(this.selectedlanguage);

    this.fmsservice.GetCountryType(this.selectedlanguage).subscribe(data => {
      debugger

      this.Countrylist = data;
    });



    var buildID = this.activatedRoute.params.subscribe(data => {
      debugger
      this.paramid = data['id']
      this.typeID = data['typeID']
      if (this.paramid != null && this.paramid != undefined) {



        this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(
          res => {
            debugger;
            this.BuildingList = res;

            var list = this.BuildingList.filter(X => X.id == this.paramid)
            debugger
            this.buildingname = list[0].name
            this.buildingaddress = list[0].address;

            this.countryID1 = list[0].countryID
            this.stateID1 = list[0].stateID
            this.cityID1 = list[0].cityID
            this.buildingtypeID1 = list[0].typeID
            this.phonenumber = list[0].phoneNo
            this.contactperson = list[0].contactPersonName
            this.contactphone = list[0].contactPersonPhoneNo
            this.contactemail = list[0].contactPersonEmail
            this.nooffloor = list[0].noOfFloors
            this.noofunit = list[0].totalNoUnits
            this.unitperfloor = list[0].noOfUnitsPerFloor
            this.buildingarea = list[0].areaSqFt
            this.buildyear = list[0].builtYear
            this.Document = list[0].actAttachment
            this.attachment = list[0].attachment
            this.buildingentrance1 = list[0].entrances
            this.ProjectExecutedBy = list[0].projectExecutedBy
            this.Budgethours = list[0].budgethours;
            this.ProejectType = this.typeID
            this.fmsservice.GetStateType(this.selectedlanguage, list[0].countryID).subscribe(data => {
              debugger
              this.Statelist = data;
              debugger
              var list = this.Statelist.filter(x => x.id == list[0].stateID)
              debugger
              this.stateID1 = list;
            })


            this.fmsservice.GetCityType(this.selectedlanguage, list[0].stateID).subscribe(data => {
              debugger

              this.citylist = data;
              debugger
              var list = this.citylist.filter(x => x.id == list[0].cityID)
              debugger
              this.cityID1 = list;
              debugger
            })

          }
        )




      }
    })


  }




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



  public getphilipinesstateID(stateID) {
    debugger;
    this.fmsservice.GetCityType(this.selectedlanguage, stateID).subscribe(data => {
      debugger
      this.citylist = data;
    })
  }

  getstateID(eve) {
    debugger;
    this.cityID1 = ''
    this.stateID = eve.target.value
    this.fmsservice.GetCityType(this.selectedlanguage, this.stateID).subscribe(data => {
      debugger

      this.citylist = data;
    })

  }

  getcityID(eve) {
    debugger
    this.cityID = eve.target.value

  }
  getbuildingtypeID(eve) {
    this.buildingtypeID = eve.target.value
  }

  getbuildingentrance(eve) {
    this.buildingentrance = eve.target.value
  }


  //   handleFileSelect(evt){
  //     //console.log(evt);
  //     var File=evt.target.value;
  //    // console.log(File);
  //      let subStringData=File.substr(12,27);
  //     //console.log(X);
  //     var FileName = subStringData.split('.')[0];
  //     var FileType =subStringData.split('.')[1];
  //     console.log(FileName);
  //    console.log(FileType);
  //    this.FileName=FileName;
  //    this.FileType=FileType;
  //    var files = evt.target.files;
  //     var file = files[0];
  //     if (files && file) {
  //       var reader = new FileReader();
  //       reader.onload =this._handleReaderLoaded.bind(this);
  //       reader.readAsBinaryString(file);
  //   }


  // }
  // _handleReaderLoaded(readerEvt) {
  //   var binaryString = readerEvt.target.result;
  //          this.base64textString= btoa(binaryString);
  //          console.log( this.base64textString);
  //  }


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










  public getAddOrUpdateBuildingbyLanguage(languageid) {
    this.fmsservice.getAddorUpdateBuildingbyLanguageId(languageid).subscribe(

      res => {
        debugger
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.addOrUpdateBuilding_BreadChrumb = res[0].addOrUpdateBuilding_BreadChrumb;
        this.addOrUpdateBuilding_Building_Name = res[0].addOrUpdateBuilding_Building_Name;
        this.addOrUpdateBuilding_Building_Address = res[0].addOrUpdateBuilding_Building_Address;
        this.addOrUpdateBuilding_Country = res[0].addOrUpdateBuilding_Country;
        this.addOrUpdateBuilding_State = res[0].addOrUpdateBuilding_State;
        this.addOrUpdateBuilding_City = res[0].addOrUpdateBuilding_City;
        this.addOrUpdateBuilding_Phone_Number = res[0].addOrUpdateBuilding_Phone_Number;
        this.addOrUpdateBuilding_Building_Type = res[0].addOrUpdateBuilding_Building_Type;
        this.addOrUpdateBuilding_Contact_Person_Name = res[0].addOrUpdateBuilding_Contact_Person_Name;
        this.addOrUpdateBuilding_Contact_Person_Phone = res[0].addOrUpdateBuilding_Contact_Person_Phone;
        this.addOrUpdateBuilding_Contact_Person_Email = res[0].addOrUpdateBuilding_Contact_Person_Email;
        this.addOrUpdateBuilding_Number_of_Floors = res[0].addOrUpdateBuilding_Number_of_Floors;
        this.addOrUpdateBuilding_Total_Number_of_Units = res[0].addOrUpdateBuilding_Total_Number_of_Units;
        this.addOrUpdateBuilding_Number_of_Units_Per_Floor = res[0].addOrUpdateBuilding_Number_of_Units_Per_Floor;
        this.addOrUpdateBuilding_Total_Building_Area = res[0].addOrUpdateBuilding_Total_Building_Area;
        this.addOrUpdateBuilding_Year_Built = res[0].addOrUpdateBuilding_Year_Built;
        this.addOrUpdateBuilding_Photo = res[0].addOrUpdateBuilding_Photo;
        this.addOrUpdateBuilding_Entrance = res[0].addOrUpdateBuilding_Entrance;
        this.addOrUpdateBuilding_Save = res[0].addOrUpdateBuilding_SaveButton;
        this.update = res[0].update;
        this.basement = res[0].basement;
      }
    )
  }

  Budgethours
  validation() {
    debugger
    this.countryID == "" || this.countryID == "none"
  }


  EmailValid;
  CompanyID: any;
  ProjectExecutedBy: any;
  ProejectType: any;
  insertbuilding() {
    debugger;
    var Entity1 = {
      'Name': this.buildingname,
      'Address': this.buildingaddress,
      'PhoneNo': this.phonenumber.length == 10 ? this.phonenumber : this.phonenumber == "none",
      'TypeID': this.buildingtypeID,
      'ContactPersonName': this.contactperson,
      'ContactPhoneNo': this.contactphone.length == 10 ? this.contactphone : this.contactphone == "none",
      'EmailID': this.contactemail,
      'NoOfFloors': this.nooffloor,


      'CountryID': this.countryID,
      'StateID': this.stateID,
      'CityID': this.cityID,
      'LocationID': 1,


      // 'Document':this.buildingphoto   this.base64textString !=undefined?this.base64textString :this.coursePhoto,,
      'Plan': 'plan',
      'LanguageID': this.selectedlanguage,
      'FileType': this.FileType,
      'CompanyID': this.UserID,

      'ProjectType': this.ProejectType
    }

    let validate = this.fmsservice.isEmpty(Entity1);
    if (validate.length > 0) {
      debugger;
      this.Isempty = true;
      debugger;
    }
    else {
      var Entity = {
        'Name': this.buildingname,
        'Address': this.buildingaddress,
        'PhoneNo': this.phonenumber,
        'TypeID': this.buildingtypeID,
        'ContactPersonName': this.contactperson,
        'ContactPhoneNo': this.contactphone,
        'EmailID': this.contactemail,
        'NoOfFloors': this.nooffloor,
        'TotalNoUnits': this.noofunit != undefined ? this.noofunit : null,
        'NoOfUnitsPerFloor': this.unitperfloor != undefined ? this.unitperfloor : null,
        'CountryID': this.countryID,
        'StateID': this.stateID,
        'CityID': this.cityID,
        'LocationID': 1,
        'AreaSqFt': this.buildingarea != undefined ? this.buildingarea : null,
        'BuiltYear': this.buildyear,
        // 'Document':this.buildingphoto   this.base64textString !=undefined?this.base64textString :this.coursePhoto,,
        'Plan': 'plan',
        'Entrances': this.buildingentrance != undefined ? this.buildingentrance : null,
        'LanguageID': this.selectedlanguage,
        'NoOfbasement': this.NoOfbasement != undefined ? this.NoOfbasement : 0,
        'CompanyID': this.UserID,
        'ProjectExecutedBy': this.ProjectExecutedBy,
        'ProjectType': this.ProejectType,
        'Budgethours': this.Budgethours

      }
      this.EmailValid = this.fmsservice.validateEmail(this.contactemail);
      if (this.EmailValid == false) {
        debugger;
      } else {
        this.fmsservice.InsertBuilding(Entity).subscribe(data => {
          debugger
          if (data != undefined) {
            Swal.fire("Property Saved Successfully");
            this.InsertLoginDetails();
            this.buildingID = data;
            if (this.filenamedetails.length != null || this.filenamedetails.length != undefined) {
              this.saveInsertBuildingDocument();
              location.href = "#/Building";
            }
            else {
              Swal.fire("Property Saved Successfully");
              this.clear();
              this.InsertLoginDetails();
              location.href = "#/Building";
            }
          }
        })
      }
    }
  }


  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Buidling ' + this.buildingname + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Building",
      "Action": 'Add New Building',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })

  }



  saveInsertBuildingDocument() {
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
          this.clear();
        }
      })

    }

  }



  Updatebuilding() {
    debugger

    var Entity1 = {
      'Name': this.buildingname,
      'Address': this.buildingaddress,
      'PhoneNo': this.phonenumber.length == 10 ? this.phonenumber : this.phonenumber == "none",
      'TypeID': this.buildingtypeID != undefined ? this.buildingtypeID : this.buildingtypeID1,
      'ContactPersonName': this.contactperson,
      'ContactPhoneNo': this.contactphone.length == 10 ? this.contactphone : this.contactphone == "none",
      'EmailID': this.contactemail,
      'NoOfFloors': this.nooffloor,


      'CountryID': this.countryID != undefined ? this.countryID : this.countryID1,
      'StateID': this.stateID != undefined ? this.stateID : this.stateID1,
      'CityID': this.cityID != undefined ? this.cityID : this.cityID1,
      'LocationID': 1,
      'AreaSqFt': this.buildingarea != undefined ? this.buildingarea : null,
   
      // 'Document':this.buildingphoto   this.base64textString !=undefined?this.base64textString :this.coursePhoto,,
      'Plan': 'plan',

      'LanguageID': this.selectedlanguage,
      'ProjectExecutedBy': this.ProjectExecutedBy,
      'ProjectType': this.ProejectType,

    }

    let validate = this.fmsservice.isEmpty(Entity1);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;
      debugger
    }
    else {
      debugger
      var Entity = {
        "ID": this.paramid,
        'Name': this.buildingname,
        'Address': this.buildingaddress,
        'PhoneNo': this.phonenumber,
        'TypeID': this.buildingtypeID != undefined ? this.buildingtypeID : this.buildingtypeID1,
        'ContactPersonName': this.contactperson,
        'ContactPhoneNo': this.contactphone,
        'EmailID': this.contactemail,
        'NoOfFloors': this.nooffloor,
        'TotalNoUnits': this.noofunit != undefined ? this.noofunit : null,
        'NoOfUnitsPerFloor': this.unitperfloor != undefined ? this.unitperfloor : null,
        'CountryID': this.countryID != undefined ? this.countryID : this.countryID1,
        'StateID': this.stateID != undefined ? this.stateID : this.stateID1,
        'CityID': this.cityID != undefined ? this.cityID : this.cityID1,
        'LocationID': 1,
        'AreaSqFt': this.buildingarea != undefined ? this.buildingarea : null,
        'BuiltYear': this.buildyear != undefined ? this.buildyear : null,
        // 'Document':this.buildingphoto   this.base64textString !=undefined?this.base64textString :this.coursePhoto,,
        'Plan': 'plan',
        'Entrances': this.buildingentrance != undefined ? this.buildingentrance : this.buildingentrance1,
        'LanguageID': this.selectedlanguage,
        'ProjectExecutedBy': this.ProjectExecutedBy,
        'ProjectType': this.ProejectType,
        'Budgethours': this.Budgethours
      }

      this.fmsservice.UpdateBuilding(Entity).subscribe(data => {
        debugger
        if (data != undefined) {

          Swal.fire("Property Updated Successfully")
          this.UpdateLoginDetails();
          this.clear();
          location.href = "#/Building";
        }

      })
    }
    debugger

  }



  public UpdateLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Buidling ' + this.buildingname + ' Updated',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Building",
      "Action": 'Update Building',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })
  }


  base(data, date1) {
    var uuu = data.target.checked;

    debugger
    var NoOfbasement1 = date1;
    if (uuu == true) {
      debugger
      this.list.push(NoOfbasement1)
      debugger
      this.NoOfbasement = this.list.length;

    }


    else {
      var index = this.list.indexOf(NoOfbasement1)
      this.list.splice(index, 1)
      debugger
      this.NoOfbasement = this.list.length;
      debugger

    }



  }




  clear() {
    debugger

    this.buildingname = '',
      this.buildingaddress = '',
      this.phonenumber = '',
      this.buildingtypeID = '',
      this.contactperson = '',
      this.contactphone = '',
      this.contactemail = '',
      this.nooffloor = '',
      this.noofunit = '',
      this.unitperfloor = '',
      this.Countrylist = '',
      this.stateID = '',
      this.cityID = '',
      this.buildingarea = '',
      this.buildyear = '',
      this.buildingphoto = '',
      this.buildingentrance = '',
      this.selectedlanguage = '',
      this.basement = ''

  }

}
