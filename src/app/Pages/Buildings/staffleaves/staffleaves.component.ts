import { Component, OnInit } from '@angular/core';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-staffleaves',
  templateUrl: './staffleaves.component.html',
  styleUrls: ['./staffleaves.component.css']
})
export class StaffleavesComponent implements OnInit {
  options: FullCalendarOptions;
  events: EventObject[];
  public showorhidecontent: boolean;
  searchtext: any;

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public pageMenuTitle;
  public staffLeaves_PageTitle;
  public staffLeaves_BreadChrumb;
  public staffLeaves_AddNewButton;
  public staffLeaves_Search;
  public staffLeaves_Building;
  public staffLeaves_LeaveType;
  public staffLeaves_StaffName;
  public staffLeaves_StartDate;
  public staffLeaves_EndDate;
  public staffLeaves_DaysLeave;
  public staffLeaves_Reason;
  public staffLeaves_Status;
  public staffLeaves_RejectReason;
  public staffLeaves_Actions;
  public selectedlanguage;
  public StaffLeaves: any;
  selectedlanguage1: any;
  Reason: any;
  staffID: any;
  Leavetypelist: any;
  Buildinglist: any;
  buildingID: any;
  leavetype: any;
  public buildingname;

  public callenderyear;
  public callenderMonth;
  public callenderstartday;
  public callenderendday;
  public callenderdaysdount = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');
  ProjectID: any

  ngOnInit() {
    this.selectedlanguage1 = localStorage.getItem('selectedLanguageID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.GetStaffLeavesLanguage(this.selectedlanguage1);

    if (localStorage.getItem('LoginTypeID') == '7') {
      this.fmsservice.GetStaffLeaves(1).subscribe(
        res => {
          let temp: any = res
          this.StaffLeaves = temp.filter(x => x.status == null);
          this.Count = this.StaffLeaves.length;
          this.buildcallender(this.StaffLeaves)
        }
      )
    }
    else {
      this.GetStaffLeaves(this.selectedlanguage1);
    }


    this.fmsservice.GetLeaveType(this.selectedlanguage1).subscribe(data => {
      debugger
      this.Leavetypelist = data.filter(x => x.companyID == localStorage.getItem('userid'));

      this.Leavetypelist.sort(function (a, b) {
        var nameA = a.short.toUpperCase(); // ignore upper and lowercase
        var nameB = b.short.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {

          return -1;
        }

        if (nameA > nameB) {

          return 1;
        }

        // names must be equal
        return 0;
      });

    })

    this.fmsservice.GetBuildinglist(this.selectedlanguage1).subscribe(
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

    if (this.selectedlanguage1 == '1') {
      this.selectedlanguage = 'en';
    }
    else if (this.selectedlanguage1 == '2') {
      this.selectedlanguage = 'ar';
    }
    else if (this.selectedlanguage1 == '3') {
      this.selectedlanguage = 'id';
    }
    else if (this.selectedlanguage1 == '4') {
      this.selectedlanguage = 'zh';
    }
    else if (this.selectedlanguage1 == '5') {
      this.selectedlanguage = 'th';
    }
    else if (this.selectedlanguage1 == '6') {
      this.selectedlanguage = 'es';
    }




  }


  public buildcallender(StaffLeaves) {

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
    for (let j = 0; j < StaffLeaves.length; j++) {
      debugger;

      var date1 = new Date(StaffLeaves[j].sDateOfLeave);
      var date2 = new Date(StaffLeaves[j].eDateOfLeave);
      var Difference_In_Time = date2.getDate() - date1.getDate();

      let currenteventlist = this.callenderdaysdount.filter(x => x.dateformat == StaffLeaves[j].sDateOfLeave);


      debugger
      if (currenteventlist.length > 0) {
        debugger

        var date1 = new Date(StaffLeaves[j].sDateOfLeave);
        var date2 = new Date(StaffLeaves[j].eDateOfLeave);
        var Difference_In_Time = date2.getDate() - date1.getDate();
        for (let v = 0; v <= Difference_In_Time; v++) {
          if (Difference_In_Time > 0) {
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffName'] = StaffLeaves[j].staffName;
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffID'] = StaffLeaves[j].staffID;
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['leavetype'] = StaffLeaves[j].leavetype;
            if (this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['Leavehtml'] == undefined) {
              this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['Leavehtml'] = "";
            }

            if (StaffLeaves[j].status == "Approved") {
              this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['Leavehtml'] = this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['Leavehtml'] + '<span class ="backcolorgreen" id=' + this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffID'] + '" >  Staff Name :' + this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffName'] + '</span>';
              debugger

            }

            else {
              this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['Leavehtml'] = this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['Leavehtml'] + '<span class ="backcolor" id=' + this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffID'] + '" >  Staff Name :' + this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffName'] + '</span>';
              debugger
            }

            debugger
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['leavetype'] = StaffLeaves[j].leavetype;
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['building'] = StaffLeaves[j].building;
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffID'] = StaffLeaves[j].staffID;
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['iscontinuous'] = true;
          }
          else {
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffName'] = StaffLeaves[j].staffName;
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffID'] = StaffLeaves[j].staffID;
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['leavetype'] = StaffLeaves[j].leavetype;
            if (this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['Leavehtml'] == undefined) {
              this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['Leavehtml'] = "";
            }

            if (StaffLeaves[j].status == "Approved") {
              this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['Leavehtml'] = this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['Leavehtml'] + '<span class ="backcolorgreen" id=' + this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffID'] + '" >  Staff Name :' + this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffName'] + '</span>';
              debugger

            }

            else {
              this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['Leavehtml'] = this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['Leavehtml'] + '<span class ="backcolor" id=' + this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffID'] + '" >  Staff Name :' + this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffName'] + '</span>';
              debugger
            }

            debugger
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['leavetype'] = StaffLeaves[j].leavetype;
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['building'] = StaffLeaves[j].building;
            this.callenderdaysdount[(Number(currenteventlist[0].date) + Difference_In_Time) - (v + 1)]['staffID'] = StaffLeaves[j].staffID;
          }
        }

        // this.callenderdaysdount[currenteventlist[0].date - 1]['staffName'] = StaffLeaves[j].staffName;
        // this.callenderdaysdount[currenteventlist[0].date - 1]['leavetype'] = StaffLeaves[j].leavetype;
        // this.callenderdaysdount[currenteventlist[0].date - 1]['building'] = StaffLeaves[j].building;

      }

    }
  }

  public previousmonth() {

    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.StaffLeaves)
  }
  public nextmonth() {

    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.StaffLeaves)
  }

  public GetStaffLeavesLanguage(languageid) {
    this.fmsservice.GetStaffLeavesLanguage(languageid).subscribe(
      res => {

        this.pageMenuTitle = res[0].pageMenuTitle;
        this.staffLeaves_PageTitle = res[0].staffLeaves_PageTitle;
        this.staffLeaves_BreadChrumb = res[0].staffLeaves_BreadChrumb;
        this.staffLeaves_AddNewButton = res[0].staffLeaves_AddNewButton;
        this.staffLeaves_Search = res[0].staffLeaves_Search;
        this.staffLeaves_Building = res[0].staffLeaves_Building;
        this.staffLeaves_LeaveType = res[0].staffLeaves_LeaveType;
        this.staffLeaves_StaffName = res[0].staffLeaves_StaffName;
        this.staffLeaves_StartDate = res[0].staffLeaves_StartDate;
        this.staffLeaves_EndDate = res[0].staffLeaves_EndDate;
        this.staffLeaves_DaysLeave = res[0].staffLeaves_DaysLeave;
        this.staffLeaves_Reason = res[0].staffLeaves_Reason;
        this.staffLeaves_Status = res[0].staffLeaves_Status;
        this.staffLeaves_RejectReason = res[0].staffLeaves_RejectReason;
        this.staffLeaves_Actions = res[0].staffLeaves_Actions;

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



  public ShowStaffDetails(evn) {
    debugger;
    var html = evn.srcElement.innerText.split(':');


    if (html.length <= 2) {

      debugger
      let StaffDetails = this.StaffLeaves.filter(x => x.staffName == html[1].trim());
      debugger;
      Swal.fire(({
        title: '<strong>Staff Leave <u>Details</u></strong>',
        type: 'info',
        html:
          '<p style="font-size: 14px;text-align: start;margin-left: 32px;">Staff Name: ' + StaffDetails[0].staffName +
          '       <br>' +
          'Leave Type: ' + StaffDetails[0].leavetype +
          '       <br>' +
          'No Of Days: ' + StaffDetails[0].noOfDays +
          '       <br>' +
          'Start Date: ' + this.datePipe.transform(StaffDetails[0].sDateOfLeave, 'MMM d, y') +
          '       <br>' +
          'End Date: ' + this.datePipe.transform(StaffDetails[0].eDateOfLeave, 'MMM d, y') +
          '       <br>' +
          'Status: ' + StaffDetails[0].status +
          '</p>'
        ,
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,

      }));
      //; alert(html[1]);
    }
    else {

    }
  }


  Count: any;
  public GetStaffLeaves(languageid) {
    debugger
    this.fmsservice.GetStaffLeaves(languageid).subscribe(
      res => {
        let temp: any = res
        this.StaffLeaves = temp.filter(x => x.buildingid == this.ProjectID && x.status == null);
        this.Count = this.StaffLeaves.length;
        this.buildcallender(this.StaffLeaves)
      }
    )
  }


  approveleave(staffID) {
    debugger

    var procs = {
      'ID': staffID,
      'LeaveReason': "NA",
      'Status1': "Approved"
    };

    this.fmsservice.UpdateStaffLeaves(procs).subscribe(data => {
      debugger

      if (data != undefined) {

        Swal.fire("Approved Successfully")

        debugger;
        this.GetStaffLeaves(1);
        // this.fmsservice.GetStaffLeaves(this.selectedlanguage1).subscribe(
        //   res => {

        //     let temp: any = res
        //     this.StaffLeaves = temp.filter(x => x.Buildingid == this.ProjectID);
        //   }
        // )
      }

    })

  }

  getrejectid(staffID) {

    this.staffID = staffID

  }


  filterleavetype(leavetype) {
    debugger
    this.leavetype = leavetype.target.value;
  }


  filterbuilding(buildingname) {
    debugger
    this.buildingname = buildingname.target.value;
  }


  Rejectleave() {
    debugger



    var procs = {
      'ID': this.staffID,
      'LeaveReason': this.Reason,
      'Status1': "Rejected"
    };

    this.fmsservice.UpdateStaffLeaves(procs).subscribe(data => {
      debugger

      if (data != undefined) {

        Swal.fire("Rejected Successfully")

        this.GetStaffLeaves(1);
      }

    })


  }


  // FilterBuilding(buildingID){
  //   debugger

  //   this.buildingID=buildingID.target.value

  //   if(this.buildingID==''){
  //     this.fmsservice.GetStaffLeaves(this.selectedlanguage1).subscribe(
  //       res => {
  //         
  //         this.StaffLeaves = res;
  //       }
  //     )

  //   }

  //   else{
  //     this.fmsservice.GetStaffLeaves(this.selectedlanguage1).subscribe(
  //       res => {
  //         
  //         this.StaffLeaves = res;

  //          var list=this.StaffLeaves.filter(x=>x.buildingid==this.buildingID)
  //          this.StaffLeaves = list;
  //          debugger
  //       }
  //     )

  //   }

  // }

  // Filterleavetype(leavetype){

  //   this.leavetype=leavetype.target.value;

  //   if(this.leavetype==''){
  //     this.fmsservice.GetStaffLeaves(this.selectedlanguage1).subscribe(
  //       res => {
  //         
  //         this.StaffLeaves = res;

  //          var list=this.StaffLeaves.filter(x=>x.buildingid==this.buildingID)
  //          this.StaffLeaves = list;
  //          debugger
  //       }
  //     )
  //   }


  //   else{

  //     this.fmsservice.GetStaffLeaves(this.selectedlanguage1).subscribe(
  //       res => {
  //         
  //         this.StaffLeaves = res;

  //          var list=this.StaffLeaves.filter(x=>x.buildingid==this.buildingID)
  //          this.StaffLeaves = list;
  //          debugger

  //          var list1=this.StaffLeaves.filter(x=>x.leavetype==this.leavetype)
  //          this.StaffLeaves = list1;

  //       }
  //     )

  //   }

  // }


public exporttoexcel(){
  
}


}
