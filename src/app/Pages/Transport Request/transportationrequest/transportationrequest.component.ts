import { Component, OnInit } from '@angular/core';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { ExportToCsv } from 'export-to-csv';





@Component({
  selector: 'app-transportationrequest',
  templateUrl: './transportationrequest.component.html',
  styleUrls: ['./transportationrequest.component.css']
})
export class TransportationrequestComponent implements OnInit {
  options: FullCalendarOptions;
  events: EventObject[];
  public showorhidecontent: boolean;
  constructor(public fmsservice: FmsService, private datePipe: DatePipe, public router: Router, public activatedRoute: ActivatedRoute) { }

  public pageMenuTitle;
  public tansportationRequest_PageTitle;
  public tansportationRequest_breadchrumb;
  public tansportationRequest_button_NewRequest;
  public tansportationRequest_button_exportToExcel;
  public tansportationRequest_calender;
  public tansportationRequest_list;
  public tansportationRequest_Request;
  public tansportationRequest_Destination;
  public tansportationRequest_DepartureDateTime;
  public tansportationRequest_PickupLocation;
  public tansportationRequest_NoOfVehicles;
  public tansportationRequest_NoOfPeople;
  public tansportationRequest_NoOfDays;
  public tansportationRequest_Actions;
  public selectedlanguage;
  public TransportList: any;
  public confirmButtonText: any;
  public Vendlist;
  public VendorsByIDList;
  public FileteredVendorsByIDList;
  public vendorname;
  public vendorphno;
  public RowID;
  public VendorID;
  public aaa;
  public Search;
  public Search1;
  public TransportationID;
  public SelectedVendorType;
  public SelectedVendor;
  public shuttlelist: any;
  public traveltype: any;

  paramsID: any;
  //callender variables;
  public callenderyear;
  public callenderMonth;
  public callenderstartday;
  public callenderendday;
  public callenderdaysdount = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');
  public TransportEntity = {
    TransportationID: 0,
    AdvanceAmount: 0.0,
    BalanceAmount: 0.0,
    TotalAmount: 0.0,
    ModifiedBy: "Admin"

  }

  ngOnInit() {
    debugger


    debugger

    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetTansportationRequestByLanguageID(selectedlanguage);
    this.GetTransportationRequest(selectedlanguage);
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

    this.GetVendorType(selectedlanguage);
    this.GetBulidingShuttle();
  }

  public GetTansportationRequestByLanguageID(languageid) {
    this.fmsservice.GetTansportationRequestByLanguageID(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.tansportationRequest_PageTitle = res[0].tansportationRequest_PageTitle;
        this.tansportationRequest_breadchrumb = res[0].tansportationRequest_breadchrumb;
        this.tansportationRequest_button_NewRequest = res[0].tansportationRequest_button_NewRequest;
        this.tansportationRequest_button_exportToExcel = res[0].tansportationRequest_button_exportToExcel;
        this.tansportationRequest_calender = res[0].tansportationRequest_calender;
        this.tansportationRequest_list = res[0].tansportationRequest_list;
        this.tansportationRequest_Request = res[0].tansportationRequest_Request;
        this.tansportationRequest_Destination = res[0].tansportationRequest_Destination;
        this.tansportationRequest_DepartureDateTime = res[0].tansportationRequest_DepartureDateTime;
        this.tansportationRequest_PickupLocation = res[0].tansportationRequest_PickupLocation;
        this.tansportationRequest_NoOfVehicles = res[0].tansportationRequest_NoOfVehicles;
        this.tansportationRequest_NoOfPeople = res[0].tansportationRequest_NoOfPeople;
        this.tansportationRequest_NoOfDays = res[0].tansportationRequest_NoOfDays;
        this.tansportationRequest_Actions = res[0].tansportationRequest_Actions;


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


  public GetTransportationRequest(languageid) {
    debugger;
    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetTransportationRequest("2019-01-01", "2019-12-31", languageid).subscribe(
      res => {
        debugger;
        this.TransportList = res;
        for (let i = 0; i < this.TransportList.length; i++) {
          // let _Date = this.datePipe.transform(this.TransportList[i].departureDateTime, 'yyyy-MM-dd');
          let _Date = this.TransportList[i].departureDateTime.split(" ");
          let _Time = this.datePipe.transform(this.TransportList[i].departureTime, 'hh:mm aa');
          this.TransportList[i]["TrasportationDateTime"] = _Date[0] + "  " + _Time;
        }
        this.buildcallender(this.TransportList);
      }
    )
  }


  public buildcallender(TransportList) {
    debugger;
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
      let dateformat = this.datePipe.transform(sdate, 'yyyy-MM-dd');

      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };


    }

    //Events Binding

    // for (let j = 0; j < TransportList.length; j++) {
    //   debugger;
    //   let DepartureDate = TransportList[j].departureDateTime.split(' ');

    //   let currenteventlist = this.callenderdaysdount.filter(x => x.dateformat == DepartureDate[0]);
    //   if (currenteventlist.length > 0) {
    //     this.callenderdaysdount[currenteventlist[0].date - 1]['name'] = TransportList[j].name;
    //     this.callenderdaysdount[currenteventlist[0].date - 1]['pickupLocation'] = TransportList[j].pickupLocation;
    //     this.callenderdaysdount[currenteventlist[0].date - 1]['destination'] = TransportList[j].destination;
    //     this.callenderdaysdount[currenteventlist[0].date - 1]['vendorname'] = TransportList[j].vendorname;
    //     this.callenderdaysdount[currenteventlist[0].date - 1]['noOfDays'] = TransportList[j].noOfDays;

    //     // this.callenderdaysdount[currenteventlist[0].date - 1]['TransportationHTML'] = this.callenderdaysdount[currenteventlist[0].date - 1]['TransportationHTML'] + "<span class='DemoStaffWorkScheduleCalendar_2' id='" + TransportList[j].id + "'> Request : " + TransportList[j].name + "</span>";
    //     if (this.callenderdaysdount[currenteventlist[0].date - 1]['TransportationHTML'] == undefined) {
    //       this.callenderdaysdount[currenteventlist[0].date - 1]['TransportationHTML'] = "";
    //     }

    //     this.callenderdaysdount[currenteventlist[0].date - 1]['TransportationHTML'] = this.callenderdaysdount[currenteventlist[0].date - 1]['TransportationHTML'] +
    //       "<span class='event_Pending'> Request : " + TransportList[j].name +
    //       // "<br>  Building :" + MaintainanceList[j].buildingname +
    //       // "<br>  Floor :" + MaintainanceList[j].floor +
    //       // "<br>  Unit :" + MaintainanceList[j].unitID +
    //       "</span>";

    //   }

    // }

    //Event Binding
    for (let j = 0; j < TransportList.length; j++) {
      debugger;
      let currenteventlist = this.callenderdaysdount.filter(x => this.datePipe.transform(x.dateformat, 'yyyy-MM-dd') == this.datePipe.transform(TransportList[j].departureTime, 'yyyy-MM-dd'));
      if (currenteventlist.length > 0) {
        debugger;
        this.callenderdaysdount[currenteventlist[0].date - 1]['name'] = TransportList[j].name;
        this.callenderdaysdount[currenteventlist[0].date - 1]['pickupLocation'] = TransportList[j].pickupLocation;
        this.callenderdaysdount[currenteventlist[0].date - 1]['destination'] = TransportList[j].destination;
        this.callenderdaysdount[currenteventlist[0].date - 1]['vendorname'] = TransportList[j].vendorname;
        this.callenderdaysdount[currenteventlist[0].date - 1]['noOfDays'] = TransportList[j].noOfDays;

        if (this.callenderdaysdount[currenteventlist[0].date - 1]['TransportationHTML'] == undefined) {
          this.callenderdaysdount[currenteventlist[0].date - 1]['TransportationHTML'] = "";
        }
        this.callenderdaysdount[currenteventlist[0].date - 1]['TransportationHTML'] = this.callenderdaysdount[currenteventlist[0].date - 1]['TransportationHTML'] +
          "<span class='event_PendingBookCommunity'> Destination : " + TransportList[j].destination +
          // "<br>  Building :" + MaintainanceList[j].buildingname +
          // "<br>  Floor :" + MaintainanceList[j].floor +
          // "<br>  Unit :" + MaintainanceList[j].unitID +
          "</span>";
      }




    }
  }


  public ShowTransportationRequest(evn) {
    debugger;
    var html = evn.srcElement.innerText.split(' :');

    if (html.length <= 5) {
      debugger;
      let HTML = html[1].trim();
      let MaintenanceRequest = this.TransportList.filter(x => x.destination.trim() == HTML);
      Swal.fire(({
        title: '<strong>Transportation <u>Details</u></strong>',
        type: 'info',
        html:
          '<p style="font-size: 14px;text-align: start;margin-left: 32px;">Destination: ' + html[1] +
          '       <br>' +
          'Raised By: ' + MaintenanceRequest[0].raisedBy +
          '       <br>' +
          'Pickup: ' + MaintenanceRequest[0].pickupLocation +
          '       <br>' +
          'Building: ' + MaintenanceRequest[0].buildingName +
          '       <br>' +
          'Floor: ' + MaintenanceRequest[0].floorName +
          '       <br>' +
          'Unit: ' + MaintenanceRequest[0].unitName +
          '       <br>' +
          'No of Days: ' + MaintenanceRequest[0].noOfDays +
          '       <br>' +
          'Vendor: ' + MaintenanceRequest[0].vendorname +
          '       <br>' +
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
    this.buildcallender(this.TransportList);
  }
  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.TransportList);
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
          this.CancelTransportationRequests(evn.id);
        }
        Swal.fire(
          'Cancelled!',
          'Your Request has been Cancelled.',
          'success'
        )
      }
    })
  }

  public CancelTransportationRequests(ID) {
    debugger;
    this.fmsservice.CancelTransportationRequests(ID).subscribe(res => {
      debugger;
      this.GetTransportationRequest(1);
    })
  }



  public Delete(evn) {
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
          this.DeleteTransportationRequest(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }
  public DeleteTransportationRequest(ID) {
    debugger;
    this.fmsservice.DeleteTransportationRequest(ID).subscribe(res => {
      debugger;
      this.GetTransportationRequest(1);
    })
  }
  public EditTransReq(evn) {
    debugger;
    let TransReqID = evn.id;
    let traveltype = evn.travelType
    localStorage.setItem('traveltype', traveltype);
    this.traveltype = localStorage.getItem('traveltype');

    this.router.navigate(['/UpdateTransportationRequest', TransReqID]);

  }

  public Comments(evn) {
    debugger;


  }


  public VendorAssignment(evn) {
    debugger;
    this.RowID = evn.id;
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

  public VendorByID(evn) {
    debugger;
    this.VendorID = evn.target.value
    this.GetVendorByTypeID(this.VendorID)
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
    this.aaa = evn.target.value;
    this.FileteredVendorsByIDList = this.VendorsByIDList.filter(x => x.id == this.aaa);
    this.vendorname = this.FileteredVendorsByIDList[0].emailID;
    this.vendorphno = this.FileteredVendorsByIDList[0].phoneNo;
  }

  public UpdateAssignedTo() {
    debugger;
    // Swal.fire('Updated Successfully!')
    var Entity =
    {
      'VendorID': this.aaa,
      'ID': this.RowID,
    }
    this.fmsservice.UpdateTransportationRequestAssign(this.RowID, this.aaa, Entity).subscribe(res => {
      debugger;
      Swal.fire('Transportation Request Assigned Successfully');
      this.Clear();
      this.GetTransportationRequest(1);
    })
  }


  public Clear() {
    this.SelectedVendorType = "none";
    this.SelectedVendor = "none";
    this.vendorname = null;
    this.vendorphno = null;
  }


  public ReplyFor(evn) {
    debugger;
    this.TransportEntity.TransportationID = evn.id;

  }


  public InsertTransportationPayment() {
    debugger;
    //this.maintainanceEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
    //  let test = this.maintainanceEntity;
    this.fmsservice.InsertTransportationPayment(this.TransportEntity).subscribe(res => {
      debugger;
      if (res > 0) {
        this.TransportEntity.TransportationID = null;
        this.TransportEntity.TotalAmount = null;
        this.TransportEntity.AdvanceAmount = null;
        this.TransportEntity.BalanceAmount = null;
        this.TransportEntity.ModifiedBy = null;
      }
      Swal.fire('Payment Done successfully');
    })
  }
  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Transportation List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Transportation List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.TransportList);
  }


  public GetBulidingShuttle() {
    this.fmsservice.GetBuildingShuttle().subscribe(data => {
      this.shuttlelist = data;
    });
  }



  public DeleteBuildingShuttle(id) {
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
        this.fmsservice.DeleteBuildingShuttle(id).subscribe(res => {
          let test = res;
          this.GetBulidingShuttle()

        })
        Swal.fire(
          'Deleted!',
          'Data Has been deleted.',
          'success'
        )
      }
      else {
        this.GetBulidingShuttle()
      }
    })
  }
}
