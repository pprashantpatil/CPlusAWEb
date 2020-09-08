import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../services/fms.service';

@Component({
  selector: 'app-warehousedashboard',
  templateUrl: './warehousedashboard.component.html',
  styleUrls: ['./warehousedashboard.component.css']
})
export class WarehousedashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }


  POlists: any;
  FilteredPOlists: any;
  LoginID: any;
  ProjectID: any;
  username: any;
  POCount: any;
  POActiveCount: any;
  POClosedCount: any;
  projectlist: any;
  NoOfProjects: any;
  ProjectAssignedLists: any;
  NoOfInvoices: any;
  ActiveInvoices: any;
  ClosedInvoices: any;
  BuildingStaffList: any;
  FilteredBuildingStaffList: any;
  NoOfStaff: any;
  StaffLeaves: any;
  NoOfStaffLeaves: any;
  InventoryList: any;
  FilteredInventoryList: any
  Currentquanity: any
  Expiriredqty: any
  Expiringqty: any
  CategoryLists: any
  EquipmentTypeList: any
  InventoryLists: any
  ngOnInit() {
    this.LoginID = localStorage.getItem("LoginTypeID");
    this.ProjectID = localStorage.getItem('ProjectID');
    this.username = localStorage.getItem('username');
    let UserID = localStorage.getItem('userid');
    this.GetInventory();
    this.GetPODashborad();
    this.GetSuppilerDetails();
    this.fmsservice.GetCategoryItemMaster().subscribe(data => {
      debugger
      this.CategoryLists = data;
    })
    this.fmsservice.GetEquipmentType(1).subscribe(
      res => {

        this.EquipmentTypeList = res;
      }
    )
    this.fmsservice.GetItemTypes(1).subscribe(
      res => {
        debugger;
        this.InventoryLists = res;

      }
    )




  }

  public GetInventory() {
    debugger
    this.fmsservice.GetInventoryList(1).subscribe(
      res => {
        debugger;
        this.InventoryList = res;
        let categoryfiletr = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID'));
        let expringcount = categoryfiletr.filter(x => x.expiryflag == 1);
        let expriedcount = categoryfiletr.filter(x => x.expiryflag == 0);
        let total = 0;
        categoryfiletr.forEach(element => {
          total += element.remainingCount;
        });
        this.Currentquanity = total;
        let total1 = 0;
        expringcount.forEach(element => {
          total1 += element.remainingCount;
        });
        this.Expiringqty = total1;
        let total2 = 0;
        expriedcount.forEach(element => {
          total2 += element.remainingCount;
        });
        this.Expiriredqty = total2;
      }
    )
  }

  public GetCategoryID(event) {
    debugger
    if (event.target.value == 0) {
      this.GetInventory();
    }
    else {
      this.fmsservice.GetInventoryList(1).subscribe(
        res => {
          debugger;
          this.InventoryList = res;
          let categoryfiletr = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID') && x.category == event.target.value);
          let expringcount = categoryfiletr.filter(x => x.expiryflag == 1);
          let expriedcount = categoryfiletr.filter(x => x.expiryflag == 0);
          let total = 0;
          categoryfiletr.forEach(element => {
            total += element.remainingCount;
          });
          this.Currentquanity = total;
          let total1 = 0;
          expringcount.forEach(element => {
            total1 += element.remainingCount;
          });
          this.Expiringqty = total1;
          let total2 = 0;
          expriedcount.forEach(element => {
            total2 += element.remainingCount;
          });
          this.Expiriredqty = total2;
        }
      )
    }

  }
  public GetSubCategoryID(event) {
    debugger
    if (event.target.value == 0) {
      this.GetInventory();
    }
    else {
      this.fmsservice.GetInventoryList(1).subscribe(
        res => {
          debugger;
          this.InventoryList = res;
          let categoryfiletr = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID') && x.itemType == event.target.value);
          let expringcount = categoryfiletr.filter(x => x.expiryflag == 1);
          let expriedcount = categoryfiletr.filter(x => x.expiryflag == 0);
          let total = 0;
          categoryfiletr.forEach(element => {
            total += element.remainingCount;
          });
          this.Currentquanity = total;
          let total1 = 0;
          expringcount.forEach(element => {
            total1 += element.remainingCount;
          });
          this.Expiringqty = total1;
          let total2 = 0;
          expriedcount.forEach(element => {
            total2 += element.remainingCount;
          });
          this.Expiriredqty = total2;
        }
      )
    }

  }
  public GetItemID(event) {
    debugger
    if (event.target.value == 0) {
      this.GetInventory();
    }
    else {
      this.fmsservice.GetInventoryList(1).subscribe(
        res => {
          debugger;
          this.InventoryList = res;
          let categoryfiletr = this.InventoryList.filter(x => x.buildingID == localStorage.getItem('ProjectID') && x.name == event.target.value);
          let expringcount = categoryfiletr.filter(x => x.expiryflag == 1);
          let expriedcount = categoryfiletr.filter(x => x.expiryflag == 0);
          let total = 0;
          categoryfiletr.forEach(element => {
            total += element.remainingCount;
          });
          this.Currentquanity = total;
          let total1 = 0;
          expringcount.forEach(element => {
            total1 += element.remainingCount;
          });
          this.Expiringqty = total1;
          let total2 = 0;
          expriedcount.forEach(element => {
            total2 += element.remainingCount;
          });
          this.Expiriredqty = total2;
        }
      )
    }

  }
  FilteredPOList: any
  totalpo: any
  totalpoclosed: any
  totalpoopen: any
  public GetPODashborad() {
    debugger
    this.fmsservice.GetPODashboard("2020-01-01", "2022-12-31", 1).subscribe(
      res => {
        debugger;
        let temp: any = res;
        this.FilteredPOList = temp;
        this.totalpoclosed = this.FilteredPOList.filter(x => x.status == 'Delivered').length;
        this.totalpoopen = this.FilteredPOList.filter(x => x.status == 'Pending').length;
        this.totalpo = this.FilteredPOList.length;

      }
    )
  }

  public GetPOMonth(event) {
    debugger
    if (event.target.value == 0) {
      this.GetPODashborad();
    }
    else {
      this.fmsservice.GetPODashboard("2020-01-01", "2022-12-31", 1).subscribe(
        res => {
          debugger;
          let temp: any = res;
          this.FilteredPOList = temp.filter(x => x.month == event.target.value)
          this.totalpoclosed = this.FilteredPOList.filter(x => x.status == 'Delivered').length;
          this.totalpoopen = this.FilteredPOList.filter(x => x.status == 'Pending').length;
          this.totalpo = this.FilteredPOList.length;

        }
      )
    }

  }
  PurchaseReturnList: any
  FilteredPurchaseReturnList: any
  itempurchase: any
  returnQuantity: any
  purchaseQuanyity: any
  public GetSuppilerDetails() {
    debugger
    this.fmsservice.GetallPurchaseReturn("2020-01-01", "2020-12-31").subscribe(
      res => {
        debugger
        this.PurchaseReturnList = res;
        this.FilteredPurchaseReturnList = this.PurchaseReturnList;
        let total2 = 0;
        this.FilteredPurchaseReturnList.forEach(element => {
          total2 += element.returnQty;
        });
        this.returnQuantity = total2;
      }
    )

    this.fmsservice.GetItemPurchase().subscribe(
      res => {
        debugger
        let temp: any = res;
        this.itempurchase = temp;
        let total7 = 0;
        this.itempurchase.forEach(element => {
          total7 += element.actualQty;
        });
        this.purchaseQuanyity = total7;
      }
    )
  }

}
