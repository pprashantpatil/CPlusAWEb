import { Component, OnInit } from '@angular/core';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { Title } from '@angular/platform-browser';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tenentpartyhalldashboard',
  templateUrl: './tenentpartyhalldashboard.component.html',
  styleUrls: ['./tenentpartyhalldashboard.component.css']
})
export class TenentpartyhalldashboardComponent implements OnInit {
  options: FullCalendarOptions;
  events: EventObject[];
  BookCommunityHallList:any;
  list:any;
  public showorhidecontent: boolean;
  selectedLanguage: any;

  constructor(public fmsservice: FmsService,private datePipe: DatePipe) { }

  public bookCommunityHallEventDashBoardLanguage;
  public bookCommunityHallEventDashBoard_PageTitle;  
  public bookCommunityHallEventDashBoard_bookButton;
  public bookCommunityHallEventDashBoard_breadchrumb;
  public pageMenuTitle;
  checked: boolean;
  selectedlanguage:any
 

  requestlist: any;
  amountrefund: any;
  totalAmount: any;
  witheld1: any;
  cancelreason: any;
  withheldamount: any;
  Isempty:any;
  HallDetails: any;
  BuildingSearch: any;
  BuildingID: any;
  partyhallID: any;
  refundmode: any;
  DeleteID: any;

  Buildingobject: any;
  TransactionID:any;
  Date5:any;
  bankname:any;

 

  public todaydate = new Date().getDate();
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');
  ngOnInit() {
    this.showorhidecontent = false;
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.getBookCommunityHallEventDashBoardbyLanguage(selectedlanguage); 

    if (selectedlanguage == '1') {
      this.selectedLanguage = 'en';
    }
    if (selectedlanguage == '2') {
      this.selectedLanguage = 'ar';

    }
    if (selectedlanguage == '3') {
      this.selectedLanguage = 'id';

    }
    if (selectedlanguage == '4') {
      this.selectedLanguage = 'zh';

    }
    if (selectedlanguage == '5') {
      this.selectedLanguage = 'th';

    }
    if (selectedlanguage == '6') {
      this.selectedLanguage = 'es';

    }

  


    this.fmsservice.GetPatyHallByTenantID(localStorage.getItem('userid')).subscribe(data => {
      
debugger
      this.BookCommunityHallList = data;
     

     
    });

  


    
    
  }


  ngAfterViewInit() {
    let ggg = document.getElementsByTagName('button');

    for (let i = 0; i < ggg.length; i++) {

      if (ggg[i].innerText == "month") {
        ggg[i].style.background = "#36748c";
        ggg[i].style.color = "#fff";
      }
    }

  }

  changeStatus(evn) {

    if (evn.currentTarget.checked) {
      this.showorhidecontent = false;
    }
    else {
      this.showorhidecontent = true;
    }

  }

  

 

  getBookCommunityHallEventDashBoardbyLanguage(id) {
    debugger
    this.fmsservice.getBookCommunityHallEventDashBoardbyLanguageId(id).subscribe(
      res => {
        
        this.bookCommunityHallEventDashBoardLanguage=res;
        debugger
        this.bookCommunityHallEventDashBoard_PageTitle=res[0].bookCommunityHallEventDashBoard_PageTitle;
        this.bookCommunityHallEventDashBoard_bookButton=res[0].bookCommunityHallEventDashBoard_bookButton;
        this.bookCommunityHallEventDashBoard_breadchrumb=res[0].bookCommunityHallEventDashBoard_breadchrumb;
        this.pageMenuTitle=res[0].pageMenuTitle;
      }

    )

  }


  GetBooking(partyhallID) {
    debugger

    this.partyhallID = partyhallID

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

    else
    {
      var entity = {

        'ID': data,
        'ReReasonForCancellation': this.cancelreason,
        'AmountRefund': this.amountrefund,
        'RefundMode': this.refundmode,
        'WithheldAmount': this.withheldamount,
        'CancelTotalAmount': this.totalAmount,
        'TransactionID':this.TransactionID!=undefined?this.TransactionID:null,
        'TransationDate5':this.Date5!=undefined?this.Date5:new Date(),
        'BankName':this.bankname!=undefined?this.bankname:null
  
      };
  debugger
      this.fmsservice.DeleteBookPartyHall(entity).subscribe(data => {
        debugger
  
        if (data != undefined) {
  
          Swal.fire("Community Hall Booking Cancelled Successfully")
  
        
  
          this.fmsservice.GetPatyHallByTenantID(localStorage.getItem('userid')).subscribe(data => {
      
            debugger
                  this.BookCommunityHallList = data;
                 
            
                 
                });

          this.clear();
        }
      })
    }



   

  }




  clear(){

   
    this.cancelreason='',
    this.amountrefund='',
    this.refundmode='',
    this.withheldamount='',
    this.totalAmount='',
    this.TransactionID='',
    this.Date5='',
    this.bankname=''
  }



}
