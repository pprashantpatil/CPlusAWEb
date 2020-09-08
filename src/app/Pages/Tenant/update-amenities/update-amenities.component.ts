import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-amenities',
  templateUrl: './update-amenities.component.html',
  styleUrls: ['./update-amenities.component.css']
})
export class UpdateAmenitiesComponent implements OnInit {
  public Buildinglist;
  selectedlanguage: any;
  public BuildingID;
  public Floorlist;
  public FloorID;
  public Unitlist;
  public Tenentlist;
  public RentID;
  public Card_show: boolean = false;
  public cheque_show: boolean = false;
  public RentEntity = {
    BuildingID: 0,
    Floor: 0,
    Unit: 0,
    TenantNamelist: 0,
    Date: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    PaymentFor: 0,
    Amount: 0,
    PaymentMode: 0,
    NameOnCard: "NULL",
    CardNumber: 0,
    Validupto: 0,
    CardType: 1,
    StatusID: 1,
    Comments: "",
    Chequeno: "NULL",
    BankName: "",
    TransactionID: "",
    LanguageID: 1,
  }
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetBuildinglist(this.selectedlanguage);
    this.GetTenantList(this.selectedlanguage);
    this.GetAmenitiesPaymentFor(this.selectedlanguage);
    this.GetCardType(this.selectedlanguage);
    this.route.params.subscribe(params => {
      this.RentID = params['id'];
      this.GetAmenitiesPaymentsByID(this.RentID);
    }
    );
  }



  GetAmenitiesPaymentsByID(id) {
    this.fmsservice.GetAmenitiesPaymentsByID(id).subscribe(
      res => {

        this.RentEntity.BuildingID = res[0].buildingID;
        this.RentEntity.Floor = res[0].floorID;
        this.RentEntity.Unit = res[0].unit;
        this.RentEntity.TenantNamelist = res[0].userID;
        this.RentEntity.Date = this.datepipe.transform(res[0].date, 'yyyy-MM-dd');
        this.RentEntity.PaymentFor = res[0].paymentFor;
        this.RentEntity.PaymentMode = res[0].paymentMode;
        this.RentEntity.Amount = res[0].amount;
        this.RentEntity.NameOnCard = res[0].nameOnCard;
        this.RentEntity.CardNumber = res[0].cardNumber;
        this.RentEntity.Validupto = res[0].validity;
        this.RentEntity.CardType = res[0].cardTypeID;
        this.RentEntity.StatusID = res[0].buildingID;
        this.RentEntity.Comments = res[0].comments;
        this.RentEntity.Chequeno = res[0].chequeno;
        this.RentEntity.TransactionID = res[0].transactionID;
        this.RentEntity.BankName = res[0].bankName;
        this.GetFloor(res[0].buildingID);
        this.GetUnit(res[0].unit);

        this.getpaymenttype(res[0].paymentMode);
      }
    )
  }


  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        this.Buildinglist = res;
      }
    )
  }

  public GetFloor(evn) {
    if (evn.target) {
      this.BuildingID = evn.target.value;
    } else {
      this.BuildingID = evn;
    }
    this.fmsservice.GetFloor(this.BuildingID).subscribe(
      res => {

        this.Floorlist = res;
      }
    )
  }

  public GetUnit(evn) {
    if (evn.target) {
      this.FloorID = evn.target.value;
    } else {
      this.FloorID = evn;
    }
    this.fmsservice.GetUnit_MasterbybID(this.BuildingID, this.RentEntity.Floor).subscribe(
      res => {

        this.Unitlist = res;
      }
    )
  }

  public GetTenantList(languageid) {
    this.fmsservice.GetTenantList(languageid).subscribe(
      res => {
        debugger;
        this.Tenentlist = res;
      }
    )
  }

  PaymentForlist
  public GetAmenitiesPaymentFor(languageid) {
    this.fmsservice.GetAmenitiesPaymentFor(languageid).subscribe(
      res => {
        this.PaymentForlist = res;
      }
    )
  }

  Cardlist
  public GetCardType(languageid) {
    this.fmsservice.GetCardType(languageid).subscribe(
      res => {
        this.Cardlist = res;
      }
    )
  }


  Unit
  public UnitlistID(evn) {
    debugger;

    this.Unit = evn.target.value;

    this.fmsservice.GetTenantList(this.selectedlanguage).subscribe(
      res => {
        debugger;
        this.Tenentlist = res;

        var list = this.Tenentlist.filter(x => x.unit == this.Unit)
        debugger
        this.Tenentlist = list
        debugger
      }
    )

  }


  Payment;
  paymenttypeId;

  showonlinecard: boolean = false;
  public getpaymenttype(evn) {

    if (evn.target) {
      this.paymenttypeId = evn.target.value;
    } else {
      this.paymenttypeId = evn;
    }

    //let paymenttypeId = evn.target.value;

    if (this.paymenttypeId == "1" || this.paymenttypeId == "none") {
      this.cheque_show = false;
      this.Card_show = false;
      this.showonlinecard = false;
    }
    else if (this.paymenttypeId == "3") {
      this.Card_show = false;
      this.cheque_show = true;
      this.showonlinecard = false
    }
    else if (this.paymenttypeId == "4" || this.paymenttypeId == "5") {
      this.cheque_show = false;
      this.Card_show = true;
      this.showonlinecard = false
    }
    else if (this.paymenttypeId == "2") {
      this.cheque_show = false;
      this.Card_show = false;
      this.showonlinecard = true;
    }
  }


  public InsertAmenitiesPayments() {
    debugger;
    this.RentEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
    let test = this.RentEntity;
    this.fmsservice.InsertAmenitiesPayments(this.RentEntity).subscribe(res => {
      debugger;
      Swal.fire('Payments Completed Successfully!');
      this.Clear();
    })
  }


  public Clear() {
    this.RentEntity.BuildingID = 0,
      this.RentEntity.Floor = 0,
      this.RentEntity.Unit = 0,
      this.RentEntity.TenantNamelist = 0,
      this.RentEntity.Date = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.RentEntity.PaymentFor = 0,
      this.RentEntity.Amount = 0,
      this.RentEntity.PaymentMode = 0,
      this.RentEntity.NameOnCard = "NULL",
      this.RentEntity.CardNumber = 0,
      this.RentEntity.Validupto = 0,
      this.RentEntity.CardType = 1,
      this.RentEntity.StatusID = 1,
      this.RentEntity.Comments = "",
      this.RentEntity.Chequeno = "NULL"

  }


  public UpdateAmenitiesPayments() {
    this.fmsservice.UpdateAmenitiesPayments(this.RentID, this.RentEntity).subscribe(res => {
      Swal.fire('Amenities Payments Updated Successfully!');
    })
  }



}
