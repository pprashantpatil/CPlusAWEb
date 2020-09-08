import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'
import { NgDateRangePickerOptions } from 'ng-daterangepicker';
import {ActivatedRoute,Router} from '@angular/router';
// import { DatepickerOptions } from 'ng2-datepicker';
// import * as frLocale from 'date-fns/locale/fr';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  public paymentsTitle;
  public building_BreadChrumb;
  public pageMenuTitle;
  public payments_AddNewButton;
  public payments_BuildingName;
  public payments_PaymentFor;
  public payments_PaymentDate;
  public payments_PaymentTime;
  public payments_BillNo;
  public payments_BillNoTotalAmount;
  public payments_PaymentType;
  public payments_Comments;
  public payments_Invoice;
  public payments_Actions;
  public PaymentsList: any;
  public Buildinglist: any;
  public PaymentForlist: any;
  selectedlanguage: any;
  BuildingID: any;
  paidID: any;
  PaymentsList1: any;
  value: any;
  options: NgDateRangePickerOptions;
  startdate: any;
  enddate: any;
  buildingname: any;
  searchtext: any;
  datelist = [];
  paymenttype: any;
  public payment: any;
  constructor(public fmsservice: FmsService, private datePipe: DatePipe,public activatedRoute:ActivatedRoute,public router:Router) {



  }


  ngOnInit() {

    this.options = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'yyyy/MM/dd',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };


    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetPaymentsLanguage(this.selectedlanguage);
    // this.GetBuildingPaymentsList(this.selectedlanguage);
    this.GetBuildinglist(this.selectedlanguage);
    this.GetPaymentsFor(this.selectedlanguage);


    this.startdate= this.datePipe.transform(new Date(new Date().getFullYear(), 0, 1),'yyyy/MM/dd');
    this.enddate = this.datePipe.transform(new Date(new Date().getFullYear(), 11, 31),'yyyy/MM/dd');
    this.fmsservice.GetBuildingPaymentsList(this.startdate, this.enddate, this.selectedlanguage).subscribe(data => {
      debugger
      this.PaymentsList1 = data;
    });


  }


  selectedDate(value) {
    this.datelist.pop()
    debugger
    this.datelist = value.split('-')

    this.startdate = this.datelist[0]
    this.enddate = this.datelist[1]
    debugger

    this.fmsservice.GetBuildingPaymentsList(this.startdate, this.enddate, this.selectedlanguage).subscribe(data => {
      debugger
      this.PaymentsList1 = data;
    })
  }





  public GetPaymentsLanguage(languageid) {
    this.fmsservice.GetPaymentsLanguage(languageid).subscribe(
      res => {

        this.paymentsTitle = res[0].paymentsTitle;
        this.building_BreadChrumb = res[0].building_BreadChrumb;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.payments_AddNewButton = res[0].payments_AddNewButton;
        this.payments_BuildingName = res[0].payments_BuildingName;
        this.payments_PaymentFor = res[0].payments_PaymentFor;
        this.payments_PaymentDate = res[0].payments_PaymentDate;
        this.payments_PaymentTime = res[0].payments_PaymentTime;
        this.payments_BillNo = res[0].payments_BillNo;
        this.payments_BillNoTotalAmount = res[0].payments_BillNoTotalAmount;
        this.payments_PaymentType = res[0].payments_PaymentType;
        this.payments_Comments = res[0].payments_Comments;
        this.payments_Invoice = res[0].payments_Invoice;
        this.payments_Actions = res[0].payments_Actions;

      }
    )
  }


  invoiceimg;
  public getimage(evn){
    debugger;
    this.invoiceimg=evn;

  }


  
  // public GetBuildingPaymentsList(languageid){

  //   let startdate=new Date();
  //   startdate.setDate(startdate.getMonth()-1);
  //   let enddate=new Date();
  //   debugger;
  //   let sdate =  this.datePipe.transform(startdate, 'yyyy-MM-dd');
  //   let edate =  this.datePipe.transform(enddate, 'yyyy-MM-dd');
  //   debugger
  //   this.fmsservice.GetBuildingPaymentsList("2019-07-01","2019-07-30",languageid).subscribe(

  //     res => {
  //       debugger;
  //       this.PaymentsList=res;
  //       this.PaymentsList1=this.PaymentsList
  //     }
  //   )
  // }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {
        this.Buildinglist = res;
        this.Buildinglist.sort(function(a, b) {
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

  public GetPaymentsFor(languageid) {
    this.fmsservice.GetPaymentsFor(languageid).subscribe(
      res => {
        debugger
        this.PaymentForlist = res;

        this.PaymentForlist.sort(function(a, b) {
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
        
      }
    )
  }

  DeleteBuildingPayments(ID) {
    debugger

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Payment data!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsservice.DeleteBuildingPayments(ID).subscribe(data => {
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your Payment data has been deleted.',
              'success'
            )
            this.fmsservice.GetBuildingPaymentsList(this.startdate, this.enddate, this.selectedlanguage).subscribe(data => {
              debugger
              this.PaymentsList1 = data;
            })

          }
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your Payment data is safe :)',
          'error'
        )
      }
    })



  }

  filterbuilding(buildingname){
    debugger
this.buildingname=buildingname.target.value;
  }

  filterpayment(payment){
    debugger
this.payment=payment.target.value;
  }
  


  //   Filterbuilding(BuildingID){
  //     debugger
  // this.BuildingID=BuildingID.target.value;

  // if(this.BuildingID=='none'){
  //  this.fmsservice.GetBuildingPaymentsList(this.startdate,this.enddate,this.selectedlanguage).subscribe(data=>{
  //     debugger
  //     this.PaymentsList1=data;
  //   })
  //   debugger
  // }

  // else{

  //   this.fmsservice.GetBuildingPaymentsList(this.startdate,this.enddate,this.selectedlanguage).subscribe(data=>{
  //     debugger
  //     this.PaymentsList1=data;

  //     var list=this.PaymentsList1.filter(X=>X.buildingID==this.BuildingID)

  //     this.PaymentsList1=list
  //   })


  // }
  //   }


  // Filterpaid(paidID){
  //   debugger

  //   this.paidID=paidID.target.value;

  //   if(this.paidID=='none'){
  //     this.fmsservice.GetBuildingPaymentsList(this.startdate,this.enddate,this.selectedlanguage).subscribe(data=>{
  //       debugger
  //       this.PaymentsList1=data;

  //       var list=this.PaymentsList1.filter(X=>X.buildingID==this.BuildingID)

  //       this.PaymentsList1=list
  //     })
  //     debugger
  //   }

  //   else {



  //     this.fmsservice.GetBuildingPaymentsList(this.startdate,this.enddate,this.selectedlanguage).subscribe(data=>{
  //       debugger
  //       this.PaymentsList1=data;

  //       var list=this.PaymentsList1.filter(X=>X.buildingID==this.BuildingID)

  //       this.PaymentsList1=list

  //       var list=this.PaymentsList1.filter(X=>X.paymentForID==this.paidID)

  //         this.PaymentsList1=list


  //     })

  //   }





  // }

}
