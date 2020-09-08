import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-update-announcements',
  templateUrl: './update-announcements.component.html',
  styleUrls: ['./update-announcements.component.css']
})
export class UpdateAnnouncementsComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  public pageMenuTitle;
  public updateAnnouncement_PageTitle;
  public updateAnnouncement_breadchrumb;
  public updateAnnouncement_Building;
  public updateAnnouncement_Announcement;
  public updateAnnouncement_Description;
  public updateAnnouncement_Date;
  public updateAnnouncement_Time;
  public updateAnnouncement_AnnouncementDetails;
  public updateAnnouncement_Venue;
  public updateAnnouncement_Attachment;
  public updateAnnouncement_Save;
  public AnnouncementID;
  public UpdateAnnouncement_Floor;
  public UpdateAnnouncement_Unit;
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public AnnouncementEntity = {
    Name: "",
    Description: "",
    Reason: "",
    DateTime: "",
    Time: "",
    Venue: "",
    BuildingID: "",
    LanguageID: 1,
    FloorID: 0,
    UnitID: 0,
    AnnouncementForID: 0,
    CompanyID: localStorage.getItem('UserID')
  }

  BuildingID1: any;
  BuildingID: any;
  Floorlist: any;
  floorID: any;
  FloorID1: any;
  Unitlist: any;
  ProjectID: any;
  ProjectId:any;
  
  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.AnnouncementEntity.BuildingID = localStorage.getItem('ProjectID');
    this.GetUpdateAnnouncementLanguage(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.ProjectID = localStorage.getItem('ProjectID')
    this.route.params.subscribe(params => {
      debugger;
      this.AnnouncementID = params['id'];
      if (params['id'] != undefined) {
        this.AnnouncementID = params['id'];
        this.GetAnnouncementListByID(this.AnnouncementID);
        this.GetAnnouncementDocument(this.AnnouncementID);


      }
    }
    );
  }


  public GetAnnouncementListByID(ID) {
    debugger
    this.fmsservice.GetAnnouncementListByID(ID).subscribe(

      res => {
        debugger;
        this.AnnouncementEntity.Name = res[0].announcement;
        this.AnnouncementEntity.AnnouncementForID = res[0].announcementForID;
        this.AnnouncementEntity.Description = res[0].description;
        this.AnnouncementEntity.Reason = res[0].reason;
        this.AnnouncementEntity.BuildingID = res[0].buildingID;
        this.AnnouncementEntity.Time = this.datepipe.transform(res[0].time, 'HH:mm:ss');
        // this.AnnouncementEntity.Time=this.datepipe.transform(res[0].time, 'hh:mm aa')
        this.AnnouncementEntity.DateTime = this.datepipe.transform(res[0].dateTime, 'yyyy-MM-dd');


        this.AnnouncementEntity.Venue = res[0].venue;

        debugger


        debugger
        this.fmsservice.GetFloor(res[0].buildingID).subscribe(data => {
          debugger
          this.Floorlist = data;

          var list = this.Floorlist.filter(x => x.id == res[0].floorID)
          debugger
          this.AnnouncementEntity.FloorID = list[0].id

        })




        this.fmsservice.GetUnit_MasterbyfloorID(res[0].floorID).subscribe(data => {
          debugger

          this.Unitlist = data;

          var list1 = this.Unitlist.filter(x => x.id == res[0].unit)

          this.AnnouncementEntity.UnitID = list1[0].id

        })
        //this.AnnouncementEntity.FloorID = res[0].floor;

      }
    )

  }

  Buildinglist;
  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;
      }
    )
  }


  getbuildingID(Building) {
    debugger
    this.BuildingID = Building.target.value
    debugger
    this.fmsservice.GetFloor(this.BuildingID).subscribe(res => {
      debugger
      this.Floorlist = res;
    })

  }
  // public UnitByID(evn) {
  //   debugger;
  //   this.FloorID = evn.target.value;
  //   let ttt = this.FloorList.filter(x => x.id == this.FloorID);
  //   this.GetUnit_MasterbybID(ttt[0].buildingID, this.FloorID);
  // }





  getfloorID(floorID) {
    debugger
    this.floorID = floorID.target.value;

    this.fmsservice.GetUnit_MasterbyfloorID(this.floorID).subscribe(data => {
      debugger

      this.Unitlist = data;

    })
  }


  public GetUpdateAnnouncementLanguage(languageid) {
    this.fmsservice.GetUpdateAnnouncementLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.updateAnnouncement_PageTitle = res[0].updateAnnouncement_PageTitle;
        this.updateAnnouncement_breadchrumb = res[0].updateAnnouncement_breadchrumb;
        this.updateAnnouncement_Building = res[0].updateAnnouncement_Building;
        this.updateAnnouncement_Announcement = res[0].updateAnnouncement_Announcement;
        this.updateAnnouncement_Description = res[0].updateAnnouncement_Description;
        this.updateAnnouncement_Date = res[0].updateAnnouncement_Date;
        this.updateAnnouncement_Time = res[0].updateAnnouncement_Time;
        this.updateAnnouncement_AnnouncementDetails = res[0].updateAnnouncement_AnnouncementDetails;
        this.updateAnnouncement_Venue = res[0].updateAnnouncement_Venue;
        this.updateAnnouncement_Attachment = res[0].updateAnnouncement_Attachment;
        this.updateAnnouncement_Save = res[0].updateAnnouncement_Save;
        debugger

      }
    )
  }


  public InsertAnnouncement() {
    debugger
    this.fmsservice.InsertAnnouncement(this.AnnouncementEntity).subscribe(res => {
      debugger;
      this.UploadPhotos(res);
      Swal.fire('Announcement Successfully Saved');
      this.InsertLoginDetails();
      this.savenotification();
      this.Clear();
      location.href = "#/Announcements";
      // this.SaveNotifications();
    })
  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Announcement ' + this.AnnouncementEntity.Name + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Announcement",
      "Action": 'Add New Announcement',
      "IPAddress": "175.143.31.41"
    }
    debugger
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      debugger
      if (data != null && data != undefined) {

      }
    })

  }



  UsersList
  public GetUserslist(languageid) {
    this.fmsservice.GetUserslist(languageid).subscribe(
      res => {
        debugger;
        this.UsersList = res;
      }
    )
  }

  UserID;
  date = new Date();
  public savenotification() {
    let notification = {
      Date: this.date,
      Event: this.AnnouncementEntity.Name,
      FromUser: localStorage.getItem('username'),
      ToUser: localStorage.getItem('username'),
      Message: 'Exchange 106  New Announcement :' + this.AnnouncementEntity.Name,
      Photo: 'photo',
      Building: '',
      NotificationTypeID: 13,
      UserID: this.UserID
    };
    this.fmsservice.AnnouncementNotification(notification).subscribe(
      res => {
        ;
      }
    )

  }



  public Clear() {
    this.AnnouncementEntity.BuildingID = '',
      this.AnnouncementEntity.DateTime = "",
      this.AnnouncementEntity.Description = "",

      this.AnnouncementEntity.Name = "",
      this.AnnouncementEntity.Reason = "",
      this.AnnouncementEntity.Time = "",
      this.AnnouncementEntity.Venue = ""
    this.AnnouncementEntity.FloorID = 0
    this.AnnouncementEntity.UnitID = 0



  }


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
    this.fmsservice.AnnouncementAttachmentUpload(this.Photos).subscribe(res => {
      debugger;
      for (let i = 0; i < res.length; i++) {
        let PhotosEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedPhotos.push(PhotosEntity);
      }
      this.InsertAnnouncementDocument(ID);
      // Swal.fire('Updated Successfully!')
    })
  }

  public InsertAnnouncementDocument(ID) {
    debugger;
    for (let i = 0; i < this.UploadedPhotos.length; i++) {
      let entity = {
        AnnouncementID: ID,
        Attachment: this.UploadedPhotos[i].docpathURL1,
        ModifiedBy: 'Admin',
        pdf: 'Null'
      }
      this.fmsservice.InsertAnnouncementDocument(entity).subscribe(res => {
        debugger;
        //Swal.fire('Successfully Saved!');
      })
    }
  }


  public UpdateAnnouncement() {
    this.fmsservice.UpdateAnnouncement(this.AnnouncementID, this.AnnouncementEntity).subscribe(res => {
      debugger;
      Swal.fire('Announcements Updated Successfully!');
      this.InsertLoginDetails1();
      location.href = "#/Announcements";
    })
  }

  // public UpdateLoginDetails() {
  //   this.fmsservice.UpdateLoginDetails(this.AnnouncementID, this.AnnouncementEntity).subscribe(res => {
  //     debugger;
  //     Swal.fire('Announcements Updated Successfully!');
  //   })
  // }



  InsertLoginDetails1() {
    debugger
    var obj = {
      "ApplicationName": 'Announcement ' + this.AnnouncementEntity.Name + ' Update',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Announcement",
      "Action": 'Update Announcement',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }


  Attachmentlist = [];
  public GetAnnouncementDocument(ID) {
    this.fmsservice.GetAnnouncementDocument(ID).subscribe(
      res => {
        this.Attachmentlist = res;
      }
    )
  }

  // (public FloorID;

  // public getUnitID(evn) {
  //   debugger;
  //   this.FloorID = evn.target.value;
  //   let ttt = this.Floorlist.filter(x => x.id == this.FloorID);
  //   this.GetUnit_MasterbybID(ttt[0].buildingID, this.FloorID);
  // }

  // public Unitslist;
  // public GetUnit_MasterbybID(BuildingID, FloorID) {
  //   debugger
  //   this.fmsservice.GetUnit_MasterbybID(BuildingID, FloorID).subscribe(

  //     res => {
  //       this.Unitslist = res;
  //       debugger

  //       if (this.VisitorEntity.Unit != 0) {
  //         this.VisitorEntity.Unit = this.VisitorEntity.Unit;
  //       }

  //     }
  //   )
  // }

}
