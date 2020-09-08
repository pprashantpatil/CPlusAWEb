import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-vendor-invoice',
  templateUrl: './update-vendor-invoice.component.html',
  styleUrls: ['./update-vendor-invoice.component.css']
})
export class UpdateVendorInvoiceComponent implements OnInit {


  public pageMenuTitle;
  public invoice_Title;
  public invoice_BreadChrumb;
  public invoice_SearchVendor;
  public invoice_SearchPO;
  public invoice_Date;
  public invoice_InvoiceNumber;
  public invoice_VendorContact;
  public invoice_Attchment;
  public invoice_Button;
  public invoice_ItemName;
  public invoice_Warranty;
  public invoice_MfName;
  public invoice_PartNo;
  public invoice_Required;
  public invoice_ActualQuantity;
  public invoice_MRP;
  public invoice_Total;
  public invoice_Disc;
  public invoice_DiscTotal;
  public invoice_NetTotal;
  public invoice_Comments;
  public invoice_Delete;


  public vendorlist;
  public vendorPoidList;
  public filteredvendorPoidList;
  public poitems;

  public purchaseitemDate;
  public InvoiceNumber;
  public VendorContact;
  public Invoiceattachment;
  public vendorid;

  public tablerows: Array<any> = [];
  public newAttribute: any = {};

  public invoicedocumnt = [];


  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetUpdateInvoiceDashboardLanguage(selectedlanguage);
    this.getvendorlist(selectedlanguage);
    this.tablerows.push(this.newAttribute);
  }


  GetUpdateInvoiceDashboardLanguage(id) {
    this.fmsservice.GetUpdateInvoiceDashboardLanguage(id).subscribe(
      res => {

        this.pageMenuTitle = res[0].pageMenuTitle;
        this.invoice_Title = res[0].invoice_Title;
        this.invoice_BreadChrumb = res[0].invoice_BreadChrumb;
        this.invoice_SearchVendor = res[0].invoice_SearchVendor;
        this.invoice_SearchPO = res[0].invoice_SearchPO;
        this.invoice_Date = res[0].invoice_Date;
        this.invoice_InvoiceNumber = res[0].invoice_InvoiceNumber;
        this.invoice_VendorContact = res[0].invoice_VendorContact;
        this.invoice_Attchment = res[0].invoice_Attchment;
        this.invoice_Button = res[0].invoice_Button;
        this.invoice_ItemName = res[0].invoice_ItemName;
        this.invoice_Warranty = res[0].invoice_Warranty;
        this.invoice_MfName = res[0].invoice_MfName;
        this.invoice_PartNo = res[0].invoice_PartNo;
        this.invoice_Required = res[0].invoice_Required;
        this.invoice_ActualQuantity = res[0].invoice_ActualQuantity;
        this.invoice_MRP = res[0].invoice_MRP;
        this.invoice_Total = res[0].invoice_Total;
        this.invoice_Disc = res[0].invoice_Disc;
        this.invoice_DiscTotal = res[0].invoice_DiscTotal;
        this.invoice_NetTotal = res[0].invoice_NetTotal;
        this.invoice_Comments = res[0].invoice_Comments;
        this.invoice_Delete = res[0].invoice_Delete;

      }

    )
  }


  getvendorlist(languageid) {
    this.fmsservice.getvendorlist(languageid).subscribe(res => {
      debugger;
      this.vendorlist = res.filter(x => x.buildingID == localStorage.getItem('ProjectID'));
    })
  }


  VendorContactName;
  GetVendorPOIDs(even) {
    debugger;
    let selectedvendor = this.vendorlist.filter(x => x.id == even.target.value);
    this.VendorContactName = selectedvendor[0].contactName;


    this.vendorid = even.target.value;
    let typeid = selectedvendor[0].typeID;
    //this.VendorContactName=this.vendorlist[0].contactName

    this.fmsservice.getVendorPoids(this.vendorid, 1).subscribe(res => {
      debugger;
      this.vendorPoidList = res;
      this.filteredvendorPoidList = this.vendorPoidList;
    })
  }

  getItemsByOPID(POID) {
    debugger;
    this.fmsservice.getItemsByOPID(POID).subscribe(res => {
      this.poitems = res;
    })
  }

  addFieldValue() {
    this.tablerows.push(this.newAttribute);
    this.newAttribute = {};
  }
  deleteFieldValue(index) {
    this.tablerows.splice(index, 1);
  }


  // InsertPoInvoice() {
  //   debugger;
  //   let podetails = this.tablerows;

  //   for (let i = 0; i < podetails.length; i++) {
  //     let entity = {
  //       POItemID: +podetails[i].poitemtypeid,
  //       InvoiceNo: this.InvoiceNumber,
  //       ExpiryDate: podetails[i].expdate,
  //       Date: this.purchaseitemDate,
  //       RequiredQty: podetails[i].requriedqty,
  //       ActualQty: +podetails[i].actualqty,
  //       MRPperItem: podetails[i].mrp,
  //       Comments: podetails[i].comments,
  //       Total: podetails[i].Total,
  //       GST: 0,
  //       Discount: podetails[i].totalDiscount,
  //       GrandTotal: podetails[i].nettotal,
  //       ModifiedBy: localStorage.getItem('username'),
  //       VendorID: this.vendorid,
  //       VendorContact: this.VendorContact,
  //       Manufacturer: podetails[i].mfName,
  //       PartNo: podetails[i].PartNo,
  //       Attachment: this.invoice_Attchment[0],
  //       LanguageID: +localStorage.getItem('selectedLanguageID')
  //     }
  //     this.fmsservice.InsertItemPurchase(entity).subscribe(res => {
  //       let ttt = res;
  //       Swal.fire("Invoice details has Saved Successfully");

  //     })
  //   }



  // }

  poitemid;

  InsertPoInvoice() {
    debugger;
    let podetails = this.tablerows;

    for (let i = 0; i < podetails.length; i++) {
      let entity = {

        POItemID: +this.poitemid,
        InvoiceNo: this.InvoiceNumber,
        ExpiryDate: podetails[i].expdate,
        Date: this.purchaseitemDate,
        RequiredQty: podetails[i].requriedqty,
        ActualQty: +podetails[i].actualqty,
        MRPperItem: podetails[i].mrp,
        Comments: podetails[i].comments,
        Total: podetails[i].Total,
        GST: 0,
        Discount: podetails[i].totalDiscount,
        GrandTotal: podetails[i].nettotal,
        ModifiedBy: localStorage.getItem('username'),
        VendorID: this.vendorid,
        VendorContact: this.VendorContact,
        Manufacturer: podetails[i].mfName,
        PartNo: podetails[i].PartNo,
        Attachment: this.invoice_Attchment[0],
        LanguageID: +localStorage.getItem('selectedLanguageID')
      }
      this.fmsservice.InsertItemPurchase(entity).subscribe(res => {
        debugger;
        let ttt = res;
        Swal.fire("Invoice details has Saved Successfully");
        this.InsertLoginDetails();
        this.Clear();
      })
    }
  }

  InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'Vendor Invoice For ' + this.InvoiceNumber + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Add Vendor Invoice",
      "Action": 'Add New Vendor Invoice',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {
      }
    })

  }

  public Clear() {

    let invoicesearchddl = document.getElementById('ddl_invoiceSearchVendor');
    invoicesearchddl['selectedIndex'] = 0;

    let invoicesearchPOddl = document.getElementById('ddl_invoiceSearchPO');
    invoicesearchPOddl['selectedIndex'] = 0;

    this.InvoiceNumber = "";
    this.VendorContact = "";
    this.tablerows.length = 0;
    this.tablerows.length = 1;


  }


  public oninvoicedocUpload(files: File[]) {

    this.invoicedocumnt.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.invoicedocumnt.push(files[i]);
    }
  }

  public invoicedocUpload() {
    this.fmsservice.InventoryInvoiceUpload(this.invoicedocumnt).subscribe(res => {
      this.invoice_Attchment = res;

      this.InsertPoInvoice();
    })
  }

  public savePoinvoicedetails() {
    debugger;
    this.invoicedocUpload();
  }

  // public getpoitemspurchasedetails(even) {
  //   debugger;
  //   let poinvoiceitemid = even.target.value;

  //   let purchasedetails = this.poitems.filter(x => x.itemID == poinvoiceitemid);

  //   this.tablerows.filter(x => x.poitemtypeid == poinvoiceitemid)[0]["requriedqty"] = purchasedetails[0].needPurchase;


  // }

  public getpoitemspurchasedetails(even) {
    debugger;
    let poinvoiceitemid = even.target.value;
    let purchasedetails = this.poitems.filter(x => x.itemID == poinvoiceitemid);
    this.poitemid = purchasedetails[0].poItemID;
    this.tablerows.filter(x => x.poitemtypeid == poinvoiceitemid)[0]["requriedqty"] = purchasedetails[0].needPurchase;
  }



  getTotal(val: number, tabledata): void {

    tabledata.Total = val * tabledata.actualqty;
  }

  getpercentage(val: number, tabledata) {
    debugger;

    let gstvalue = (18 / 100) * tabledata.actualqty;

    tabledata.totalDiscount = ((val * tabledata.Total) / 100).toFixed(2);
    tabledata.nettotal = (tabledata.Total - tabledata.totalDiscount) + gstvalue;
  }

}
