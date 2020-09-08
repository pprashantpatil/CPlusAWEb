import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { Title } from '@angular/platform-browser';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-book-community-evnt-dashboard',
  templateUrl: './book-community-evnt-dashboard.component.html',
  styleUrls: ['./book-community-evnt-dashboard.component.css']
})
export class BookCommunityEvntDashboardComponent implements OnInit {
  options: FullCalendarOptions;
  events: EventObject[];
  BookCommunityHallList: any;
  list: any;
  public showorhidecontent: boolean;
  selectedLanguage: any;


  constructor(public fmsservice: FmsService, private datePipe: DatePipe, ) { }

  public bookCommunityHallEventDashBoardLanguage;
  public bookCommunityHallEventDashBoard_PageTitle;
  public bookCommunityHallEventDashBoard_bookButton;
  public bookCommunityHallEventDashBoard_breadchrumb;
  public pageMenuTitle;
  checked: boolean;
  selectedlanguage: any

  public callenderyear;
  public callenderMonth;
  public callenderstartday;
  public callenderendday;
  public callenderdaysdount = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');

  ngOnInit() {
    this.showorhidecontent = false;
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.getBookCommunityHallEventDashBoardbyLanguage(selectedlanguage);

    if (selectedlanguage == '1') {
      this.selectedLanguage = 'en';
    }
    if (selectedlanguage == '2') {
      this.selectedLanguage = 'ar';
    }
    if (selectedlanguage == '3') {
      this.selectedLanguage = 'id';
    }
    if (selectedlanguage == '4') {
      this.selectedLanguage = 'zh';
    }
    if (selectedlanguage == '5') {
      this.selectedLanguage = 'th';
    }
    if (selectedlanguage == '6') {
      this.selectedLanguage = 'es';
    }

    // this.options = {

    //   editable: true,
    //   locale: this.selectedLanguage,
    //   header: {
    //     right: 'prev,next',
    //     center: 'title',
    //     left: 'month'
    //   },

    //   contentHeight: 300,
    //   height: 500,

    // };


    this.fmsservice.GetBookPartyHallAll(selectedlanguage).subscribe(data => {

      debugger
      this.BookCommunityHallList = data;

      this.buildcallender(this.BookCommunityHallList)

    });

  }

  ngAfterViewInit() {
    let ggg = document.getElementsByTagName('button');

    for (let i = 0; i < ggg.length; i++) {

      if (ggg[i].innerText == "month") {
        ggg[i].style.background = "#36748c";
        ggg[i].style.color = "#fff";
      }
    }

  }

  changeStatus(evn) {

    if (evn.currentTarget.checked) {
      this.showorhidecontent = false;
    }
    else {
      this.showorhidecontent = true;
    }

  }

  public buildcallender(BookCommunityHallList) {
    debugger;
    this.callenderdaysdount.length = 0;
    debugger
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

    for (let j = 0; j < BookCommunityHallList.length; j++) {
      debugger;
      let currenteventlist = this.callenderdaysdount.filter(x => x.dateformat == BookCommunityHallList[j].date);
      if (currenteventlist.length > 0) {
        this.callenderdaysdount[currenteventlist[0].date - 1]['hallName'] = BookCommunityHallList[j].hallName;
        this.callenderdaysdount[currenteventlist[0].date - 1]['clientName'] = BookCommunityHallList[j].clientName;
        this.callenderdaysdount[currenteventlist[0].date - 1]['S_date'] = BookCommunityHallList[j].date;
        this.callenderdaysdount[currenteventlist[0].date - 1]['E_date'] = BookCommunityHallList[j].enddate;
        this.callenderdaysdount[currenteventlist[0].date - 1]['phoneNo'] = BookCommunityHallList[j].phoneNo;
      }

    }
    for (let j = 0; j < BookCommunityHallList.length; j++) {
      debugger;
      let currenteventlist = this.callenderdaysdount.filter(x => this.datePipe.transform(x.dateformat, 'yyyy-MM-dd') == this.datePipe.transform(BookCommunityHallList[j].date, 'yyyy-MM-dd'));
      if (currenteventlist.length > 0) {
        debugger;
        this.callenderdaysdount[currenteventlist[0].date - 1]['hallName'] = BookCommunityHallList[j].hallName;
        this.callenderdaysdount[currenteventlist[0].date - 1]['clientName'] = BookCommunityHallList[j].clientName;
        this.callenderdaysdount[currenteventlist[0].date - 1]['S_date'] = BookCommunityHallList[j].date;
        this.callenderdaysdount[currenteventlist[0].date - 1]['E_date'] = BookCommunityHallList[j].enddate;
        this.callenderdaysdount[currenteventlist[0].date - 1]['phoneNo'] = BookCommunityHallList[j].phoneNo;

        if (this.callenderdaysdount[currenteventlist[0].date - 1]['BookCommunityHTML'] == undefined) {
          this.callenderdaysdount[currenteventlist[0].date - 1]['BookCommunityHTML'] = "";
        }
        this.callenderdaysdount[currenteventlist[0].date - 1]['BookCommunityHTML'] = this.callenderdaysdount[currenteventlist[0].date - 1]['BookCommunityHTML'] +
          "<span class='event_PendingBookCommunity'> Event : " + BookCommunityHallList[j].typeofParty +
          // "<br>  Building :" + MaintainanceList[j].buildingname +
          // "<br>  Floor :" + MaintainanceList[j].floor +
          // "<br>  Unit :" + MaintainanceList[j].unitID +
          "</span>";
      }

    }

  }



  public ShowBookCommunityHall(evn) {
    debugger;
    var html = evn.srcElement.innerText.split(' :');
    if (html.length <= 5) {
      debugger;
      let HTML = html[1].trim()
      let MaintenanceRequest = this.BookCommunityHallList.filter(x => x.typeofParty.trim() == HTML);
      Swal.fire(({
        title: '<strong>Board Room <u>Details</u></strong>',
        type: 'info',
        html:
          '<p style="font-size: 14px;text-align: start;margin-left: 32px;">Event: ' + html[1] +
          '       <br>' +
          'Board Room: ' + MaintenanceRequest[0].hallName +
          '       <br>' +
          'Client Name: ' + MaintenanceRequest[0].clientName +
          '       <br>' +
          'Building: ' + MaintenanceRequest[0].name +
          '       <br>' +
          'Floor: ' + MaintenanceRequest[0].floor +
          '       <br>' +
          'Unit: ' + MaintenanceRequest[0].unitName +
          '       <br>' +
          'Start Date: ' + this.datePipe.transform(MaintenanceRequest[0].date, 'MMM d, y') +
          '       <br>' +
          'End Date: ' + this.datePipe.transform(MaintenanceRequest[0].enddate, 'MMM d, y') +
          '       <br>' +
          'Start Time: ' + MaintenanceRequest[0].startTime +
          '       <br>' +
          'End Time: ' + MaintenanceRequest[0].endTime +
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

    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.BookCommunityHallList)
  }
  public nextmonth() {

    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.BookCommunityHallList)
  }

  getBookCommunityHallEventDashBoardbyLanguage(id) {
    debugger
    this.fmsservice.getBookCommunityHallEventDashBoardbyLanguageId(id).subscribe(
      res => {

        this.bookCommunityHallEventDashBoardLanguage = res;
        debugger
        this.bookCommunityHallEventDashBoard_PageTitle = res[0].bookCommunityHallEventDashBoard_PageTitle;
        this.bookCommunityHallEventDashBoard_bookButton = res[0].bookCommunityHallEventDashBoard_bookButton;
        this.bookCommunityHallEventDashBoard_breadchrumb = res[0].bookCommunityHallEventDashBoard_breadchrumb;
        this.pageMenuTitle = res[0].pageMenuTitle;
      }

    )

  }




}
