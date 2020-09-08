import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { document } from 'ngx-bootstrap';
import { ExportToCsv } from 'export-to-csv';



@Component({
  selector: 'app-raised-by',
  templateUrl: './raised-by.component.html',
  styleUrls: ['./raised-by.component.css']
})
export class RaisedByComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;


  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public pageMenuTitle;
  public complaintdashboard_PageTitle;
  public complaintdashboard_breadchrumb;
  public complaintdashboard_Search;
  public complaintdashboard_RequestName;
  public complaintdashboard_Building;
  public complaintdashboard_Floor;
  public complaintdashboard_Unit;
  public complaintdashboard_Raised;
  public complaintdashboard_Status;
  public complaintdashboard_Photo;
  public complaintdashboard_Actions;
  public MaintainanceList: any;
  public BuildingList;
  public StatusList;
  public Search;
  public FilteredMaintainanceList;
  public Assignedlist;
  public Assigned;
  public MaintainanceID;
  public Ulist;
  public UserID;
  public UlistByID;
  public uid;
  public emailid;
  public phn;
  public Vendlist;
  public VendorsByIDList;
  public FileteredVendorsByIDList;
  public vendorname;
  public vendorphno;
  public selectedBuilding;
  public selectedStatus;

  public Date: any;
  public StartTime: any;
  public StaffTypeID: any;
  public InternalUserVis: boolean;
  public VendorVis: boolean;
  StatusName: any;

  ngOnInit() {
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,
    };

    //this.StatusName = 'Open';
  //  this.FilteredBystatus(this.StatusName);
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetComplaintdashboardLanguage(selectedlanguage);
     this.GetComplaintsDashboardWEB();
    this.GetBuildinglist(selectedlanguage);
    this.GetStatusType();
    this.GetUserType(selectedlanguage);
    //  this.GetUsersdrop();
    this.GetVendorType(selectedlanguage);
    this.InternalUserVis = false;
    this.VendorVis = false;
  }

  public GetComplaintdashboardLanguage(languageid) {
    this.fmsservice.GetComplaintdashboardLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.complaintdashboard_PageTitle = res[0].complaintdashboard_PageTitle;
        this.complaintdashboard_breadchrumb = res[0].complaintdashboard_breadchrumb;
        this.complaintdashboard_Search = res[0].complaintdashboard_Search;
        this.complaintdashboard_RequestName = res[0].complaintdashboard_RequestName;
        this.complaintdashboard_Building = res[0].complaintdashboard_Building;
        this.complaintdashboard_Floor = res[0].complaintdashboard_Floor;
        this.complaintdashboard_Unit = res[0].complaintdashboard_Unit;
        this.complaintdashboard_Raised = res[0].complaintdashboard_Raised;
        this.complaintdashboard_Status = res[0].complaintdashboard_Status;
        this.complaintdashboard_Photo = res[0].complaintdashboard_Photo;
        this.complaintdashboard_Actions = res[0].complaintdashboard_Actions;
      }
    )
  }

  public GetComplaintsDashboardWEB() {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();

    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');
    this.fmsservice.GetComplaintsDashboardWEB("2019-01-01", "2019-12-31").subscribe(
      res => {
        debugger;
        this.MaintainanceList = res;
        this.FilteredMaintainanceList = this.MaintainanceList;
        if (this.FilteredMaintainanceList.assignedToNamesss != null) {
          this.VendorVis = false;
          this.InternalUserVis = true;
        }
      }
    )
  }
  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.BuildingList = res;

        this.BuildingList.sort(function (a, b) {
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
      }
    )
  }

  public GetStatusType() {
    this.fmsservice.GetStatusType().subscribe(
      res => {
        debugger;
        this.StatusList = res;
      }
    )
  }

  public FilteredByBuilding(evn) {
    debugger;
    if (evn.target.value == "none") {
      this.FilteredMaintainanceList = this.MaintainanceList;
    }
    else {
      this.selectedBuilding = evn.target.value;
      this.FilteredMaintainanceList = this.MaintainanceList.filter(x => x.buildingname == this.selectedBuilding);
    }
  }

  StaffListsByDate
  public FilterByStaffType(evn) {
    debugger;
    let SDate = this.Date;
    let StartTime = this.StartTime;
    let StaffTypeID = evn.target.value;

    this.fmsservice.GetStaffByDate(SDate, StartTime, StaffTypeID).subscribe(
      res => {
        debugger;
        this.StaffListsByDate = res;
        this.fmsservice.GetStaffByDate(SDate, StartTime, StaffTypeID).subscribe(
          res => {
            debugger;
            this.StaffListsByDate = res;

          }
        )
      }
    )
  }

  public FilteredBystatus(evn) {
    debugger;
   
      if (evn.target.value == "none") {
        //this.GetBuildingPlanList(this.selectedlanguage)
        this.FilteredMaintainanceList = this.MaintainanceList;
      }
      else {
        this.selectedStatus = evn.target.value;
        this.FilteredMaintainanceList = this.MaintainanceList.filter(x => x.status == this.selectedStatus && x.buildingname == this.selectedBuilding);
      }
   

  }
  Requests
  public Maintainance(evn) {
    debugger;
    this.Entity.ID = evn.id;
    this.Requests = evn.request;
    this.UserID = evn.uid;
    // this.UserID = evn.uid;
    // this.GetUsers(this.UserID, 1);
  }



  public GetUserType(languageid) {
    this.fmsservice.GetUserType(languageid).subscribe(
      res => {
        debugger;
        this.Assignedlist = res;
      }
    )

  }

  public AssignedTo(evn) {
    debugger;
    this.Entity.AssignedTo = evn.target.value;
    this.Assigned = this.Entity.AssignedTo
    this.GetUsers(this.uid, 1);
  }

  public Entity = {
    ID: 0,
    AssignedTo: 0,
    AssignedToName: ""
  }

  public UpdateComplaintsAssignedTo() {
    debugger;

    if (this.Assigned == 1) {
      this.fmsservice.UpdateComplaintsAssignedToInternalUser(this.Entity.ID, this.Entity.AssignedTo, this.Entity.AssignedToName, this.Entity).subscribe(res => {
        debugger;
        Swal.fire('Assigned Successfully!');
        this.GetComplaintsDashboardWEB();
        this.Clear();
        this.savenotification();
        this.savenotification2();
      })
    }
    else {
      this.fmsservice.UpdateComplaintsAssignedTo(this.Entity.ID, this.Entity.AssignedTo, this.Entity.AssignedToName, this.Entity).subscribe(res => {
        debugger;
        Swal.fire('Assigned Successfully!');
        this.GetComplaintsDashboardWEB();
        this.Clear();
        this.savenotification1();
        this.savenotification3();
      })
    }


  }


  date = new Date();
  public savenotification() {

    let notification = {
      Date: this.date,
      Event: this.Requests,
      FromUser: localStorage.getItem('username'),
      ToUser: this.UserName,
      Message: 'Your Complaint Request For ' + " ' " + this.Requests + " ' " + 'Has Been Assigned Successfully...',
      Photo: 'photo',
      Building: '',
      NotificationTypeID: 8,
      UserID: this.Entity.AssignedTo
    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {
        ;
      }
    )

  }

  date1 = new Date();
  public savenotification1() {

    let notification = {
      Date: this.date1,
      Event: this.Requests,
      FromUser: localStorage.getItem('username'),
      ToUser: this.Entity.AssignedToName,
      Message: 'Complaint Request For ' + " ' " + this.Requests + " ' " + 'Has Been Assigned To You Successfully...',
      Photo: 'photo',
      Building: '',
      NotificationTypeID: 8,
      VendorID: this.Entity.AssignedTo
    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {
        ;
      }
    )

  }

  date2 = new Date();
  public savenotification2() {

    let notification = {
      Date: this.date2,
      Event: this.Requests,
      FromUser: localStorage.getItem('username'),
      ToUser: this.Entity.AssignedToName,
      Message: 'Your Complaint Request For ' + " ' " + this.Requests + " ' " + 'Has Been Assigned Successfully...',
      Photo: 'photo',
      Building: '',
      NotificationTypeID: 8,
      UserID: this.UserID
    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {
        ;
      }
    )

  }

  date3 = new Date();
  public savenotification3() {

    let notification = {
      Date: this.date3,
      Event: this.Requests,
      FromUser: localStorage.getItem('username'),
      ToUser: this.Entity.AssignedToName,
      Message: 'Complaint Request For ' + " ' " + this.Requests + " ' " + 'Has Been Assigned Successfully...',
      Photo: 'photo',
      Building: '',
      NotificationTypeID: 8,
      UserID: this.UserID
    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {
        ;
      }
    )

  }


  public Clear() {
    this.Assigned = 0,
      this.MaintainanceID = 0
  }
  public GetUsers(UserID, LanguageID) {
    debugger;
    this.fmsservice.GetUsers(UserID, LanguageID).subscribe(
      res => {
        debugger;
        this.UlistByID = res;
        this.emailid = res[0].emailID;
        this.phn = res[0].phoneNo;
        this.VendorName = res[0].vendorName

      }
    )
  }

  // public GetUsersdrop() {
  //   debugger;
  //   this.fmsservice.GetStaff(1).subscribe(
  //     res => {
  //       debugger;
  //       this.Ulist = res;
  //     }
  //   )
  // }


  AssignedToName;
  public UserName(evn) {
    debugger;
    this.Entity.AssignedTo = evn.target.value;
    this.GetUsers(this.uid, 1);
  }


  public GetVendorType(languageid) {
    debugger;
    this.fmsservice.GetVendorType(languageid).subscribe(
      res => {
        debugger;
        this.Vendlist = res;
      }
    )
  }

  public GetVendorByTypeID(VendorID) {
    debugger;
    this.fmsservice.GetVendorByTypeID(VendorID).subscribe(
      res => {
        debugger;
        this.VendorsByIDList = res;
      }
    )
  }
  public VendorName(evn) {
    debugger;
    let aaa = evn.target.value;
    this.Entity.AssignedTo = aaa;
    this.FileteredVendorsByIDList = this.VendorsByIDList.filter(x => x.id == aaa);
    this.Entity.AssignedToName = this.FileteredVendorsByIDList[0].vendorName;
    this.vendorname = this.FileteredVendorsByIDList[0].emailID;
    this.vendorphno = this.FileteredVendorsByIDList[0].phoneNo;

  }

  public VendorByID(evn) {
    debugger;
    this.GetVendorByTypeID(evn.target.value)

  }


  public AttachmentID;
  public Attachment(evn) {
    debugger;
    this.AttachmentID = evn.id;
    this.GetMaintenanceDocument(this.AttachmentID);
  }

  public NoImagesAvail = false;
  public Attachmentlist;
  public GetMaintenanceDocument(AttachmentID) {
    debugger;
    this.fmsservice.GetMaintenanceDocument(AttachmentID).subscribe(
      res => {
        debugger;
        this.Attachmentlist = res;
        if (res.length == 0) {
          this.NoImagesAvail = true;
        }
        else {
          this.NoImagesAvail = false;
        }
      }
    )
  }

  public StatusEntity = {
    id: 0,
    StatusID: 2
  }

  public UserCompleted(evn) {
    debugger;
    this.StatusEntity.id = evn.id;

    this.fmsservice.UpdateUserComplaintsCompletion(this.StatusEntity.id, this.StatusEntity.StatusID, this.StatusEntity).subscribe(res => {
      debugger;
      Swal.fire('You have completed your task');
      //this.Clear();
      this.GetComplaintsDashboardWEB();
    })

  }




  exporttoexcel() {
    debugger;

    var ExportData = [];
    for (let i = 0; i < this.FilteredMaintainanceList.length; i++) {
      debugger;
      let singleData = {
        request: String,
        buildingname: String,
        floor: String,
        unit: String,
        raisedby: String,
        assignedToName: "",
        status: "",
      }
      singleData.request = this.FilteredMaintainanceList[i].request;
      singleData.buildingname = this.FilteredMaintainanceList[i].buildingname;
      singleData.floor = this.FilteredMaintainanceList[i].floor;
      singleData.unit = this.FilteredMaintainanceList[i].unit;
      singleData.raisedby = this.FilteredMaintainanceList[i].raisedby;
      singleData.assignedToName = this.FilteredMaintainanceList[i].assignedToName;
      singleData.status = this.FilteredMaintainanceList[i].status;
      ExportData.push(singleData);
      debugger
    }

    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Complaints List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Complaints List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    debugger
    csvExporter.generateCsv(ExportData);
  }



}
