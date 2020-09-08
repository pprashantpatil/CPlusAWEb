import { Component, OnInit } from '@angular/core';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { FmsService } from 'src/app/services/fms.service';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';
import {DomSanitizer} from "@angular/platform-browser";



@Component({
  selector: 'app-event-planner',
  templateUrl: './event-planner.component.html',
  styleUrls: ['./event-planner.component.css']
})
export class EventPlannerComponent implements OnInit {
  options1: NgDateRangePickerOptions;
  options: FullCalendarOptions;
  events: EventObject[];
  public showorhidecontent: boolean;

  constructor(public fmsservice: FmsService, private datePipe: DatePipe, public router: Router,private sanitizer:DomSanitizer) { }

  public pageMenuTitle;
  public eventPlaner_PageTitle;
  public eventPlaner_breadchrumb;
  public eventPlaner_button_New;
  public eventPlaner_Building;
  public eventPlaner_Leave_Type;
  public eventPlaner_Staff_Name;
  public eventPlaner_Start_Date;
  public eventPlaner_End_Date;
  public eventPlaner_NoOfDaysLeave;
  public eventPlaner_Reason;
  public eventPlaner_Status;
  public eventPlaner_RejectReason;
  public eventPlaner_Actions;
  public selectedlanguage;
  public Buildinglist;
  public Statuslist;
  public EventPlannerList;
  public Search;
  public ApprovalStatus;
  public FilteredEventPlannerList;
  public EventsID;
  public eventName;
  public startDate
  public raisedBy;
  public startTime: any;
  public endTime: any;
  public endDate: any;
  public unit
  public ID;
  public confirmButtonText;
  public Attachmentlist;

  //callender variables;
  public callenderyear;
  public callenderMonth;
  public callenderstartday;
  public callenderendday;
  public callenderdaysdount = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');




  public ReasonForCancelEntity = {
    CancelReason: ""
  }

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetEventPlanerLanguageByLanguageID(selectedlanguage);
    this.GetScheduleRequest(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.GetStatusType();
    // this.GetScheduleRequestAttachment(this.EventsID);

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
      locale: this.selectedlanguage,
      editable: true,

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

    this.options1 = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,
    };
  }

  public GetEventPlanerLanguageByLanguageID(languageid) {
    this.fmsservice.GetEventPlanerLanguageByLanguageID(languageid).subscribe(
      res => {

        this.pageMenuTitle = res[0].pageMenuTitle;
        this.eventPlaner_PageTitle = res[0].eventPlaner_PageTitle;
        this.eventPlaner_breadchrumb = res[0].eventPlaner_breadchrumb;
        this.eventPlaner_button_New = res[0].eventPlaner_button_New;
        this.eventPlaner_Building = res[0].eventPlaner_Building;
        this.eventPlaner_Leave_Type = res[0].eventPlaner_Leave_Type;
        this.eventPlaner_Staff_Name = res[0].eventPlaner_Staff_Name;
        this.eventPlaner_Start_Date = res[0].eventPlaner_Start_Date;
        this.eventPlaner_End_Date = res[0].eventPlaner_End_Date;
        this.eventPlaner_NoOfDaysLeave = res[0].eventPlaner_NoOfDaysLeave;
        this.eventPlaner_Reason = res[0].eventPlaner_Reason;
        this.eventPlaner_Status = res[0].eventPlaner_Status;
        this.eventPlaner_RejectReason = res[0].eventPlaner_RejectReason;
        this.eventPlaner_Actions = res[0].eventPlaner_Actions;

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
  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {

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

        this.Statuslist = res;
      }
    )
  }

  public GetScheduleRequest(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();

    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');
    this.fmsservice.GetScheduleRequest("2019-01-01", "2019-12-31", languageid).subscribe(
      res => {

        this.EventPlannerList = res;
        this.FilteredEventPlannerList = this.EventPlannerList;
        this.buildcallender(this.FilteredEventPlannerList);
      }
    )
  }


  public buildcallender(eventplannerlist) {

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
    
    for (let j = 0; j < eventplannerlist.length; j++) {

      var date1 = new Date(eventplannerlist[j].startDate);
      var date2 = new Date(eventplannerlist[j].endDate);
      var Difference_In_Time = date2.getDate() - date1.getDate();

      let currenteventlist = this.callenderdaysdount.filter(x => x.dateformat == eventplannerlist[j].startDate);
      if (currenteventlist.length > 0) {
        var date1 = new Date(eventplannerlist[j].startDate);
        var date2 = new Date(eventplannerlist[j].endDate);
        var Difference_In_Time = date2.getDate() - date1.getDate();
        debugger;
        
        for (let v = 0; v <= Difference_In_Time; v++) {
          if (Difference_In_Time > 0) {
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['event'] = eventplannerlist[j].eventName;
            if (this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['eventhtml'] == undefined) {
              this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['eventhtml'] = "";
            }
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['eventhtml'] = this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['eventhtml']+'<span>  Event :' + this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['event'] + '</span>';
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['Status'] = eventplannerlist[j].approvalStatus;
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['iscontinuous'] = true;
          }
          else {
            this.callenderdaysdount[currenteventlist[0].date - (v + 1)]['event'] = eventplannerlist[j].eventName;
            if (this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['eventhtml'] == undefined) {
              this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['eventhtml'] = "";
            }
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['eventhtml'] = this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['eventhtml']+'<span>  Event :' + this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['event'] + '</span>';
            this.callenderdaysdount[currenteventlist[0].date - (v + 1)]['Status'] = eventplannerlist[j].approvalStatus;
          }

        }

      }

      // let currenteventlist = this.callenderdaysdount.filter(x => x.dateformat == eventplannerlist[j].startDate);
      // if (currenteventlist.length > 0) {
      //   this.callenderdaysdount[currenteventlist[0].date - 1]['event'] = eventplannerlist[j].eventName;
      //   this.callenderdaysdount[currenteventlist[0].date - 1]['Status'] = eventplannerlist[j].approvalStatus;
      // }

    }
  }

  public previousmonth() {

    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.FilteredEventPlannerList);
  }
  public nextmonth() {

    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.FilteredEventPlannerList);
  }
  selectedBuilding
  public FilteredByBuildingName(evn) {

    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredEventPlannerList = this.EventPlannerList;
    }
    else {
      this.selectedBuilding = evn.target.value;
      this.FilteredEventPlannerList = this.EventPlannerList.filter(x => x.buildingname == this.selectedBuilding);
    }
  }

  public FilteredByStatus(evn) {

    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredEventPlannerList = this.EventPlannerList;
    }
    else {
      let selectedStatus = evn.target.value;
      this.FilteredEventPlannerList = this.EventPlannerList.filter(x => x.approvalStatus == selectedStatus && x.buildingname == this.selectedBuilding);
    }
  }

  public EditEvents(evn) {

    this.EventsID = evn.id;
    this.eventName = evn.eventName;
    this.startDate = this.datePipe.transform(evn.startDate, 'yyyy-MM-dd');
    this.raisedBy = evn.raisedBy;
    this.startTime = evn.startTime;
    this.endTime = evn.endTime,
      this.endDate = evn.endDate,
      this.unit = evn.unit
  }

  public Approve(evn) {

    if (evn.target.textContent == 'Approve') {
      this.ApprovalStatus = 'Approved'
      this.ID = this.EventsID;
      var Entity = {
        'ID': this.ID,
        'ApprovalStatus': this.ApprovalStatus,
      }
      this.fmsservice.UpdateSchedulRequestApprovalStatus(this.ID, Entity).subscribe(res => {

        Swal.fire('Event Approved Successfully!')
        this.GetScheduleRequest(1);
        this.Clear();
      })
    }


  }
  public Reject(evn) {

    if (evn.target.textContent == 'Reject') {
      this.ApprovalStatus = 'Rejected'
      this.ID = this.EventsID;
      var Entity = {
        'ID': this.ID,
        'ApprovalStatus': this.ApprovalStatus,
      }
      this.fmsservice.UpdateSchedulRequestApprovalStatus(this.ID, Entity).subscribe(res => {

        Swal.fire('Event Cancelled Succesfully!')
        this.GetScheduleRequest(1);
      })
    }
  }



  public DeleteEvents(evn) {

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
          this.DeleteScheduleRequest(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }




  public DeleteScheduleRequest(ID) {

    this.fmsservice.DeleteScheduleRequest(ID).subscribe(res => {

      this.GetScheduleRequest(1);
    })

  }

  public UpdateEvents(evn) {

    let EventsID = evn.id;
    this.router.navigate(['/UpdateEventPlanner', EventsID]);
  }



  public EventsAttachments(evn) {

    this.GetScheduleRequestAttachment(evn.id);
  }


  SelectedID;
  NoImagesAvail = false;
  public GetScheduleRequestAttachment(EventsID) {
    this.SelectedID = EventsID;
    this.fmsservice.GetScheduleRequestAttachment(EventsID).subscribe(
      res => {

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


  public AddAttachments() {

    this.UploadPhotosNew(this.SelectedID);
  }
  public NewAttachment = [];
  onFilesAdded(files: File[]) {

    this.NewAttachment.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.NewAttachment.push(files[i]);
    }
  }

  public ImageID: any;
  public UpdateNewAttachments(evn) {

    this.ImageID = evn.id;
  }


  public Upload() {

    if (this.NewAttachment.length < 1) {
      Swal.fire("Please Drop Some Files")
    }
    else {
      this.fmsservice.ScheduleRequestPhotoUpload(this.NewAttachment).subscribe(res => {

        let UploadedAttachmentList = res;
        for (let i = 0; i < UploadedAttachmentList.length; i++) {
          let Entity = {
            ID: this.ImageID,
            Attachment: UploadedAttachmentList[i],
            pdf: 'null'
          }
          this.fmsservice.UpdateScheduleRequestAttachment(this.ImageID, Entity).subscribe(
            res => {
              let SuccesAttachmentList = res;
              Swal.fire({
                position: 'center',
                type: 'success',
                title: 'Uploaded Successfully',
                showConfirmButton: false,
                timer: 1500
              })
              // this.GetInventoryList(1);
            }
          )
        }

      })
    }
  }


  public DeleteOldAttachments(evn) {

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
          this.DeleteScheduleRequestAttachment(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }

  public DeleteScheduleRequestAttachment(ID) {

    this.fmsservice.DeleteScheduleRequestAttachment(ID).subscribe(res => {

      //this.GetInventoryList(1);
    })
  }

  SelectedCancelReasonID;
  public CancelEvents() {

    this.SelectedCancelReasonID = this.wanttocanceleventid;
    var Entity = {
      'ID': this.wanttocanceleventid,
      'ApprovalStatus': 'Rejected',
    }
    this.fmsservice.UpdateSchedulRequestApprovalStatus(this.wanttocanceleventid, Entity).subscribe(res => {

      //Swal.fire('Event Cancelled Succesfully!')
      this.GetScheduleRequest(1);
      this.CancelWithReason(this.SelectedCancelReasonID);
    })


  }


  public Clear() {
    this.EventsID = 0;
    this.eventName = null;
    this.startDate = null;
    this.raisedBy = null;
    this.startTime = null;
    this.endTime = null;
    this.endDate = null;
  }

  exporttoexcel() {

    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Events List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Events List'
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.FilteredEventPlannerList);
  }




  public CancelWithReason(ID) {


    var Entity = {
      'ID': ID,
      'CancelReason': this.ReasonForCancelEntity.CancelReason
    }

    this.fmsservice.UpdateScheduleReasonForCancel(ID, Entity).subscribe(res => {

      //Swal.fire('Event Cancelled Succesfully!')
      this.GetScheduleRequest(1);
    })

    Swal.fire('Event Cancelled Successfully');
  }



  public EventsPhotos = [];
  public UploadedPhotos = [];
  onFilesAddedAttachments(files: File[]) {

    this.EventsPhotos.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.EventsPhotos.push(files[i]);
    }
  }
  public UploadPhotosNew(scheduleID) {
    this.fmsservice.InventoryInvoiceUpload(this.EventsPhotos).subscribe(res => {

      for (let i = 0; i < res.length; i++) {
        let PhotosEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedPhotos.push(PhotosEntity);
      }
      this.InsertScheduleRequestAttachment(scheduleID);
      //Swal.fire('Updated Successfully!');
    })
  }


  public InsertScheduleRequestAttachment(scheduleID) {

    for (let i = 0; i < this.UploadedPhotos.length; i++) {
      let entity = {
        ScheduleID: scheduleID,
        Attachment: this.UploadedPhotos[i].docpathURL1,
        // ModifiedBy: 'Admin',
        PDF: 'Null'
      }
      this.fmsservice.InsertScheduleRequestAttachment(entity).subscribe(res => {

        Swal.fire('Attachment Successfully Saved!');

      })
    }
  }




  wanttocanceleventid;
  public OnCancel(evn) {

    this.wanttocanceleventid = evn.id;
  }
  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
