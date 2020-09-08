import { Component, OnInit } from '@angular/core';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-schedule-maintenance',
  templateUrl: './schedule-maintenance.component.html',
  styleUrls: ['./schedule-maintenance.component.css']
})
export class ScheduleMaintenanceComponent implements OnInit {
  options: FullCalendarOptions;
  events: EventObject[];
  public showorhidecontent: boolean;

  constructor(public fmsservice: FmsService, public router: Router, private datePipe: DatePipe) { }
  public pageMenuTitle;
  public scheduleMaintenance_PageTitle;
  public scheduleMaintenance_breadchrumb;
  public scheduleMaintenance_callender;
  public scheduleMaintenance_button_add;
  public scheduleMaintenance_button_exportToExcel;
  public scheduleMaintenance_search;
  public scheduleMaintenance_RequestName;
  public scheduleMaintenance_FrequencyRequestType;
  public scheduleMaintenance_Building;
  public scheduleMaintenance_RaisedBy;
  public scheduleMaintenance_RaisedTo;
  public scheduleMaintenance_DueDate;
  public scheduleMaintenance_Status;
  public scheduleMaintenance_Comments;
  public scheduleMaintenance_Action;
  public selectedlanguage;
  public Buildinglist;
  public ScheduleList: any;
  public Statuslist;
  public Search;
  public confirmButtonText;
  public Attachmentlist;
  public Photolist;

  photoID: any;
  attachmentID: any;

  FileName: any;
  FileType: any;
  base64textString: any;

  //callender variables;
  public callenderBindData = new Date();
  public callenderyear;
  public callenderMonth;
  public callenderstartday;
  public callenderendday;
  public callenderdaysdount = [];

  public todaydate = new Date().getDate();
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetScheduleMaintenanceLanguageByLanguageID(selectedlanguage);
    this.GetScheduledMaintenance(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.GetStatusType();
    if (selectedlanguage == '1') {
      this.selectedlanguage = 'en';
    }
    else if (selectedlanguage == '2') {
      this.selectedlanguage = 'ar';
    }
    else if (selectedlanguage == '3') {
      this.selectedlanguage = 'id';
    }
    else if (selectedlanguage == '4') {
      this.selectedlanguage = 'zh';
    }
    else if (selectedlanguage == '5') {
      this.selectedlanguage = 'th';
    }
    else if (selectedlanguage == '6') {
      this.selectedlanguage = 'es';
    }
    this.options = {

      editable: true,
      locale: this.selectedlanguage,
      header: {
        right: 'prev,next ',
        center: 'title',
        left: 'month listMonth'
      },

      // contentHeight: 300,
      height: 500,

    };

    this.events = [
      { id: 'a', title: 'My Birthday', allDay: true },
      { id: 'b', title: 'Friends coming round', start: '2018-07-26T18:00:00', end: '2018-07-26T23:00:00' }
    ]
  }
  public GetScheduleMaintenanceLanguageByLanguageID(languageid) {
    this.fmsservice.GetScheduleMaintenanceLanguageByLanguageID(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.scheduleMaintenance_PageTitle = res[0].scheduleMaintenance_PageTitle;
        this.scheduleMaintenance_breadchrumb = res[0].scheduleMaintenance_breadchrumb;
        this.scheduleMaintenance_callender = res[0].scheduleMaintenance_callender;
        this.scheduleMaintenance_button_add = res[0].scheduleMaintenance_button_add;
        this.scheduleMaintenance_button_exportToExcel = res[0].scheduleMaintenance_button_exportToExcel;
        this.scheduleMaintenance_search = res[0].scheduleMaintenance_search;
        this.scheduleMaintenance_RequestName = res[0].scheduleMaintenance_RequestName;
        this.scheduleMaintenance_FrequencyRequestType = res[0].scheduleMaintenance_FrequencyRequestType;
        this.scheduleMaintenance_Building = res[0].scheduleMaintenance_Building;
        this.scheduleMaintenance_RaisedBy = res[0].scheduleMaintenance_RaisedBy;
        this.scheduleMaintenance_RaisedTo = res[0].scheduleMaintenance_RaisedTo;
        this.scheduleMaintenance_DueDate = res[0].scheduleMaintenance_DueDate;
        this.scheduleMaintenance_Status = res[0].scheduleMaintenance_Status;
        this.scheduleMaintenance_Comments = res[0].scheduleMaintenance_Comments;
        this.scheduleMaintenance_Action = res[0].scheduleMaintenance_Action;

      }
    )
  }
  changeStatus(evn) {

    if (evn.currentTarget.checked) {
      this.showorhidecontent = false;
    }
    else {
      this.showorhidecontent = true;
    }

  }


  public statusID;
  public FilteredScheduleList;
  public GetScheduledMaintenance(languageid) {
    this.fmsservice.GetScheduledMaintenance(languageid).subscribe(
      res => {
        debugger;
        this.ScheduleList = res;
        this.FilteredScheduleList = this.ScheduleList;
        this.buildcallender(this.ScheduleList);
      }
    )
  }


  public buildcallender(ScheduleList) {
    this.callenderdaysdount.length = 0;
    this.callenderyear = this.callenderBindData.getFullYear();
    this.callenderMonth = this.datePipe.transform(this.callenderBindData, 'MMMM');
    this.callenderstartday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth(), 1);
    this.callenderendday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth() + 1, 0);
    this.callenderdaysdount.length = this.callenderendday.getDate();
    let o = 0;
    for (let i = 0; i < this.callenderdaysdount.length; i++) {
      let sdate = this.callenderstartday;
      let _date;
      if (sdate.getDate() == 1 && o == 0) {
        _date = sdate.setDate(sdate.getDate() + 0);
        o++
      }
      else {
        _date = sdate.setDate(sdate.getDate() + 1);
      }
      _date = this.datePipe.transform(sdate, 'dd');
      let _day = this.datePipe.transform(sdate, 'EEE');
      let dateformat = this.datePipe.transform(sdate, 'yyyy-MM-ddTHH:mm:ss');

      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };
    }

    //Events Binding

    for (let j = 0; j < ScheduleList.length; j++) {
      debugger;
      let currenteventlist = this.callenderdaysdount.filter(x => x.dateformat == ScheduleList[j].dueDate);
      if (currenteventlist.length > 0) {
        this.callenderdaysdount[currenteventlist[0].date - 1]['request'] = ScheduleList[j].request;
        this.callenderdaysdount[currenteventlist[0].date - 1]['c'] = ScheduleList[j].c;
        this.callenderdaysdount[currenteventlist[0].date - 1]['floor'] = ScheduleList[j].floor;
        this.callenderdaysdount[currenteventlist[0].date - 1]['unit'] = ScheduleList[j].unit;
        this.callenderdaysdount[currenteventlist[0].date - 1]['statusID'] = ScheduleList[j].statusID;
        if (this.callenderdaysdount[currenteventlist[0].date - 1]['schedulehtml'] == undefined) {
          this.callenderdaysdount[currenteventlist[0].date - 1]['schedulehtml'] = "";
        }
        this.callenderdaysdount[currenteventlist[0].date - 1]['schedulehtml'] = this.callenderdaysdount[currenteventlist[0].date - 1]['schedulehtml'] + "<span>Request Name : " + ScheduleList[j].request + "</span>";
      }

    }
  }


  public ScheduledMaintenance(evn) {
    debugger;
    var html = evn.srcElement.innerText.split(' :');

    if (html.length <= 4) {
      debugger;
      let HTML = html[1].trim()
      let MaintenanceRequest = this.ScheduleList.filter(x => x.request == HTML);
      Swal.fire(({
        title: '<strong>Staff <u>Details</u></strong>',
        type: 'info',
        html:
          '<p style="font-size: 14px;text-align: start;margin-left: 32px;">Request: ' + html[1] +
          '       <br>' +
          'Building: ' + MaintenanceRequest[0].c +
          '       <br>' +
          'Floor: ' + MaintenanceRequest[0].floor +
          '       <br>' +
          'Unit: ' + MaintenanceRequest[0].unitName +
          '       <br>' +
          'Vendor: ' + MaintenanceRequest[0].assignedToName +
          '       <br>' +
          'Status: ' + MaintenanceRequest[0].status +
          '</p>'
        ,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,

      }));
    }
  }








  public previousmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.ScheduleList);
  }
  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.ScheduleList);
  }
  handleFileSelect(evt) {
    //console.log(evt);
    var File = evt.target.value;
    // console.log(File);
    let subStringData = File.substr(12, 27);
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

  getphotoID(photoID) {
    debugger
    this.photoID = photoID
  }


  Updateschedulephoto() {
    debugger
    var entity = {
      'ID': this.photoID,
      'FileName': this.FileName,
      'FileType': this.FileType,
      'modifieddate': new Date(),
      'Base64Data': this.base64textString,
      'pdf': 'pdf'
    };


    this.fmsservice.UpdateScheduledMaintenancePhoto(entity).subscribe(data => {
      debugger

      if (data != undefined) {

        Swal.fire("Photo Updated Successfully")

      }
    })
  }


  getattchment(attchID) {

    this.attachmentID = attchID
  }

  UpdateScheduledMaintenanceAttachment() {
    debugger
    var entity = {
      'ID': this.attachmentID,
      'FileName': this.FileName,
      'FileType': this.FileType,
      'modifieddate': new Date(),
      'Base64Data': this.base64textString,
      'pdf': 'pdf'
    };


    this.fmsservice.UpdateScheduledMaintenanceAttachment(entity).subscribe(data => {
      debugger

      if (data != undefined) {

        Swal.fire("Attachment Updated Successfully")

      }
    })
  }







  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        debugger;
        this.Buildinglist = res;

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


  public DeleteSC(evn) {
    
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
          this.DeleteScheduledMaintenance(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
        this.InsertLoginDetails(evn.request);
      }
    })
  }

  public InsertLoginDetails(Request) {
    debugger
    var obj = {
      "ApplicationName": 'Scheduled Maintainance Request ' + Request + ' Deleted',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Maintainance Request",
      "Action": 'Delete  Scheduled Maintainance Request',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  public DeleteScheduledMaintenance(ID) {
    debugger;
    this.fmsservice.DeleteScheduledMaintenance(ID).subscribe(res => {
      debugger;
      this.GetScheduledMaintenance(1);
    })
  }


  public Cancel(evn) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!'
    }).then((result) => {
      if (result.value) {
        if (this.confirmButtonText = "Yes, Cancel it!") {
          this.CancelScheduleMaintenance(evn.id);
        }
        Swal.fire(
          'Cancel!',
          'Your Data has been Canceled.',
          'success'
        )
      }
    })

  }

  public CancelScheduleMaintenance(ID) {
    debugger;
    this.fmsservice.CancelScheduleMaintenance(ID).subscribe(res => {
      debugger;
      this.GetScheduledMaintenance(1);
    })
  }


  public EditSC(evn) {
    debugger;
    let SMID = evn.id;
    this.router.navigate(['/UpdateSheduleMantaince', SMID]);
  }


  public DeletePhotos(evn) {
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
          this.fmsservice.DeleteScheduledMaintenancePhoto(evn).subscribe(data => {
            if (data != undefined) {
              Swal.fire(
                'Deleted!',
                'Your Data has been deleted.',
                'success'
              )
            }
            debugger
          })
        }

      }
    })
  }


  // DeletePhotos(id){
  //   debugger

  //   this.DeleteScheduledMaintenancePhoto

  // }

  public Deleteattach(evn) {
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
          this.fmsservice.DeleteScheduledMaintenanceAttachment(evn).subscribe(data => {
            if (data != undefined) {
              Swal.fire(
                'Deleted!',
                'Your Data has been deleted.',
                'success'
              )
            }
            debugger
          })
        }

      }
    })
  }


  SelectedSechID;
  public Attachments(evn) {
    debugger;
    this.SelectedSechID = evn.id;
    this.GetScheduleAttachment(evn.id);
  }


  NoImagesAvail;
  public GetScheduleAttachment(EventsID) {
    debugger;
    this.fmsservice.GetScheduleAttachment(EventsID).subscribe(
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


  public Photos(evn) {
    debugger;
    this.SelectedSechID = evn.id;
    this.GetSchedulePhoto(evn.id);
  }

  NoImagesAvailPhotos;
  public GetSchedulePhoto(EventsID) {
    this.fmsservice.GetSchedulePhoto(EventsID).subscribe(
      res => {
        debugger;
        this.Photolist = res;

        if (res.length == 0) {
          this.NoImagesAvailPhotos = true;
        }
        else {
          this.NoImagesAvailPhotos = false;
        }
      }
    )
  }


  public selectedBuilding;
  public FilterByBuildingname(evn) {
    debugger;
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredScheduleList = this.ScheduleList;
    }
    else {
      this.selectedBuilding = evn.target.value;
      this.FilteredScheduleList = this.ScheduleList.filter(x => x.c == this.selectedBuilding);
    }
  }

  public selectedStatus;
  public FilteredByStatus(evn) {
    debugger;
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredScheduleList = this.ScheduleList;
    }
    else {
      this.selectedStatus = evn.target.value;
      this.FilteredScheduleList = this.ScheduleList.filter(x => x.status == this.selectedStatus && x.c == this.selectedBuilding);
    }
  }


  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Scheduled Maintenance List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Scheduled Maintenance List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.FilteredScheduleList);
  }

  public AddAttachments() {
    debugger;
    this.UploadAttachmentsNew(this.SelectedSechID);
  }


  public AddPhotos() {
    this.UploadPhotosNew(this.SelectedSechID)
  }

  public Photos1 = [];
  public attachments1 = [];
  onFilesAdded(files: File[]) {
    debugger;
    this.Photos1.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.Photos1.push(files[i]);
      debugger
    }
  }

  public UploadAttachmentsNew(scheduleID) {
    debugger
    this.fmsservice.ScheduleMaintenanceAttachmentUpload(this.Photos1).subscribe(res => {
      debugger;
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
    debugger;
    for (let i = 0; i < this.attachments1.length; i++) {
      let entity = {

        'ScheduleID': scheduleID,
        'Attachment': this.attachments1[i].docpathURL1,
        'ModifiedBy': 'Admin',
        'pdf': "pdf"
      }
      this.fmsservice.InsertScheduleAttachment(entity).subscribe(res => {
        debugger;
        Swal.fire("Added Attachment Successfully")
      })
    }

  }


  public Photos2 = [];
  public attachments = [];
  onFilesAddedPhotos(files: File[]) {
    debugger;
    this.Photos2.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.Photos2.push(files[i]);
      debugger
    }
  }

  public UploadPhotosNew(scheduleID) {
    this.fmsservice.ScheduleMaintenancePhotoUpload(this.Photos2).subscribe(res => {
      debugger;
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
    debugger;
    for (let i = 0; i < this.attachments.length; i++) {
      let entity = {

        'ScheduleID': scheduleID,
        'Attachment': this.attachments[i].docpathURL1,
        'ModifiedBy': 'Admin',
        'pdf': "pdf"
      }

      this.fmsservice.InsertSchedulePhoto(entity).subscribe(res => {
        debugger;
        Swal.fire("Photos Added Successfully");
      })
    }
  }


}
