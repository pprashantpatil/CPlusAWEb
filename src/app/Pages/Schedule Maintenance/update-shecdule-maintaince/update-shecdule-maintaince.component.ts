import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-shecdule-maintaince',
  templateUrl: './update-shecdule-maintaince.component.html',
  styleUrls: ['./update-shecdule-maintaince.component.css']
})
export class UpdateShecduleMaintainceComponent implements OnInit {
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  public pageMenuTitle;
  public updateSheduleMantaince_PageTitle;
  public updateSheduleMantaince_breadchrumb;
  public updateSheduleMantaince_button_save;
  public updateSheduleMantaince_Request;
  public updateSheduleMantaince_RequestType;
  public updateSheduleMantaince_FrequencyRequestType;
  public updateSheduleMantaince_RequestRaisedBy;
  public updateSheduleMantaince_Building;
  public updateSheduleMantaince_Address;
  public updateSheduleMantaince_Floor;
  public updateSheduleMantaince_Unit;
  public updateSheduleMantaince_SelectAssets;
  public updateSheduleMantaince_DueDate
  public updateSheduleMantaince_Description;
  public updateSheduleMantaince_AssignedTo;
  public updateSheduleMantaince_Photo;
  public updateSheduleMantaince_Attachment;
  public updateSheduleMantaince_Status;
  public updateSheduleMantaince_CheckList;
  public updateSheduleMantaince_Comments;
  public Reqlist;
  public Freqlist;
  public Buildinglist;
  public BuildingID;
  public Floorlist;
  public Assetlist;
  public BuildingAddress;
  public FloorList;
  public Equipmentlist;
  public Assignedlist;
  public Statuslist;
  public Checklist;
  public SMID;
  public Ulist;
  public VendorTypeList;
  public vendortypeID;
  public Vlist;
  public Assigned1;
  SelectedVendorID = 0;
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd')

  public ScheduledMaintainanceEntity = {
    Request: "",
    RequestTypeID: 0,
    FrequencyTypeID: 0,
    RaisedBy: localStorage.getItem('userid'),
    BuildingID: 0,
    EquipmentID: 0,
    DueDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    Description: "",
    PhotoURL: "",
    Attachment: "",
    StatusID: 1,
    AssignedTo: 0,
    AssignedToName: "",
    AssignedToPhoneNo: "",
    AssignedToEmailID: "",
    Comment: "",
    InternalUserID: 0,
    Floor: 0,
    Unit: 0,
    InternalUserComment: "",
    Reopen: 0,
    ReopenReason: "",
    Closed: 0,
    ClosedBy: 0,
    ClosedComment: "",
    CheckListTypeID: 0,
    VendorType: 0,
    LanguageID: 0
  }

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetUpdateSheduleMantainceLanguageByLanguageID(selectedlanguage);
    this.GetMaintenanceRequestType(selectedlanguage);
    this.GetMaintenanceFrequencyType(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    // this.GetFloor(this.BuildingID);
    this.GetUserType(selectedlanguage, this.BuildingID);
    this.GetStatusType();
    this.GetCheckListType(selectedlanguage);
    this.route.params.subscribe(params => {
      this.SMID = params['id'];
    }
    );

    this.GetScheduleAttachment(this.SMID);
    this.GetSchedulePhoto(this.SMID);
    this.fmsservice.GetScheduledMaintenanceList(this.SMID, selectedlanguage).subscribe(
      res => {

        this.ScheduledMaintainanceEntity.Request = res[0].request;
        this.ScheduledMaintainanceEntity.RequestTypeID = res[0].requestTypeID;
        this.ScheduledMaintainanceEntity.FrequencyTypeID = res[0].frequencyTypeID;
        this.ScheduledMaintainanceEntity.RaisedBy = res[0].raisedBy;
        this.ScheduledMaintainanceEntity.BuildingID = res[0].buildingID;
        this.ScheduledMaintainanceEntity.EquipmentID = res[0].equipmentID;
        debugger;
        this.ScheduledMaintainanceEntity.DueDate = this.datepipe.transform(res[0].dueDate, 'yyyy-MM-dd');
        this.ScheduledMaintainanceEntity.Description = res[0].description;
        this.ScheduledMaintainanceEntity.PhotoURL = res[0].photoURL;
        this.ScheduledMaintainanceEntity.Attachment = res[0].attachment;
        this.ScheduledMaintainanceEntity.StatusID = res[0].statusID;
        this.ScheduledMaintainanceEntity.AssignedTo = res[0].assignedTo;
        this.Assigned1 = res[0].assignedTo;
        this.ScheduledMaintainanceEntity.AssignedToName = res[0].assignedToName;
        this.ScheduledMaintainanceEntity.AssignedToPhoneNo = res[0].assignedToPhoneNo;
        this.ScheduledMaintainanceEntity.AssignedToEmailID = res[0].assignedToEmailID;
        this.ScheduledMaintainanceEntity.Comment = res[0].comment;
        this.ScheduledMaintainanceEntity.InternalUserID = res[0].internalUserID;
        this.ScheduledMaintainanceEntity.Floor = res[0].floor;
        this.ScheduledMaintainanceEntity.Unit = res[0].unit;
        this.ScheduledMaintainanceEntity.InternalUserComment = res[0].internalUserComment;
        this.ScheduledMaintainanceEntity.Reopen = res[0].reopen;
        this.ScheduledMaintainanceEntity.ReopenReason = res[0].reopenReason;
        this.ScheduledMaintainanceEntity.Closed = res[0].closed;
        this.ScheduledMaintainanceEntity.ClosedBy = res[0].closedBy;
        this.ScheduledMaintainanceEntity.ClosedComment = res[0].closedComment;
        this.ScheduledMaintainanceEntity.CheckListTypeID = res[0].checkListTypeID;
        this.ScheduledMaintainanceEntity.VendorType = res[0].vendorType;
        this.GetBuildingAddress(res[0].buildingID);
        this.GetUnit_MasterbybID(this.ScheduledMaintainanceEntity.BuildingID, res[0].floor);
        this.GetVendorTypeID(res[0].vendorType);
        this.AssignedTo(res[0].assignedTo);
      }
    )

    this.fmsservice.GetVendorType(selectedlanguage).subscribe(data => {

      this.VendorTypeList = data;
    })
    this.GetUsersdrop();
    // this.GetUsers(ID.)
  }


  public GetUpdateSheduleMantainceLanguageByLanguageID(languageid) {
    this.fmsservice.GetUpdateSheduleMantainceLanguageByLanguageID(languageid).subscribe(
      res => {

        this.pageMenuTitle = res[0].pageMenuTitle;
        this.updateSheduleMantaince_PageTitle = res[0].updateSheduleMantaince_PageTitle;
        this.updateSheduleMantaince_breadchrumb = res[0].updateSheduleMantaince_breadchrumb;
        this.updateSheduleMantaince_button_save = res[0].updateSheduleMantaince_button_save;
        this.updateSheduleMantaince_Request = res[0].updateSheduleMantaince_Request;
        this.updateSheduleMantaince_RequestType = res[0].updateSheduleMantaince_RequestType;
        this.updateSheduleMantaince_FrequencyRequestType = res[0].updateSheduleMantaince_FrequencyRequestType;
        this.updateSheduleMantaince_RequestRaisedBy = res[0].updateSheduleMantaince_RequestRaisedBy;
        this.updateSheduleMantaince_Building = res[0].updateSheduleMantaince_Building;
        this.updateSheduleMantaince_Address = res[0].updateSheduleMantaince_Address;
        this.updateSheduleMantaince_Floor = res[0].updateSheduleMantaince_Floor;
        this.updateSheduleMantaince_Unit = res[0].updateSheduleMantaince_Unit;
        this.updateSheduleMantaince_SelectAssets = res[0].updateSheduleMantaince_SelectAssets;
        this.updateSheduleMantaince_DueDate = res[0].updateSheduleMantaince_DueDate;
        this.updateSheduleMantaince_Description = res[0].updateSheduleMantaince_Description;
        this.updateSheduleMantaince_AssignedTo = res[0].updateSheduleMantaince_AssignedTo;
        this.updateSheduleMantaince_Photo = res[0].updateSheduleMantaince_Photo;
        this.updateSheduleMantaince_Attachment = res[0].updateSheduleMantaince_Attachment;
        this.updateSheduleMantaince_Status = res[0].updateSheduleMantaince_Status;
        this.updateSheduleMantaince_CheckList = res[0].updateSheduleMantaince_CheckList;
        this.updateSheduleMantaince_Comments = res[0].updateSheduleMantaince_Comments;

      }
    )
  }


  public GetMaintenanceRequestType(languageid) {
    this.fmsservice.GetMaintenanceRequestType(languageid).subscribe(
      res => {

        this.Reqlist = res;
      }
    )
  }

  public GetMaintenanceFrequencyType(languageid) {
    this.fmsservice.GetMaintenanceFrequencyType(languageid).subscribe(
      res => {

        this.Freqlist = res;
      }
    )
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {

        this.Buildinglist = res;
      }
    )
  }

  public BuildingName;
  public GetBuildingAddress(evn) {

    if (evn.target) {
      this.BuildingID = evn.target.value;
    } else {
      this.BuildingID = evn;
    }
    // this.BuildingID = evn.target.value;
    let LanguageID = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetBuilding(LanguageID, this.BuildingID).subscribe(
      res => {

        this.BuildingAddress = res['address'];
        this.BuildingName = res['name'];
        this.GetFloor(this.BuildingID);
        this.GetEquipmentlist(LanguageID, this.BuildingID);
      }
    )
  }

  public GetFloor(BuildingID) {

    this.fmsservice.GetFloor(BuildingID).subscribe(
      res => {

        this.FloorList = res;
      }
    )
  }

  public GetEquipmentlist(languageid, BuildingID) {
    this.fmsservice.GetEquipmentlist(languageid).subscribe(
      res => {
        this.Equipmentlist = res.filter(x => x.buildingID == BuildingID);
      }
    )

  }

  public GetUserType(languageid, BuildingID) {
    this.fmsservice.GetUserType(languageid).subscribe(
      res => {

        this.Assignedlist = res;
        this.ScheduledMaintainanceEntity.AssignedToName = "0";
      }
    )

  }

  public GetStatusType() {
    this.fmsservice.GetStatusType().subscribe(
      res => {

        this.Statuslist = res;
      }
    )
  }

  public GetCheckListType(languageid) {
    this.fmsservice.GetCheckListType(languageid).subscribe(
      res => {

        this.Checklist = res;
      }
    )
  }

  public Photos = [];
  public attachments = [];
  onFilesAdded(files: File[]) {
    debugger
    this.Photos.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.Photos.push(files[i]);

    }
  }

  public UploadPhotos(scheduleID) {
    debugger
    this.fmsservice.ScheduleMaintenancePhotoUpload(this.Photos).subscribe(res => {

      for (let i = 0; i < res.length; i++) {
        let PhotosEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.attachments.push(PhotosEntity);
      }
      this.InsertSchedulePhoto(scheduleID);

    })
  }



  public InsertSchedulePhoto(scheduleID) {

    for (let i = 0; i < this.attachments.length; i++) {
      let entity = {

        'ScheduleID': scheduleID,
        'Attachment': this.attachments[i].docpathURL1,
        'ModifiedBy': 'Admin',
        'pdf': "pdf"
      }

      this.fmsservice.InsertSchedulePhoto(entity).subscribe(res => {
      })
    }
  }

  // onFilesAdded(files: File[]) {
  //   this.fmsservice.ScheduleMaintenancePhotoUpload(files).subscribe(res => {
  //     this.ScheduledMaintainanceEntity.PhotoURL = res.toString();
  //   })
  // }

  public Photos1 = [];
  public attachments1 = [];
  onFilesAddedAttached(files: File[]) {
    this.Photos1.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.Photos1.push(files[i]);

    }
  }

  public Uploadattacyhment1(scheduleID) {
    this.fmsservice.ScheduleMaintenanceAttachmentUpload(this.Photos1).subscribe(res => {
      ;
      for (let i = 0; i < res.length; i++) {
        let PhotosEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.attachments1.push(PhotosEntity);
      }
      this.InsertScheduleAttachment(scheduleID);

    })
  }




  public InsertScheduleAttachment(scheduleID) {

    for (let i = 0; i < this.attachments1.length; i++) {
      let entity = {

        'ScheduleID': scheduleID,
        'Attachment': this.attachments1[i].docpathURL1,
        'ModifiedBy': 'Admin',
        'pdf': "pdf"
      }

      this.fmsservice.InsertScheduleAttachment(entity).subscribe(res => {

      })
    }
  }


  // onFilesAddedAttached(files: File[]) {
  //   this.fmsservice.ScheduleMaintenanceAttachmentUpload(files).subscribe(res => {
  //     this.ScheduledMaintainanceEntity.Attachment = res.toString();
  //   })
  // }

  Isempty = false;
  EmailValid = true;
  PhoneNumberValid = true;
  public InsertScheduledMaintenance() {

    let mandatoryfields = {
      Request: this.ScheduledMaintainanceEntity.Request,
      RequestTypeID: this.ScheduledMaintainanceEntity.RequestTypeID,
      FrequencyTypeID: this.ScheduledMaintainanceEntity.FrequencyTypeID,
      BuildingID: this.ScheduledMaintainanceEntity.BuildingID,
      BuildingAddress: this.BuildingAddress,
      Floor: this.ScheduledMaintainanceEntity.Floor,
      Unit: this.ScheduledMaintainanceEntity.Unit,
      EquipmentID: this.ScheduledMaintainanceEntity.EquipmentID,
      AssignedTo: this.ScheduledMaintainanceEntity.AssignedTo,
      StatusID: this.ScheduledMaintainanceEntity.StatusID,
      AssignedToName: this.ScheduledMaintainanceEntity.AssignedToName,
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    }
    else {
      // this.EmailValid = this.fmsservice.validateEmail(this.ScheduledMaintainanceEntity.AssignedToEmailID);
      // debugger;
      // this.PhoneNumberValid = this.fmsservice.phonenumber(this.ScheduledMaintainanceEntity.AssignedToPhoneNo);

      // if (this.EmailValid == false || this.PhoneNumberValid == false) {

      //   debugger;
      // } else {

      this.ScheduledMaintainanceEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
      this.ScheduledMaintainanceEntity.PhotoURL = "testImages"
      this.ScheduledMaintainanceEntity.Attachment = "testImages"
      let test = this.ScheduledMaintainanceEntity;
      this.fmsservice.InsertScheduledMaintenance(this.ScheduledMaintainanceEntity).subscribe(res => {
        this.UploadPhotos(res)
        this.Uploadattacyhment1(res)
        Swal.fire('Scheduled Maintenance Successfully Saved');

        this.InsertLoginDetails(this.ScheduledMaintainanceEntity.Request);
        this.savenotification();
        this.Clear();
      })

      // }
    }
  }
  public InsertLoginDetails(Request) {
    debugger
    var obj = {
      "ApplicationName": 'Scheduled Maintainance Request ' + Request + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Maintainance Request",
      "Action": 'Add New Maintainance Request',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  public Clear() {
    this.ScheduledMaintainanceEntity.Request = "";
    this.ScheduledMaintainanceEntity.RequestTypeID = 0;
    this.ScheduledMaintainanceEntity.FrequencyTypeID = 0;
    this.ScheduledMaintainanceEntity.BuildingID = 0;
    this.ScheduledMaintainanceEntity.EquipmentID = 0;
    this.ScheduledMaintainanceEntity.DueDate = "";
    this.ScheduledMaintainanceEntity.Description = "";
    this.ScheduledMaintainanceEntity.PhotoURL = "NULL";
    this.ScheduledMaintainanceEntity.Attachment = "NULL";
    this.ScheduledMaintainanceEntity.AssignedTo = 0;
    this.ScheduledMaintainanceEntity.AssignedToName = "";
    this.ScheduledMaintainanceEntity.AssignedToPhoneNo = "";
    this.ScheduledMaintainanceEntity.AssignedToEmailID = "";
    this.ScheduledMaintainanceEntity.Comment = "";
    this.ScheduledMaintainanceEntity.InternalUserID = 0;
    this.ScheduledMaintainanceEntity.Floor = 0;
    this.ScheduledMaintainanceEntity.Unit = 0;
    this.ScheduledMaintainanceEntity.InternalUserComment = "";
    this.ScheduledMaintainanceEntity.Reopen = 0;
    this.ScheduledMaintainanceEntity.ReopenReason = "";
    this.ScheduledMaintainanceEntity.ClosedBy = 0;
    this.ScheduledMaintainanceEntity.Closed = 0;
    this.ScheduledMaintainanceEntity.ClosedComment = "";
    this.ScheduledMaintainanceEntity.CheckListTypeID = 0;
    this.ScheduledMaintainanceEntity.VendorType = 0;
    this.ScheduledMaintainanceEntity.LanguageID = 0;
    this.BuildingAddress = "";


  }

  date = new Date();
  public savenotification() {

    let notification = {
      Date: this.date,
      Event: 'Scheduled Maintenance',
      FromUser: localStorage.getItem('username'),
      ToUser: localStorage.getItem('username'),
      Message: 'Scheduled Maintenance for ' + this.ScheduledMaintainanceEntity.Request + 'has been assigned to ' + this.vendorName,
      Photo: 'photo',
      Building: this.BuildingName,
    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {

      }
    )

  }

  public GetUsersdrop() {
    this.fmsservice.GetUsersdrop().subscribe(
      res => {
        debugger;
        this.Ulist = res;
      }
    )
  }

  public GetVendorTypeID(even) {
    debugger;

    if (even.target) {
      this.vendortypeID = even.target.value;
    } else {
      this.vendortypeID = even;
    }
    //this.vendortypeID = even.target.value;
    this.GetVendorByTypeID(this.vendortypeID);
  }

  public GetVendorByTypeID(vendortypeID) {
    this.fmsservice.GetVendorByTypeID(vendortypeID).subscribe(
      res => {

        this.Vlist = res;


        let hjk = this.Vlist.filter(x => x.emailID == this.ScheduledMaintainanceEntity.AssignedToEmailID);
        this.SelectedVendorID = hjk[0].id;
      }
    )
  }

  public AssignedTo(evn) {

    if (evn.target) {
      this.Assigned1 = evn.target.value;
      this.ScheduledMaintainanceEntity.AssignedTo = evn.target.value;
    } else {
      this.Assigned1 = evn;
      this.ScheduledMaintainanceEntity.AssignedTo = evn;
    }
    //this.Assigned1 = evn.target.value;
  }

  public Users(evn) {

    let UserID = evn.target.value;
    this.GetUsers(UserID, 1);
  }

  public GetUsers(ID, LanguageID) {
    this.fmsservice.GetUsers(ID, LanguageID).subscribe(
      res => {
        debugger;
        this.Ulist = res;
      }
    )
  }

  public UpdateScheduledMaintenance() {
    let mandatoryfields = {
      Request: this.ScheduledMaintainanceEntity.Request,
      RequestTypeID: this.ScheduledMaintainanceEntity.RequestTypeID,
      FrequencyTypeID: this.ScheduledMaintainanceEntity.FrequencyTypeID,
      BuildingID: this.ScheduledMaintainanceEntity.BuildingID,
      BuildingAddress: this.BuildingAddress,
      Floor: this.ScheduledMaintainanceEntity.Floor,
      Unit: this.ScheduledMaintainanceEntity.Unit,
      EquipmentID: this.ScheduledMaintainanceEntity.EquipmentID,
      AssignedTo: this.ScheduledMaintainanceEntity.AssignedTo,
      StatusID: this.ScheduledMaintainanceEntity.StatusID,
      AssignedToName: this.ScheduledMaintainanceEntity.AssignedToName,
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    }
    else {
      // this.EmailValid = this.fmsservice.validateEmail(this.ScheduledMaintainanceEntity.AssignedToEmailID);
      // debugger;
      // this.PhoneNumberValid = this.fmsservice.phonenumber(this.ScheduledMaintainanceEntity.AssignedToPhoneNo);

      // if (this.EmailValid == false || this.PhoneNumberValid == false) {

      //   debugger;
      // } else {

      this.fmsservice.UpdateScheduledMaintenance(this.SMID, this.ScheduledMaintainanceEntity).subscribe(res => {
        Swal.fire('Scheduled Maintenance Updated Successfully');
        this.InsertLoginDetails1(this.ScheduledMaintainanceEntity.Request);
      })
    }
  }

  public InsertLoginDetails1(Request) {
    debugger
    var obj = {
      "ApplicationName": 'Scheduled Maintainance Request ' + Request + ' Updated',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Maintainance Request",
      "Action": 'Update  Maintainance Request',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }
  public Attachmentlist = [];
  public GetScheduleAttachment(EventsID) {

    this.fmsservice.GetScheduleAttachment(EventsID).subscribe(
      res => {

        this.Attachmentlist = res;
      }
    )
  }


  public Photolist = [];
  public GetSchedulePhoto(EventsID) {
    this.fmsservice.GetSchedulePhoto(EventsID).subscribe(
      res => {

        this.Photolist = res;
      }
    )
  }
  public aaa;
  public vendorEmail;
  public vendorphno;
  public vendorName;
  public FileteredVendorNameslist;
  public Vendor(evn) {


    // this.aaa = evn.target.value;

    if (evn.target) {
      this.aaa = evn.target.value;
    } else {
      this.aaa = evn;
    }
    this.FileteredVendorNameslist = this.Vlist.filter(x => x.id == this.aaa);
    this.vendorEmail = this.FileteredVendorNameslist[0].emailID;
    this.vendorphno = this.FileteredVendorNameslist[0].phoneNo;
    this.vendorName = this.FileteredVendorNameslist[0].vendorName;


    this.ScheduledMaintainanceEntity.AssignedToName = this.vendorName;

    this.ScheduledMaintainanceEntity.AssignedToEmailID = this.vendorEmail;
    this.ScheduledMaintainanceEntity.AssignedToPhoneNo = this.vendorphno;

  }

  public FloorID;
  public UnitByID(evn) {
    debugger;
    this.FloorID = evn.target.value;
    this.GetUnit_MasterbybID(this.BuildingID, this.FloorID);
  }

  public Unitslist;
  public GetUnit_MasterbybID(BuildingID, FloorID) {
    debugger;
    this.fmsservice.GetUnit_MasterbybID(BuildingID, FloorID).subscribe(
      res => {
        this.Unitslist = res;
      }
    )
  }

}
