import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { deepEqual } from 'assert';
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bookcommunityhall',
  templateUrl: './bookcommunityhall.component.html',
  styleUrls: ['./bookcommunityhall.component.css']
})
export class BookcommunityhallComponent implements OnInit {
  public pageMenuTitle;
  public bookCommunityHall_BreadChrumb;
  public bookCommunityHall_Building;
  public bookCommunityHall_Community;
  public bookCommunityHall_Location;
  public bookCommunityHall_HallCapacity;
  public bookCommunityHall_ContactName;
  public bookCommunityHall_PhoneNumber;
  public bookCommunityHall_AmountorDay;
  public bookCommunityHall_AdditionalCharges;
  public bookCommunityHall_Notes;
  public bookCommunityHall_Save;
  selectedlanguage: any;
  Buildinglist: any;
  BuildingID: any;
  ContactPhoneNo: any;
  HallName: any;
  Location: any;
  Capacity: any;
  Price: any;
  AdditionalCharge: any;
  Notes: any;
  Concactlist: any;
  ContactName: any;
  ContactID: any;
  paramid: any;
  halllist: any;
  concactname: any;
  Builaname: any;
  concactid: any;
  buildID: any;
  contactname: any;
  update: any;
  update1: any;
  buildinglist: any
  Isempty: any;

  constructor(public fmsservice: FmsService, public Route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {

    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetBookcommunityhallLanguage(this.selectedlanguage);

    this.fmsservice.GetBuildinglist1(this.selectedlanguage).subscribe(data => {
      debugger
      this.Buildinglist = data;
    })

    var list = this.Route.params.subscribe(data => {
      debugger

      this.paramid = data['id'];
      debugger

      this.fmsservice.GetBuildingHallDetailsBYHallID(this.paramid).subscribe(data => {
        debugger
        this.halllist = data;
        debugger
        this.buildID = this.halllist.buildingID
        debugger
        this.fmsservice.GetBuildinglist1(this.selectedlanguage).subscribe(data => {
          debugger
          this.Concactlist = data;
          var list = this.Concactlist.filter(x => x.id == this.buildID)
          debugger
          this.Concactlist = list
          this.contactname = this.Concactlist[0].contactPersonName
        })

        this.ContactPhoneNo = this.halllist.contactPhoneNo
        this.HallName = this.halllist.hallName
        this.Location = this.halllist.location
        this.Capacity = this.halllist.capacity
        this.Price = this.halllist.price
        this.AdditionalCharge = this.halllist.additionalCharge
        this.Notes = this.halllist.notes
        debugger
        this.concactname = this.halllist.contactName
        this.update = this.halllist.update
        //  this.concactid=this.halllist[0].contactID

      })
    })




  }


  getbuildingID2(event) {

    debugger
    this.ContactPhoneNo = '';
    this.BuildingID = event;


    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(data1 => {
      debugger

      this.buildinglist = data1;

      var data = this.buildinglist.filter(x => x.id == this.BuildingID)

      this.Concactlist = data;
      debugger
      this.ContactID = data[0].id
      debugger
    })
  }

  GetCotactNumber1(contactname) {

    this.contactname = contactname
    debugger

    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(data1 => {
      debugger

      this.buildinglist = data1;
      var list = this.buildinglist.filter(X => X.contactPersonName == this.contactname)

      this.ContactPhoneNo = list[0].contactPersonPhoneNo

    })




  }


  getbuildingID(eve) {
    debugger
    this.ContactPhoneNo = '';
    this.BuildingID = eve.target.value;


    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(data1 => {
      debugger

      this.buildinglist = data1;

      var data = this.buildinglist.filter(x => x.id == this.BuildingID)

      this.Concactlist = data;
      debugger
      this.ContactID = data[0].id
      debugger
    })

  }

  GetCotactNumber(eve) {
    debugger
    var list = this.Concactlist.filter(x => x.id == eve.target.value)
    this.ContactPhoneNo = list[0].phoneNo
    this.concactname = list[0].contactPersonName
  }

  public GetBookcommunityhallLanguage(languageid) {
    this.fmsservice.GetBookcommunityhallLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.bookCommunityHall_BreadChrumb = res[0].bookCommunityHall_BreadChrumb;
        this.bookCommunityHall_Building = res[0].bookCommunityHall_Building;
        this.bookCommunityHall_Community = res[0].bookCommunityHall_Community;
        this.bookCommunityHall_Location = res[0].bookCommunityHall_Location;
        this.bookCommunityHall_HallCapacity = res[0].bookCommunityHall_HallCapacity;
        this.bookCommunityHall_ContactName = res[0].bookCommunityHall_ContactName;
        this.bookCommunityHall_PhoneNumber = res[0].bookCommunityHall_PhoneNumber;
        this.bookCommunityHall_AmountorDay = res[0].bookCommunityHall_AmountorDay;
        this.bookCommunityHall_AdditionalCharges = res[0].bookCommunityHall_AdditionalCharges;
        this.bookCommunityHall_Notes = res[0].bookCommunityHall_Notes;
        this.bookCommunityHall_Save = res[0].bookCommunityHall_Save;
        this.update1 = res[0].update;
        debugger

      }
    )
  }


  InsertBuildingHallDetails() {
    debugger

    var mandetory = {
      'BuildingID': this.BuildingID,
      'HallName': this.HallName,
      'Capacity': this.Capacity,
      // 'Price': this.Price,
      'ContactName': this.concactname,
      'ContactPhoneNo': this.ContactPhoneNo,
      'Description': 'Description',
      'Location': this.Location,
      // 'AdditionalCharge': this.AdditionalCharge,    
      'LanguageID': this.selectedlanguage
    }

    let validate = this.fmsservice.isEmpty(mandetory);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;


      debugger
    }

    else {

      var Filter = {
        'BuildingID': this.BuildingID,
        'HallName': this.HallName,
        'Capacity': this.Capacity,
        'Price': this.Price,
        'ContactName': this.concactname,
        'ContactPhoneNo': this.ContactPhoneNo,
        'Description': 'Description',
        'Location': this.Location,
        'AdditionalCharge': this.AdditionalCharge,
        'Notes': this.Notes,
        'LanguageID': this.selectedlanguage
      }
      debugger
      this.fmsservice.InsertBuildingHallDetails(Filter).subscribe(data => {
        debugger
        if (data != undefined) {

          Swal.fire("Community Hall Saved Successfully")
          this.InsertLoginDetails()

          this.clear();
        }
      });

    }




  }


  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Board Room ' + this.HallName + ' Added',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Book Board Room",
      "Action": 'Add New Board Room',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })

  }

  clear() {
    this.BuildingID = '',
      this.HallName = '',
      this.Capacity = '',
      this.Price = '',
      this.ContactID = '',
      this.ContactPhoneNo = '',
      this.Location = '',
      this.AdditionalCharge = '',
      this.Notes = '',
      this.selectedlanguage = ''

  }

  UpdateBuildingHallDetails() {
    debugger

    var Entity = {
      'ID': this.paramid,
      'BuildingID': this.BuildingID != undefined ? this.BuildingID : this.buildID,
      'HallName': this.HallName,
      'Capacity': this.Capacity,
      'Price': this.Price,
      'ContactName': this.contactname,
      'ContactPhoneNo': this.ContactPhoneNo,
      'Description': null,
      'Location': this.Location,
      'AdditionalCharge': this.AdditionalCharge,
      'Notes': this.Notes
    }


    this.fmsservice.UpdateBuildingHallDetails(Entity).subscribe(data => {
      debugger
      if (data != undefined) {

        Swal.fire('Updated Successfully');
        this.InsertLoginDetails1();
        this.clear();
      }
    })

  }

  InsertLoginDetails1() {
    debugger
    var obj = {
      "ApplicationName": 'Board Room ' + this.HallName + ' Updated',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Book Board Room",
      "Action": 'Update Board Room',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })

  }
}


