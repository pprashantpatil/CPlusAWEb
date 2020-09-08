import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ThemeService } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-new-staff-payments',
  templateUrl: './new-staff-payments.component.html',
  styleUrls: ['./new-staff-payments.component.css']
})
export class NewStaffPaymentsComponent implements OnInit {
  public Card_show: boolean = false;
  public cheque_show: boolean = false;
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }
  public StaffPaymentsEntity = {
    staffID: 0,
    PaymentFor: "",
    PaymentDate: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    Comments: "",
    PaymentMode: 0,
    ChequeNo: "",
    CardNumber: "",
    BankName: "",
    CardType: "",
    BillNo: "",
    TransactionID: "",
    Chech_Trans_Date: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    Amount: 0,
    CompanyID: localStorage.getItem('userid')

  }


  StaffPaymentsID;

  ngOnInit() {
    this.GetAllStaff();
    this.route.params.subscribe(params => {
      this.StaffPaymentsID = params['id'];
      this.GetStaff_PaymentByID(this.StaffPaymentsID);
    }
    );

  }


  Stafflist
  public GetAllStaff() {
    this.fmsservice.GetAllStaff().subscribe(data => {
      debugger
      this.Stafflist = data.filter(x => x.companyID == localStorage.getItem('userid'));
    })
  }

  Payments;
  public GetStaff_PaymentByID(ID) {
    this.fmsservice.GetStaff_PaymentByID(ID).subscribe(res => {
      debugger
      this.Payments = res;

      this.StaffPaymentsEntity.staffID = res[0].staffID;
      this.StaffPaymentsEntity.PaymentFor = res[0].paymentFor;
      this.StaffPaymentsEntity.PaymentDate = this.datepipe.transform(res[0].paymentDate, 'yyyy-MM-dd');
      this.StaffPaymentsEntity.Comments = res[0].comments;
      this.StaffPaymentsEntity.TransactionID = res[0].transactionID;
      this.StaffPaymentsEntity.Chech_Trans_Date = this.datepipe.transform(res[0].chech_Trans_Date, 'yyyy-MM-dd')
      this.StaffPaymentsEntity.BankName = res[0].bankName;
      this.StaffPaymentsEntity.CardNumber = res[0].cardNumber;
      this.StaffPaymentsEntity.PaymentMode = res[0].paymentMode;
      this.StaffPaymentsEntity.Comments = res[0].comments;
      this.StaffPaymentsEntity.Amount = res[0].amount;

      this.getpaymenttype(res[0].paymentMode);

    })
  }


  Payment;
  paymenttypeId;
  showChequecard: boolean = false;
  showonlinecard: boolean = false;
  chequeshow: boolean = false;
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
      this.chequeshow = false;
    }
    else if (this.paymenttypeId == "3") {
      this.Card_show = false;
      this.cheque_show = true;
      this.showonlinecard = false;
      this.showChequecard = true;
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


  public InsertStaffPayments() {
    debugger;
    this.fmsservice.InsertStaff_Payment(this.StaffPaymentsEntity).subscribe(res => {
      debugger;
      Swal.fire('Staff Payments Completed Successfully!');
      location.href = '#/StaffPayments'
      this.Clear();
    })
  }

  public Clear() {
    this.StaffPaymentsEntity.staffID = 0,
      this.StaffPaymentsEntity.PaymentFor = "",
      this.StaffPaymentsEntity.PaymentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.StaffPaymentsEntity.Comments = "",
      this.StaffPaymentsEntity.PaymentMode = 0,
      this.StaffPaymentsEntity.ChequeNo = "",
      this.StaffPaymentsEntity.CardNumber = "",
      this.StaffPaymentsEntity.BankName = "",
      this.StaffPaymentsEntity.CardType = "",
      this.StaffPaymentsEntity.BillNo = "",
      this.StaffPaymentsEntity.TransactionID = "",
      this.StaffPaymentsEntity.Chech_Trans_Date = this.datepipe.transform(new Date(), 'yyyy-MM-dd')
  }


  public UpdateStaff_Payment() {
    debugger;
    this.fmsservice.UpdateStaff_Payment(this.StaffPaymentsID, this.StaffPaymentsEntity).subscribe(res => {
      Swal.fire('Staff Payments Updated Successfully!');
      location.href = '#/StaffPayments'
    })
  }

}
