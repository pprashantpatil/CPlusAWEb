import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { ExportToCsv } from '../../../../../node_modules/export-to-csv';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public staffTitle;
  public pageMenuTitle;
  public staff_BreadChrumb;
  public staff_AddNewButton;
  public staff_Search;
  public staff_Building;
  public staff_Name;
  public staff_MobileNumber;
  public staff_Type;
  public staff_IDattachment;
  public staff_Emergency;
  public staff_Actions;

  public BuildingStaffList: any;
  selectedlanguage: any;
  Buildinglist: any;
  buildingID: any;
  StaffID: any;
  searchtext: any;
  StaffID2: any;
  Staffphoto: any;
  StaffType: any;
  SStaffTypeID: any;
  ProjectID: any;
  LoginTypeID:any;
  ngOnInit() {

    this.LoginTypeID = localStorage.getItem('LoginTypeID');

    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsservice.GetStaffType(1).subscribe(
      res => {
        debugger;
        this.StaffType = res;
      }
    )

    this.SStaffTypeID = "0"

    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetStaffLanguage(this.selectedlanguage);
    this.GetBuildingStaff(this.selectedlanguage);

    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(data => {
      debugger
      this.Buildinglist = data;

      this.Buildinglist.sort(function (a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {

          return -1;
        }

        if (nameA > nameB) {

          return 1;
        }

        // names must be equal
        return 0;
      });

    })
  }


  StaffTypeID;
  FilteredBuildingStaffList
  // public filterStaffType(evn) {
  //   debugger;
  //   this.StaffTypeID = evn.target.value;
  //   if (evn.target.value == "none") {
  //     this.fmsservice.GetBuildingStaff(this.selectedlanguage).subscribe(
  //       res => {
  //         debugger;
  //         this.BuildingStaffList = res;
  //         this.FilteredBuildingStaffList = this.BuildingStaffList
  //         var list = this.FilteredBuildingStaffList.filter(X => X.buildingid == this.buildingID)
  //         this.FilteredBuildingStaffList = list;

  //       }
  //     )
  //   }
  //   else {
  //     this.FilteredBuildingStaffList = this.BuildingStaffList.filter(x => x.staffTypeID == this.StaffTypeID && x.buildingid == this.buildingID);
  //   }

  // }



  Count:any;
  public filterStaffType(evn) {
    debugger;
    this.StaffTypeID = evn.target.value;

    if (this.StaffTypeID == '0') {
      this.FilteredBuildingStaffList = this.BuildingStaffList
      var list = this.FilteredBuildingStaffList;
      this.FilteredBuildingStaffList = list;
      this.Count=this.FilteredBuildingStaffList.length;
    }
    else {
      this.FilteredBuildingStaffList = this.BuildingStaffList.filter(x => x.staffTypeID == this.StaffTypeID);
      this.Count=this.FilteredBuildingStaffList.length;

    }
  }







  public GetStaffLanguage(languageid) {
    this.fmsservice.GetStaffLanguage(languageid).subscribe(
      res => {
        debugger;
        this.staffTitle = res[0].staffTitle;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.staff_BreadChrumb = res[0].staff_BreadChrumb;
        this.staff_AddNewButton = res[0].staff_AddNewButton;
        this.staff_Search = res[0].staff_Search;
        this.staff_Building = res[0].staff_Building;
        this.staff_Name = res[0].staff_Name;
        this.staff_MobileNumber = res[0].staff_MobileNumber;
        this.staff_Type = res[0].staff_Type;
        this.staff_IDattachment = res[0].staff_IDattachment;
        this.staff_Emergency = res[0].staff_Emergency;
        this.staff_Actions = res[0].staff_Actions;
        this.StaffID2 = res[0].staffID;
        this.Staffphoto = res[0].staffphoto;
      }
    )
  }

  public GetBuildingStaff(languageid) {
    this.fmsservice.GetBuildingStaff(languageid).subscribe(
      res => {
        debugger;
        this.BuildingStaffList = res;
        this.FilteredBuildingStaffList = this.BuildingStaffList;
        this.Count=this.FilteredBuildingStaffList.length;
      }
    )
  }


  filterbuilding(buildingID) {
    debugger
    this.buildingID = buildingID.target.value

    this.SStaffTypeID = "none"
    if (this.buildingID == "none") {
      this.fmsservice.GetBuildingStaff(this.selectedlanguage).subscribe(
        res => {
          debugger;
          this.BuildingStaffList = res;
          this.FilteredBuildingStaffList = this.BuildingStaffList;
          this.Count=this.FilteredBuildingStaffList.length;
          debugger
        }
      )
    }

    else {
      this.fmsservice.GetBuildingStaff(this.selectedlanguage).subscribe(
        res => {
          debugger;
          this.BuildingStaffList = res;

          var list = this.BuildingStaffList
          this.BuildingStaffList = list;

          this.FilteredBuildingStaffList = this.BuildingStaffList;
          this.Count=this.FilteredBuildingStaffList.length;


        }
      )

    }
  }




  Staffname
  Deletestaff(ID, StaffName) {
    debugger
    this.Staffname = StaffName;
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover Staff Details!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        debugger
        this.fmsservice.DeleteBuildingStaff(ID).subscribe(data => {
          debugger
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your  Staff Details has been deleted.',
              'success'
            )
            this.InsertLoginDetails();
            this.GetBuildingStaff(this.selectedlanguage);
          }
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your  Staff Details is safe :)',
          'error'
        )
      }
    })

  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Staff  ' + this.Staffname + ' Deleted',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Staff",
      "Action": 'Add New Staff',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }


  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Staff Details ',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Staff Details'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.FilteredBuildingStaffList);
  }


}
