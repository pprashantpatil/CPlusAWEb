import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-inventory',
  templateUrl: './new-inventory.component.html',
  styleUrls: ['./new-inventory.component.css']
})
export class NewInventoryComponent implements OnInit {


  constructor(public fmsservice: FmsService, private route: ActivatedRoute, private datePipe: DatePipe, ) { }

  public pageMenuTitle;
  public inventory_PageTitle;
  public inventory_BreadChrumb;
  public inventory_Item;
  public inventory_UsedCount;
  public inventory_Type;
  public inventory_Building;
  public inventory_Address;
  public inventory_Floor;
  public inventory_Unit;
  public inventory_CurrentQty;
  public inventory_MinimumQty;
  public inventory_AssignedTo;
  public inventory_Description;
  public inventory_Photo;
  public inventory_Save;
  public Buildinglist;
  public BuildingID;
  public BuildingAddress;
  public FloorList;
  public Userslist;
  public InventoryList;
  public FilteredInventoryList;
  public availcount;
  public actualcount;
  public SelectedtypeID;
  public POlist;
  public Typeofpo;
  public AssignedTypeID;
  public vendorlist;
  public VendorNameslist;
  public ItemPurchaseID;
  public InventoryID;
  usedCount;
  public newinventoryEntity = {
    Name: 0,
    TypeID: 1,
    BuildingID: 0,
    Floor: 0,
    Unit: 0,
    CurrentQty: 0,
    MinimumQty: 0,
    ItemPurchaseID: 0,
    ModifiedBy: "",
    Photo: "NULL",
    Description: "",
    AssignedTo: 0,
    AssignedToName: "",
    AssignedToPhoneNo: "",
    AssignedToEmailID: "",
    InternalUserID: 0,
    VendorType: 0,
    LanguageID: 1,
    Location: "",
    Category: "",
    ItemType: "",
    WarrantyExpiryDate: ""
  }

  ProjectID: any;
  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.fmsservice.GetFloor(this.ProjectID).subscribe(
      res => {
        this.FloorList = res;
      }
    )
    this.newinventoryEntity.BuildingID = this.ProjectID;
    this.GetInventorytaddLanguage(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.GetUserType(selectedlanguage);
    this.GetAvailableInvetoryItems(selectedlanguage);
    this.GetVendorType(selectedlanguage);
    // this.GetPOType1(selectedlanguage);
    this.GetUsersdrop();

    this.route.params.subscribe(params => {
      debugger;
      this.InventoryID = params['id'];
      if (params['id'] != undefined) {
        this.InventoryID = params['id'];
        //this.GetInventorybyID(this.InventoryID);
      }
    }
    );
  }



  // public GetInventorybyID(InventoryID) {
  //   debugger;
  //   this.fmsservice.GetInventorybyID(InventoryID).subscribe(
  //     res => {
  //       debugger;
  //       this.newinventoryEntity.ItemPurchaseID=res["itemPurchaseID"];
  //        this.newinventoryEntity.Name = res["itemPurchaseID"];
  //        this.newinventoryEntity.BuildingID=res["buildingID"];
  //        this.newinventoryEntity.Floor=res["floor"],
  //        this.newinventoryEntity.Unit=res["unit"],
  //        this.newinventoryEntity.Location=res["location"],
  //        this.newinventoryEntity.CurrentQty=res["currentQty"];
  //        this.newinventoryEntity.MinimumQty=res["minimumQty"];
  //        this.newinventoryEntity.AssignedTo=res["assignedTo"];
  //        this.newinventoryEntity.AssignedToName=res["assignedToName"];
  //        this.newinventoryEntity.VendorType=res["vendorType"];
  //        this.newinventoryEntity.AssignedToPhoneNo=res["assignedToPhoneNo"];
  //        this.newinventoryEntity.AssignedToEmailID=res["assignedToEmailID"];
  //        this.newinventoryEntity.Description=res["description"];


  //     }
  //   )

  // }





  public GetInventorytaddLanguage(languageid) {
    this.fmsservice.GetInventorytaddLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.inventory_PageTitle = res[0].inventory_PageTitle;
        this.inventory_BreadChrumb = res[0].inventory_BreadChrumb;
        this.inventory_Item = res[0].inventory_Item;
        this.inventory_UsedCount = res[0].inventory_UsedCount;
        this.inventory_Type = res[0].inventory_Type;
        this.inventory_Building = res[0].inventory_Building;
        this.inventory_Address = res[0].inventory_Address;
        this.inventory_Floor = res[0].inventory_Floor;
        this.inventory_Unit = res[0].inventory_Unit;
        this.inventory_CurrentQty = res[0].inventory_CurrentQty;
        this.inventory_MinimumQty = res[0].inventory_MinimumQty;
        this.inventory_AssignedTo = res[0].inventory_AssignedTo;
        this.inventory_Description = res[0].inventory_Description;
        this.inventory_Photo = res[0].inventory_Photo;
        this.inventory_Save = res[0].inventory_Save;
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

  public GetVendorByTypeID(ID) {
    this.fmsservice.GetVendorByTypeID(ID).subscribe(
      res => {

        this.VendorNameslist = res;
      }
    )
  }


  public GetVendorType(languageid) {
    this.fmsservice.GetVendorType(languageid).subscribe(
      res => {

        this.vendorlist = res;
      }
    )
  }

  public VendorType(evn) {

    let typeID = evn.target.value;
    this.GetVendorByTypeID(typeID);
  }

  public GetBuildingAddress(evn) {

    this.BuildingID = evn.target.value;
    let LanguageID = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetBuilding(LanguageID, this.BuildingID).subscribe(
      res => {

        this.BuildingAddress = res['address'];
        this.GetFloor(this.BuildingID);
      }
    )
  }

  public GetFloor(BuildingID) {
    debugger;
    this.fmsservice.GetFloor(BuildingID).subscribe(
      res => {

        this.FloorList = res;
      }
    )
  }

  public GetUserType(languageid) {
    this.fmsservice.GetUserType(languageid).subscribe(
      res => {

        this.Userslist = res;
      }
    )
  }

  public GetAvailableInvetoryItems(languageid) {
    this.fmsservice.GetAvailableInvetoryItems(languageid).subscribe(
      res => {
        debugger;
        this.InventoryList = res;
        this.FilteredInventoryList = this.InventoryList;
      }
    )
  }


  ItemList
  FilteredItemList
  Category
  typename
  public SlectedItem(evn) {
    debugger;
    this.newinventoryEntity.ItemPurchaseID = evn.target.value;
    let SelectedID = evn.target.value;
    this.FilteredInventoryList = this.InventoryList.filter(x => x.id == SelectedID);

    this.availcount = this.FilteredInventoryList[0].availableQty;
    this.newinventoryEntity.CurrentQty = this.availcount;
    this.actualcount = this.FilteredInventoryList[0].actualQty;
    this.SelectedtypeID = this.FilteredInventoryList[0].typeID;
    if (this.FilteredInventoryList[0].usedCount != null) {
      this.usedCount = this.FilteredInventoryList[0].usedCount;
    }
    else {
      this.FilteredInventoryList[0].usedCount = 0;
      this.usedCount = 0;
    }
    this.fmsservice.GetItemType("2019-01-01", "2019-12-31", 1).subscribe(
      res => {
        debugger;
        this.ItemList = res;
        this.FilteredItemList = this.ItemList.filter(x => x.id == evn.target.value);
        this.Category = this.FilteredItemList[0].category;
        this.typename = this.FilteredItemList[0].typename;
      }
    )
    //this.GetPOType1(1);

  }


  public GetPOType1(languageid) {

    this.fmsservice.GetPOType1(languageid).subscribe(
      res => {

        this.POlist = res.filter(x => x.id == this.SelectedtypeID);
        this.Typeofpo = this.POlist[0].short;
      }
    )
  }
  public Assignedto(evn) {

    this.AssignedTypeID = evn.target.value;
  }

  public InventoryPhotos = [];
  public UploadedPhotos = [];
  onFilesAddedPhoto(files: File[]) {

    this.InventoryPhotos.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.InventoryPhotos.push(files[i]);
    }
  }

  public UploadPhotos(inventoryID) {
    this.fmsservice.InventoryInvoiceUpload(this.InventoryPhotos).subscribe(res => {

      for (let i = 0; i < res.length; i++) {
        let PhotosEntity = {
          docpathURL1: res[i],
          pdfurl: null
        }
        this.UploadedPhotos.push(PhotosEntity);
      }
      this.InsertInventoryDocument(inventoryID);
      // Swal.fire('Updated Successfully!')
    })
  }
  public InsertInventoryDocument(inventoryID) {

    for (let i = 0; i < this.UploadedPhotos.length; i++) {
      let entity = {
        InventoryID: inventoryID,
        Attachment: this.UploadedPhotos[i].docpathURL1,
        ModifiedBy: 'Admin',
        pdf: 'Null'
      }
      this.fmsservice.InsertInventoryDocument(entity).subscribe(res => {

        // Swal.fire('Successfully Saved!');
      })
    }
  }



  public aaa;
  public vendorEmail;
  public vendorphno;
  public FileteredVendorNameslist;
  public Vendor(evn) {
    debugger;
    this.aaa = evn.target.value;
    this.FileteredVendorNameslist = this.VendorNameslist.filter(x => x.id == this.aaa);
    this.newinventoryEntity.AssignedToName = this.FileteredVendorNameslist[0].vendorName;
    this.vendorEmail = this.FileteredVendorNameslist[0].emailID;
    this.newinventoryEntity.AssignedToEmailID = this.FileteredVendorNameslist[0].emailID;
    this.vendorphno = this.FileteredVendorNameslist[0].phoneNo;
    this.newinventoryEntity.AssignedToPhoneNo = this.FileteredVendorNameslist[0].phoneNo;
  }


  Isempty = false;
  CountValidation = false;
  public InsertInventory() {
    debugger;
    let mandatoryfields = {
      Name: this.newinventoryEntity.Name,
      BuildingID: this.newinventoryEntity.BuildingID,
      Floor: this.newinventoryEntity.Floor,
      Unit: 2345,
      CurrentQty: this.newinventoryEntity.CurrentQty,
      MinimumQty: this.newinventoryEntity.MinimumQty,
      AssignedTo: this.newinventoryEntity.AssignedTo,
      AssignedToName: this.newinventoryEntity.AssignedToName,
    }
    let validate = this.fmsservice.isEmpty(mandatoryfields);
    if (validate.length > 0) {
      this.Isempty = true;
    } else {
      this.newinventoryEntity.LanguageID = Number(localStorage.getItem('selectedLanguageID'));
      // this.FilteredInventoryList = this.InventoryList.filter(x => x.id ==  this.newinventoryEntity.ItemPurchaseID);
      this.newinventoryEntity.Name = this.FilteredInventoryList[0].itemName;
      let test = this.newinventoryEntity;
      this.newinventoryEntity.Category = this.Category;
      this.newinventoryEntity.ItemType = this.typename;
      this.fmsservice.InsertInventory(this.newinventoryEntity).subscribe(res => {
        debugger;
        this.UploadPhotos(res);
        Swal.fire('Inventory Successfully Saved');
        this.Clear();
        location.href = '#/inventory'
        this.InsertLoginDetails(this.newinventoryEntity.Name);

      })
    }
  }
  public InsertLoginDetails(name) {
    debugger
    var obj = {
      "ApplicationName": 'Inventory ' + name + ' Added',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Inventory",
      "Action": 'Add New Inventory',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  public Clear() {
    this.newinventoryEntity.Name = 0,
      this.newinventoryEntity.TypeID = 1,
      this.newinventoryEntity.BuildingID = 0,
      this.newinventoryEntity.Floor = 0,
      this.newinventoryEntity.Unit = 0,
      this.newinventoryEntity.CurrentQty = 0,
      this.newinventoryEntity.MinimumQty = 0,
      this.newinventoryEntity.ItemPurchaseID = 0,
      this.newinventoryEntity.Description = "",
      this.newinventoryEntity.AssignedTo = 0,
      this.newinventoryEntity.AssignedToName = "",
      this.newinventoryEntity.AssignedToPhoneNo = "",
      this.newinventoryEntity.AssignedToEmailID = "",
      this.newinventoryEntity.InternalUserID = 0,
      this.newinventoryEntity.VendorType = 0,
      this.newinventoryEntity.Location = "",
      this.availcount = ""
  }

  public UnitByID(evn) {
    debugger;
    // this.newinventoryEntity.Floor = evn.target.value;
    this.GetUnit_MasterbybID(this.ProjectID, evn.target.value);
  }
  public Unitslist;
  public GetUnit_MasterbybID(BuildingID, FloorID) {
    this.fmsservice.GetUnit_MasterbybID(BuildingID, FloorID).subscribe(
      res => {
        this.Unitslist = res;
      }
    )
  }

  public Ulist
  public GetUsersdrop() {
    this.fmsservice.GetUsersdrop().subscribe(
      res => {
        debugger;
        this.Ulist = res;
      }
    )
  }

}
