import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-technology-request',
  templateUrl: './update-technology-request.component.html',
  styleUrls: ['./update-technology-request.component.css']
})
export class UpdateTechnologyRequestComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  public pageMenuTitle;
  public newtechnology_PageTitle;
  public newtechnology_BreadChrumb;
  public newtechnology_Name;
  public newtechnology_RequestType;
  public newtechnology_PriorityType;
  public newtechnology_Building;
  public newtechnology_Address;
  public newtechnology_Floor;
  public newtechnology_Unit;
  public newtechnology_Asset;
  public newtechnology_RequestRaisedBy;
  public newtechnology_AssignedTo;
  public newtechnology_DueDate;
  public newtechnology_Status;
  public newtechnology_Description;
  public newtechnology_Comment;
  public newtechnology_Attachment;
  public newtechnology_Save;
  public Requestlist;
  public Prioritylist;
  public Buildinglist;
  public BuildingAddress;
  public address;
  public BuildingID;
  public FloorList;
  public Equipmentlist;
  public UserTypeList;
  public StatusList;
  public TechID;
  VendorTypeList;
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public TechnoEntity = {
    Request: "",
    RequestTypeID: 0,
    RaisedBy: 2,
    StatusID: 1,
    BuildingID: 0,
    LocationID: 1,
    EquipmentID: 0,
    DueDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    Description: "",
    Attachment: "Null",
    AssignedTo: 0,
    AssignedToName: "",
    AssignedToPhoneNo: "",
    AssignedToEmailID: "",
    Comment: "",
    InternalUserID: 1,
    Floor: 0,
    Unit: 0,
    PriorityTypeID: 0,
    LanguageID: 1,
    VendorType: 0
  }

  SelectedVendorID;

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetNewtechnologyLanguage(selectedlanguage);
    this.GetTechnologyRequestType(selectedlanguage);
    this.GePriorityType(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    // this.GetFloor(this.BuildingID);
    this.GetUserType(selectedlanguage);
    this.GetStatusType();
    this.GetUsersdrop();
    this.route.params.subscribe(params => {

      this.TechID = params['techReqid'];
      if (params['techReqid'] != undefined) {
        this.GetTechnologyRequestByID(this.TechID);
        this.NewPhotos(this.TechID);
      }

    }
    );
    this.fmsservice.GetVendorType(selectedlanguage).subscribe(data => {
      debugger
      this.VendorTypeList = data;
    })
  }

  public GetNewtechnologyLanguage(languageid) {
    this.fmsservice.GetNewtechnologyLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.newtechnology_PageTitle = res[0].newtechnology_PageTitle;
        this.newtechnology_BreadChrumb = res[0].newtechnology_BreadChrumb;
        this.newtechnology_Name = res[0].newtechnology_Name;
        this.newtechnology_RequestType = res[0].newtechnology_RequestType;
        this.newtechnology_PriorityType = res[0].newtechnology_PriorityType;
        this.newtechnology_Building = res[0].newtechnology_Building;
        this.newtechnology_Address = res[0].newtechnology_Address;
        this.newtechnology_Floor = res[0].newtechnology_Floor;
        this.newtechnology_Unit = res[0].newtechnology_Unit;
        this.newtechnology_Asset = res[0].newtechnology_Asset;
        this.newtechnology_RequestRaisedBy = res[0].newtechnology_RequestRaisedBy;
        this.newtechnology_AssignedTo = res[0].newtechnology_AssignedTo;
        this.newtechnology_DueDate = res[0].newtechnology_DueDate;
        this.newtechnology_Status = res[0].newtechnology_Status;
        this.newtechnology_Description = res[0].newtechnology_Description;
        this.newtechnology_Comment = res[0].newtechnology_Comment;
        this.newtechnology_Attachment = res[0].newtechnology_Attachment;
        this.newtechnology_Save = res[0].newtechnology_Save;
      }
    )
  }

  public GetTechnologyRequestByID(ID) {
    debugger;
    this.fmsservice.GetTechnologyRequestByID(ID).subscribe(
      res => {
        debugger;
        this.TechnoEntity.Request = res[0].request;
        this.TechnoEntity.RequestTypeID = res[0].requestTypeID;
        this.TechnoEntity.RaisedBy = res[0].raisedBy;
        this.TechnoEntity.StatusID = res[0].statusID;
        this.TechnoEntity.LocationID = res[0].requestTypeID;
        this.TechnoEntity.EquipmentID = res[0].equipmentID;
        this.TechnoEntity.DueDate = this.datepipe.transform(res[0].dueDate, 'yyyy-MM-dd');
        this.TechnoEntity.Description = res[0].description;
        this.TechnoEntity.Attachment = res[0].attachment;
        this.TechnoEntity.AssignedTo = res[0].assignedTo;
        this.TechnoEntity.AssignedToName = res[0].assignedToName;
        this.TechnoEntity.AssignedToPhoneNo = res[0].assignedToPhoneNo;
        this.TechnoEntity.AssignedToEmailID = res[0].assignedToEmailID;
        this.TechnoEntity.Comment = res[0].comment;
        this.TechnoEntity.InternalUserID = res[0].internalUserID;
        this.TechnoEntity.Floor = res[0].floor;
        this.TechnoEntity.Unit = res[0].unit;
        this.TechnoEntity.PriorityTypeID = res[0].priorityTypeID;
        this.TechnoEntity.VendorType = res[0].vendorType
        this.TechnoEntity.BuildingID = res[0].buildingID;
        this.GetFloor(res[0].buildingID);
        this.GetBuildingAddress(res[0].buildingID);
        this.GetEquipmentlist(1, res[0].buildingID);
        this.GetUnit_MasterbybID(res[0].buildingID, res[0].floor);
        this.TechnologyAssigned(res[0].assignedTo);
        this.GetVendorTypeID(res[0].vendorType);


      }
    )
  }


  public GetTechnologyRequestType(languageid) {
    this.fmsservice.GetTechnologyRequestType(languageid).subscribe(
      res => {
        debugger;
        this.Requestlist = res;
      }
    )
  }

  public GePriorityType(languageid) {
    this.fmsservice.GePriorityType(languageid).subscribe(
      res => {
        debugger;
        this.Prioritylist = res;
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


  public BuildingName;
  public GetBuildingAddress(evn) {
    debugger;

    if (evn.target) {
      this.BuildingID = evn.target.value;
    } else {
      this.BuildingID = evn;
    }
    let LanguageID = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetBuilding(LanguageID, this.BuildingID).subscribe(
      res => {
        debugger;
        this.BuildingAddress = res['address'];
        this.BuildingName = res['name'];
        this.GetFloor(this.BuildingID);
        this.GetEquipmentlist(1, this.BuildingID);
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

  public GetEquipmentlist(languageid, BuildingID) {
    debugger;
    this.fmsservice.GetEquipmentlist(languageid).subscribe(
      res => {
        debugger;
        this.Equipmentlist = res.filter(x => x.buildingID == BuildingID);
      }
    )
  }


  public GetUserType(languageid) {
    debugger;
    this.fmsservice.GetUserType(languageid).subscribe(
      res => {
        debugger;
        this.UserTypeList = res;
      }
    )
  }


  public GetStatusType() {
    debugger;
    this.fmsservice.GetStatusType().subscribe(
      res => {
        debugger;
        this.StatusList = res;
      }
    )
  }


  Isempty = false;
  public InsertTechnologyRequest() {
    debugger;
    let mandatoryfields = {
      Request: this.TechnoEntity.Request,
      RequestTypeID: this.TechnoEntity.RequestTypeID,
      PriorityTypeID: this.TechnoEntity.PriorityTypeID,
      BuildingID: this.TechnoEntity.BuildingID,
      BuildingAddress: this.BuildingAddress,
      Floor: this.TechnoEntity.Floor,
      Unit: this.TechnoEntity.Unit,
      AssignedTo: this.TechnoEntity.AssignedTo,
      AssignedToName: this.TechnoEntity.AssignedToName
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {
      let test = this.TechnoEntity;
      this.fmsservice.InsertTechnologyRequest(this.TechnoEntity).subscribe(res => {
        debugger;
        this.UploadPhotos(res);
        Swal.fire('Technology Request Successfully Saved');
        this.savenotification();
        this.Clear();
      })
    }

  }

  public Clear() {
    this.TechnoEntity.Request = null;
    this.TechnoEntity.RequestTypeID = null;
    this.TechnoEntity.BuildingID = null;
    this.TechnoEntity.LocationID = 0;
    this.BuildingAddress = null;
    this.TechnoEntity.Comment = null;
    this.TechnoEntity.EquipmentID = null;
    this.TechnoEntity.DueDate = null;
    this.TechnoEntity.Description = null;
    this.TechnoEntity.AssignedTo = null;
    this.TechnoEntity.AssignedToName = null;
    this.TechnoEntity.AssignedToPhoneNo = null;
    this.TechnoEntity.AssignedToEmailID = null;
    this.TechnoEntity.InternalUserID = 0;
    this.TechnoEntity.Floor = null;
    this.TechnoEntity.Unit = null;
    this.TechnoEntity.PriorityTypeID = null;
    this.TechnoEntity.VendorType = 0;
    this.TechnoEntity.StatusID= 0
  }

  // onFilesAdded(files: File[]) {
  //   this.fmsservice.TechReqDocUpload(files).subscribe(res => {
  //    this.TechnoEntity.Attachment = res.toString();
  //   })
  // }


  public Photos = [];
  public UploadedPhotos = [];
  onFilesAdded(files: File[]) {
    debugger;
    this.Photos.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.Photos.push(files[i]);
    }
  }

  public UploadPhotos(ID) {
    this.fmsservice.TechReqDocUpload(this.Photos).subscribe(res => {
      debugger;
      for (let i = 0; i < res.length; i++) {
        let PhotosEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedPhotos.push(PhotosEntity);
      }
      this.InsertTechnologyDocument(ID);
      // Swal.fire('Updated Successfully!')
    })
  }

  public InsertTechnologyDocument(ID) {
    debugger;
    for (let i = 0; i < this.UploadedPhotos.length; i++) {
      let entity = {
        TechnologyID: ID,
        Attachment: this.UploadedPhotos[i].docpathURL1,
        ModifiedBy: 'Admin',
        pdf: 'Null'
      }
      this.fmsservice.InsertTechnologyDocument(entity).subscribe(res => {
        debugger;
        //Swal.fire('Successfully Saved!');
      })
    }
  }

  public UpdateTechnologyRequest() {
    debugger;

    let mandatoryfields = {
      Request: this.TechnoEntity.Request,
      RequestTypeID: this.TechnoEntity.RequestTypeID,
      PriorityTypeID: this.TechnoEntity.PriorityTypeID,
      BuildingID: this.TechnoEntity.BuildingID,
      BuildingAddress: this.BuildingAddress,
      Floor: this.TechnoEntity.Floor,
      Unit: this.TechnoEntity.Unit,
      AssignedTo: this.TechnoEntity.AssignedTo,
      AssignedToName: this.TechnoEntity.AssignedToName
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {
      this.fmsservice.UpdateTechnologyRequest(this.TechID, this.TechnoEntity).subscribe(res => {
        debugger;
        Swal.fire('Technology Request Updated Successfully!');
      })
    }
  }


  public Attachmentlist = [];
  public NewPhotos(TechID) {
    debugger;
    this.fmsservice.GetTechnologyDocument(TechID).subscribe(res => {
      debugger;
      this.Attachmentlist = res;
    })
  }


  date = new Date();
  public savenotification() {
    debugger;
    let notification = {
      Date: this.date,
      Event: 'Technology Request',
      FromUser: localStorage.getItem('username'),
      ToUser: this.TechnoEntity.AssignedTo,
      Message: 'Technology Request Assigned To ' + this.TechnoEntity.AssignedToName,
      Photo: 'photo',
      Building: this.BuildingName,

    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {
        debugger;
      }
    )
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


  TechAssignedddl
  public TechnologyAssigned(evn) {
    debugger;
    if (evn.target) {
      this.TechAssignedddl = evn.target.value;
    } else {
      this.TechAssignedddl = evn;
    }

    //this.TechAssignedddl = evn.target.value;
  }


  public Ulist
  public GetUsersdrop() {
    this.fmsservice.GetUsersdrop().subscribe(
      res => {
        debugger;
        this.Ulist = res;
      }
    )
  }

  Vlist;
  vendortypeID;
  public GetVendorTypeID(even) {
    debugger;
    if (even.target) {
      this.vendortypeID = even.target.value;
    } else {
      this.vendortypeID = even;
    }
    this.GetVendorByTypeID(this.vendortypeID);
  }

  public GetVendorByTypeID(vendortypeID) {
    this.fmsservice.GetVendorByTypeID(vendortypeID).subscribe(
      res => {
        debugger;
        this.Vlist = res;

        let hjk = this.Vlist.filter(x => x.emailID == this.TechnoEntity.AssignedToEmailID);
        this.SelectedVendorID = hjk[0].id;
      }
    )
  }

  public aaa;
  public vendorEmail;
  public vendorphno;
  public vendorName;
  public FileteredVendorNameslist;
  public Vendor(evn) {
    debugger;
    if (evn.target) {
      this.aaa = evn.target.value;
    } else {
      this.aaa = evn;
    }

    this.FileteredVendorNameslist = this.Vlist.filter(x => x.id == this.aaa);
    this.vendortypeID = this.aaa;
    this.vendorEmail = this.FileteredVendorNameslist[0].emailID;
    this.vendorphno = this.FileteredVendorNameslist[0].phoneNo;
    this.vendorName = this.FileteredVendorNameslist[0].vendorName;

    this.TechnoEntity.AssignedToEmailID = this.vendorEmail;
    this.TechnoEntity.AssignedToPhoneNo = this.vendorphno;
    this.TechnoEntity.AssignedToName = this.vendorName;

  }
}
