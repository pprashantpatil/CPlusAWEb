import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-rent',
  templateUrl: './update-rent.component.html',
  styleUrls: ['./update-rent.component.css']
})
export class UpdateRentComponent implements OnInit {

  public pageMenuTitle;
  public tenentUpdateRent_PageTitle;
  public tenentUpdateRent_breadchrumb;
  public tenentUpdateRent_button_Dashboard;
  public tenentUpdateRent_button_save;
  public tenentUpdateRent_Building;
  public tenentUpdateRent_Floor;
  public tenentUpdateRent_Unit;
  public tenentUpdateRent_TenantName;
  public tenentUpdateRent_RentType;
  public tenentUpdateRent_Dateofpayments;
  public tenentUpdateRent_RentAmount;
  public tenentUpdateRent_PaymentType;
  public tenentUpdateRent_Comments;
  public Buildinglist;
  public BuildingID;
  public FloorID;
  public Floorlist;
  public Unitlist;
  public Tenentlist;
  public Rentlist;
  public Paymentlist;
  public Cardlist;
  public RentID;
  public showchequephoto


  public Card_show: boolean = false;
  public cheque_show: boolean = false;
  selectedlanguage: any;

  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public CurrentMonth = this.datepipe.transform(new Date(), 'MM');
  debugger;
  public RentEntity = {
    BuildingID: 0,
    Floor: 0,
    Unit: 0,
    TenantNamelist: 0,
    Rentpaymentdate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    RentTypeID: 0,
    RentAmount: 0,
    Rentformonth: "",
    PaymentType: 0,
    NameOnCard: "NULL",
    CardNumber: 0,
    Validupto: 0,
    CardType: 1,
    StatusID: 1,
    Comments: "",
    Chequeno: "NULL",
    LanguageID: 1,
    Penalty: 0,
    ChequePhoto:""
  }



  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetTenentUpdateRentLanguageByLanguageID(this.selectedlanguage);
    this.GetBuildinglist(this.selectedlanguage);
    this.GetTenantList(this.selectedlanguage);
    this.GetRentType(this.selectedlanguage);
    this.GetPaymentType(this.selectedlanguage);
    this.GetCardType(this.selectedlanguage);
    this.Penalty = false;
    this.route.params.subscribe(params => {

      this.RentID = params['id'];
      this.GetRentByID(this.RentID);
    }
    );



  }

  GetTenentUpdateRentLanguageByLanguageID(id) {
    this.fmsservice.GetTenentUpdateRentLanguageByLanguageID(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.tenentUpdateRent_PageTitle = res[0].tenentUpdateRent_PageTitle;
        this.tenentUpdateRent_breadchrumb = res[0].tenentUpdateRent_breadchrumb;
        this.tenentUpdateRent_button_Dashboard = res[0].tenentUpdateRent_button_Dashboard;
        this.tenentUpdateRent_button_save = res[0].tenentUpdateRent_button_save;
        this.tenentUpdateRent_Building = res[0].tenentUpdateRent_Building;
        this.tenentUpdateRent_Floor = res[0].tenentUpdateRent_Floor;
        this.tenentUpdateRent_Unit = res[0].tenentUpdateRent_Unit;
        this.tenentUpdateRent_TenantName = res[0].tenentUpdateRent_TenantName;
        this.tenentUpdateRent_RentType = res[0].tenentUpdateRent_RentType;
        this.tenentUpdateRent_Dateofpayments = res[0].tenentUpdateRent_Dateofpayments;
        this.tenentUpdateRent_RentAmount = res[0].tenentUpdateRent_RentAmount;
        this.tenentUpdateRent_PaymentType = res[0].tenentUpdateRent_PaymentType;
        this.tenentUpdateRent_Comments = res[0].tenentUpdateRent_Comments;
      }
    )
  }

  GetRentByID(id) {
    this.fmsservice.GetRentByID(id).subscribe(
      res => {

        this.RentEntity.BuildingID = res[0].buildingID;
        this.RentEntity.Floor = res[0].floorID;
        this.RentEntity.Unit = res[0].unit;
        this.RentEntity.TenantNamelist = res[0].userID;
        this.RentEntity.Rentpaymentdate = this.datepipe.transform(res[0].date, 'yyyy-MM-dd');
        this.RentEntity.RentTypeID = res[0].rentTypeID;
        this.RentEntity.RentAmount = res[0].rentAmount;
        debugger
        this.RentEntity.Rentformonth = res[0].rentForMonthOf;
        this.RentEntity.PaymentType = res[0].paymentID;
        this.RentEntity.Penalty = res[0].penalty;
        this.RentEntity.NameOnCard = res[0].nameOnCard;
        this.RentEntity.CardNumber = res[0].cardNumber;
        this.RentEntity.Validupto = res[0].validity;
        this.RentEntity.CardType = res[0].cardTypeID;
        this.RentEntity.StatusID = res[0].buildingID;
        this.RentEntity.Comments = res[0].comments;
        this.RentEntity.Chequeno = res[0].chequeno;
        this.RentEntity.ChequePhoto = res[0].chequePhoto;
        this.showchequephoto = res[0].showChequePhoto;
        this.GetFloor(res[0].buildingID);
        this.GetUnit(res[0].unit);
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

  public GetRentType(languageid) {
    this.fmsservice.GetRentType(languageid).subscribe(
      res => {

        this.Rentlist = res;
      }
    )
  }

  public GetPaymentType(languageid) {
    this.fmsservice.GetPaymentType(languageid).subscribe(
      res => {
        this.Paymentlist = res;
      }
    )
  }

  public GetCardType(languageid) {
    this.fmsservice.GetCardType(languageid).subscribe(
      res => {
        this.Cardlist = res;
      }
    )
  }

  GetRentPaymentMontn(evn) {
    debugger;
    var lll = new Date();
    let PrevMonth = lll.setMonth(lll.getMonth() - 1);
    let pMonth = this.datepipe.transform(PrevMonth, 'MM')
    //this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    if (Number(evn.target.value) < Number(pMonth)) {
      this.Penalty = true;
    }
    else {
      this.Penalty = false;
    }

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

  Isempty = false;
  Penalty: boolean;
  public InsertRent() {
    debugger;
    let mandatoryfields = {
      BuildingID: this.RentEntity.BuildingID,
      Floor: this.RentEntity.Floor,
      Unit: this.RentEntity.Unit,
      TenantNamelist: this.RentEntity.TenantNamelist,
      RentTypeID: this.RentEntity.RentTypeID,
      RentAmount: this.RentEntity.RentAmount,
      PaymentType: this.RentEntity.PaymentType,
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {
      this.RentEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'))
      let test = this.RentEntity;
      this.fmsservice.InsertRent(this.RentEntity).subscribe(res => {
        debugger;
        Swal.fire('Rent Details Successfully Saved!');
        this.Clear();
      })
    }
  }

  public Clear() {
    this.RentEntity.BuildingID = 0,
      this.RentEntity.Floor = 0,
      this.RentEntity.Unit = 0,
      this.RentEntity.TenantNamelist = 0,
      this.RentEntity.Rentpaymentdate = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.RentEntity.RentTypeID = 0,
      this.RentEntity.RentAmount = 0,
      this.RentEntity.Rentformonth = "",
      this.RentEntity.PaymentType = 0,
      this.RentEntity.NameOnCard = "NULL",
      this.RentEntity.CardNumber = 0,
      this.RentEntity.Validupto = 0,
      this.RentEntity.CardType = 1,
      this.RentEntity.StatusID = 1,
      this.RentEntity.Comments = "",
      this.RentEntity.Chequeno = "NULL"

  }

  Payment;
  showonlinecard: boolean = false;
  public getpaymenttype(evn) {


    let paymenttypeId = evn.target.value;

    if (paymenttypeId == "1" || paymenttypeId == "none") {
      this.cheque_show = false;
      this.Card_show = false;
      this.showonlinecard = false;
    }
    else if (paymenttypeId == "3") {
      this.Card_show = false;
      this.cheque_show = true;
      this.showonlinecard = false
    }
    else if (paymenttypeId == "4" || paymenttypeId == "5") {
      this.cheque_show = false;
      this.Card_show = true;
      this.showonlinecard = false
    }
    else if (paymenttypeId == "2") {
      this.cheque_show = false;
      this.Card_show = false;
      this.showonlinecard = true;
    }



    this.fmsservice.GetPaidRentList(this.BuildingID, this.FloorID, this.Unit, this.RentEntity.Rentpaymentdate, this.RentEntity.RentTypeID, this.RentEntity.TenantNamelist).subscribe(
      res => {
        debugger;
        this.Payment = res;

        if (res.length > 0) {
          Swal.fire("Payment has already made for this particular Tenant");
        }
      }
    )


  }

  public UpdateRent() {
    let mandatoryfields = {
      BuildingID: this.RentEntity.BuildingID,
      Floor: this.RentEntity.Floor,
      Unit: this.RentEntity.Unit,
      TenantNamelist: this.RentEntity.TenantNamelist,
      RentTypeID: this.RentEntity.RentTypeID,
      RentAmount: this.RentEntity.RentAmount,
      PaymentType: this.RentEntity.PaymentType,
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {
      this.fmsservice.UpdateRent(this.RentID, this.RentEntity).subscribe(res => {
        Swal.fire('Rent Details Updated Successfully!');
      })
    }
  }


  public Photos = [];
  public UploadedPhotos = [];
  onFilesAddedPhoto(files: File[]) {
    this.Photos = [];
    debugger;
    this.Photos.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.Photos.push(files[i]);

    }
    this.UploadPhotos(this.Photos)
  }
  public UploadPhotos(ID) {
    debugger
    this.fmsservice.CashChequePhotoUpload(this.Photos).subscribe(res => {
      debugger;
      for (let i = 0; i < res.length; i++) {
        this.RentEntity.ChequePhoto=res[i];
        let PhotosEntity = {
          ChequePhoto: res[i],
          pdfurl: null
        }
        this.UploadedPhotos.push(PhotosEntity);
      }

      // Swal.fire('Updated Successfully!')
    })
  }
  // public InsertTechnologyDocument(ID) {
  //   debugger;
  //   for (let i = 0; i < this.UploadedPhotos.length; i++) {
  //     let entity = {
  //       TechnologyID: ID,
  //       Attachment: this.UploadedPhotos[i].docpathURL1,
  //       ModifiedBy: 'Admin',
  //       pdf: 'Null'
  //     }
  //     this.fmsservice.InsertTechnologyDocument(entity).subscribe(res => {
  //       debugger;
  //       //Swal.fire('Successfully Saved!');
  //     })
  //   }
  // }
}



