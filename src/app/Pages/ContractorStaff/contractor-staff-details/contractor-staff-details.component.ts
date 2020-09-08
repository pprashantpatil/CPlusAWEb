import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contractor-staff-details',
  templateUrl: './contractor-staff-details.component.html',
  styleUrls: ['./contractor-staff-details.component.css']
})
export class ContractorStaffDetailsComponent implements OnInit {

  constructor(public fmsservice: FmsService, public activatedRoute: ActivatedRoute, private datePipe: DatePipe) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 0);
  }

  public staffDetailsTitle;
  public pageMenuTitle;
  public staffDetails_BreadChrumb;
  public staffDetails_Building;
  public staffDetails_BuildingAddress;
  public staffDetails_Name;
  public staffDetails_Phone;
  public staffDetails_EmailID;
  public staffDetails_StaffType;
  public staffDetails_Address;
  public staffDetails_Joining;
  public staffDetails_MonthlySalary;
  public staffDetails_Leaves;
  public staffDetails_WorkTimings;
  public staffDetails_EmergencyPhn;
  public staffDetails_IDAttachment;
  update: any;
  staffDetails_Save: any;
  selectedlanguage: any;
  Buildinglist: any;
  BuildingID: any;
  StaffTypelist: any;
  SupervisorLists: any;
  StafftypeID: any;
  FileName: any;
  FileType: any;
  base64textString: any;

  FileName1: any;
  FileType1: any;
  base64textString1: any;
  othername: any;

  name: any;
  phoneno: any;
  emailid: any;
  address: any;
  monsal: any;
  leaves: any;
  Salary: any;
  worktime: any;
  emeraphno: any;
  stafflist: any;

  ////====Date Formate====////
  Date: any;
  DateChanged: boolean = false;
  paramID: any;

  buildID: any;
  stafftypeID: any;
  attachment: any;
  staffID: any;
  photo: any;
  staffdetailsID: any;
  staffID1: any;
  staffphoto: any;
  staffdetailsphotos: any;
  actStaffIDPhoto: any;
  Isempty: any;
  BaseSal: any;
  PF: any;
  Allowance: 0;
  GrossSalary: any;
  Supervisor: any;
  EmployeeStatus: any;
  Location: any;

  minDate: Date;

  ngOnInit() {
    //this.GrossSalary=this.BaseSal+this.PF+this.Allowance;
    //this.PF = 0.12 * this.GrossSalary;

    this.fmsservice.GetSupervisors().subscribe(data => {
      debugger
      this.SupervisorLists = data;
    })


    var list = this.activatedRoute.params.subscribe(data => {
      debugger

      this.paramID = data['id']

      if (this.paramID != null && this.paramID != undefined) {
        debugger
        this.fmsservice.GetBuildingStaffByID(this.paramID).subscribe(data => {
          debugger
          this.stafflist = data;
          this.buildID = this.stafflist[0].buildingID
          this.name = this.stafflist[0].name
          this.phoneno = this.stafflist[0].phoneNo
          this.emailid = this.stafflist[0].emailID
          this.stafftypeID = this.stafflist[0].stafftypeID
          this.address = this.stafflist[0].address
          this.Date = this.stafflist[0].joiningDate
          this.monsal = this.stafflist[0].monthlySalary
          this.leaves = this.stafflist[0].leavesPerMonth
          this.worktime = this.stafflist[0].workTimmings
          this.emeraphno = this.stafflist[0].emergencyContactNo
          this.attachment = this.stafflist[0].actAttachment
          this.photo = this.stafflist[0].attachment
          this.staffID = this.stafflist[0].id;
          this.staffdetailsID = this.stafflist[0].staffID;
          this.staffdetailsphotos = this.stafflist[0].staffIDPhoto;
          this.actStaffIDPhoto = this.stafflist[0].actStaffIDPhoto;
          this.othername = this.stafflist[0].othetname;
          this.BaseSal = this.stafflist[0].baseSal;

          this.GrossCalculations = this.stafflist[0].grossSalary
          this.PF = this.stafflist[0].pf;
          this.Allowance = this.stafflist[0].allowance;
          this.Gross = this.stafflist[0].grossSalary;
          debugger
          this.Supervisor = this.stafflist[0].supervisor;
          // this.TINNo=this.stafflist[0].tinNo;
          this.TINNo = this.stafflist[0].tinNo
          debugger
          this.EmployeeStatus = this.stafflist[0].employeeStatus,
            this.Location = this.stafflist[0].location,
            //this.JobTitle = this.stafflist[0].jobTitle,
            this.DOB = this.datePipe.transform(this.stafflist[0].dob, 'yyyy-MM-dd'),
            this.SSSRate = this.stafflist[0].sssRate
          debugger
          this.PagibigRate = this.stafflist[0].pigiRate,
            this.philihealth = this.stafflist[0].philiHealth
          debugger
        })
      }



    })
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetStaffDetailsLanguage(this.selectedlanguage);

    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(data => {
      debugger
      this.Buildinglist = data;
    })

    this.fmsservice.GetStaffType(this.selectedlanguage).subscribe(data => {
      debugger
      this.StaffTypelist = data;
    })




  }

  DateChange() {
    debugger
    this.DateChanged = true;
    this.Date.toLocaleDateString();
    var date = this.Date.getFullYear() + '-' + (this.Date.getMonth() + 1) + '-' + this.Date.getDate();
    this.Date = date;
    debugger
    console.log(this.Date)

  }

  getbuildingID(Building) {
    debugger
    this.BuildingID = Building.target.value

  }

  getStafftypeID(StafftypeID) {
    debugger

    this.StafftypeID = StafftypeID.target.value;
  }


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



  handleFileSelect1(evt) {
    debugger;
    //console.log(evt);
    var File1 = evt.target.value;
    // console.log(File);
    let subStringData1 = File1.substr(12, 10000);
    //console.log(X);
    var FileName1 = subStringData1.split('.')[0];
    var FileType1 = subStringData1.split('.')[1];
    console.log(FileName1);
    console.log(FileType1);
    this.FileName1 = FileName1;
    this.FileType1 = FileType1;
    var files1 = evt.target.files;
    var file1 = files1[0];
    if (files1 && file1) {
      var reader1 = new FileReader();
      reader1.onload = this._handleReaderLoaded1.bind(this);
      reader1.readAsBinaryString(file1);
    }


  }
  _handleReaderLoaded1(readerEvt) {
    var binaryString1 = readerEvt.target.result;
    this.base64textString1 = btoa(binaryString1);
    console.log(this.base64textString1);
  }


  DOB;
  TINNo;


  public GetStaffDetailsLanguage(languageid) {
    this.fmsservice.GetStaffDetailsLanguage(languageid).subscribe(

      res => {
        debugger;
        this.staffDetailsTitle = res[0].staffDetailsTitle;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.staffDetails_BreadChrumb = res[0].staffDetails_BreadChrumb;
        this.staffDetails_Building = res[0].staffDetails_Building;
        this.staffDetails_BuildingAddress = res[0].staffDetails_BuildingAddress;
        this.staffDetails_Name = res[0].staffDetails_Name;
        this.staffDetails_Phone = res[0].staffDetails_Phone;
        this.staffDetails_EmailID = res[0].staffDetails_EmailID;
        this.staffDetails_StaffType = res[0].staffDetails_StaffType;
        this.staffDetails_Address = res[0].staffDetails_Address;
        this.staffDetails_Joining = res[0].staffDetails_Joining;
        this.staffDetails_MonthlySalary = res[0].staffDetails_MonthlySalary;
        this.staffDetails_Leaves = res[0].staffDetails_Leaves;
        this.staffDetails_WorkTimings = res[0].staffDetails_WorkTimings;
        this.staffDetails_EmergencyPhn = res[0].staffDetails_EmergencyPhn;
        this.staffDetails_IDAttachment = res[0].staffDetails_IDAttachment;
        this.staffDetails_Save = res[0].staffDetails_Save
        this.update = res[0].update,
          this.staffID1 = res[0].staffID,
          this.staffphoto = res[0].staffphoto

      }
    )
  }


  InsertBuildingStaff() {
    debugger

    var man = {
      'phoneno': this.phoneno.length == 10 ? this.phoneno : this.phoneno == "none",
      'BuildingID': 80,
      'TypeID': this.StafftypeID,
      'FileType': this.FileType,
      'StaffID': 1,
      'FileType1': this.FileType1,
      'emeraphno': this.emeraphno.length == 10 ? this.emeraphno : this.emeraphno == "none",

    }

    let validate = this.fmsservice.isEmpty(man);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;
      debugger
    }

    else {
      var filter = {
        'BuildingID': 80,
        'Name': this.name,
        'PhoneNo': this.phoneno,
        'EmailID': this.emailid,
        'TypeID': this.StafftypeID,
        'Address': this.address,
        'JoiningDate': this.Date,
        // 'Salary': this.Salary,
        'Base64Data': this.base64textString != undefined ? this.base64textString : this.attachment,
        'LeavesPerMonth': this.leaves,
        'WorkTimmings': this.worktime,
        'ContactNumber': this.emeraphno,
        'LanguageID': this.selectedlanguage,
        'FileName': this.FileName,
        'FileType': this.FileType,
        'modifieddate': new Date(),
        //'Base64Data': this.base64textString,
        'StaffID': this.staffdetailsID,
        'FileName1': this.FileName1,
        'FileType1': this.FileType1,
        'modifieddate1': new Date(),
        'Base64Data1': this.base64textString1,
        'Othetname': this.othername != undefined ? this.othername : null,
        'BaseSal': this.BaseSal,
        'SSSRate': this.SSSRate,
        'PigiRate': this.PagibigRate,
        'PhiliHealth': this.philihealth,
        'Allowance': this.Allowance,
        'GrossSalary': this.Grossss,
        'Supervisor': 1,
        'DOB': this.DOB,
        'TINNo': this.TINNo,
        'EmployeeStatus': this.EmployeeStatus,
        'location': this.Location,
        'ContractorID': localStorage.getItem('UserID')
      }
      this.fmsservice.InsertContractorPhiliStaff(filter).subscribe(data => {
        debugger;

        if (data != undefined) {
          Swal.fire("Staff Details Saved Successfully");
          this.InsertLoginDetails();
          this.clear();

          location.href = '#/ContractorStaff';
        }
      });
    }


  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Staff ' + this.name + ' Added',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Staff",
      "Action": 'Add New Staff',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })

  }

  InsertLoginDetails1() {
    debugger
    var obj = {
      "ApplicationName": 'Staff Details of' + this.name + ' Updated',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Staff",
      "Action": 'Update Staff',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })

  }

  Gross;
  ggg(data) {
    debugger;
    this.Gross = Number(this.BaseSal) + Number(data) + Number(this.PF);
  }
  SSSRate;
  PagibigRate;
  philihealth;
  public BasicSalaryCalculation(data1) {
    debugger;

    // this.Allowance=data1+this.Allowance;
    this.SSSRate = 0.04 * data1;
    //this.PagibigRate = (9.58 * data1) - this.SSSRate
    this.PagibigRate = 0.09 * data1;

    this.philihealth = 0.027 * data1;

  }



  // public PagibigCalculation(Data) {
  //   this.PagibigRate = 0.958 * Data;
  // }

  Deductions;
  Grossss
  GrossCalculations
  public Grosscalculation(Data) {
    this.Deductions = Number(this.SSSRate) + Number(this.PagibigRate) + Number(this.philihealth)
    this.Grossss = this.BaseSal - Number(this.Deductions) + Number(Data)
  }

  UpdateBuildingStaff() {
    debugger

    var mand = {

      'BuildingID': this.buildID,
      'FileType1': "sdfdsf",
      'FileType': "sdfdfdfhgsf",
      'TypeID': this.stafftypeID,



    }

    let validate = this.fmsservice.isEmpty(mand);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;


      debugger
    }

    else {
      var FIlter = {
        'ID': this.staffID,
        'BuildingID': this.BuildingID != undefined ? this.BuildingID : this.buildID,
        'Name': this.name,
        'PhoneNo': this.phoneno,
        'EmailID': this.emailid,
        'TypeID': this.StafftypeID != undefined ? this.StafftypeID : this.stafftypeID,
        'Address': this.address,
        'Base64Data': this.base64textString != undefined ? this.base64textString : this.attachment,
        'JoiningDate': this.Date,
        'Salary': '11',
        'LeavesPerMonth': this.leaves,
        'WorkTimings': this.worktime,
        'ContactNumber': this.emeraphno,
        'FileName': this.FileName,
        'FileType': this.FileType,
        'modifieddate': new Date(),
        'StaffID': this.staffdetailsID,
        'FileName1': this.FileName1,
        'FileType1': this.FileType1,
        'modifieddate1': new Date(),
        'Base64Data1': this.base64textString1 != undefined ? this.base64textString1 : this.actStaffIDPhoto,
        'Othetname': this.othername != undefined ? this.othername : null,
        'BaseSal': this.BaseSal,
        'PF': this.PF,
        'Allowance': this.Allowance,
        'GrossSalary': this.Gross,
        'Supervisor': this.Supervisor
      }

      debugger
      this.fmsservice.UpdateBuildingStaff(FIlter).subscribe(data => {
        debugger
        if (data != undefined) {
          Swal.fire(
            'Staff Details Updated Successfully'
          )
          this.InsertLoginDetails1();
          this.clear();

          location.href = '#/Staff'
        }
      })
    }



  }



  clear() {
    debugger
    this.BuildingID = '',
      this.name = '',
      this.phoneno = '',
      this.emailid = '',
      this.StafftypeID = '',
      this.address = '',
      this.Date = '',
      this.monsal = '',
      this.leaves = '',
      this.worktime = '',
      this.emeraphno = '',
      this.selectedlanguage = '',
      this.FileName = '',
      this.FileType = '',
      this.staffdetailsID = ''
    this.BaseSal = '',
      this.PF = '',
      this.Allowance = 0,
      this.Gross = ''

  }

}
