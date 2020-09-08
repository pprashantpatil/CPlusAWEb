import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  AssetsEntity: any;


  constructor(public fmsservice: FmsService, private datePipe: DatePipe, public router: Router,) { }
  public pageMenuTitle;
  public inventory_PageTitle;
  public inventory_BreadChrumb;
  public inventory_Export;
  public inventory_AddNewButton;
  public inventory_Search;
  public inventory_InventoryName;
  public inventory_InventoryType;
  public inventory_Building;
  public inventory_Address;
  public inventory_TotalQuantity;
  public inventory_Minimum;
  public inventory_UsedCount;
  public inventory_Price;
  public inventory_TotalInventory;
  public inventory_UserName;
  public inventory_Actions;
  public confirmButtonText;
  public InventoryList: any;
  public BuildingList;
  public EquipmentTypeList;
  public itemList;
  public FilteredInventoryList;
  public Search;
  public Attachmentlist;
  public Building;
  public Floor;
  public Item;
  public AvailableCount;
  public ConsumeCount;
  public MaintenanceRequest;
  public UserType;
  public User;
  public Reason;
  public MaintainanceRequest;
  public Userslist;
  public UserTypeID;
  public selectedBuilding;
  public selectedInventory;
  public photourllist;
  ImageID: any;


  // public InventoryID;
  public InventoryEntity = {
    InventoryID: 0,
    ConsumeCount: 0,
    Reason: "",
    MaintenanceRequestID: 0,
    ModifiedBy: "Admin",
    UserTypeID: 0,
    UserName: " - ",
    UserID: 1,
    Authorised: "",
    Category: "",
    ItemType: ""

  }

  CategoryLists: any
  InventoryLists: any
  ngOnInit() {

    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetInventoryLanguage(selectedlanguage);
    this.GetInventoryList(selectedlanguage);
    this.GetBuildinglist(selectedlanguage);
    this.GetEquipmentType(selectedlanguage);
    this.GetItemTypes(selectedlanguage);
    this.GetMaintenanceRequestList(selectedlanguage);
    this.GetUserType(selectedlanguage);
    this.GetUserType(selectedlanguage);
    this.GetVendorType(selectedlanguage);
    this.fmsservice.GetCategoryItemMaster().subscribe(data => {
      debugger
      this.CategoryLists = data;
    })
    this.fmsservice.GetItemTypes(1).subscribe(
      res => {
        debugger;
        this.InventoryLists = res;

      }
    )


  }

  public GetInventoryLanguage(languageid) {
    this.fmsservice.GetInventoryLanguage(languageid).subscribe(
      res => {

        this.pageMenuTitle = res[0].pageMenuTitle;
        this.inventory_PageTitle = res[0].inventory_PageTitle;
        this.inventory_BreadChrumb = res[0].inventory_BreadChrumb;
        this.inventory_AddNewButton = res[0].inventory_AddNewButton;
        this.inventory_Export = res[0].inventory_Export;
        this.inventory_Search = res[0].inventory_Search;
        this.inventory_InventoryName = res[0].inventory_InventoryName;
        this.inventory_InventoryType = res[0].inventory_InventoryType;
        this.inventory_Building = res[0].inventory_Building;
        this.inventory_Address = res[0].inventory_Address;
        this.inventory_TotalQuantity = res[0].inventory_TotalQuantity;
        this.inventory_Minimum = res[0].inventory_Minimum;
        this.inventory_UsedCount = res[0].inventory_UsedCount;
        this.inventory_Price = res[0].inventory_Price;
        this.inventory_TotalInventory = res[0].inventory_TotalInventory;
        this.inventory_UserName = res[0].inventory_UserName;
        this.inventory_Actions = res[0].building_Actions;

      }
    )
  }

  public GetBuildinglist(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(
      res => {

        this.BuildingList = res;
      }
    )
  }

  public GetEquipmentType(languageid) {
    this.fmsservice.GetEquipmentType(languageid).subscribe(
      res => {

        this.EquipmentTypeList = res;
      }
    )
  }

  public GetItemTypes(languageid) {
    this.fmsservice.GetItemTypes(languageid).subscribe(
      res => {

        this.itemList = res;
      }
    )
  }

  public GetCategoryID(event) {

    if (event.target.value == 0) {
      this.GetInventoryList(1);
    }
    else {
      this.fmsservice.GetInventoryList(1).subscribe(
        res => {
          debugger;
          this.InventoryList = res;
          this.FilteredInventoryList = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID') && x.category == event.target.value);
        }
      )
    }
  }
  public GetInventoryList(languageid) {
    this.fmsservice.GetInventoryList(languageid).subscribe(
      res => {
        debugger;
        this.InventoryList = res;
        this.FilteredInventoryList = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID'));
      }
    )
  }

  public DeleteInventoryByID(evn) {
    let item = evn.name

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
          this.DeleteInventory(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
        this.InsertLoginDetails(item);
      }
    })
  }
  public InsertLoginDetails(item) {
    debugger
    var obj = {
      "ApplicationName": 'Inventory ' + item + ' Deleted',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Inventory",
      "Action": 'Delete Inventory',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  public DeleteInventory(ID) {
    this.fmsservice.DeleteInventory(ID).subscribe(res => {
      this.GetInventoryList(1);
    })
  }


  public FilterByBuildingname(evn) {


    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredInventoryList = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID'));
    }
    else {
      this.selectedBuilding = evn.target.value;
      this.FilteredInventoryList = this.InventoryList.filter(x => x.buildingName == this.selectedBuilding && x.buildingID == localStorage.getItem('ProjectID'));
    }
  }

  public FilterByInventory(evn) {
    if (evn.target.value == 0) {
      this.GetInventoryList(1);
    }
    else {
      this.fmsservice.GetInventoryList(1).subscribe(
        res => {
          debugger;
          this.InventoryList = res;
          this.FilteredInventoryList = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID') && x.itemType == evn.target.value);
        }
      )
    }
  }

  public FilterByItem(evn) {
    debugger
    if (evn.target.value == 0) {
      this.GetInventoryList(1);
    }
    else {
      this.fmsservice.GetInventoryList(1).subscribe(
        res => {
          debugger;
          this.InventoryList = res;
          this.FilteredInventoryList = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID') && x.name == evn.target.value);
        }
      )
    }
  }

  Attachment(evn) {

    this.GetInventoryDocument(evn.id);
  }
  ItemList
  FilteredItemList: any
  Category
  typename
  InventoryConsume(evn) {

    this.Building = evn.buildingName,
      this.Floor = evn.floor,
      this.Item = evn.name,
      this.fmsservice.GetItemType("2019-01-01", "2019-12-31", 1).subscribe(
        res => {
          debugger;
          this.ItemList = res;
          this.FilteredItemList = this.ItemList.filter(x => x.short == evn.name);
          this.Category = this.FilteredItemList[0].category;
          this.typename = this.FilteredItemList[0].typename;
        }
      )
    this.AvailableCount = evn.currentQty - evn.consumeCount,
      this.ConsumeCount = evn.consumeCount,
      this.InventoryEntity.ConsumeCount = this.ConsumeCount
    //this.MaintenanceRequest = evn.consumeCount
    this.UserType = evn.type,
      this.User = evn.username
    this.InventoryEntity.InventoryID = evn.id;


  }


  consumecountinput(inputcunsumecount) {
    if (this.AvailableCount > inputcunsumecount) {
      this.InventoryEntity.ConsumeCount = this.AvailableCount;
    }
    // else {

    // }

  }

  public GetMaintenanceRequestList(languageid) {

    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();

    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');
    this.fmsservice.GetMaintenanceRequestList(2, "2019-01-01", "2019-12-31", languageid).subscribe(
      res => {
        debugger
        this.MaintainanceRequest = res;
      }
    )
  }

  NoImagesAvail = false;
  public GetInventoryDocument(ID) {
    this.fmsservice.GetInventoryDocument(ID).subscribe(
      res => {
        this.Attachmentlist = res;

        if (res.length == 0) {
          this.NoImagesAvail = true;
        }
        else {
          this.NoImagesAvail = false;
        }
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

  public UsersType(evn) {
    debugger;
    this.UserTypeID = evn.target.value;
    this.fmsservice.GetStaff(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffList = temp.filter(x => x.companyID == localStorage.getItem('CompanyID') && x.buildingid == localStorage.getItem('ProjectID'));
      }
    )
  }
  StaffList: any
  VendorNameslist;
  public VendorType(evn) {

    let typeID = evn.target.value;
    this.GetVendorByTypeID(typeID);

  }
  public GetStaff(event) {

  }
  public GetVendorByTypeID(ID) {
    this.fmsservice.GetVendorByTypeID(ID).subscribe(
      res => {

        this.VendorNameslist = res;
      }
    )
  }

  vendorlist;
  public GetVendorType(languageid) {
    this.fmsservice.GetVendorType(languageid).subscribe(
      res => {

        this.vendorlist = res;
      }
    )
  }

  public InsertInventoryConsume() {
    debugger;
    //this.EventPlannerEntity.LanguageID=Number(localStorage.getItem('selectedLanguageID'))
    let test = this.InventoryEntity;
    if (this.InventoryEntity.ConsumeCount > this.AvailableCount) {
      // this.InventoryEntity.ConsumeCount=this.AvailableCount;

      Swal.fire('You are Consuming more than available please re-check count');
    }
    else {
      this.InventoryEntity.Category = this.Category;
      this.InventoryEntity.ItemType = this.typename;
      this.fmsservice.InsertInventoryConsume(this.InventoryEntity).subscribe(res => {

        //this.GetInventoryLanguage(1);
        if (res > 0) {

          this.InventoryEntity.InventoryID = 0,
            this.InventoryEntity.ConsumeCount = 0,
            this.InventoryEntity.Reason = "",
            this.InventoryEntity.MaintenanceRequestID = 0,
            this.InventoryEntity.ModifiedBy = "Admin",
            this.InventoryEntity.UserTypeID = 0,
            this.InventoryEntity.UserName = " - ",
            this.InventoryEntity.UserID = 1,
            this.InventoryEntity.Authorised = ""
        }
        Swal.fire('Successfully Saved!');
        this.InventoryEntity.InventoryID = 0,
          this.InventoryEntity.ConsumeCount = 0,
          this.InventoryEntity.Reason = "",
          this.InventoryEntity.MaintenanceRequestID = 0,
          this.InventoryEntity.ModifiedBy = "Admin",
          this.InventoryEntity.UserTypeID = 0,
          this.InventoryEntity.UserName = " - ",
          this.InventoryEntity.UserID = 1,
          this.InventoryEntity.Authorised = ""
        let selectedlanguage = localStorage.getItem('selectedLanguageID');
        this.GetInventoryLanguage(selectedlanguage);

        this.GetInventoryList(selectedlanguage);
      })
    }

  }

  getimage(ID) {
    debugger
    this.fmsservice.GetInventoryDocument(ID).subscribe(data => {
      debugger
      this.photourllist = data;
    })
  }
  public NewAttachment = [];
  onFilesAdded(files: File[]) {

    this.NewAttachment.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.NewAttachment.push(files[i]);
    }
  }

  public UpdateNewAttachments(evn) {

    this.ImageID = evn.id;
    //this.Upload(this.ImageID);
  }


  public Upload() {

    if (this.NewAttachment.length < 1) {
      Swal.fire("Please Drop Some Files")
    }
    else {
      this.fmsservice.InventoryInvoiceUpload(this.NewAttachment).subscribe(res => {

        let UploadedAttachmentList = res;
        for (let i = 0; i < UploadedAttachmentList.length; i++) {
          let Entity = {
            ID: this.ImageID,
            Attachment: UploadedAttachmentList[i],
            pdf: 'null'
          }
          this.fmsservice.UpdateInventoryDocument(this.ImageID, Entity).subscribe(
            res => {
              let SuccesAttachmentList = res;
              Swal.fire("Uploaded Successfully!");
              this.GetInventoryList(1);
            }
          )
        }

      })
    }
  }


  public DeleteOldAttachments(evn) {

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
          this.DeleteInventoryDocument(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }


  public DeleteInventoryDocument(ID) {

    this.fmsservice.DeleteInventoryDocument(ID).subscribe(res => {

      //this.GetInventoryList(1);
    })
  }

  exporttoexcel() {

    var list = []

    for (var i = 0; i < this.FilteredInventoryList.length; i++) {
      var entity = {
        type: this.FilteredInventoryList[i].type,
        address: this.FilteredInventoryList[i].address,
        buildingName: this.FilteredInventoryList[i].buildingName,
        consumeCount: this.FilteredInventoryList[i].consumeCount,
        currentQty: this.FilteredInventoryList[i].currentQty,
        inventoryCost: this.FilteredInventoryList[i].inventoryCost,
        itemPurchaseID: this.FilteredInventoryList[i].itemPurchaseID,
        location: this.FilteredInventoryList[i].location,
        minimumQty: this.FilteredInventoryList[i].minimumQty,
        name: this.FilteredInventoryList[i].name,
        pricePerItem: this.FilteredInventoryList[i].pricePerItem,
        remainingCount: this.FilteredInventoryList[i].remainingCount,
        username: this.FilteredInventoryList[i].username
      }

      list.push(entity)
    }

    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Inventory List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Inventory List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(list);
  }




  // public EditInvoice(evn) {
  //   let InvoiceID = evn.id;
  //   this.router.navigate(['/inventorytadd', InvoiceID]);
  // }
  public Reorder(evn) {
    debugger;
    this.router.navigate(['/newpo', 1]);
  }

}
