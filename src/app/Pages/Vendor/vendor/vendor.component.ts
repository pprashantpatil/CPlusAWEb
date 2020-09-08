import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  public pageMenuTitle;
  public vendor_PageTitle;
  public vendor_BreadChrumb;
  public vendor_Button;
  public vendor_Search;
  public vendor_VendorName;
  public vendor_VendorType;
  public vendor_ContactName;
  public vendor_PhoneNumber;
  public vendor_Email;
  public vendor_VendorService;
  public vendor_VendorSupplies;
  public vendor_Actions;
  public BuildingList;
  public VendorList: any;
  public FilteredVendorList;
  public Search;
  public confirmButtonText;
  public vendortypelist;
  constructor(public fmsservice: FmsService, public router: Router) { }

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetVendorLanguage(selectedlanguage);
    this.GetVendorList(selectedlanguage);
    this.getvendortypeList(selectedlanguage);
    //this.GetBuildinglist(selectedlanguage);
  }


  VendorName;
  emailID;
  phoneNo;
  accountNumber;
  accountType
  bank
  bankAddress
  branchName
  contactName
  creditLimit
  paymentTerms
  service
  supply
  swiftCode
  vendorType
  vendorName
  vendorAddress;

  public ViewVendorDetails(vendordetails) {
    debugger;
    this.VendorName = vendordetails.vendorName;
    this.emailID = vendordetails.emailID;
    this.phoneNo = vendordetails.phoneNo;
    this.accountNumber = vendordetails.accountNumber;
    this.accountType = vendordetails.accountType;
    this.bank = vendordetails.bank;
    this.bankAddress = vendordetails.bankAddress;
    this.branchName = vendordetails.branchName;
    this.contactName = vendordetails.contactName;
    this.creditLimit = vendordetails.creditLimit;
    this.paymentTerms = vendordetails.paymentTerms;
    this.service = vendordetails.service;
    this.supply = vendordetails.supply;
    this.swiftCode = vendordetails.swiftCode;
    this.vendorName = vendordetails.vendorName;
    this.vendorType = vendordetails.vendorType;
    this.vendorAddress = vendordetails.vendorAddress
  }


  GetVendorLanguage(id) {
    this.fmsservice.GetVendorLanguage(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.vendor_PageTitle = res[0].vendor_PageTitle;
        this.vendor_BreadChrumb = res[0].vendor_BreadChrumb;
        this.vendor_Button = res[0].vendor_Button;
        this.vendor_Search = res[0].vendor_Search;
        this.vendor_VendorName = res[0].vendor_VendorName;
        this.vendor_VendorType = res[0].vendor_VendorType;
        this.vendor_ContactName = res[0].vendor_ContactName;
        this.vendor_PhoneNumber = res[0].vendor_PhoneNumber;
        this.vendor_Email = res[0].vendor_Email;
        this.vendor_VendorService = res[0].vendor_VendorService;
        this.vendor_VendorSupplies = res[0].vendor_VendorSupplies;
        this.vendor_Actions = res[0].vendor_Actions;
      }

    )
  }

  public DeletedVendor(evn) {
    debugger;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        if (this.confirmButtonText = "Yes, delete it!") {
          this.DeleteVendor(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }


  public DeleteVendor(ID) {
    debugger;
    this.fmsservice.DeleteVendor(ID).subscribe(res => {
      debugger;
      this.GetVendorList(1);
    })

  }

  public EditVendor(evn) {
    debugger;
    let VendorID = evn.id;
    this.router.navigate(['/UpdateVendor', VendorID]);
  }

  public GetVendorList(languageid) {
    this.fmsservice.GetVendorList(languageid).subscribe(
      res => {
        debugger;
        this.VendorList = res;
        this.FilteredVendorList = this.VendorList.filter(x => x.buildingID == localStorage.getItem('ProjectID'));
      }
    )
  }


  public FilteredByVendor(evn) {

    debugger;
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredVendorList = this.VendorList.filter(x => x.buildingID == localStorage.getItem('ProjectID'));
    }
    else {
      let selected = evn.target.value;
      this.FilteredVendorList = this.VendorList.filter(x => x.vendortyprid == selected && x.buildingID == localStorage.getItem('ProjectID'));

    }
  }

  public getvendortypeList(languageid) {
    debugger;
    this.fmsservice.GetVendorType(languageid).subscribe(res => {
      debugger;
      this.vendortypelist = res;
    })
  }

}
