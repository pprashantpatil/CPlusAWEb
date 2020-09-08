import { Component, OnInit } from '@angular/core';
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-holidays',
  templateUrl: './new-holidays.component.html',
  styleUrls: ['./new-holidays.component.css']
})
export class NewHolidaysComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe, private route: ActivatedRoute) { }
  // public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  HolidayName: any;
  Descriptions: any;
  Date: any;
  public HolidaysEntity = {
    HolidayName: "",
    Descriptions: "",
    Date: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    CompanyID: localStorage.getItem('userid')

  }


  HoildayID
  ngOnInit() {
    this.route.params.subscribe(params => {
      debugger;
      this.HoildayID = params['id'];
      if (params['id'] != undefined) {
        this.HoildayID = params['id'];
        this.GetHolidaysListsByID(this.HoildayID);

      }

    }
    );

  }



  public GetHolidaysListsByID(ID) {
    debugger;
    this.fmsservice.GetHolidaysListsByID(ID).subscribe(
      res => {

        this.HolidaysEntity.HolidayName = res[0].holidayName;
        this.HolidaysEntity.Date = this.datepipe.transform(res[0].date, 'yyyy-MM-dd');
        this.HolidaysEntity.Descriptions = res[0].descriptions;

      }
    )
  }


  public UpdateHolidaysLists() {
    debugger;
    this.fmsservice.UpdateHolidaysLists(this.HoildayID, this.HolidaysEntity).subscribe(res => {
      debugger;
      Swal.fire('Holiday Details Updated Successfully!');
      location.href = '#/HolidaysLists'
      this.InsertLoginDetails1();
    })
  }


  public InsertHolidaysLists() {
    debugger;
    this.fmsservice.InsertHolidaysLists(this.HolidaysEntity).subscribe(res => {
      debugger;
      Swal.fire('Holidays Details Saves Successfully');
      location.href = '#/HolidaysLists'
      this.InsertLoginDetails();

    })

  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'New Holiday ' + this.HolidaysEntity.HolidayName + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "New Holiday",
      "Action": 'Add New Holiday',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  InsertLoginDetails1() {
    debugger
    var obj = {
      "ApplicationName": 'New Holiday ' + this.HolidaysEntity.HolidayName + ' Updated',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "New Holiday",
      "Action": 'Update Holiday',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

}
