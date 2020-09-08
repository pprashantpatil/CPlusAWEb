import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;
  startdate: any
  enddate: any;
  search: any;
  datelist: any;

  constructor(public fmsservice: FmsService, private datePipe: DatePipe, public router: Router) { }
  public pageMenuTitle;
  public announcement_PageTitle;
  public announcement_BreadChrumb;
  public announcement_Button;
  public announcement_Search;
  public announcement_Announcement;
  public announcement_Building;
  public announcement_Floor;
  public announcement_Unit;
  public announcement_Description;
  public announcement_Date;
  public announcement_Time;
  public announcement_Venue;
  public announcement_Comments;
  public announcement_Actions;
  public AnnouncementList: any;
  value: any;
  ProjectID: any
  LoginTypeID: any;
  ngOnInit() {
    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetAnnouncementLanguage(selectedlanguage);
    this.GetAnnouncementList(selectedlanguage);
  }

  public EditAnnouncement(evn) {
    debugger;
    let AnnouncementID = evn.id;
    this.router.navigate(['/UpdateAnnouncement', AnnouncementID]);
  }



  public GetAnnouncementLanguage(languageid) {
    this.fmsservice.GetAnnouncementLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.announcement_PageTitle = res[0].announcement_PageTitle;
        this.announcement_BreadChrumb = res[0].announcement_BreadChrumb;
        this.announcement_Button = res[0].announcement_Button;
        this.announcement_Search = res[0].announcement_Search;
        this.announcement_Announcement = res[0].announcement_Announcement;
        this.announcement_Building = res[0].announcement_Building;
        this.announcement_Floor = res[0].announcement_Floor;
        this.announcement_Unit = res[0].announcement_Unit;
        this.announcement_Description = res[0].announcement_Description;
        this.announcement_Date = res[0].announcement_Date;
        this.announcement_Time = res[0].announcement_Time;
        this.announcement_Venue = res[0].announcement_Venue;
        this.announcement_Comments = res[0].announcement_Comments;
        this.announcement_Actions = res[0].announcement_Actions;


      }
    )
  }

  public GetAnnouncementList(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');
    if (this.LoginTypeID == 1) {
      this.fmsservice.GetAnnouncementList("2019-01-01", "2022-12-31", languageid).subscribe(
        res => {
          debugger;
          let temp: any = res;
          let temp1: any = temp.filter(x => x.buildingID == this.ProjectID);
          this.AnnouncementList = temp1.filter(x => x.announcementForID == 1 || x.announcementForID == 3);
        }
      )
    } else if (this.LoginTypeID == 3) {
      this.fmsservice.GetAnnouncementList("2019-01-01", "2022-12-31", languageid).subscribe(
        res => {
          debugger;
          let temp: any = res
          let tempq = temp.filter(x => x.buildingID == this.ProjectID)
          this.AnnouncementList = tempq.filter(x => x.announcementForID == 1 || x.announcementForID == 3 || x.announcementForID == 2);
        }
      )
    } else if (this.LoginTypeID == 4) {
      this.fmsservice.GetAnnouncementList("2019-01-01", "2022-12-31", languageid).subscribe(
        res => {
          debugger;
          let temp: any = res
          let temp1: any = temp.filter(x => x.buildingID == this.ProjectID);
          this.AnnouncementList = temp1.filter(x => x.announcementForID == 2 || x.announcementForID == 3);
        }
      )
    }

    else if (this.LoginTypeID == 7) {
      this.fmsservice.GetAnnouncementList("2019-01-01", "2022-12-31", languageid).subscribe(
        res => {
          debugger;
          let temp: any = res
          let temp1: any = temp;
          this.AnnouncementList = temp1;
        }
      )
    }
    else if (this.LoginTypeID == 9) {
      this.fmsservice.GetAnnouncementList("2019-01-01", "2022-12-31", languageid).subscribe(
        res => {
          debugger;
          let temp: any = res
          let temp1: any = temp.filter(x => x.buildingID == this.ProjectID);
          this.AnnouncementList = temp1;
        }
      )
    }

  }
  selectedDate(value) {
    debugger
    //this.datelist.pop()
    debugger
    this.datelist = value.split('-')
    this.startdate = this.datelist[0]
    this.enddate = this.datelist[1]

    if (this.LoginTypeID == 1) {
      this.fmsservice.GetAnnouncementList(this.startdate, this.enddate, 1).subscribe(
        res => {
          debugger;
          let temp: any = res;
          let temp1: any = temp.filter(x => x.buildingID == this.ProjectID);
          this.AnnouncementList = temp1.filter(x => x.announcementForID == 1 || x.announcementForID == 3);
        }
      )
    } else if (this.LoginTypeID == 3) {
      this.fmsservice.GetAnnouncementList(this.startdate, this.enddate, 1).subscribe(
        res => {
          debugger;
          let temp: any = res
          let tempq = temp.filter(x => x.buildingID == this.ProjectID)
          this.AnnouncementList = tempq.filter(x => x.announcementForID == 1 || x.announcementForID == 3 || x.announcementForID == 2);
        }
      )
    } else if (this.LoginTypeID == 4) {
      this.fmsservice.GetAnnouncementList(this.startdate, this.enddate, 1).subscribe(
        res => {
          debugger;
          let temp: any = res
          let temp1: any = temp.filter(x => x.buildingID == this.ProjectID);
          this.AnnouncementList = temp1.filter(x => x.announcementForID == 2 || x.announcementForID == 3);
        }
      )
    }

  }

  confirmButtonText
  delename
  public Delete(evn) {

    this.delename = evn.announcement
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        if (this.confirmButtonText = "Yes, delete it!") {
          this.DeleteAnnouncement(evn.id);

          this.InsertLoginDetails(name);




        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }
  public DeleteAnnouncement(ID) {
    debugger;
    this.fmsservice.DeleteAnnouncement(ID).subscribe(res => {
      debugger;
      this.GetAnnouncementList(1);



    })
  }







  SelectedAttachmentID;
  public Attachment(evn) {
    this.SelectedAttachmentID = evn.id;
    this.GetAnnouncementDocument(this.SelectedAttachmentID);
  }

  Imageone: any;
  Attachmentlist = [];
  NoImagesAvail;
  public GetAnnouncementDocument(ID) {
    this.fmsservice.GetAnnouncementDocument(ID).subscribe(
      res => {
        this.Attachmentlist = res;
        this.Imageone = this.Attachmentlist[0].attachment
        if (res.length == 0) {
          this.NoImagesAvail = true;
        }
        else {
          this.NoImagesAvail = false;
        }

      }
    )
  }


  public AID;
  public UploadAttachments(AID) {
    this.AID = AID;
  }

  public AssetsInfoAttachments = [];
  onFilesAddedAttached(files: File[]) {
    debugger;
    this.AssetsInfoAttachments.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.AssetsInfoAttachments.push(files[i]);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }

  public UpdateAssetsAttachments() {
    if (this.AssetsInfoAttachments.length < 1) {
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Please Drop some files',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      this.fmsservice.AnnouncementAttachmentUpload(this.AssetsInfoAttachments).subscribe(res => {
        debugger;
        let UploadedAttachmentList = res;
        for (let i = 0; i < UploadedAttachmentList.length; i++) {
          let Entity = {
            ID: this.AID.id,
            Attachment: UploadedAttachmentList[i],
            pdf: 'null'
          }
          this.fmsservice.UpdateAnnouncementDocument(Entity).subscribe(
            res => {
              let SuccesAttachmentList = res;
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Your Documents has been saved',
                showConfirmButton: false,
                timer: 1500
              })
            }
          )
        }

      })
    }
  }


  public DeleteAttachment(evn) {
    debugger;


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        if (this.confirmButtonText = "Yes, delete it!") {
          this.DeleteAnnouncementDocument(evn.id);

        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }



  InsertLoginDetails(name) {
    debugger
    var obj = {
      "ApplicationName": 'Announcement ' + name + ' Deleted',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
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


  public DeleteAnnouncementDocument(ID) {
    debugger;
    this.fmsservice.DeleteAnnouncementDocument(ID).subscribe(res => {
      debugger;
      this.GetAnnouncementList(1);
    })
  }


  public AddAttachments() {
    this.UploadPhotos(this.SelectedAttachmentID);

  }


  public Photos = [];
  public UploadedPhotos = [];
  onFilesNewAttachments(files: File[]) {
    debugger;
    this.Photos.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.Photos.push(files[i]);
      Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Document Uploaded Successfully',
        showConfirmButton: false,
        timer: 1500
      })
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
        Swal.fire('Attachments Saved Successfully!');
      })
    }
  }

}
