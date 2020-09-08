import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-po',
  templateUrl: './new-po.component.html',
  styleUrls: ['./new-po.component.css']
})
export class NewPoComponent implements OnInit {

  constructor(public fmsservice: FmsService, public datepipe: DatePipe, private activatedroute: ActivatedRoute, private router: Router) { }
  public pageMenuTitle;
  public newPO_PageTitle;
  public newPO_BreadChrumb;
  public newPO_Type;
  public newPO_Vendor;
  public newPO_Date;
  public newPO_Search;
  public newPO_AddNew;
  public newPO_SlNo;
  public newPO_Item;
  public newPO_Qty;
  public newPO_Comments;
  public newPO_Remove;
  public newPO_Save;
  public vendorName;
  public userID: any;
  public selectedlanguage: any;
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public POTypeList: any;
  public vendorList: any;
  filteredvendorlist;
  public itemList: any;
  ListsForVendorName;
  public potypeID: any;
  public vendorID: any;
  public date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public tablerows: Array<any> = [];
  public newAttribute: any = {};
  public typeid: any;
  public StaffTypelist: any;
  public managerlist: any;
  public finanacerlist: any;
  public cfolist: any;
  public FinanacerID: any;
  public ManagerID: any;
  public CfoID: any;
  public Vendortype: any;
  public vendortypeid: any;
  public servicedesc: any;
  public serviceamount: any;
  public taxamount: any;
  public garandtotal: any;
  public ID: any;
  public vendorlist: any;
  public vendorid: any;
  public buildinglist: any;
  public buildingid: any;
  public vendortypelist: any;
  public itemtypelist: any;

  ngOnInit() {
    this.serviceamount = 0;
    this.garandtotal = 0;
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.buildingid=localStorage.getItem('ProjectID');
    this.GetNewPOLanguage(selectedlanguage);
    this.GetPOType1(selectedlanguage);
    this.GetVendorList(selectedlanguage);
    this.GetItemTypes(selectedlanguage);
    this.GetCFO();
    this.GetFinancer();
    this.GetManager();
    this.GetVendorType();
    this.GetBuldinglist();
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      this.typeid = this.ID
    }
    )

  }

  public GetNewPOLanguage(languageid) {
    this.fmsservice.GetNewPOLanguage(languageid).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.newPO_PageTitle = res[0].newPO_PageTitle;
        this.newPO_BreadChrumb = res[0].newPO_BreadChrumb;
        this.newPO_Type = res[0].newPO_Type;
        this.newPO_Vendor = res[0].newPO_Vendor;
        this.newPO_Date = res[0].newPO_Date;
        this.newPO_Search = res[0].newPO_Search;
        this.newPO_AddNew = res[0].newPO_AddNew;
        this.newPO_SlNo = res[0].newPO_SlNo;
        this.newPO_Item = res[0].newPO_Item;
        this.newPO_Qty = res[0].newPO_Qty;
        this.newPO_Comments = res[0].newPO_Comments;
        this.newPO_Remove = res[0].newPO_Remove;
        this.newPO_Save = res[0].newPO_Save;

      }
    )
  }

  public GetPOType1(languageid) {
    this.fmsservice.GetPOType1(languageid).subscribe(data => {
      this.POTypeList = data;
    })
  }

  onpotyselect(even) {
    let potype = even.target.value;
    this.GetItemsByEID(this.selectedlanguage, potype);

    this.potypeID = even.target.value;
    if (potype == "none") {
      this.filteredvendorlist = this.vendorList;
    }
    else {
      for (let i = 0; i < this.tablerows.length; i++) {
        debugger;
        let item = this.itemList.filter(x => x.id == this.tablerows[i].itemtype);
        if (item.length > 0) {
          document.getElementById("PoTable")['rows'][i + 1].cells[1].innerHTML = item[0].short;
        }
      }
      // this.filteredvendorlist = this.vendorList.filter(x => x.vendortyprid == potype);
      this.filteredvendorlist = this.vendorList;

      this.fmsservice.GetItemTypes(1).subscribe(data => {
        debugger;
        this.itemList = data.filter(x => x.id == potype);
      })
    }

  }


  onvendorTypeselect(evn, Vlist) {
    debugger;
    this.vendorID = evn.target.value;
    this.ListsForVendorName = Vlist.filter(x => x.id == this.vendorID);
    this.vendorName = this.ListsForVendorName[0].vendorName;
    // this.vendorName = vendorName;
  }

  public GetVendorList(languageid) {
    this.fmsservice.GetVendorList(languageid).subscribe(data => {
      this.vendorList = data;
      debugger;
      this.filteredvendorlist = this.vendorList;
    })
  }
  public GetItemTypes(languageid) {
    debugger;
    this.fmsservice.GetItemTypes(languageid).subscribe(data => {
      debugger;
      this.itemList = data;
    })
  }





  addFieldValue() {
    for (let i = 0; i < this.tablerows.length; i++) {
      debugger;
      let item = this.itemtypelist.filter(x => x.id == this.tablerows[i].itemtype);
      if (item.length > 0) {
        document.getElementById("PoTable")['rows'][i + 1].cells[1].innerHTML = item[0].short;
      }
    }
    this.tablerows.push(this.newAttribute)
    this.newAttribute = {};




  }
  deleteFieldValue(index) {
    this.tablerows.splice(index, 1);
  }


  InsertNewPo() {
    debugger;
    let ttt = this.tablerows;
    let entity = {
      UserID: localStorage.getItem('userid'),
      TypeID: this.potypeID != undefined ? this.potypeID : null,
      VendorID: this.vendorID,
      Date: this.date,
      ModifiedBy: localStorage.getItem('username'),
      Languageid: +localStorage.getItem('selectedLanguageID'),
      ManagerID: this.ManagerID,
      CFOID: this.CfoID,
      FinanacerID: this.FinanacerID,
      InventoryType: this.typeid,
      Building: this.buildingid

    }

    this.fmsservice.InsertPO(entity).subscribe(res => {
      debugger;
      let poid = res;
      this.savepoitems(res);

    })
  }


  public savepoitems(poid) {
    this.tablerows
    for (let i = 0; i < this.tablerows.length; i++) {
      let entity = {
        POID: poid,
        ItemID: this.tablerows[i].itemtype,
        Qty: this.tablerows[i].quantity,
        Comments: this.tablerows[i].Comments,
        ModifiedBy: localStorage.getItem('username'),
      }
      this.fmsservice.savepoitems(entity).subscribe(res => {
        let ttt = res;
        Swal.fire("PO Items Saved Successfully");
        // window.location.reload();
        this.savenotification();
        this.clear();
        this.InsertLoginDetails();
      })
    }
  }
  public InsertLoginDetails() {
    debugger
    var obj = {
      "ApplicationName": 'PO ' + this.ItemText + ' Added',
      "Date": this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datepipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "PO",
      "Action": 'Add New PO',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }


  public clear() {
    debugger
    ;
    let newpo = document.getElementById('ddl_newpotype');
    newpo['selectedIndex'] = 0;

    let newVendor = document.getElementById('ddl_newvendor');
    newVendor['selectedIndex'] = 0;
    this.tablerows.length = 0;



    this.potypeID = 0;
    this.vendorID = 0;
  }




  public savenotification() {
    let notification = {
      Date: this.date,
      Event: 'New Po Raised',
      FromUser: localStorage.getItem('username'),
      ToUser: this.vendorName,
      Message: 'New Po Raised for ' + this.vendorName,
      Photo: 'photo',
      Building: "NA",
    };
    this.fmsservice.InsertNotification(notification).subscribe(
      res => {
        debugger;
      }
    )
  }


  ItemID
  ItemText
  public Itemdetails(evn) {
    debugger;
    this.ItemID = evn.target.value;
    this.ItemText = evn.target.selectedOptions[0].text;
    this.GetInventoryList(1);


  }


  ItemDetails
  InventoryList;
  FilteredInventoryList;
  BuildingName;
  AvailQuantity;
  titleone;
  public GetInventoryList(languageid) {
    this.fmsservice.GetInventoryList(languageid).subscribe(
      res => {
        debugger;
        this.InventoryList = res;
        this.ItemDetails = this.InventoryList.filter(x => x.name == this.ItemText);
        this.BuildingName = this.ItemDetails[0].buildingName
        this.AvailQuantity = this.ItemDetails[0].currentQty - this.ItemDetails[0].consumeCount


        this.titleone = 'Building Name: ' + this.BuildingName + ' Available Quantity: ' + this.AvailQuantity

        // Swal.fire({
        //   title:this.titleone,
        //   animation: true,
        //   customClass: {
        //     popup: 'animated lightSpeedIn'
        //   }
        // })


        Swal.fire({
          title: '<strong>Item <u>Details</u></strong>',
          type: 'info',
          html:
            '<p style="font-size: 17px;">Building Name: ' + this.BuildingName +
            '       ' +
            'Available Quantity: ' + this.AvailQuantity + '</p>',
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: true,

        })
      }
    )
  }

  public GetTypeID(even) {
    debugger;
    this.typeid = even.target.value;
  }

  public GetFinancer() {
    this.fmsservice.GetStaffByType(10012).subscribe(data => {
      debugger;
      this.finanacerlist = data;
    })
  }

  public GetFinanacerID(even) {
    debugger
    this.FinanacerID = even.target.value;
  }

  public GetManager() {
    this.fmsservice.GetStaffByType(10013).subscribe(data => {
      debugger;
      this.managerlist = data;
    })
  }

  public GetManagerID(even) {
    debugger
    this.ManagerID = even.target.value;
  }

  public GetCFO() {
    this.fmsservice.GetStaffByType(10014).subscribe(data => {
      debugger;
      this.cfolist = data;
    })
  }
  public GetCfoID(even) {
    debugger
    this.CfoID = even.target.value;
  }

  public GetVendorType() {
    this.fmsservice.GetVendorType(this.selectedlanguage).subscribe(data => {
      debugger
      this.vendortypelist = data;
    })
  }
  public GetVendorTypeId(even) {
    debugger
    this.vendortypeid = even.target.value;
    this.GetVendor(this.vendortypeid)
  }

  public caculategst() {
    let gst = 18;
    let amount = this.serviceamount;
    let gstamount = (Number(amount) * Number(gst)) / 100;
    this.garandtotal = Number(gstamount) + Number(this.serviceamount);
  }

  public Calpercentage() {
    debugger
    let percent = 18;
    this.taxamount = (Number(this.serviceamount) * Number(percent)) / 100;

  }

  public insertservice() {
    debugger
    let percent = 18;
    this.taxamount = (Number(this.serviceamount) * Number(percent)) / 100;

    this.garandtotal = this.serviceamount * 18 / 100;

    let gst = 18;
    let amount = this.serviceamount;
    let gstamount = (Number(amount) * Number(gst)) / 100;
    this.garandtotal = Number(gstamount) + Number(this.serviceamount);
    debugger
    var entity1 = {
      ServiceType: this.vendortypeid,
      ServiceDescription: this.servicedesc,
      ServiceAmount: this.serviceamount,
      TaxAmount: this.taxamount,
      GrandTotal: this.garandtotal,
      InventoryType: this.typeid,
      Date: new Date(),
      LanguageID: this.selectedlanguage,
      VendorID: this.vendorid,
      ManagerID: 1,
      CFOID: 1,
      FinanacerID: 1,
      Building: this.buildingid,
      UserID: localStorage.getItem("UserID")
    }
    this.fmsservice.InsertPO(entity1).subscribe(data => {
      if (data != null || data != undefined) {
        Swal.fire("Saved Successfully")
        this.servicedesc = '',
          this.taxamount = '',
          this.garandtotal = '';
      }
    })
  }


  public GetVendor(VTID) {
    this.fmsservice.GetVendorByTypeID(VTID).subscribe(data => {
      debugger
      this.vendorlist = data;
    })
  }

  public GetVendorId(even) {
    debugger
    this.vendorid = even.target.value;
  }


  witheld(data) {
    debugger
    var per = (data * 18) / 100
    debugger
    this.taxamount = per
    debugger
  }

  public GetBuldinglist() {
    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(data => {
      debugger
      this.buildinglist = data;
    })
  }


  public GetbuldingID(even) {
    debugger
    this.buildingid = even.target.value;
  }


  public GetItemsByEID(LID, EID) {
    this.fmsservice.GetItemTypeByEID(LID, EID).subscribe(data => {
      debugger;
      this.itemtypelist = data;
    })
  }

}
