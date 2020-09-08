import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';



@Component({
  selector: 'app-item-master',
  templateUrl: './item-master.component.html',
  styleUrls: ['./item-master.component.css']
})
export class ItemMasterComponent implements OnInit {


  constructor(public fmsservice: FmsService, private datePipe: DatePipe, public router: Router) { }
  public pageMenuTitle;
  public itemdashmaster_PageTitle;
  public itemdashmaster_BreadChrumb;
  public itemdashmaster_Button;
  public itemdashmaster_ItemName;
  public itemdashmaster_ItemType;
  public itemdashmaster_Action;
  public ItemList: any;
  public EquipmentList;
  public FilteredItemList;
  public Type;
  public EquipmentNameList;
  CategoryLists: any;
  Search: any;
  categoryid: any
  ngOnInit() {

    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetItemdashmasterLanguage(selectedlanguage);
    this.GetItemType(selectedlanguage);
    this.GetEquipmentType(selectedlanguage);
    this.GetItemTypes(selectedlanguage);
    this.fmsservice.GetCategoryItemMaster().subscribe(data => {
      debugger
      this.CategoryLists = data;
    })
  }



  Count:any;
  public GetCategoryID(event) {
    debugger
    this.categoryid = event.target.value;
    if (this.categoryid == 0) {
      this.fmsservice.GetItemType("2019-01-01", "2019-12-31", 1).subscribe(
        res => {
          debugger;
          this.ItemList = res;
          this.FilteredItemList = this.ItemList.filter(x => x.building == localStorage.getItem('ProjectID'));
          this.Count=this.FilteredItemList.length;
        }
      )
    }
    else {
      this.fmsservice.GetItemType("2019-01-01", "2019-12-31", 1).subscribe(
        res => {
          debugger;
          this.ItemList = res;
          this.FilteredItemList = this.ItemList.filter(x => x.building == localStorage.getItem('ProjectID') && x.category == this.categoryid);
          this.Count=this.FilteredItemList.length;
        }
      )
    }


  }


  public GetItemdashmasterLanguage(languageid) {
    this.fmsservice.GetItemdashmasterLanguage(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.itemdashmaster_PageTitle = res[0].itemdashmaster_PageTitle;
        this.itemdashmaster_BreadChrumb = res[0].itemdashmaster_BreadChrumb;
        this.itemdashmaster_Button = res[0].itemdashmaster_Button;
        this.itemdashmaster_ItemName = res[0].itemdashmaster_ItemName;
        this.itemdashmaster_ItemType = res[0].itemdashmaster_ItemType;
        this.itemdashmaster_Action = res[0].itemdashmaster_Action;
      }
    )
  }


  public GetItemType(languageid) {
    let startdate = new Date();
    startdate.setDate(startdate.getMonth() - 1);
    let enddate = new Date();
    debugger;
    let sdate = this.datePipe.transform(startdate, 'yyyy-MM-dd');
    let edate = this.datePipe.transform(enddate, 'yyyy-MM-dd');

    this.fmsservice.GetItemType("2019-01-01", "2019-12-31", languageid).subscribe(
      res => {
        debugger;
        this.ItemList = res;
        this.FilteredItemList = this.ItemList.filter(x => x.building == localStorage.getItem('ProjectID'));
        this.Count=this.FilteredItemList.length;
      }
    )
  }

  public GetEquipmentType(languageid) {
    this.fmsservice.GetEquipmentType(languageid).subscribe(
      res => {
        debugger;
        this.EquipmentList = res;
        // this.FilteredEquipmentList = this.EquipmentList;
      }
    )
  }

  public GetItemTypes(languageid) {
    this.fmsservice.GetItemTypes(languageid).subscribe(
      res => {
        debugger;
        this.EquipmentNameList = res;
        // this.FilteredEquipmentList = this.EquipmentList;
      }
    )
  }
  public EditItemMaster(evn) {
    debugger;
    let ID = evn.id;
    this.Type = evn.type;
    this.router.navigate(['/NewItemMaster', ID]);
  }

  public FilterByEquipment(evn) {
    debugger;
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredItemList = this.ItemList.filter(x => x.building == localStorage.getItem('ProjectID'));
      this.Count=this.FilteredItemList.length;
    }
    else {
      let selectedBuildingPlan = evn.target.value;
      this.FilteredItemList = this.ItemList.filter(x => x.typename == selectedBuildingPlan && x.building == localStorage.getItem('ProjectID'));
      this.Count=this.FilteredItemList.length;
    }
  }

  public FilterByEquipmentName(evn) {
    debugger;
    if (evn.target.value == "none") {
      //this.GetBuildingPlanList(this.selectedlanguage)
      this.FilteredItemList = this.ItemList.filter(x => x.building == localStorage.getItem('ProjectID'));
      this.Count=this.FilteredItemList.length;
    }
    else {
      let selectedBuildingPlan = evn.target.value;
      this.FilteredItemList = this.ItemList.filter(x => x.short == selectedBuildingPlan && x.building == localStorage.getItem('ProjectID'));
      this.Count=this.FilteredItemList.length;
    }
  }


  public confirmButtonText;
  public Delete(evn) {

    debugger;
    let item = evn.short;
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
          this.DeleteItemType(evn.id);
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
    debugger;
    var obj = {
      "ApplicationName": 'Item Master ' + item + ' deleted',
      "Date": this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      "Time": this.datePipe.transform(new Date(), 'hh:mm:ss a'),
      "UserID": localStorage.getItem("UserID"),
      "ModuleName": "Item  Master",
      "Action": 'Delete Item Master',
      "IPAddress": "175.143.31.41"
    }
    this.fmsservice.InsertLogin(obj).subscribe((data) => {
      if (data != null && data != undefined) {

      }
    })

  }


  public DeleteItemType(ID) {
    debugger;
    this.fmsservice.DeleteItemType(ID).subscribe(res => {
      debugger;
      this.GetItemType(1);
    })
  }


  exporttoexcel() {
    debugger
    var itemmasterlist = []

    for (let i = 0; i < this.FilteredItemList.length; i++) {
      debugger
      var list = {


        short: this.FilteredItemList[i].short,
        typename: this.FilteredItemList[i].typename,
        description: this.FilteredItemList[i].description
      }
      debugger
      itemmasterlist.push(list)
    }

    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Items List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Items List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(itemmasterlist);
  }

}
