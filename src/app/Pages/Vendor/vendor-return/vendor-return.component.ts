import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vendor-return',
  templateUrl: './vendor-return.component.html',
  styleUrls: ['./vendor-return.component.css']
})
export class VendorReturnComponent implements OnInit {

  public pageMenuTitle;
  public vendor_PageTitle;
  public vendor_BreadChrumb;
  public vendor_SelectVendor;
  public vendor_Search;
  public vendor_SelectInvoiceNo;
  public vendor_Date;
  public vendor_ItemName;
  public vendor_Available;
  public vendor_Return;
  public vendor_MRP;
  public vendor_Total;
  public vendor_Remarks;
  public vendor_Select;
  public vendor_ReturnButton;
  public confirmButtonText;
  public vendorlist;
  vendorpolist;
  vendorid;
  filteredvendorPoidList;
  ItemDetails;
  returnquantity;
  Itemtotal = 0;
  remarks;
  returnItemsEntity = [];
  dateofreturn = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  vendorCreditDetailsNote;
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  Isreturned = false;
  invoiceno;
  constructor(public fmsservice: FmsService, public datepipe: DatePipe) { }
  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetNewVendorReturnLanguage(selectedlanguage);
    this.getvendorlist(selectedlanguage);
  }
  GetNewVendorReturnLanguage(id) {
    this.fmsservice.GetNewVendorReturnLanguage(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.vendor_PageTitle = res[0].vendor_PageTitle;
        this.vendor_BreadChrumb = res[0].vendor_BreadChrumb;
        this.vendor_SelectVendor = res[0].vendor_SelectVendor;
        this.vendor_Search = res[0].vendor_Search;
        this.vendor_SelectInvoiceNo = res[0].vendor_SelectInvoiceNo;
        this.vendor_Date = res[0].vendor_Date;
        this.vendor_ItemName = res[0].vendor_ItemName;
        this.vendor_Available = res[0].vendor_Available;
        this.vendor_Return = res[0].vendor_Return;
        this.vendor_MRP = res[0].vendor_MRP;
        this.vendor_Total = res[0].vendor_Total;
        this.vendor_Remarks = res[0].vendor_Remarks;
        this.vendor_Select = res[0].vendor_Select;
        this.vendor_ReturnButton = res[0].vendor_ReturnButton;
      }

    )
  }

  public getvendorlist(languageid) {
    this.fmsservice.getvendorlist(languageid).subscribe(res => {
      this.vendorlist = res;
    });
  }

  public getvendorinvoicelist(even) {
    debugger
    let selectedvendor = this.vendorlist.filter(x => x.id == even.target.value)
    this.vendorid = even.target.value;
    let typeid = selectedvendor[0].typeID;
    this.fmsservice.getVendorPoids(this.vendorid, 2).subscribe(res => {
      this.vendorpolist = res;
      debugger;
      this.vendorpolist = res;
      this.filteredvendorPoidList = this.vendorpolist;
    })
  }

  public GetItemsToReturn(evn) {

    this.invoiceno = evn.target.value;
    debugger;
    this.fmsservice.getPurchaseReturnItem_byInvoiceID(this.invoiceno, this.vendorid).subscribe(res => {
      debugger;
      let rrr = res;
      if (res.length > 0) {
        this.Isreturned = true;
      }
      else {
        this.Isreturned = false;
      }


    })
    this.fmsservice.GetItemsToReturn(this.invoiceno).subscribe(res => {
      debugger;
      this.ItemDetails = res;
      if (res[0].purchasedQty != null) {
        res[0].actualQty = res[0].purchasedQty - res[0].returnCount;
        this.Isreturned = true;
      }
      else {
        this.Isreturned = false;
      }
      let yyy = res[0].actualQty * res[0].mrPperItem;
      let ttt = ((res[0].actualQty * res[0].mrPperItem) - res[0].discount);


      if (((res[0].actualQty * res[0].mrPperItem) - res[0].discount) == res[0].paidAmount) {

        this.vendorCreditDetailsNote = "You have" + this.Itemtotal + " credits For this " + res[0].itemName + " Item.";
      }
      else {
        this.vendorCreditDetailsNote = "This invoice is for Rs." + ((res[0].actualQty * res[0].mrPperItem) - res[0].discount) + ", You have paid Rs." + res[0].paidAmount + ", you  have credits  Rs." + (res[0].paidAmount - ((res[0].actualQty * res[0].mrPperItem) - res[0].discount));
      }
    })

  }
  public gettotalcost(evn, item) {

    debugger;
    let iputqty = +evn.target.value;
    this.Itemtotal = item.mrPperItem * iputqty;
    var index = this.vendorCreditDetailsNote.indexOf("This invoice is for Rs");
    //var another = this.vendorCreditDetailsNote.indexOf("You will get");
    this.vendorCreditDetailsNote = "You will get " + this.Itemtotal + " credits For this " + item.itemName + " Item.";
    // if (index < 0) {
    //   debugger;
    //   this.vendorCreditDetailsNote = "You will get " + this.Itemtotal + " credits For this " + item.itemName + " Item.";
    // }
    // else {
    //   debugger;
    //     this.vendorCreditDetailsNote = "This invoice is for Rs." + ((res[0].actualQty * res[0].mrPperItem) - res[0].discount) + ", You have paid Rs." + res[0].paidAmount + ", you can have credits  Rs." + (res[0].paidAmount-((res[0].actualQty * res[0].mrPperItem) - res[0].discount) );
    // }


  }


  public selectedtoPay(evn, item) {
    debugger;

    if (evn.target.checked == true) {
      var entity = {
        ItemPurchaseID: item.itemPurchaseID,
        VendorID: item.vendorID,
        AvailableQty: item.actualQty,
        ReturnQty: this.returnquantity,
        TotalAmount: this.Itemtotal,
        Remarks: this.remarks,
      }


      this.returnItemsEntity.push(entity);

    }
    else {
      for (var i = this.returnItemsEntity.length - 1; i >= 0; i--) {
        if (this.returnItemsEntity[i].ItemPurchaseID == item.itemPurchaseID) {
          this.returnItemsEntity.splice(i, 1);
        }
      }

    }
  }

  saveReturn() {

    debugger;
    Swal.fire({
      title: 'Are you sure,You want to return?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Return !'
    }).then((result) => {
      if (result.value) {
        if (this.confirmButtonText = "Yes, delete it!") {
          // this.DeleteVendor(evn.id);

          for (var i = 0; i < this.returnItemsEntity.length; i++) {

            var entity = {
              ItemPurchaseID: this.returnItemsEntity[i].ItemPurchaseID,
              VendorID: this.returnItemsEntity[i].VendorID,
              AvailableQty: this.returnItemsEntity[i].AvailableQty,
              ReturnQty: this.returnItemsEntity[i].ReturnQty,
              TotalAmount: this.returnItemsEntity[i].TotalAmount,
              Remarks: this.returnItemsEntity[i].Remarks,
              Date: this.dateofreturn,
              ModifiedBy: localStorage.getItem('username'),
            }

            if (!this.Isreturned) {

              this.fmsservice.savePOinvoiceDetails(entity).subscribe(res => {

                let resulst = res;
              })

            }
            else {
              this.fmsservice.savePOinvoiceDetails(entity).subscribe(res => {

                let resulst = res;
                this.fmsservice.UpdatePurchaseReturnItem(this.invoiceno, entity.ReturnQty).subscribe(res => {

                  let resulst = res;

                  Swal.fire('vendor invoice details has been updated.');
                  // Swal.fire("You have Returnd, Your purchase Details has been Updated")
                })
              })


            }

          }
        }

      }
    })



  }


  //Swal.fire("inserted successfully");

}
