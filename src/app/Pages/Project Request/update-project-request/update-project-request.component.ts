import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-project-request',
  templateUrl: './update-project-request.component.html',
  styleUrls: ['./update-project-request.component.css']
})
export class UpdateProjectRequestComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  public pageMenuTitle;
  public updateProjectRequest_PageTitle;
  public updateProjectRequest_breadchrumb;
  public updateProjectRequest_button_Save;
  public updateProjectRequest_Date;
  public updateProjectRequest_Request_Type;
  public updateProjectRequest_Request;
  public updateProjectRequest_Building;
  public updateProjectRequest_Address;
  public updateProjectRequest_Floor;
  public updateProjectRequest_RaisedBy;
  public updateProjectRequest_ContactNumber;
  public updateProjectRequest_Contact_ID;
  public updateProjectRequest_Description;
  public updateProjectRequest_BidSubmissionDate;
  public updateProjectRequest_BidConditions;
  public updateProjectRequest_Project_Start_Date;
  public updateProjectRequest_Project_End_Date;
  public updateProjectRequest_Project_Award_Date;
  public updateProjectRequest_Comments;
  public updateProjectRequest_VendorType;
  public updateProjectRequest_Bidding_Vendor_Email;
  public updateProjectRequest_Bidding_Vendor_Name;
  public updateProjectRequest_Attachment;
  public updateProjectRequest_Status;
  public ProjectReqlist;
  public Buildinglist;
  public BuildingID;
  public BuildingAddress;
  public GetEquipmentlist;
  public FloorList;
  public VendorTypelist;
  public Statuslist;
  public Vendorlist;
  dropdownSettings = {}
  dropdownSettings1 = {}
  public selectedItems: any;
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public projectrequestid;


  public projectreqEntity = {
    Date: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    Request: "",
    RequestTypeID: 0,
    BuildingID: 0,
    UnitID: 0,
    Location: "",
    RaisedBy: localStorage.getItem('userid'),
    ContactPhoneNo: "",
    ContactEmailID: "",
    Description: "",
    BidSubmissionDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    BidCondition: "",
    StartDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    EndDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    AwardDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    Attachment: "NULL",
    Comment: "",
    Floor: 0,
    StatusID: 1,
    LanguageID: 0,
    AssignedTo: "",
    AssignedToName: "",
    AssignedToPhoneNo: "",
    AssignedToEmailID: ""
  }


  ngOnInit() {
    debugger;
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetUpdateProjectRequestLanguageByLanguageID(selectedlanguage);
    this.projectrequestid = +this.route.snapshot.paramMap.get('ProjectRequestID');
    if (this.projectrequestid > 0) {
      this.GetProjectRequestByID(this.projectrequestid);
      this.GetProjectDocument(this.projectrequestid);
    }



    this.GetProjectRequestType(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.GetVendorType(selectedlanguage);
    this.GetStatusType();
    this.GetVendorByTypeID(1);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'emailID',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };

    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'id',
      textField: 'vendorName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true
    };


  }


  public FloorID;
  public UnitByID(evn) {
    debugger;

    if (evn.target) {
      this.FloorID = evn.target.value;
    } else {
      this.FloorID = evn;
    }

    let ttt = this.FloorList.filter(x => x.id == this.FloorID);
    this.GetUnit_MasterbybID(ttt[0].buildingID, this.FloorID);
  }

  public Unitslist;
  public GetUnit_MasterbybID(BuildingID, FloorID) {
    this.fmsservice.GetUnit_MasterbybID(BuildingID, FloorID).subscribe(
      res => {
        // this.AssetsEntity.Unit=0;
        this.Unitslist = res;
      }
    )
  }

  public GetUpdateProjectRequestLanguageByLanguageID(languageid) {
    this.fmsservice.GetUpdateProjectRequestLanguageByLanguageID(languageid).subscribe(
      res => {
        debugger
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.updateProjectRequest_PageTitle = res[0].updateProjectRequest_PageTitle;
        this.updateProjectRequest_breadchrumb = res[0].updateProjectRequest_breadchrumb;
        this.updateProjectRequest_button_Save = res[0].updateProjectRequest_button_Save;
        this.updateProjectRequest_Date = res[0].updateProjectRequest_Date;
        this.updateProjectRequest_Request_Type = res[0].updateProjectRequest_Request_Type;
        this.updateProjectRequest_Request = res[0].updateProjectRequest_Request;
        this.updateProjectRequest_Building = res[0].updateProjectRequest_Building;
        this.updateProjectRequest_Address = res[0].updateProjectRequest_Address;
        this.updateProjectRequest_Floor = res[0].updateProjectRequest_Floor;
        this.updateProjectRequest_RaisedBy = res[0].updateProjectRequest_RaisedBy;
        this.updateProjectRequest_ContactNumber = res[0].updateProjectRequest_ContactNumber;
        this.updateProjectRequest_Contact_ID = res[0].updateProjectRequest_Contact_ID;
        this.updateProjectRequest_Description = res[0].updateProjectRequest_Description;
        this.updateProjectRequest_BidSubmissionDate = res[0].updateProjectRequest_BidSubmissionDate;
        this.updateProjectRequest_BidConditions = res[0].updateProjectRequest_BidConditions;
        this.updateProjectRequest_Project_Start_Date = res[0].updateProjectRequest_Project_Start_Date;
        this.updateProjectRequest_Project_End_Date = res[0].updateProjectRequest_Project_End_Date;
        this.updateProjectRequest_Project_Award_Date = res[0].updateProjectRequest_Project_Award_Date;
        this.updateProjectRequest_Comments = res[0].updateProjectRequest_Comments;
        this.updateProjectRequest_VendorType = res[0].updateProjectRequest_VendorType;
        this.updateProjectRequest_Bidding_Vendor_Email = res[0].updateProjectRequest_Bidding_Vendor_Email;
        this.updateProjectRequest_Bidding_Vendor_Name = res[0].updateProjectRequest_Bidding_Vendor_Name;
        this.updateProjectRequest_Attachment = res[0].updateProjectRequest_Attachment;
        this.updateProjectRequest_Status = res[0].updateProjectRequest_Status;
      }
    )
  }

  onFilesAdded(files: File[]) {
    this.fmsservice.UploadCV(files).subscribe(res => {
      this.projectreqEntity.Attachment = res.toString();
    })
  }

  Isempty = false;
  EmailValid;
  PhoneNumberValid;
  // [(ngModel)]="projectreqEntity.ContactEmailID" name="ContactEmailID"
  public InsertProjectRequest() {
    debugger;
    let mandatoryfields = {
      RequestTypeID: this.projectreqEntity.RequestTypeID,
      Request: this.projectreqEntity.Request,
      BuildingID: this.projectreqEntity.BuildingID,
      Floor: this.projectreqEntity.Floor,
      ContactEmailID: this.projectreqEntity.ContactEmailID,
      BidSubmissionDate: this.projectreqEntity.BidSubmissionDate,
      StartDate: this.projectreqEntity.StartDate,
      EndDate: this.projectreqEntity.EndDate,
      AwardDate: this.projectreqEntity.AwardDate,
    }

    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    }
    else {
      this.EmailValid = this.fmsservice.validateEmail(this.projectreqEntity.ContactEmailID);
      debugger;
      this.PhoneNumberValid = this.fmsservice.phonenumber(this.projectreqEntity.ContactPhoneNo);
      if (this.EmailValid == false || this.PhoneNumberValid == false) {

        debugger;
      } else {

        this.projectreqEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
        let test = this.projectreqEntity;
        this.fmsservice.InsertProjectRequest(this.projectreqEntity).subscribe(res => {
          debugger;
          this.UploadAttachments(res);
          Swal.fire('Project Request Successfully Saved!');
          this.Clear();
        })
      }
    }
  }


  public UpdateProjectRequest() {
    debugger;

    let mandatoryfields = {
      RequestTypeID: this.projectreqEntity.RequestTypeID,
      Request: this.projectreqEntity.Request,
      BuildingID: this.projectreqEntity.BuildingID,
      Floor: this.projectreqEntity.Floor,
      ContactEmailID: this.projectreqEntity.ContactEmailID,
      BidSubmissionDate: this.projectreqEntity.BidSubmissionDate,
      StartDate: this.projectreqEntity.StartDate,
      EndDate: this.projectreqEntity.EndDate,
      AwardDate: this.projectreqEntity.AwardDate,
      StatusID: this.projectreqEntity.StatusID
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {
      this.EmailValid = this.fmsservice.validateEmail(this.projectreqEntity.ContactEmailID);
      debugger;
      this.PhoneNumberValid = this.fmsservice.phonenumber(this.projectreqEntity.ContactPhoneNo);
      if (this.EmailValid == false || this.PhoneNumberValid == false) {
        debugger;
      } else {
        this.fmsservice.UpdateProjectRequest(this.projectrequestid, this.projectreqEntity).subscribe(res => {
          debugger;
          Swal.fire('Project Request Updated Successfully!');
        })
      }
    }

  }

  public GetProjectRequestType(languageid) {
    this.fmsservice.GetProjectRequestType(languageid).subscribe(
      res => {
        debugger;
        this.ProjectReqlist = res;
      }
    )
  }
  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }

  public GetBuildingAddress(evn) {
    debugger;
    if (evn.target) {
      this.BuildingID = evn.target.value;
    } else {
      this.BuildingID = evn;
    }
    // this.BuildingID = evn.target.value;
    let LanguageID = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetBuilding(LanguageID, this.BuildingID).subscribe(
      res => {
        debugger;
        this.BuildingAddress = res['address'];
        this.GetFloor(this.BuildingID);
        this.GetEquipmentlist(LanguageID, this.BuildingID);
      }
    )
  }

  public GetFloor(BuildingID) {
    debugger;
    this.fmsservice.GetFloor(BuildingID).subscribe(
      res => {
        debugger;
        this.FloorList = res;


      }
    )
  }
  public GetVendorType(languageid) {
    this.fmsservice.GetVendorType(languageid).subscribe(
      res => {
        debugger;
        this.VendorTypelist = res;
      }
    )
  }


  public GetStatusType() {
    this.fmsservice.GetStatusType().subscribe(
      res => {
        debugger;
        this.Statuslist = res;
      }
    )
  }

  public GetVendorByTypeID(ID) {
    this.fmsservice.GetVendorByTypeID(ID).subscribe(
      res => {
        debugger;
        this.Vendorlist = res;
      }
    )
  }

  selecteditemlist = [];
  onItemSelect(item: any) {
    debugger
    //  this.selecteditemlist.push(item);
    this.selecteditemlist = this.Vendorlist.filter(x => x.id == item.id)
    if (this.projectreqEntity.AssignedTo.length < 1) {
      this.projectreqEntity.AssignedTo = this.projectreqEntity.AssignedTo + item.id;
      this.projectreqEntity.AssignedToName = this.projectreqEntity.AssignedToName + this.selecteditemlist[0].vendorName;
      this.projectreqEntity.AssignedToEmailID = this.projectreqEntity.AssignedToEmailID + this.selecteditemlist[0].emailID;
      this.projectreqEntity.AssignedToPhoneNo = this.projectreqEntity.AssignedToPhoneNo + this.selecteditemlist[0].phoneNo;
    }
    else {
      this.projectreqEntity.AssignedTo = this.projectreqEntity.AssignedTo + ',' + item.id;
      this.projectreqEntity.AssignedToName = this.projectreqEntity.AssignedToName + ',' + this.selecteditemlist[0].vendorName;
      this.projectreqEntity.AssignedToEmailID = this.projectreqEntity.AssignedToEmailID + ',' + this.selecteditemlist[0].emailID;
      this.projectreqEntity.AssignedToPhoneNo = this.projectreqEntity.AssignedToPhoneNo + ',' + this.selecteditemlist[0].phoneNo;
    }

  }
  onItemDeSelect(item: any) {
    debugger

    let abc = this.Vendorlist;
    for (var i = 0; i < abc.length; i++) {
      if (abc[i].emailID === item.emailID) {

        abc.splice(i, 1);
      }
    }

    this.projectreqEntity.AssignedTo = "";
    this.projectreqEntity.AssignedToName = "";
    this.projectreqEntity.AssignedToEmailID = "";
    this.projectreqEntity.AssignedToPhoneNo = "";


    for (var i = 0; i < abc.length; i++) {
      if (this.projectreqEntity.AssignedTo.length < 1) {
        this.projectreqEntity.AssignedTo = this.projectreqEntity.AssignedTo + abc[i].id;
        this.projectreqEntity.AssignedToName = this.projectreqEntity.AssignedToName + abc[i].vendorName;
        this.projectreqEntity.AssignedToEmailID = this.projectreqEntity.AssignedToEmailID + abc[i].emailID;
        this.projectreqEntity.AssignedToPhoneNo = this.projectreqEntity.AssignedToPhoneNo + abc[i].phoneNo;
      }
      else {
        this.projectreqEntity.AssignedTo = this.projectreqEntity.AssignedTo + ',' + abc[i].id;
        this.projectreqEntity.AssignedToName = this.projectreqEntity.AssignedToName + ',' + abc[i].vendorName;
        this.projectreqEntity.AssignedToEmailID = this.projectreqEntity.AssignedToEmailID + ',' + abc[i].emailID;
        this.projectreqEntity.AssignedToPhoneNo = this.projectreqEntity.AssignedToPhoneNo + ',' + abc[i].phoneNo;
      }
    }


    debugger
    //this.selecteditemlis.push(item)
  }

  onSelectAll(items: any) {
    debugger;
    console.log(items);

    for (let i = 0; i < items.length; i++) {
      this.selecteditemlist = this.Vendorlist.filter(x => x.id == items[i].id)
      if (this.projectreqEntity.AssignedTo.length < 1) {
        this.projectreqEntity.AssignedTo = this.projectreqEntity.AssignedTo + items[i].id;
        this.projectreqEntity.AssignedToName = this.projectreqEntity.AssignedToName + this.selecteditemlist[0].vendorName;
        this.projectreqEntity.AssignedToEmailID = this.projectreqEntity.AssignedToEmailID + this.selecteditemlist[0].emailID;
        this.projectreqEntity.AssignedToPhoneNo = this.projectreqEntity.AssignedToPhoneNo + this.selecteditemlist[0].phoneNo;
      }
      else {
        this.projectreqEntity.AssignedTo = this.projectreqEntity.AssignedTo + ',' + items[i].id;
        this.projectreqEntity.AssignedToName = this.projectreqEntity.AssignedToName + ',' + this.selecteditemlist[0].vendorName;
        this.projectreqEntity.AssignedToEmailID = this.projectreqEntity.AssignedToEmailID + ',' + this.selecteditemlist[0].emailID;
        this.projectreqEntity.AssignedToPhoneNo = this.projectreqEntity.AssignedToPhoneNo + ',' + this.selecteditemlist[0].phoneNo;
      }

    }
  }

  // onFilesAddedAttached(files: File[]) {
  //   this.fmsservice.UploadCV(files).subscribe(res => {
  //     this.projectreqEntity.Attachment = res.toString();
  //   })
  // }


  GetProjectRequestByID(projectrequestid) {
    this.fmsservice.GetProjectRequestByID(projectrequestid).subscribe(res => {
      debugger;
      //let building = this.Buildinglist.filter(x => x.id == res[0].buildingID);
      this.projectreqEntity.Date = this.datepipe.transform(res[0].date, 'yyyy-MM-dd');
      this.projectreqEntity.RequestTypeID = res[0].requestTypeID
      this.projectreqEntity.Request = res[0].request
      this.projectreqEntity.BuildingID = res[0].buildingID
      this.BuildingAddress = res[0].address
      this.projectreqEntity.Floor = res[0].floor
      this.projectreqEntity.RaisedBy = res[0].raisedBy
      this.projectreqEntity.ContactPhoneNo = res[0].contactPhoneNo
      this.projectreqEntity.ContactEmailID = res[0].contactEmailID
      this.projectreqEntity.Description = res[0].description
      this.projectreqEntity.BidSubmissionDate = this.datepipe.transform(res[0].bidSubmissionDate, 'yyyy-MM-dd');
      this.projectreqEntity.BidCondition = res[0].bidCondition
      this.projectreqEntity.StartDate = this.datepipe.transform(res[0].startDate, 'yyyy-MM-dd');
      this.projectreqEntity.EndDate = this.datepipe.transform(res[0].endDate, 'yyyy-MM-dd');
      this.projectreqEntity.AwardDate = this.datepipe.transform(res[0].awardDate, 'yyyy-MM-dd');
      this.projectreqEntity.Comment = res[0].comment
      // this.projectreqEntity.ContactEmailID = res[0].assignedToEmailID,
      this.GetBuildingAddress(res[0].buildingID);
      this.UnitByID(res[0].floor);
      // this.selectedItems.push();
      debugger;
      this.selectedItems = this.Vendorlist.filter(x => x.id == res[0].assignedTo);
      this.projectreqEntity.AssignedTo = res[0].assignedTo,
        this.projectreqEntity.AssignedToEmailID = res[0].assignedToEmailID,
        this.projectreqEntity.AssignedToName = res[0].assignedToName,
        this.projectreqEntity.AssignedToPhoneNo = res[0].assignedToPhoneNo
      // this.GetFloor(res[0].buildingID);
      this.GetUnit_MasterbybID(this.projectreqEntity.BuildingID, res[0].floor);

    });
  }


  public UploadedAttachments = [];
  public ProjectRequestAttachment = [];
  onFilesAddedAttached(files: File[]) {
    this.ProjectRequestAttachment.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.ProjectRequestAttachment.push(files[i]);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Document Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }


  public UploadAttachments(ProjectID) {
    debugger;
    this.fmsservice.ProjReqDocUpload(this.ProjectRequestAttachment).subscribe(res => {
      for (let i = 0; i < res.length; i++) {
        let AttachmentsEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedAttachments.push(AttachmentsEntity);

      }
      this.InsertProjectDocument(ProjectID);
      // Swal.fire('Project Request Updated Successfully!');

    })
  }
  public InsertProjectDocument(ProjectID) {
    debugger;
    for (let i = 0; i < this.UploadedAttachments.length; i++) {
      let entity = {
        ProjectID: ProjectID,
        Attachment: this.UploadedAttachments[i].docpathURL1,
        ModifiedBy: 'Admin',
        pdf: 'Null'
      }
      this.fmsservice.InsertProjectDocument(entity).subscribe(res => {
        debugger;
        // Swal.fire('Successfully Saved!');
        // this.Clear();
      })
    }
  }

  public Clear() {
    this.projectreqEntity.Date = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.projectreqEntity.Request = "",
      this.projectreqEntity.RequestTypeID = 0,
      this.projectreqEntity.BuildingID = 0,
      this.projectreqEntity.Location = "",
      this.projectreqEntity.RaisedBy = localStorage.getItem('userid'),
      this.projectreqEntity.ContactPhoneNo = "",
      this.projectreqEntity.ContactEmailID = "",
      this.projectreqEntity.Description = "",
      this.projectreqEntity.BidSubmissionDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.projectreqEntity.BidCondition = "",
      this.projectreqEntity.StartDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.projectreqEntity.EndDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.projectreqEntity.AwardDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.projectreqEntity.Attachment = "NULL",
      this.projectreqEntity.Comment = "",
      this.projectreqEntity.Floor = 0,
      this.projectreqEntity.StatusID = 1,
      this.projectreqEntity.LanguageID = 1,
      this.projectreqEntity.AssignedTo = "",
      this.projectreqEntity.AssignedToName = "",
      this.projectreqEntity.AssignedToPhoneNo = "",
      this.projectreqEntity.AssignedToEmailID = ""
  }


  public VendorType(evn) {
    debugger;
    this.GetVendorByTypeID(evn.target.value);
  }




  public Attachmentlist = [];
  public GetProjectDocument(projectrequestid) {
    this.fmsservice.GetProjectDocument(projectrequestid).subscribe(
      res => {
        debugger;
        this.Attachmentlist = res;
      }
    )
  }
}
