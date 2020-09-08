import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Alert } from 'selenium-webdriver';
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-addnewcommunityevent',
  templateUrl: './addnewcommunityevent.component.html',
  styleUrls: ['./addnewcommunityevent.component.css']
})
export class AddnewcommunityeventComponent implements OnInit {
  public addnewcommunityevent_CheckAndBook_Button;
  public addnewcommunityevent_Date;
  public addnewcommunityevent_PageTitle;
  public addnewcommunityevent_SelectCommunityHall;
  public addnewcommunityevent_selectBuilding;
  public addnewcommunityevent_breadchurmb;
  public pageTitle;
  selectedlanguage: any;
  Buildinglist: any;
  BuildingID: any;
  Halllist: any;
  HallID: any;
  Conform: any;
  bookdetails: any;
  BookPartyHallLanguageByID: any;


  HallUser: any;
  ClientName: any;
  PhoneNO: any;
  Building: any;
  Floor: any;
  Unit: any;
  Date3: any;
  StartTime: any;
  EndTime: any;
  NoOfPeople: any;
  TypeOfParty: any;
  AdditionalFacilities: any;
  NoOfDays: any;
  PerDayPrice: any;
  AdditionalPrice: any;
  TatolAmount: any;
  PaymentType: any;
  NameOfCard: any;
  CardNumber: any;
  ValidUpTo: any;
  CardType: any;
  floorID: any;
  ClientNamelist: any;
  ClientID: any;
  clientphone: any;
  unit: any;
  perdayprice: any;
  Addprice: any;
  Total: any;
  Totalamount: any;
  PaymentTypelist: any;
  paymenttypeID: any;
  Externalname: any;
  CardTypelist: any;
  startTime: any;
  endtime: any;
  addfacility: any;
  noofdays: any;
  nameofcard: any;
  cardnumber: any;
  validupto: any;
  noofpeople: any;
  typeOfparty: any;
  cardtypeID: any;
  clientName: any;
  HallUserTypelist: any;
  HallUserID: any;
  BuildingID1: any;
  FloorList: any;
  Button: any;
  paramID: any;
  bookhalllist: any;
  Date2: any;
  PaymentTypelist1 = [];

  // Edit
  hallid: any;
  hallbuildingid2: any;
  hallid2: any;
  usertypeid: any;
  uderbuildingID: any;
  floor2: any;
  clientname2: any;
  unit2: any;
  clientphone2: any;
  paymenttype2: any;
  cardTypeID2: any;
  client2: any;


  Transaction: any;
  Date5: any;
  bankname: any;
  Chequeno: any;
  Isempty: any;
  Time: any;




  Date1: any;
  Date4: any;
  ////====Date Formate====////
  Date: any;
  DateChanged: boolean = false;
  DateChanged2: boolean = false;
  DateChanged4: boolean = false;
  DateChanged6: boolean = false;

  minDate: Date;
  minDate1: Date
  minDate2: Date
  maxDate: Date;

  constructor(public fmsservice: FmsService, public activatedRoute: ActivatedRoute, public datePipe: DatePipe) {
    // this.DateChange();
    this.minDate = new Date();
    this.minDate1 = new Date();
    this.minDate2 = new Date();
    this.minDate.setDate(this.minDate.getDate() - 0);
    this.minDate1.setDate(this.minDate1.getDate() - 0);
    this.minDate2.setDate(this.minDate2.getDate() - 0);
  }

  ngOnInit() {
    var list = this.activatedRoute.params.subscribe(data => {
      debugger

      this.paramID = data['id']


      this.fmsservice.GetBookPartyHallBYID(this.paramID).subscribe(data => {
        debugger

        this.bookhalllist = data;



        this.hallbuildingid2 = this.bookhalllist.hallBuildingID
        //this.hallid2=this.bookhalllist.hallID
        this.HallUserID = this.bookhalllist.hallUser
        debugger
        this.uderbuildingID = this.bookhalllist.buildingID
        debugger
        this.usertypeid = this.bookhalllist.hallUser

        this.fmsservice.GetBuildingHallDetailsByID(this.bookhalllist.hallBuildingID).subscribe(data1 => {
          debugger
          this.Halllist = data1;
          debugger
          var list1 = this.Halllist.filter(X => X.id == this.bookhalllist.hallID)
          debugger
          this.hallid2 = list1[0].id
        });

        this.fmsservice.GetFloor(this.bookhalllist.buildingID).subscribe(data => {
          debugger

          this.FloorList = data;
          var list = this.FloorList.filter(x => x.id == this.bookhalllist.floorID)
          this.floor2 = list[0].id
        })

        this.fmsservice.GetTenantListByBuildingFloorID(this.bookhalllist.buildingID, this.bookhalllist.floorID, this.selectedlanguage).subscribe(data => {
          debugger

          this.ClientNamelist = data;

          var list = this.ClientNamelist.filter(x => x.tenantName == this.bookhalllist.clientName)
          debugger
          this.client2 = list[0].id
          this.clientname2 = list[0].tenantName

          debugger
        })

        //     this.fmsservice.BookHallUserType(this.selectedlanguage).subscribe(data=>{
        //       debugger
        //       this.HallUserTypelist=data;
        //       var list=this.HallUserTypelist.filter(x=>x.id==this.bookhalllist.hallUser)
        // this.usertypeid=list[0].id
        //     })

        this.unit2 = this.bookhalllist.unit
        this.clientphone2 = this.bookhalllist.phoneNo
        this.Externalname = this.bookhalllist.clientName

        this.Date2 = this.bookhalllist.date
        this.Date4 = this.bookhalllist.enddate
        debugger
        this.startTime = this.bookhalllist.startTime
        this.endtime = this.bookhalllist.endTime
        this.noofpeople = this.bookhalllist.noofPeople
        this.typeOfparty = this.bookhalllist.typeOfParty
        this.addfacility = this.bookhalllist.addFacility
        this.noofdays = this.bookhalllist.noOfDays
        this.perdayprice = this.bookhalllist.perDayAmount
        this.Addprice = this.bookhalllist.additionalAmount
        this.Totalamount = this.bookhalllist.totalAmount

        this.fmsservice.GetPaymentType(this.selectedlanguage).subscribe(data => {
          debugger
          this.PaymentTypelist = data;
          var list = this.PaymentTypelist.filter(x => x.id == this.bookhalllist.paymentMode)
          debugger
          this.paymenttype2 = list[0].id
          this.paymenttypeID = list[0].id
        })

        this.nameofcard = this.bookhalllist.nameOnCard
        this.cardnumber = this.bookhalllist.cardNumber
        this.validupto = this.bookhalllist.validity
        this.cardTypeID2 = this.bookhalllist.cardTypeID

        this.Transaction = this.bookhalllist.transactionID
        this.Date5 = this.bookhalllist.transationDate5
        this.bankname = this.bookhalllist.bankname
        this.Chequeno = this.bookhalllist.chequeno



      })
    })



    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.getaddnewcommunityeventbyLanguage(this.selectedlanguage);

    this.fmsservice.GetBuildinglist1(this.selectedlanguage).subscribe(data => {
      debugger
      this.Buildinglist = data;
    });

    this.fmsservice.GetCardType(this.selectedlanguage).subscribe(data => {
      debugger
      this.CardTypelist = data;
    })



    this.fmsservice.GetBookPartyHallLanguageByID(this.selectedlanguage).subscribe(data => {
      debugger;
      this.BookPartyHallLanguageByID = data;

      this.HallUser = this.BookPartyHallLanguageByID[0].hallUser
      this.ClientName = this.BookPartyHallLanguageByID[0].clientName
      this.PhoneNO = this.BookPartyHallLanguageByID[0].phoneNO
      this.Building = this.BookPartyHallLanguageByID[0].building
      this.Floor = this.BookPartyHallLanguageByID[0].floor
      this.Unit = this.BookPartyHallLanguageByID[0].unit
      this.Date3 = this.BookPartyHallLanguageByID[0].date
      this.StartTime = this.BookPartyHallLanguageByID[0].startTime
      this.EndTime = this.BookPartyHallLanguageByID[0].endTime
      this.NoOfPeople = this.BookPartyHallLanguageByID[0].noOfPeople
      this.TypeOfParty = this.BookPartyHallLanguageByID[0].typeOfParty
      this.AdditionalFacilities = this.BookPartyHallLanguageByID[0].additionalFacilities
      this.NoOfDays = this.BookPartyHallLanguageByID[0].noOfDays
      this.PerDayPrice = this.BookPartyHallLanguageByID[0].perDayPrice
      this.AdditionalPrice = this.BookPartyHallLanguageByID[0].additionalPrice
      this.TatolAmount = this.BookPartyHallLanguageByID[0].tatolAmount
      this.PaymentType = this.BookPartyHallLanguageByID[0].paymentType
      this.NameOfCard = this.BookPartyHallLanguageByID[0].nameOfCard
      this.CardNumber = this.BookPartyHallLanguageByID[0].cardNumber
      this.ValidUpTo = this.BookPartyHallLanguageByID[0].validUpTo
      this.CardType = this.BookPartyHallLanguageByID[0].cardType
      this.Button = this.BookPartyHallLanguageByID[0].button
      // this.Date4=this.BookPartyHallLanguageByID[0].enddate

    })


    this.fmsservice.BookHallUserType(this.selectedlanguage).subscribe(data => {
      debugger
      this.HallUserTypelist = data;
    })


    this.fmsservice.GetPaymentType(this.selectedlanguage).subscribe(data => {
      debugger
      this.PaymentTypelist = data;

      for (var i = 0; i < 5; i++) {
        this.PaymentTypelist1.push(this.PaymentTypelist[i])
        debugger
      }
      debugger
    })

  }


  GetHallUserID(HallUserID) {
    debugger
    this.HallUserID = HallUserID.target.value;
  }


  GetBuildingID1(BuildingID) {
    debugger
    this.BuildingID1 = BuildingID.target.value;

    this.fmsservice.GetFloor(this.BuildingID1).subscribe(data => {
      debugger

      this.FloorList = data;
    })
  }

  GetFloorID(floorID) {
    debugger
    this.floorID = floorID.target.value;

    this.fmsservice.GetTenantListByBuildingFloorID(this.BuildingID1, this.floorID, this.selectedlanguage).subscribe(data => {
      debugger

      this.ClientNamelist = data;
    })
  }

  UnitID
  GetclientDetal(ClientID) {
    debugger

    this.ClientID = ClientID.target.value;
    var list = this.ClientNamelist.filter(X => X.id == this.ClientID)

    this.clientphone = list[0].phoneNo
    this.unit = list[0].unitID
    this.UnitID=list[0].unit

    this.clientName = list[0].tenantName
    debugger
  }

  GetpaymenttypeID(paymenttypeID) {
    debugger

    this.paymenttypeID = paymenttypeID.target.value;
  }



  DateChange() {
    debugger
    this.DateChanged = true;
    this.Date.toLocaleDateString();
    var date = this.Date.getFullYear() + '-' + (this.Date.getMonth() + 1) + '-' + this.Date.getDate();
    this.Date = date;
    debugger
    console.log(this.Date)

  }

  DateChange2() {
    debugger
    this.DateChanged2 = true;
    this.maxDate = this.Date2;
    this.minDate2 = this.Date2;
    this.Date2.toLocaleDateString();
    var date2 = this.Date2.getFullYear() + '-' + (this.Date2.getMonth() + 1) + '-' + this.Date2.getDate();
    this.Date2 = date2;
    debugger
    console.log(this.Date2)

  }

  // DateChange4() {
  //   debugger
  //   this.DateChanged4 = true;
  //   this.Date4.toLocaleDateString();
  //   var date4 = this.Date4.getFullYear() + '-' + (this.Date4.getMonth() + 1) + '-' + this.Date4.getDate();
  //   this.Date4 = date4;
  //   debugger
  //   console.log(this.Date4)

  // }

  DateChange4() {
    debugger
    this.DateChanged4 = true;
    this.Date4.toLocaleDateString();
    var date4 = this.Date4.getFullYear() + '-' + (this.Date4.getMonth() + 1) + '-' + this.Date4.getDate();
    this.Date4 = date4;
    debugger
    console.log(this.Date4)
    var firstDate = new Date(this.Date2);
    var secondDate = new Date(this.Date4);
    debugger
    var noofdays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (1000 * 3600 * 24)));
    debugger
    this.noofdays = noofdays + 1;
    this.Totalamount = (this.Total) * (this.noofdays);

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


  getbuildingID(eve) {
    debugger
    this.BuildingID = eve.target.value;

    this.fmsservice.GetBuildingHallDetailsByID(this.BuildingID).subscribe(data => {
      debugger

      this.Halllist = data;
    })


  }

  GetHallID(eve) {
    debugger
    this.HallID = eve.target.value;

    var halllist = this.Halllist.filter(X => X.id == this.HallID)

    this.perdayprice = halllist[0].price
    this.Addprice = halllist[0].additionalCharge
    this.Total = parseInt(halllist[0].price) + parseInt(halllist[0].additionalCharge)
    debugger
  }


  GetcardtypeID(cardtypeID) {
    debugger
    this.cardtypeID = cardtypeID.target.value;
  }


  CheckCommunityHall() {
    debugger

    var mand = {

      "HallID": this.HallID
    }
    debugger
    let validate = this.fmsservice.isEmpty(mand);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;


      debugger
    }

    else {
      debugger
      this.fmsservice.GetAvailablePartyHall(this.HallID, this.Date, this.Time).subscribe(data => {
        debugger
        if (data != undefined) {
          debugger
          this.Conform = data[0].confirm;


          if (this.Conform == 1) {
            debugger
            this.bookdetails = false;
            Swal.fire("Here's a message!, The Hall is Unavailable for this Date")

          }

          else {
            debugger
            this.bookdetails = true;
          }
        }
      }

      );
    }




  }

  getaddnewcommunityeventbyLanguage(id) {
    this.fmsservice.getaddnewcommunityeventbyLanguageId(id).subscribe(
      res => {
        debugger;

        this.addnewcommunityevent_CheckAndBook_Button = res[0].addnewcommunityevent_CheckAndBook_Button;
        this.addnewcommunityevent_Date = res[0].addnewcommunityevent_Date;
        this.addnewcommunityevent_PageTitle = res[0].addnewcommunityevent_PageTitle;
        this.addnewcommunityevent_SelectCommunityHall = res[0].addnewcommunityevent_SelectCommunityHall;
        this.addnewcommunityevent_selectBuilding = res[0].addnewcommunityevent_selectBuilding;
        this.addnewcommunityevent_breadchurmb = res[0].addnewcommunityevent_breadchurmb;
        this.pageTitle = res[0].pageTitle;


      }

    )

  }


  InsertBookPartyHall() {
    debugger

    var filter1 = {

      'HallUser': this.HallUserID != undefined ? this.HallUserID : null,

      'ClientName': this.clientName != undefined ? this.clientName : this.Externalname,

      'PaymentMode': this.paymenttypeID != undefined ? this.paymenttypeID : null,
      'PhoneNum': this.clientphone.length == 10 ? this.clientphone : this.clientphone == "none",
      // 'NameOnCard': this.nameofcard!=undefined?this.nameofcard:null,
      // 'CardNumber': this.cardnumber!=undefined?this.cardnumber:null,
      // 'Validity': this.validupto!=undefined?this.validupto:null,
      // 'CardTypeID': this.cardtypeID!=undefined?this.cardtypeID:null,   
      // 'TransactionID':this.Transaction!=undefined?this.Transaction:null,
      // 'TransationDate5':this.Date5!=undefined?this.Date5:'2018-07-25',
      // 'BankName':this.bankname!=undefined?this.bankname:null,
      // 'Chequeno':this.Chequeno!=undefined?this.Chequeno:null

    }

    let validate = this.fmsservice.isEmpty(filter1);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;


      debugger
    }

    else {
      var Filter = {

        'HallBuildingID': this.BuildingID,
        'BuildingID': this.BuildingID1 != undefined ? this.BuildingID1 : null,
        'HallID': this.HallID,
        'FloorID': this.floorID,
        'Unit': this.UnitID,
        'HallUser': this.HallUserID,
        'TenantID': this.ClientID != undefined ? this.ClientID : null,
        'ClientName': this.clientName != undefined ? this.clientName : this.Externalname,
        'PhoneNum': this.clientphone,
        'Date': this.Date2,
        'StartTime': this.startTime,
        'EndTime': this.endtime,
        'NoofPeople': this.noofpeople,
        'TypeOfParty': this.typeOfparty,
        'AddFacility': this.addfacility != undefined ? this.addfacility : null,
        'PaymentMode': this.paymenttypeID,
        'NameOnCard': this.nameofcard != undefined ? this.nameofcard : null,
        'CardNumber': this.cardnumber != undefined ? this.cardnumber : null,
        'Validity': this.validupto != undefined ? this.validupto : null,
        'CardTypeID': this.cardtypeID != undefined ? this.cardtypeID : null,
        'NoOfDays': this.noofdays,
        'PerDayAmount': this.perdayprice,
        'AdditionalAmount': this.Addprice,
        'TotalAmount': this.Totalamount,
        'Enddate': this.Date4,
        'TransactionID': this.Transaction != undefined ? this.Transaction : null,
        'TransationDate5': this.Date5 != undefined ? this.Date5 : '2018-07-25',
        'BankName': this.bankname != undefined ? this.bankname : null,
        'Chequeno': this.Chequeno != undefined ? this.Chequeno : null
      }
      debugger

      this.fmsservice.InsertBookPartyHall(Filter).subscribe(data => {
        debugger
        if (data != undefined) {

          Swal.fire("Hall Booked Successfully");
          this.InsertLoginDetails();
          this.clear();

        }
      });
    }


  }


  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Board Room for Event' + this.typeOfparty + ' Added',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Board Room",
      "Action": 'Book New Board Room',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
        this.clear();
      }
    })

  }


  updateBookPartyHall() {
    debugger

    debugger
    var entity = {
      'ID': this.paramID,
      'HallBuildingID': this.hallbuildingid2,
      'BuildingID': this.uderbuildingID,
      'HallID': this.hallid2,
      'FloorID': this.floor2 != undefined ? this.floor2 : null,
      'Unit': this.unit2 != undefined ? this.unit2 : null,
      'HallUser': this.HallUserID,
      'TenantID': this.client2 != undefined ? this.client2 : null,
      'ClientName': this.clientname2 != undefined ? this.clientname2 : this.Externalname,
      'PhoneNum': this.clientphone2,
      'Date': this.Date2,
      'StartTime': this.startTime,
      'EndTime': this.endtime,
      'NoofPeople': this.noofpeople,
      'TypeOfParty': this.typeOfparty,
      'AddFacility': this.addfacility != undefined ? this.addfacility : null,
      'PaymentMode': this.paymenttype2 != undefined ? this.paymenttype2 : null,
      'NameOnCard': this.nameofcard != undefined ? this.nameofcard : null,
      'CardNumber': this.cardnumber != undefined ? this.cardnumber : null,
      'Validity': this.validupto != undefined ? this.validupto : null,
      'CardTypeID': this.cardTypeID2 != undefined ? this.cardTypeID2 : null,
      'NoOfDays': this.noofdays,
      'PerDayAmount': this.perdayprice,
      'AdditionalAmount': this.Addprice,
      'TotalAmount': this.Totalamount,
      'Enddate': this.Date4,
      'TransactionID': this.Transaction != undefined ? this.Transaction : null,
      'TransationDate5': this.Date5 != undefined ? this.Date5 : '2018-07-25',
      'BankName': this.bankname != undefined ? this.bankname : null,
      'Chequeno': this.Chequeno != undefined ? this.Chequeno : null
    };

    this.fmsservice.UpdateBookPartyHall(entity).subscribe(data => {
      debugger
      if (data != undefined) {
        this.InsertLoginDetails1();

        Swal.fire('Booked Hall Updated Successfully')
        this.clear();
      }
    })



  }

  InsertLoginDetails1() {
    debugger
    var obj = {
      "ApplicationName": 'Board Room for Event ' + this.typeOfparty + ' Updated',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Board Room",
      "Action": 'Update Board Room',
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
      this.BuildingID1 = '',
      this.HallID = '',
      this.floorID = '',
      this.unit = '',
      this.HallUserID = '',
      this.ClientID = '',
      this.clientName = '',
      this.Externalname = '',
      this.clientphone = '',
      this.Date2 = '',
      this.startTime = '',
      this.endtime = '',
      this.noofpeople = '',
      this.typeOfparty = '',
      this.addfacility = '',
      this.paymenttypeID = '',
      this.nameofcard = '',
      this.cardnumber = '',
      this.validupto = '',
      this.cardtypeID = '',
      this.noofdays = '',
      this.perdayprice = '',
      this.Addprice = '',
      this.Totalamount = '',
      this.Date4 = ''
    this.Date4 = '',
      this.Transaction = '',
      this.Date5 = '',
      this.bankname = '',
      this.Chequeno = ''
  }




}
