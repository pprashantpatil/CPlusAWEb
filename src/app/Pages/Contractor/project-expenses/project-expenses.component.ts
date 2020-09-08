import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-project-expenses',
  templateUrl: './project-expenses.component.html',
  styleUrls: ['./project-expenses.component.css']
})
export class ProjectExpensesComponent implements OnInit {
  StaffTypelist: any
  CategoryLists: any
  itemtypelist: any
  Itemlist: any
  Itemmrp: any
  rateperhour: any
  public qwert = [];
  projectID: any;
  paramID: any;
  projectlist: any
  constructor(public fmsservice: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {
    this.ExpenseType = 0;
    this.tablecount = 0;
    this.StaffID = 0;
    this.StaffTypeID = 0;
    this.idcount = 1;
    this.rateperhour = 0;
    this.projectID = localStorage.getItem('ProjectID');
    this.Itemmrp = 0;
    this.route.params.subscribe(params => {
      debugger;
      if (params['id'] != undefined) {
        this.paramID = params['id'];
        this.fmsservice.GetCategoryItemMaster().subscribe(data => {
          debugger
          this.CategoryLists = data;
        })
        this.fmsservice.GetEquipmentType(1).subscribe(data => {
          this.itemtypelist = data;
          this.GetProjectExpenseByID(this.paramID);
        });

      }
    }
    );

    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.id == localStorage.getItem('ProjectID'));
    })
    this.fmsservice.GetStaffType(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffTypelist = temp.filter(x => x.id > 11);
      }
    )
    this.fmsservice.GetCategoryItemMaster().subscribe(data => {
      debugger
      this.CategoryLists = data;
    })
    this.fmsservice.GetEquipmentType(1).subscribe(data => {
      this.itemtypelist = data;
    });

  }
  TransmittalsList
  public GetProjectExpenseByID(ID) {
    this.fmsservice.GetProjectExpense().subscribe(
      res => {
        debugger;
        let temp2: any = res;
        let temp1: any = temp2.filter(x => x.id == ID);
        this.ExpenseType = temp1[0].expenseType;
        this.ExpenseDate = this.datepipe.transform(temp1[0].expenseDate, 'yyyy-MM-dd');
        this.fmsservice.GetStaffType(1).subscribe(
          res => {
            debugger;
            let temp: any = res
            this.StaffTypelist = temp.filter(x => x.id > 11);
          }
        )
        this.StaffTypeID = temp1[0].staffTypeID;
        this.fmsservice.GetStaff(1).subscribe(
          res => {
            debugger;
            let temp: any = res
            this.StaffList = temp.filter(x => x.staffTypeID == this.StaffTypeID);
          }
        )
        this.StaffID = temp1[0].staffID;
        this.rateperhour = temp1[0].rateperhour;
        this.noofhrs = temp1[0].noofhrs;
        this.Remarks = temp1[0].remarks;
        this.ItemCategory = temp1[0].itemCategory;
        this.ItemSubCategory = temp1[0].itemSubCategory;
        this.fmsservice.GetItemTypes(1).subscribe(data => {
          let temp: any = data;
          this.Itemlist = temp.filter(x => x.typename == this.ItemSubCategory);
        });
        this.Item = temp1[0].item;
        this.fmsservice.GetItemTypes(1).subscribe(data => {
          let temp: any = data;
          let temp1: any = temp.filter(x => x.short == this.Item);
          this.Itemmrp = temp1[0].mrp;
        });
        this.Quantity = temp1[0].quantity;
        this.TotalExpense = temp1[0].totalExpense;

      })
  }
  ExpenseType: any
  public GetExpenseType(event) {
    debugger
    this.ExpenseType = event.target.value;

  }

  StaffList
  StaffTypeID
  public GetStaffTypeID(event) {
    debugger
    this.StaffTypeID = event.target.value;
    this.fmsservice.GetStaff(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffList = temp.filter(x => x.staffTypeID == this.StaffTypeID);
      }
    )
  }
  StaffID: any
  public GetStaffID(event) {
    this.StaffID = event.target.value;
    this.fmsservice.GetStaff(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        let temp1: any = temp.filter(x => x.id == this.StaffID);
        this.StaffName = temp1[0].name;
        this.rateperhour = temp1[0].rateperhour
      }
    )
  }
  public onSearchChange(noofhrs) {
    debugger
    this.TotalExpense = noofhrs * this.rateperhour
  }
  public onSearchChange1(quantity) {
    debugger
    this.TotalExpense = quantity * this.Itemmrp
  }
  ItemCategory: any

  public GetCategory(event) {
    debugger
    this.ItemCategory = event.target.value;
  }
  ItemSubCategory: any
  public GetSubCategory(event) {
    debugger
    this.ItemSubCategory = event.target.value;
    this.fmsservice.GetItemTypes(1).subscribe(data => {
      let temp: any = data;
      this.Itemlist = temp.filter(x => x.typename == this.ItemSubCategory);
    });

  }
  Item
  public GetItem(event) {
    debugger
    this.Item = event.target.value;
    this.fmsservice.GetItemTypes(1).subscribe(data => {
      let temp: any = data;
      let temp1: any = temp.filter(x => x.short == event.target.value);
      this.Itemmrp = temp1[0].mrp;
    });

  }

  tablecount
  idcount
  StaffTypeName: any
  StaffName: any
  ExpenseDate: any
  noofhrs: any
  Remarks: any
  Quantity: any
  TotalExpense: any
  public insertdetails() {
    debugger
    if (this.StaffID == undefined) {
      Swal.fire("Please Select Staff")
    }
    else {
      this.tablecount = 1;
      var entity = {
        'sno': this.idcount,
        'StaffID': this.StaffID,
        'ExpenseType': this.ExpenseType,
        'StaffTypeID': this.StaffTypeID,
        'StaffTypeName': this.StaffTypeName,
        'StaffName': this.StaffName,
        'ExpenseDate': this.datepipe.transform(this.ExpenseDate, 'MM-dd-yyyy'),
        'noofhrs': this.noofhrs,
        'Remarks': this.Remarks,
        'ItemCategory': this.ItemCategory,
        'ItemSubCategory': this.ItemSubCategory,
        'Item': this.Item,
        'Quantity': this.Quantity,
        'TotalExpense': this.TotalExpense,
      }
      this.idcount = this.idcount + 1;
      this.qwert.push(entity);
      this.noofhrs = "";
      this.Remarks = "";
      this.ItemCategory = "";
      this.ItemSubCategory = "";
      this.Item = "";
      this.ExpenseDate = ""
      this.Item = ""
      this.ItemCategory = ""
      this.ItemSubCategory = ""
      this.Quantity = ""
      this.TotalExpense = ""
    }
  }

  public delete(sno) {
    debugger
    for (let i = 0; i < this.qwert.length; i++) {
      debugger
      if (sno == this.qwert[i].sno) {
        debugger
        this.qwert.splice(i, 1);
      }
    }
  }

  public insertdetails1() {
    debugger
    for (let i = 0; i < this.qwert.length; i++) {
      var entity2 = {
        'ExpenseType': this.qwert[i].ExpenseType,
        'ExpenseDate': this.qwert[i].ExpenseDate,
        'StaffTypeID': this.qwert[i].StaffTypeID,
        'StaffID': this.qwert[i].StaffID,
        'noofhrs': this.qwert[i].noofhrs,
        'Remarks': this.qwert[i].Remarks,
        'ItemCategory': this.qwert[i].ItemCategory,
        'ItemSubCategory': this.qwert[i].ItemSubCategory,
        'Item': this.qwert[i].Item,
        'Quantity': this.qwert[i].Quantity,
        'TotalExpense': this.qwert[i].TotalExpense,
        'Buildingid': localStorage.getItem('ProjectID'),
      }
      this.fmsservice.InsertProjectExpense(entity2).subscribe(data => {
        debugger
        if (data != undefined) {
          Swal.fire("Expense Saved Successfully");
          this.tablecount = 0;
          this.qwert.length = 0
          this.Itemmrp = 0;
          this.rateperhour = 0;
          location.href = "#/ProjectExpensesDash";
        }
      })
    }
  }

  public Update() {
    let Entity = {
      'ID': this.paramID,
      'ExpenseType': this.ExpenseType,
      'ExpenseDate': this.ExpenseDate,
      'StaffTypeID': this.StaffTypeID,
      'StaffID': this.StaffID,
      'noofhrs': this.noofhrs,
      'Remarks': this.Remarks,
      'ItemCategory': this.ItemCategory,
      'ItemSubCategory': this.ItemSubCategory,
      'Item': this.Item,
      'Quantity': this.Quantity,
      'TotalExpense': this.TotalExpense,
    }
    this.fmsservice.UpdateProjectExpense(Entity).subscribe(res => {
      debugger;
      Swal.fire('Updated Successfully!');
      location.href = "#/ProjectExpensesDash";

    })
  }

}
