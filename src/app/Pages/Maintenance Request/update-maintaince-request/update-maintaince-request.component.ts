import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ThemeService } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-maintaince-request',
  templateUrl: './update-maintaince-request.component.html',
  styleUrls: ['./update-maintaince-request.component.css']
})
export class UpdateMaintainceRequestComponent implements OnInit {

  constructor(public fmsservice: FmsService, public activatedRoute: ActivatedRoute, private datePipe: DatePipe) {
    this.minDate = new Date();


    this.minDate.setDate(this.minDate.getDate() - 0);

  }
  public pageMenuTitle;
  public upadteMaintanceRequest_PageTitle;
  public upadteMaintanceRequest_breadchrumb;
  public upadteMaintanceRequest_button_save;
  public upadteMaintanceRequest_Request;
  public upadteMaintanceRequest_RequestType;
  public upadteMaintanceRequest_PriorityType;
  public upadteMaintanceRequest_RequestRaisedBy;
  public upadteMaintanceRequest_Building;
  public upadteMaintanceRequest_Address;
  public upadteMaintanceRequest_Floor;
  public upadteMaintanceRequest_Unit;
  public upadteMaintanceRequest_SelectAssets;
  public upadteMaintanceRequest_PreferredVisitDate;
  public upadteMaintanceRequest_PreferredTime;
  public upadteMaintanceRequest_Description;
  public upadteMaintanceRequest_Attachment;
  public upadteMaintanceRequest_Status;
  public upadteMaintanceRequest_CheckList;
  public upadteMaintanceRequest_Comments;
  public Reqlist;
  public Prioritylist;
  public Buildinglist;
  public BuildingID;
  public BuildingAddress;
  public Equipmentlist;
  public FloorList;
  public Statuslist;
  public Checklist;
  selectedlanguage: any;
  photopath = [];
  MaintenanceID: any;
  paramID: any;
  maintlist: any;
  floorlist1: any;
  DueDate: any;
  public filenamedetails = [];
  public filetypedetails = [];
  public base64textStringdetails = [];
  FileName: any;
  FileType: any;
  base64textString: any;
  unitlist: any;
  floorID: any;
  time: any;

  minDate: Date
  Isempty: any;


  DateChanged2: boolean = false;
  public maintainanceEntity = {
    Request: "",
    RequestTypeID: 0,
    RaisedBy: localStorage.getItem('userid'),
    BuildingID: 0,
    EquipmentID: "",
    DueDate: "",
    Description: "",
    PhotoURL: "NULL",
    Attachment: "NULL",
    LocationID: 0,
    StatusID: 0,
    Comment: "",
    // InternalUserID:2,
    Floor: "",
    Unit: "",
    CheckListTypeID: 0,
    PriorityTypeID: 0,
    PreferredTime: "",
    LanguageID: 0,
    PublicBit: false
  }







  ngOnInit() {

    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetUpadteMaintanceRequestLanguageByLanguageID(this.selectedlanguage);
    this.GetMaintenanceRequestType(this.selectedlanguage);
    this.GePriorityType(this.selectedlanguage);
    this.GetBuildinglist(this.selectedlanguage);
    this.GetStatusType();
    this.GetCheckListType(this.selectedlanguage);


    this.maintainanceEntity.StatusID = 1

    this.activatedRoute.params.subscribe(data => {

      this.paramID = data['id']
      debugger
      if (this.paramID != null && this.paramID != undefined) {


        this.fmsservice.GetMaintenanceRequest(this.paramID).subscribe(data => {
          debugger
          this.maintlist = data;
          debugger
          this.maintainanceEntity.Request = this.maintlist[0].request
          debugger
          this.maintainanceEntity.RequestTypeID = this.maintlist[0].requestTypeID
          this.maintainanceEntity.RaisedBy = this.maintlist[0].raisedBy
          this.maintainanceEntity.BuildingID = this.maintlist[0].buildingID

          this.fmsservice.GetBuilding(this.selectedlanguage, this.maintlist[0].buildingID).subscribe(
            res => {
              debugger;
              this.BuildingAddress = res['address'];

            }
          )


          this.fmsservice.GetFloor(this.maintlist[0].buildingID).subscribe(data => {
            debugger
            this.FloorList = data;

            var list = this.FloorList.filter(x => x.id == this.maintlist[0].floor)
            debugger
            this.maintainanceEntity.Floor = list[0].id
          })

          this.fmsservice.GetUnit_MasterbyfloorID(this.maintlist[0].floor).subscribe(data => {
            debugger

            this.unitlist = data;

            var list = this.unitlist.filter(x => x.id == this.maintlist[0].unit)
            this.maintainanceEntity.Unit = list[0].id;

          })



          this.fmsservice.GetEquipmentlist(this.selectedlanguage).subscribe(
            res => {
              debugger;
              this.Equipmentlist = res.filter(x => x.buildingID == this.maintlist[0].buildingID);

              var list = this.Equipmentlist.filter(x => x.id == this.maintlist[0].equipmentID);
              debugger
              this.maintainanceEntity.EquipmentID = list[0].id;
              debugger
            }
          )

          this.maintainanceEntity.EquipmentID = this.maintlist[0].equipmentID
          this.DueDate = this.maintlist[0].dueDate
          this.maintainanceEntity.Description = this.maintlist[0].description
          this.maintainanceEntity.PhotoURL = this.maintlist[0].photoURL
          this.maintainanceEntity.Attachment = this.maintlist[0].attachment
          this.maintainanceEntity.LocationID = this.maintlist[0].locationID
          this.maintainanceEntity.StatusID = this.maintlist[0].statusID
          this.maintainanceEntity.Comment = this.maintlist[0].comment
          // InternalUserID:2,
          this.maintainanceEntity.Floor = this.maintlist[0].floor
          this.maintainanceEntity.Unit = this.maintlist[0].unit
          this.maintainanceEntity.CheckListTypeID = this.maintlist[0].checkListTypeID
          this.maintainanceEntity.PriorityTypeID = this.maintlist[0].priorityTypeID
          this.time = this.maintlist[0].preferredTime
          this.maintainanceEntity.PreferredTime = this.datePipe.transform(this.maintlist[0].preferredTime, "hh:mm:ss");
          debugger
          this.maintainanceEntity.LanguageID = this.maintlist[0].languageID
          this.maintainanceEntity.PublicBit = this.maintlist[0].publicBit
          debugger
        })



      }
    })



  }

  DateChange2() {
    debugger
    this.DateChanged2 = true;
    this.DueDate.toLocaleDateString();
    var date2 = this.DueDate.getFullYear() + '-' + (this.DueDate.getMonth() + 1) + '-' + this.DueDate.getDate();
    this.DueDate = date2;
    debugger
    console.log(this.DueDate)

  }

  public GetUpadteMaintanceRequestLanguageByLanguageID(languageid) {
    this.fmsservice.GetUpadteMaintanceRequestLanguageByLanguageID(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.upadteMaintanceRequest_PageTitle = res[0].upadteMaintanceRequest_PageTitle;
        this.upadteMaintanceRequest_breadchrumb = res[0].upadteMaintanceRequest_breadchrumb;
        this.upadteMaintanceRequest_button_save = res[0].upadteMaintanceRequest_button_save;
        this.upadteMaintanceRequest_Request = res[0].upadteMaintanceRequest_Request;
        this.upadteMaintanceRequest_RequestType = res[0].upadteMaintanceRequest_RequestType;
        this.upadteMaintanceRequest_PriorityType = res[0].upadteMaintanceRequest_PriorityType;
        this.upadteMaintanceRequest_RequestRaisedBy = res[0].upadteMaintanceRequest_RequestRaisedBy;
        this.upadteMaintanceRequest_Building = res[0].upadteMaintanceRequest_Building;
        this.upadteMaintanceRequest_Address = res[0].upadteMaintanceRequest_Address;
        this.upadteMaintanceRequest_Floor = res[0].upadteMaintanceRequest_Floor;
        this.upadteMaintanceRequest_Unit = res[0].upadteMaintanceRequest_Unit;
        this.upadteMaintanceRequest_SelectAssets = res[0].upadteMaintanceRequest_SelectAssets;
        this.upadteMaintanceRequest_PreferredVisitDate = res[0].upadteMaintanceRequest_PreferredVisitDate;
        this.upadteMaintanceRequest_PreferredTime = res[0].upadteMaintanceRequest_PreferredTime;
        this.upadteMaintanceRequest_Description = res[0].upadteMaintanceRequest_Description;
        this.upadteMaintanceRequest_Attachment = res[0].upadteMaintanceRequest_Attachment;
        this.upadteMaintanceRequest_Status = res[0].upadteMaintanceRequest_Status;
        this.upadteMaintanceRequest_CheckList = res[0].upadteMaintanceRequest_CheckList;
        this.upadteMaintanceRequest_Comments = res[0].upadteMaintanceRequest_Comments;
      }
    )
  }

  public GetMaintenanceRequestType(languageid) {
    this.fmsservice.GetMaintenanceRequestType(languageid).subscribe(
      res => {
        debugger;
        this.Reqlist = res;
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

  public GetBuildingAddress(evn) {
    debugger;
    this.BuildingID = evn.target.value;
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


  getunitlist(id) {
    debugger
    this.floorID = id.target.value;

    this.fmsservice.GetUnit_MasterbyfloorID(this.floorID).subscribe(data => {
      debugger

      this.unitlist = data;
    })

  }

  public GetEquipmentlist(languageid, BuildingID) {
    debugger
    this.fmsservice.GetEquipmentlist(languageid).subscribe(
      res => {
        debugger;
        this.Equipmentlist = res.filter(x => x.buildingID == BuildingID);
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

  public GetCheckListType(languageid) {
    this.fmsservice.GetCheckListType(languageid).subscribe(
      res => {
        debugger;
        this.Checklist = res;
      }
    )
  }

  onFilesAddedAttached(files: File[]) {
    debugger
    this.fmsservice.UploadCV(files).subscribe(res => {
      debugger
      this.maintainanceEntity.Attachment = 'Photo';

      this.photopath.push(res)
      debugger

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

  public InsertMaintenanceRequest() {

    var list = {
      RequestTypeID: this.maintainanceEntity.RequestTypeID,
      BuildingID: this.maintainanceEntity.BuildingID,
      FileType: this.FileType,
      StatusID: this.maintainanceEntity.StatusID,
      Floor: this.maintainanceEntity.Floor,
      Unit: this.maintainanceEntity.Unit,
      PriorityTypeID: this.maintainanceEntity.PriorityTypeID,
    }

    let validate = this.fmsservice.isEmpty(list);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;
      debugger
    }

    else {
      debugger;
      this.maintainanceEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
      this.maintainanceEntity.RaisedBy = localStorage.getItem('userid')
      this.maintainanceEntity.DueDate = this.DueDate
      this.maintainanceEntity.PublicBit = this.PublicBits
      let test = this.maintainanceEntity;
      this.fmsservice.InsertMaintenanceRequest(this.maintainanceEntity).subscribe(res => {
        debugger;
        this.MaintenanceID = res;
        
        //Swal.fire('Succesfully Saved!')
        
        this.InsertLoginDetails(this.maintainanceEntity.Request);
        this.InsertMaintenanceDocument()
        this.SaveMaintainanceRequest();

        this.savenotification();
       
      })
    }


  }
  public InsertLoginDetails(Request) {
    debugger
    var obj = {
      "ApplicationName": 'MAINTENANCE REQUEST ' +Request+ ' Added',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "MAINTENANCE REQUEST",
      "Action": 'Add New MAINTENANCE REQUEST',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }


  PublicBits
  public PublicBit(evn) {
    debugger;
    this.PublicBits = evn.target.checked;
  }

  public AnnouncementEntity = {
    Name: "",
    Description: "",
    Reason: "",
    DateTime: "",
    Time: "",
    Venue: "",
    ModifiedBy: "admin",
    BuildingID: 0,
    LanguageID: 1
  }

  date = new Date();
  public savenotification() {
    debugger;
    if (this.PublicBits == true) {
      // let notification = {
      //   Date: this.date,
      //   Event: 'Maintenance Requests',
      //   FromUser: localStorage.getItem('username'),
      //   ToUser: localStorage.getItem('username'),
      //   Message: 'Maintenance Request for ' + this.maintainanceEntity.Request,
      //   Photo: 'photo',
      //   Building: this.maintainanceEntity.BuildingID,
      // };
      // this.fmsservice.InsertNotification(notification).subscribe(
      //   res => {
      //     ;
      //   }
      // )

      let Entity = {
        Name: this.maintainanceEntity.Request,
        Description: this.maintainanceEntity.Description,
        Reason: this.maintainanceEntity.Description,
        DateTime: this.maintainanceEntity.DueDate,
        Time: this.maintainanceEntity.PreferredTime,
        Venue: this.maintainanceEntity.Unit,
        ModifiedBy: "admin",
        BuildingID: this.maintainanceEntity.BuildingID,
        LanguageID: 1
      }
      this.fmsservice.InsertAnnouncement(Entity).subscribe(res => {
        debugger;

        // Swal.fire('Announcement Successfully Saved');


      })

    }
    else {

    }

  }


  public SaveMaintainanceRequest() {
    let notification = {
      Date: this.date,
      Event: 'Maintenance Requests',
      FromUser: localStorage.getItem('username'),
      ToUser: localStorage.getItem('username'),
      Message: 'Your Maintenance Request has been Raised, Soon Our Vendor will Contact You, Thank You For Using This Service... for request ' + this.maintainanceEntity.Request,
      Photo: 'photo',
      Building: this.maintainanceEntity.BuildingID,
      NotificationTypeID:1
    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {
        ;
      }
    )
  }





  InsertMaintenanceDocument() {
    debugger
    // this.photopath.forEach(ele=>{
    //   debugger
    //   var Entity = {
    //     MaintenanceID: this.MaintenanceID,
    //     Attachment: ele,
    //     ModifiedBy: 'Admin',
    //     PDF: 'pdf',
    // };

    // this.fmsservice.InsertMaintenanceDocument(Entity).subscribe(data=>{

    //   if(data!=undefined){
    //     Swal.fire('Succesfully Saved!')
    //   }


    // })
    // })

    for (var j = 0; j < this.filenamedetails.length; j++) {
      debugger

      var Entity = {
        'MaintenanceID': this.MaintenanceID,
        "FileType": this.filenamedetails[j].ffile,
        "FileName": this.filenamedetails[j].fname,
        "modifieddate": new Date(),
        "Base64Data": this.filenamedetails[j].base[j],
        'ModifiedBy': 'Admin',
        'PDF': 'pdf',
      };
      debugger
      this.fmsservice.InsertMaintenanceDocument(Entity).subscribe(data => {

        if (data != undefined) {
          Swal.fire('Maintenance Request Successfully Saved!')

          this.clear();
        }


      })

    }
  }




  UpdateMaintenanceRequest() {

    var list = {


      RequestTypeID: this.maintainanceEntity.RequestTypeID,
      BuildingID: this.maintainanceEntity.BuildingID,

      StatusID: this.maintainanceEntity.StatusID,
      Floor: this.maintainanceEntity.Floor,
      Unit: this.maintainanceEntity.Unit,
      PriorityTypeID: this.maintainanceEntity.PriorityTypeID,
      //  EquipmentID:this.maintainanceEntity.EquipmentID


    }

    let validate = this.fmsservice.isEmpty(list);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;


      debugger
    }

    else {
      debugger
      var entity = {
        'ID': this.paramID,
        'Request': this.maintainanceEntity.Request,
        'RequestTypeID': this.maintainanceEntity.RequestTypeID != undefined ? this.maintainanceEntity.RequestTypeID : null,
        'PriorityTypeID': this.maintainanceEntity.PriorityTypeID != undefined ? this.maintainanceEntity.PriorityTypeID : null,
        'RaisedBy': localStorage.getItem('userid'),
        'BuildingID': this.maintainanceEntity.BuildingID != undefined ? this.maintainanceEntity.BuildingID : null,
        'LocationID': null,
        'EquipmentID': this.maintainanceEntity.EquipmentID != undefined ? this.maintainanceEntity.EquipmentID : null,
        'DueDate': this.DueDate,
        'PreferredTime': this.maintainanceEntity.PreferredTime != undefined ? this.maintainanceEntity.PreferredTime : this.time,
        'Description': this.maintainanceEntity.Description,
        'Attachment': 'atta',
        'PhotoURL': 'photopath',
        //AssignedTo: vm.assignedto,
        //AssignedToName: vm.user2 != undefined ? vm.user2 : vm.user1.name,
        //AssignedToPhoneNo: vm.userphone,
        //AssignedToEmailID: vm.useremail,
        'status': this.maintainanceEntity.StatusID,
        'Comment': this.maintainanceEntity.Comment,
        'InternalUserID': null,
        'Floor': this.maintainanceEntity.Floor,
        'Unit': this.maintainanceEntity.Unit,
        'CheckListTypeID': this.maintainanceEntity.CheckListTypeID,
        'LanguageID': Number(localStorage.getItem('selectedLanguageID')),
        'PublicBit': this.PublicBits

      };
      debugger
      this.fmsservice.UpdateMaintenanceRequest(entity).subscribe(data => {
        debugger
        if (data != undefined) {
          Swal.fire("Maintenance Request Updated Successfully")
          
        this.InsertLoginDetails1(entity.Request);
          //this.clear();
        }


      });
    }
  }

  public InsertLoginDetails1(Request) {
    debugger
    var obj = {
      "ApplicationName": 'MAINTENANCE REQUEST ' + Request + ' Updated',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "MAINTENANCE REQUEST",
      "Action": 'Update MAINTENANCE REQUEST',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }


  clear() {
    debugger
    this.maintainanceEntity = {
      Request: "",
      RequestTypeID: 0,
      RaisedBy: "",
      BuildingID: 0,
      EquipmentID: "",
      DueDate: "",
      Description: "",
      PhotoURL: "NULL",
      Attachment: "NULL",
      LocationID: 0,
      StatusID: 0,
      Comment: "",
      // InternalUserID:2,
      Floor: "",
      Unit: "",
      CheckListTypeID: 0,
      PriorityTypeID: 0,
      PreferredTime: "",
      LanguageID: 0,
      PublicBit: false
    }
  }

}
