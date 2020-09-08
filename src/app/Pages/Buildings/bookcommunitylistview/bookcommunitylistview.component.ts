import { Component, OnInit, Input } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { TabHeadingDirective } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-bookcommunitylistview',
  templateUrl: './bookcommunitylistview.component.html',
  styleUrls: ['./bookcommunitylistview.component.css']
})
export class BookcommunitylistviewComponent implements OnInit {
  @Input('bookCommunityHallEventDashBoardLanguage') bookCommunityTableLanguage;

  public bookCommunityHallEventDashBoardLanguage;
  public bookCommunityHallEventDashBoard_Actions;
  public bookCommunityHallEventDashBoard_BookedBy;
  public bookCommunityHallEventDashBoard_Building;
  public bookCommunityHallEventDashBoard_Date;
  public bookCommunityHallEventDashBoard_Event;
  public bookCommunityHallEventDashBoard_Hall;
  public bookCommunityHallEventDashBoard_Usertype;
  public BookCommunityHallList: any;
  public Buildinglist;
  BookCommunityHallEventDashBoard_StartDate: any;
  BookCommunityHallEventDashBoard_TotalAmount: any;
  selectedlanguage: any;
  HallDetails: any;
  BuildingSearch: any;
  BuildingID: any;
  partyhallID: any;
  refundmode: any;

  Buildingobject: any;

  DeleteID: any;
  requestlist: any;
  amountrefund: any;
  totalAmount: any;
  witheld1: any;
  cancelreason: any;
  withheldamount: any;
  Isempty: any;


  TransactionID: any;
  Date5: any;
  bankname: any;
  DateChanged6: boolean = false;

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }

  ngOnInit() {
    this.bookCommunityHallEventDashBoard_Actions = this.bookCommunityTableLanguage[0].bookCommunityHallEventDashBoard_Actions;
    this.bookCommunityHallEventDashBoard_BookedBy = this.bookCommunityTableLanguage[0].bookCommunityHallEventDashBoard_BookedBy;
    this.bookCommunityHallEventDashBoard_Building = this.bookCommunityTableLanguage[0].bookCommunityHallEventDashBoard_Building;
    this.bookCommunityHallEventDashBoard_Date = this.bookCommunityTableLanguage[0].bookCommunityHallEventDashBoard_Date;
    this.bookCommunityHallEventDashBoard_Event = this.bookCommunityTableLanguage[0].bookCommunityHallEventDashBoard_Event;
    this.bookCommunityHallEventDashBoard_Hall = this.bookCommunityTableLanguage[0].bookCommunityHallEventDashBoard_Hall;
    this.bookCommunityHallEventDashBoard_Usertype = this.bookCommunityTableLanguage[0].bookCommunityHallEventDashBoard_Usertype;
    this.BookCommunityHallEventDashBoard_StartDate = this.bookCommunityTableLanguage[0].bookCommunityHallEventDashBoard_StartDate;
    this.BookCommunityHallEventDashBoard_TotalAmount = this.bookCommunityTableLanguage[0].bookCommunityHallEventDashBoard_TotalAmount;
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    // this.GetBookPartyHallAll(this.selectedlanguage);
    this.GetBuildinglist(this.selectedlanguage);

    this.fmsservice.GetBookPartyHallAll(this.selectedlanguage).subscribe(data => {
      debugger

      this.BookCommunityHallList = data;
    })

  }


  // public GetBookPartyHallAll(languageid) {
  //   this.fmsservice.GetBookPartyHallAll(languageid).subscribe(
  //     res => {
  //       debugger;
  //       this.BookCommunityHallList = res;
  //     }
  //   )
  // }

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


  FilterBuilding(BuildingID) {

    debugger

    this.BuildingID = BuildingID.target.value;



  }


  DateChange6() {
    debugger
    this.DateChanged6 = true;
    this.Date5.toLocaleDateString();
    var date5 = this.Date5.getFullYear() + '-' + (this.Date5.getMonth() + 1) + '-' + this.Date5.getDate();
    this.Date5 = date5;
    debugger
    console.log(this.Date5)

  }

  BuildingHallName
  GetBooking(partyhallID, HallName) {
    debugger

    this.partyhallID = partyhallID
    this.BuildingHallName = HallName

    this.fmsservice.GetBookPartyHallBYID(this.partyhallID).subscribe(data => {
      debugger

      this.Buildingobject = data,
        this.DeleteID = this.Buildingobject.id
      this.requestlist = this.Buildingobject.typeOfParty
      this.amountrefund = this.Buildingobject.totalAmount
      this.totalAmount = this.amountrefund
      debugger

    })

  }

  getmode(mode) {
    debugger
    this.refundmode = mode.target.value;
  }

  witheld(data1) {

    debugger
    this.amountrefund = parseInt(this.Buildingobject.totalAmount) - parseInt(data1)
    this.totalAmount = this.amountrefund



  }


  DeleteBookPartyHall(data) {
    debugger
    var entity1 = {


      'ReReasonForCancellation': this.cancelreason,
      'AmountRefund': this.amountrefund,
      'RefundMode': this.refundmode,
      'WithheldAmount': this.withheldamount,
      'CancelTotalAmount': this.totalAmount,



    };

    let validate = this.fmsservice.isEmpty(entity1);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;


      debugger
    }

    else {
      var entity = {

        'ID': data,
        'ReReasonForCancellation': this.cancelreason,
        'AmountRefund': this.amountrefund,
        'RefundMode': this.refundmode,
        'WithheldAmount': this.withheldamount,
        'CancelTotalAmount': this.totalAmount,
        'TransactionID': this.TransactionID != undefined ? this.TransactionID : null,
        'TransationDate5': this.Date5 != undefined ? this.Date5 : new Date(),
        'BankName': this.bankname != undefined ? this.bankname : null

      };
      debugger
      this.fmsservice.DeleteBookPartyHall(entity).subscribe(data => {
        debugger

        if (data != undefined) {

          Swal.fire("Community Hall Booking Cancelled Successfully")
          this.InsertLoginDetails();


          this.fmsservice.GetBookPartyHallAll(this.selectedlanguage).subscribe(data => {
            debugger

            this.BookCommunityHallList = data;
          })

          this.clear();
        }
      })
    }





  }
  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Board Room ' + this.BuildingHallName + ' Deleted',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Board Room",
      "Action": 'Board Room Deleted',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })

  }



  clear() {


    this.cancelreason = '',
      this.amountrefund = '',
      this.refundmode = '',
      this.withheldamount = '',
      this.totalAmount = '',
      this.TransactionID = '',
      this.Date5 = '',
      this.bankname = ''
  }


}
