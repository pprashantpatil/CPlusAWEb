import { Component, OnInit } from '@angular/core';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-event-planner',
  templateUrl: './update-event-planner.component.html',
  styleUrls: ['./update-event-planner.component.css']
})
export class UpdateEventPlannerComponent implements OnInit {
  pickeroptions: NgDateRangePickerOptions;
  options: FullCalendarOptions;
  events: EventObject[];
  public showorhidecontent: boolean;

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  public pageMenuTitle;
  public updateEventPlanner_PageTitle;
  public updateEventPlanner_breadchrumb;
  public updateEventPlanner_button_save;
  public updateEventPlanner_Event_name;
  public updateEventPlanner_Building;
  public updateEventPlanner_Address;
  public updateEventPlanner_Location;
  public updateEventPlanner_Request_Raised_By;
  public updateEventPlanner_Resources;
  public updateEventPlanner_Start_Date;
  public updateEventPlanner_All_Day;
  public updateEventPlanner_Start_Time;
  public updateEventPlanner_End_Time;
  public updateEventPlanner_Repeat;
  public updateEventPlanner_Set_Up_Time;
  public updateEventPlanner_Tear_Down_Time;
  public updateEventPlanner_OnBehalfOf;
  public updateEventPlanner_Status;
  public updateEventPlanner_Food_Service;
  public updateEventPlanner_Furniture;
  public updateEventPlanner_Technology;
  public updateEventPlanner_Comment;
  public updateEventPlanner_Attachment;
  public Buildinglist;
  public BuildingID;
  public BuildingAddress = "";
  public ResourceLocation;
  public RepeatList;
  public Statuslist;
  public Eventsid;
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public EventPlannerEntity = {
    EventName: "",
    BuildingID: 0,
    ResourceID: 1,
    EventTypeID: 0,
    StartDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    AllDay: true,
    StartTime: "",
    EndDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    EndTime: "",
    RepeatID: 1,
    SetUpTime: this.datepipe.transform(new Date(), 'hh:mm aa'),
    TearDownTime: this.datepipe.transform(new Date(), 'hh:mm aa'),
    OnBehalfOf: "",
    StatusID: 1,
    FoodService: "",
    Furniture: "",
    Technology: "",
    InternalUserID: 0,
    Unit: "",
    Comment: "",
    RaisedBy: 0,
    Attachment: "NULL",
    LanguageID: 1,
  }


  ngOnInit() {

    this.options = {
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

    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'DD/MM/YYYY',
      startOfWeek: 4,

    };

    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetUpdateEventPlannerLanguageByLanguageID(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.GetResourceLocation(selectedlanguage);
    this.GetRepeatType(selectedlanguage);
    this.GetStatusType();

    this.route.params.subscribe(params => {
      debugger;
      this.Eventsid = params['id'];
      if (this.Eventsid != undefined) {
        this.GetScheduleRequestByID(this.Eventsid);
        this.GetScheduleRequestAttachment(this.Eventsid);
      }
    }
    );


  }


  public GetUpdateEventPlannerLanguageByLanguageID(languageid) {
    this.fmsservice.GetUpdateEventPlannerLanguageByLanguageID(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.updateEventPlanner_PageTitle = res[0].updateEventPlanner_PageTitle;
        this.updateEventPlanner_breadchrumb = res[0].updateEventPlanner_breadchrumb;
        this.updateEventPlanner_button_save = res[0].updateEventPlanner_button_save;
        this.updateEventPlanner_Event_name = res[0].updateEventPlanner_Event_name;
        this.updateEventPlanner_Building = res[0].updateEventPlanner_Building;
        this.updateEventPlanner_Address = res[0].updateEventPlanner_Address;
        this.updateEventPlanner_Location = res[0].updateEventPlanner_Location;
        this.updateEventPlanner_Request_Raised_By = res[0].updateEventPlanner_Request_Raised_By;
        this.updateEventPlanner_Resources = res[0].updateEventPlanner_Resources;
        this.updateEventPlanner_Start_Date = res[0].updateEventPlanner_Start_Date;
        this.updateEventPlanner_All_Day = res[0].updateEventPlanner_All_Day;
        this.updateEventPlanner_Start_Time = res[0].updateEventPlanner_Start_Time;
        this.updateEventPlanner_End_Time = res[0].updateEventPlanner_End_Time;
        this.updateEventPlanner_Repeat = res[0].updateEventPlanner_Repeat;
        this.updateEventPlanner_Set_Up_Time = res[0].updateEventPlanner_Set_Up_Time;
        this.updateEventPlanner_Tear_Down_Time = res[0].updateEventPlanner_Tear_Down_Time;
        this.updateEventPlanner_OnBehalfOf = res[0].updateEventPlanner_OnBehalfOf;
        this.updateEventPlanner_Status = res[0].updateEventPlanner_Status;
        this.updateEventPlanner_Food_Service = res[0].updateEventPlanner_Food_Service;
        this.updateEventPlanner_Furniture = res[0].updateEventPlanner_Furniture;
        this.updateEventPlanner_Technology = res[0].updateEventPlanner_Technology;
        this.updateEventPlanner_Comment = res[0].updateEventPlanner_Comment;
        this.updateEventPlanner_Attachment = res[0].updateEventPlanner_Attachment;

      }
    )
  }
  changeStatus(evn) {
    if (evn.currentTarget.checked) {
      this.showorhidecontent = false;
      this.EventPlannerEntity.AllDay = true;
    }
    else {
      this.showorhidecontent = true;
      this.EventPlannerEntity.AllDay = false;
    }
  }
  Isempty = false;
  public InsertScheduleRequest() {
    debugger;
    let mandatoryfields = {
      EventName: this.EventPlannerEntity.EventName,
      BuildingID: this.EventPlannerEntity.BuildingID,
      Location: this.EventPlannerEntity.Unit,
      StartDate: this.EventPlannerEntity.StartDate,
      EndDate: this.EventPlannerEntity.EndDate,
      StartTime: this.EventPlannerEntity.StartTime,
      EndTime: this.EventPlannerEntity.EndTime,
      BuildingAddress: this.BuildingAddress,
    }

    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {
      if (this.EventPlannerEntity.StartDate == this.EventPlannerEntity.EndDate) {
        if (((this.EventPlannerEntity.StartTime) > (this.EventPlannerEntity.EndTime))) {
          debugger;
          Swal.fire("Start Time Cannot be greater than End Time");
        }
        else {
          let test = this.EventPlannerEntity;
          this.fmsservice.InsertScheduleRequest(this.EventPlannerEntity).subscribe(res => {
            debugger;
            this.UploadPhotos(res);
            Swal.fire('Event Successfully Saved!');
            this.SaveNotification();
          })
        }
      }
      else {
        if (!(new Date(this.EventPlannerEntity.StartDate) < new Date(this.EventPlannerEntity.EndDate))) {
          Swal.fire("End Date Cannot be greater than Start Date");
        } else {
        //this.EventPlannerEntity.LanguageID=Number(localStorage.getItem('selectedLanguageID'))
        let test = this.EventPlannerEntity;
        this.fmsservice.InsertScheduleRequest(this.EventPlannerEntity).subscribe(res => {
          debugger;
          this.UploadPhotos(res);
          Swal.fire('Event Successfully Saved!');
          this.SaveNotification();
        })
      }
      }
    }
  }


  public UpdateScheduleRequest() {
    debugger;
    let mandatoryfields = {
      EventName: this.EventPlannerEntity.EventName,
      BuildingID: this.EventPlannerEntity.BuildingID,
      Location: this.EventPlannerEntity.Unit,
      StartDate: this.EventPlannerEntity.StartDate,
      EndDate: this.EventPlannerEntity.EndDate,
      StartTime: this.EventPlannerEntity.StartTime,
      EndTime: this.EventPlannerEntity.EndTime,
      BuildingAddress: this.BuildingAddress,
    }

    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {
      this.fmsservice.UpdateScheduleRequest(this.Eventsid, this.EventPlannerEntity).subscribe(res => {
        debugger;
        Swal.fire('Event Updated Successfully!');
      })
    }
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
    this.BuildingID = evn.target.value;
    let LanguageID = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetBuilding(LanguageID, this.BuildingID).subscribe(
      res => {
        debugger;
        this.BuildingAddress = res['address'];
        this.BuildingName = res['name'];
      }
    )
  }

  public GetResourceLocation(languageid) {
    this.fmsservice.GetResourceLocation(languageid).subscribe(
      res => {
        debugger;
        this.ResourceLocation = res;
      }
    )
  }
  public GetRepeatType(languageid) {
    this.fmsservice.GetRepeatType(languageid).subscribe(
      res => {
        debugger;
        this.RepeatList = res;
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
  // onFilesAdded(files: File[]) {
  //   this.fmsservice.ProjReqDocUpload(files).subscribe(res => {
  //     this.EventPlannerEntity.Attachment = res.toString();
  //   })
  // }


  public EventsPhotos = [];
  public UploadedPhotos = [];
  onFilesAdded(files: File[]) {
    debugger;
    this.EventsPhotos.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.EventsPhotos.push(files[i]);
    }
  }
  public UploadPhotos(scheduleID) {
    this.fmsservice.InventoryInvoiceUpload(this.EventsPhotos).subscribe(res => {
      debugger;
      for (let i = 0; i < res.length; i++) {
        let PhotosEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedPhotos.push(PhotosEntity);
      }
      this.InsertScheduleRequestAttachment(scheduleID);
      //Swal.fire('Updated Successfully!');

      this.Clear();
    })
  }

  public Clear() {
    debugger;
    this.EventPlannerEntity.EventName = "";
    this.EventPlannerEntity.BuildingID = 0;
    this.EventPlannerEntity.ResourceID = 1;
    this.EventPlannerEntity.EventTypeID = 0;
    this.EventPlannerEntity.StartDate = "";
    this.EventPlannerEntity.AllDay = false;
    this.EventPlannerEntity.StartTime = "";
    this.EventPlannerEntity.EndDate = "";
    this.EventPlannerEntity.EndTime = "";
    this.EventPlannerEntity.RepeatID = 1;
    this.EventPlannerEntity.SetUpTime = "";
    this.EventPlannerEntity.TearDownTime = "";
    this.EventPlannerEntity.OnBehalfOf = "";
    this.EventPlannerEntity.FoodService = "";
    this.EventPlannerEntity.Furniture = "";
    this.EventPlannerEntity.Technology = "";
    this.EventPlannerEntity.InternalUserID = 0;
    this.EventPlannerEntity.Unit = "";
    this.EventPlannerEntity.Comment = "";
    this.EventPlannerEntity.RaisedBy = 0;
  }


  public InsertScheduleRequestAttachment(scheduleID) {
    debugger;
    for (let i = 0; i < this.UploadedPhotos.length; i++) {
      let entity = {
        ScheduleID: scheduleID,
        Attachment: this.UploadedPhotos[i].docpathURL1,
        // ModifiedBy: 'Admin',
        PDF: 'Null'
      }
      this.fmsservice.InsertScheduleRequestAttachment(entity).subscribe(res => {
        debugger;
        // Swal.fire('Event Successfully Saved!');

      })
    }
  }


  public GetRoleType(UserTypeID) {
    this.fmsservice.GetRoleType(1).subscribe(
      res => {
        debugger;
        this.Statuslist = res;
      }
    )
  }

  public GetScheduleRequestByID(ID) {
    debugger;
    this.fmsservice.GetScheduleRequestByID(ID).subscribe(
      res => {
        debugger;
        this.EventPlannerEntity.EventName = res[0].eventName;
        this.EventPlannerEntity.BuildingID = res[0].buildingID;
        this.EventPlannerEntity.ResourceID = res[0].resourceID;
        // this.EventPlannerEntity.EventTypeID=res["eventName"];
        this.EventPlannerEntity.StartDate = this.datepipe.transform(res[0].startDate, 'yyyy-MM-dd');
        this.EventPlannerEntity.EndDate = this.datepipe.transform(res[0].endDate, 'yyyy-MM-dd');
        this.EventPlannerEntity.AllDay = res[0].allDay;
        this.EventPlannerEntity.StartTime = res[0].startTime;
        this.EventPlannerEntity.EndTime = res[0].endTime;
        this.EventPlannerEntity.RepeatID = res[0].repeatID;
        this.EventPlannerEntity.SetUpTime = res[0].setUpTime;
        this.EventPlannerEntity.TearDownTime = res[0].tearDownTime;
        this.EventPlannerEntity.OnBehalfOf = res[0].onBehalfOf;
        this.EventPlannerEntity.StatusID = res[0].statusID;
        this.EventPlannerEntity.FoodService = res[0].foodService;
        this.EventPlannerEntity.Furniture = res[0].furniture;
        this.EventPlannerEntity.Technology = res[0].technology;
        this.EventPlannerEntity.InternalUserID = res[0].internalUserID;
        this.EventPlannerEntity.Unit = res[0].unit;
        this.EventPlannerEntity.Comment = res[0].comment;
        this.EventPlannerEntity.RaisedBy = res[0].raisedBy;
        this.EventPlannerEntity.Attachment = res[0].actualAttachment;
        this.GetBuilding(1, res[0].buildingID);
      }
    )
  }


  public GetBuilding(ID, BuildingID) {
    //let LanguageID = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetBuilding(ID, BuildingID).subscribe(
      res => {
        debugger;
        this.BuildingAddress = res['address'];

      }
    )
  }



  public Attachmentlist = [];
  public GetScheduleRequestAttachment(EventsID) {
    this.fmsservice.GetScheduleRequestAttachment(EventsID).subscribe(
      res => {
        debugger;
        this.Attachmentlist = res;
      }
    )
  }

  today = new Date();
  public SaveNotification() {
    debugger;
    let entity = {
      date: this.datepipe.transform(this.today, 'yyyy-MM-dd'),
      Event: 'New Event',
      FromUser: localStorage.getItem('username'),
      ToUser: "",
      Message: 'New Event Raised for ' + this.EventPlannerEntity.EventName,
      Photo: "Photo",
      Building: this.BuildingName
    }

    this.fmsservice.InsertNotification(entity).subscribe(
      res => {
        debugger;
      }
    )
  }

}
