import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-edit-staff-work',
  templateUrl: './edit-staff-work.component.html',
  styleUrls: ['./edit-staff-work.component.css']
})
export class EditStaffWorkComponent implements OnInit {

  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  public details: any;
  public staffid: any;
  public dayslist: any;
  public dayid: any;
  public stafflist: any;
  public date: any;
  public edate: any
  public starttime: any;
  public endtime: any;
  public workdescription: any;
  public comments: any;
  public qwert = [];
  public tablecount: any;
  public staffname: any;
  public dayname: any;
  public id: any;
  public stafftypelist: any;
  public staff: any;
  public stafftypeid: any;
  ngOnInit() {
    this.route.params.subscribe(params => {
      debugger;
      this.id = params['id'];
      this.getdetails()
    }
    )
    this.fmsservice.GetStaffType(1).subscribe(data => {
      debugger
      this.stafftypelist = data;
      var i = this.stafftypelist.filter(x => x.id <= 4)
      this.staff = i;
    })
    // this.fmsservice.GetStafff().subscribe(data => {
    //   debugger
    //   this.stafflist = data;
    // })


    this.fmsservice.GetDaysMaster().subscribe(data => {
      debugger
      this.dayslist = data;
    })

  }
  public getdetails() {
    debugger
    this.fmsservice.GetStaffWorkScheduleByID(this.id).subscribe(data => {
      debugger
      this.details = data[0];
      this.staffid = this.details.staffID,
        this.dayid = this.details.dayID,
        this.date = this.datepipe.transform(this.details.date, 'yyyy-MM-dd'),
        this.edate = this.datepipe.transform(this.details.endDate, 'yyyy-MM-dd'),
        // this.starttime = this.details.startTime,
        // this.endtime = this.details.endTime,
        this.workdescription = this.details.workDescription,
        this.comments = this.details.comments,
        this.stafftypeid = this.details.staffTypeID
      //this.starttime =this.details.startTime//this.datepipe.transform(this.details.startTime, 'h:mm a'),
      //this.endtime=this.details.endTime//this.datepipe.transform(this.details.endTime, 'h:mm a')
      this.fmsservice.GetStaffByType(this.stafftypeid).subscribe(data => {
        debugger
        let temp: any = data;
        this.stafflist = temp.filter(x => x.companyID == localStorage.getItem('userid'));
      })

    })
    this.fmsservice.GetStaffType(1).subscribe(data => {
      debugger
      this.stafftypelist = data;
      var i = this.stafftypelist.filter(x => x.id <= 4)
      this.staff = i;
    })
    this.fmsservice.GetDaysMaster().subscribe(data => {
      debugger
      this.dayslist = data;
    })
  }
  public GetDayID(even) {
    this.dayid = even.target.value;
  }
  public GetStaffID(even) {
    debugger
    this.staffid = even.target.value;
  }
  public GetStaffTypeID(even) {
    debugger
    this.stafftypeid = even.target.value;
    this.getstafftypeid();
  }


  public getstafftypeid() {
    this.fmsservice.GetStaffByType(this.stafftypeid).subscribe(data => {
      debugger
      this.stafflist = data;
    })
  }

  public updatedetails() {
    var entity = {
      'ID': this.id,
      'StaffID': this.staffid,
      'Date': this.date,
      'EDate': this.edate,
      'DayID': this.dayid,
      'WorkDescription': this.workdescription,
      'Comments': this.comments,
      'StaffTypeID': this.stafftypeid
    }
    this.fmsservice.updateStaffWorkSchedule(entity).subscribe(data => {
      debugger

      if (data != undefined) {
        Swal.fire("Updated Successfully")
        // this.getdetails()
        location.href = "#/StaffWorkdash";
      }
    })
  }
}
