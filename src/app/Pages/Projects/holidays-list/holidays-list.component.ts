import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service'
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-holidays-list',
  templateUrl: './holidays-list.component.html',
  styleUrls: ['./holidays-list.component.css']
})
export class HolidaysListComponent implements OnInit {

  constructor(public fmsservice: FmsService, public router: Router, public datepipe: DatePipe) { }
  public BuildingSearch;
  ngOnInit() {
    this.GetHolidaysLists();
    this.GetHolidaysListsCount();
  }

  HolidaysList;
  public GetHolidaysLists() {
    this.fmsservice.GetHolidaysLists().subscribe(
      res => {
        debugger;
        this.HolidaysList = res.filter(x => x.companyID == 1);

      }
    )
  }

  HolidaysListsCount;
  List;
  public GetHolidaysListsCount() {
    this.fmsservice.GetHolidaysListsCount().subscribe(
      res => {
        debugger;
        this.List = res.filter(x => x.companyID == 1);

        this.HolidaysListsCount = this.List[0].total;

      }
    )
  }

  public EditHolidays(evn) {
    debugger;
    let ID = evn.id;
    this.router.navigate(['/NewHolidaysLists', ID]);
  }


  public confirmButtonText;
  public DeleteHolidays(evn) {
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
          this.DeleteHolidaysLists(evn.id);


          this.InsertLoginDetails(evn.holidayName);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }

  InsertLoginDetails(holidayName) {
    debugger
    var obj = {
      "ApplicationName": 'New Holiday' + holidayName + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Holiday Lists",
      "Action": 'Add New Holiday',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  public DeleteHolidaysLists(ID) {
    debugger;
    //this.EventPlannerEntity.LanguageID=Number(localStorage.getItem('selectedLanguageID'))
    // let test = this.AssetsEntity;
    this.fmsservice.DeleteHolidaysLists(ID).subscribe(res => {
      debugger;
      this.GetHolidaysLists();
    })
  }
}
