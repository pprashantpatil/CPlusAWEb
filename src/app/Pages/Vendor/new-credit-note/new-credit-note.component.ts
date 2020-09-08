import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-credit-note',
  templateUrl: './new-credit-note.component.html',
  styleUrls: ['./new-credit-note.component.css']
})
export class NewCreditNoteComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  public pageMenuTitle;
  public creditNotes_Title;
  public creditNotes_BreadChrumb;
  public creditNotes_Date;
  public creditNotes_Amount;
  public creditNotes_Vendor;
  public creditNotes_Invoice;
  public creditNotes_Remarks;
  public creditNotes_Save;

  public vendorlist: any;
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public Date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public Amount: any;
  public vendorID: any;
  public ModifiedBy: any;
  public Remarks: any;
  public InvoiceNo: any;
  vendorInvoiceList;
  ItemDetails;
  ispaid = false;
  public InvoiceImage;

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetNewCreditNotesLanguage(selectedlanguage);
    this.fmsservice.GetVendor().subscribe(data => {
      debugger
      this.vendorlist = data;
    })
  }

  GetNewCreditNotesLanguage(id) {
    this.fmsservice.GetNewCreditNotesLanguage(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.creditNotes_Title = res[0].creditNotes_Title;
        this.creditNotes_BreadChrumb = res[0].creditNotes_BreadChrumb;
        this.creditNotes_Date = res[0].creditNotes_Date;
        this.creditNotes_Amount = res[0].creditNotes_Amount;
        this.creditNotes_Vendor = res[0].creditNotes_Vendor;
        this.creditNotes_Invoice = res[0].creditNotes_Invoice;
        this.creditNotes_Remarks = res[0].creditNotes_Remarks;
        this.creditNotes_Save = res[0].creditNotes_Save;
      }
    )
  }

  public vendorName;
  public getvendorinvoicelist(even) {
    debugger
    this.vendorID = even.target.value;
    let selectedvendor = this.vendorlist.filter(x => x.id == even.target.value);
    this.vendorName = selectedvendor[0].name;
    let typeid = selectedvendor[0].typeID;
    this.fmsservice.getVendorPoids(this.vendorID, 2).subscribe(res => {
      this.vendorInvoiceList = res;
      //this.filteredvendorInviList = this.vendorInvoiceList;
    })
  }


  public GetItemsToReturn(evn) {
    let invoiceno = evn.target.value;
    debugger;
    this.fmsservice.GetItemsToReturn(invoiceno).subscribe(res => {
      debugger;
      this.ItemDetails = res;
      if (res[0].paid) {
        this.ispaid = true;
      }
      else {
        this.ispaid = false;
      }
      let yyy = res[0].actualQty * res[0].mrPperItem;
      let ttt = ((res[0].actualQty * res[0].mrPperItem) - res[0].discount);


      if (((res[0].actualQty * res[0].mrPperItem) - res[0].discount) == res[0].paidAmount) {

        //  this.vendorCreditDetailsNote = "You will get " + this.Itemtotal + " credits For this " + res[0].itemName + " Item.";
      }
      else {
        //this.vendorCreditDetailsNote = "This invoice is for " + ((res[0].actualQty * res[0].mrPperItem) - res[0].discount) + ", You have paid " + res[0].paidAmount + ", The remaining pending payment is " + (((res[0].actualQty * res[0].mrPperItem) - res[0].discount) - res[0].paidAmount);
      }


    })


    this.fmsservice.GetCreditsAttachments(invoiceno, this.vendorID).subscribe(res => {
      debugger;
      this.InvoiceImage = res[0].attachment;
    })


  }


  public InsertCreditNotes() {
    debugger
    var Entity =
    {
      'Date': this.Date,
      'TotalAmount': this.Amount,
      'VendorID': this.vendorID,
      'ModifiedBy': 'admin',
      'Remarks': this.Remarks,
      'InvoiceNo': this.InvoiceNo,
    }
    debugger
    this.fmsservice.InsertCreditNotes(Entity).subscribe(data => {
      if (data != undefined) {
        Swal.fire('Credit Notes added Successfully');
        this.Clear();
        this.savenotification();
        this.InsertLoginDetails();
      }
    })
  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Credit Notes For ' + this.InvoiceNo + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "New Credit Notes",
      "Action": 'Add Credit Notes',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }


  public Clear() {
    this.Date = this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      this.Amount = "",
      this.Remarks = "",
      this.InvoiceNo = "",
      this.InvoiceImage = null

  }

  date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public savenotification() {
    let notification = {
      Date: this.date,
      Event: 'Credit Notes',
      FromUser: localStorage.getItem('username'),
      ToUser: this.vendorName,
      Message: 'Credit Notes added to ' + this.vendorName,
      Photo: 'photo',
      Building: 'NA',
    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {
        debugger;
      }
    )

  }

  popupimage
  public InvoiceClickImage(evn) {
    debugger;
    this.popupimage = evn;
  }


}
