import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-new-item-master',
  templateUrl: './new-item-master.component.html',
  styleUrls: ['./new-item-master.component.css']
})
export class NewItemMasterComponent implements OnInit {
  AssetsEntity: any;


  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datePipe: DatePipe) { }
  public pageMenuTitle;
  public newItemMaster_PageTitle;
  public newItemMaster_BreadChrumb;
  public newItemMaster_Item;
  public newItemMaster_Description;
  public newItemMaster_Type;
  public newItemMaster_Update;

  public selectedlanguage: any;
  public buildinglist: any;
  public itemtypelist: any;
  public itemname: any;
  public itemdesc: any;
  public itemtypeID: any;
  NewItemID: any;
  public buildingid: any;


  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.buildingid = localStorage.getItem('ProjectID');
    this.GetBuldinglist();
    this.GetCategoryItemsMaster();
    this.GetNewItemMasterLanguage(this.selectedlanguage);
    this.fmsservice.GetEquipmentType(this.selectedlanguage).subscribe(data => {
      this.itemtypelist = data;
    });
    this.route.params.subscribe(params => {
      debugger;
      this.NewItemID = params['id'];
      this.GetItemTypebyID(this.NewItemID);
    }
    );
  }

  public GetItemTypebyID(ID) {
    debugger;
    this.fmsservice.GetItemTypebyID(ID).subscribe(
      res => {
        debugger;
        this.itemname = res["short"];
        this.itemtypeID = res["type"];
        this.mrp = res["mrp"];
        // document.getElementById("ddl_TypeID")["value"] = res["type"];
        this.itemdesc = res["description"];
        this.buildingid = res["building"];
        this.Category = res["category"];
        this.ExpiryDate = this.datePipe.transform(res["expiryDate"], 'yyyy-MM-dd');
      }
    )
  }

  public GetNewItemMasterLanguage(languageid) {
    this.fmsservice.GetNewItemMasterLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.newItemMaster_PageTitle = res[0].newItemMaster_PageTitle;
        this.newItemMaster_BreadChrumb = res[0].newItemMaster_BreadChrumb;
        this.newItemMaster_Item = res[0].newItemMaster_Item;
        this.newItemMaster_Description = res[0].newItemMaster_Description;
        this.newItemMaster_Type = res[0].newItemMaster_Type;
        this.newItemMaster_Update = res[0].newItemMaster_Update;
      }
    )
  }

  public GetItemTypeID(even) {
    debugger
    this.itemtypeID = even.target.value;
  }


  Category: any;
  mrp: any
  alreadypresentitemList
  Isempty = false;
  public insertitem() {
    debugger;
    var mand = {
      'Type': this.itemtypeID,
      'Building': this.buildingid
    }
    let validate = this.fmsservice.isEmpty(mand);
    if (validate.length > 0) {
      debugger;
      this.Isempty = true;

    }
    else {
      debugger
      this.fmsservice.GetAlreadyPresentItem(this.itemname).subscribe(

        res => {
          debugger
          this.alreadypresentitemList = res;
          if (res.length > 0) {
            Swal.fire("This Item is already present");
          }

          else {
            debugger;
            var Entity =
            {
              'Short': this.itemname,
              'Description': this.itemdesc,
              'Type': this.itemtypeID,
              'LanguageID': this.selectedlanguage,
              'Building': this.buildingid,
              'Category': this.Category,
              'ExpiryDate': this.ExpiryDate,
              'mrp': this.mrp
            }
            debugger
            this.fmsservice.InsertItemType(Entity).subscribe(data => {
              debugger;
              if (data != undefined) {
                Swal.fire('Item Added Successfully');
                location.href = '#/itemdashmaster'
                this.InsertLoginDetails(this.itemname);
                this.clear();

              }
            })
          }
        }
      )


    }
  }





  clear() {
    this.itemname = '',
      this.itemdesc = '',
      this.itemtypeID = ''
  }

  ExpiryDate: any
  public Updateitem() {
    var mand = {
      'Type': this.itemtypeID,
    }
    let validate = this.fmsservice.isEmpty(mand);
    if (validate.length > 0) {
      debugger
      this.Isempty = true;

    } else {
      var Entity =
      {
        'Short': this.itemname,
        'Description': this.itemdesc,
        'Type': this.itemtypeID,
        'LanguageID': this.selectedlanguage,
        'Building': this.buildingid,
        'Category': this.Category,
        'ExpiryDate': this.ExpiryDate,
        'mrp': this.mrp
      }
      debugger;
      this.fmsservice.UpdateItemType(this.NewItemID, Entity).subscribe(res => {
        Swal.fire('Item Updated Successfully!');
        location.href = '#/itemdashmaster'
        this.InsertLoginDetails1(this.itemname);
      })
    }
  }

  public InsertLoginDetails1(itemname) {
    debugger
    var obj = {
      "ApplicationName": 'Item Master ' + itemname + ' Updated',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Item Master",
      "Action": 'Update Inventory',
      "IPAddress": "175.143.31.41"
    }
    debugger
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }





  public InsertLoginDetails(itemname) {
    debugger
    let Entity = {
      "ApplicationName": 'Item Master ' + itemname + ' Added',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Inventory",
      "Action": 'Add New Item Master',
      "IPAddress": "175.143.31.41"
    }
    debugger
    this.fmsservice.InsertLogin(Entity).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }

  public GetBuldinglist() {
    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(data => {
      debugger
      this.buildinglist = data;
    })
  }

  CategoryLists
  public GetCategoryItemsMaster() {
    this.fmsservice.GetCategoryItemMaster().subscribe(data => {
      debugger
      this.CategoryLists = data;
    })
  }



  public GetbuldingID(even) {
    debugger
    this.buildingid = even.target.value;
  }

}
