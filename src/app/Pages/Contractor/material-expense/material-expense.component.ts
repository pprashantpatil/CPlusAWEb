import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '../../../../../node_modules/@angular/router';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-material-expense',
  templateUrl: './material-expense.component.html',
  styleUrls: ['./material-expense.component.css']
})
export class MaterialExpenseComponent implements OnInit {

  pickeroptions: any
  CategoryLists: any
  constructor(public fmsservice: FmsService, public router: Router) { }
  Grandtotal: any
  EquipmentList: any
  EquipmentNameList: any
  StaffTypelist: any;
  value: any;
  ngOnInit() {
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.ExpenseType = 0;
    this.Grandtotal = 0;
    this.getExpenses();
    this.fmsservice.GetCategoryItemMaster().subscribe(data => {
      debugger
      this.CategoryLists = data;
    })
    this.fmsservice.GetEquipmentType(1).subscribe(
      res => {
        debugger;
        this.EquipmentList = res;
      }
    )
    this.fmsservice.GetItemTypes(1).subscribe(
      res => {
        debugger;
        this.EquipmentNameList = res;
      }
    )
    this.fmsservice.GetStaffType(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffTypelist = temp.filter(x => x.id > 11);
      }
    )
  }

  ExpenseList: any
  public getExpenses() {
    debugger
    this.fmsservice.GetProjectExpense().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.expenseType == 'Service');
      this.ExpenseList = temp.filter(x => x.buildingid == localStorage.getItem('ProjectID'));
      let total1 = 0;
      this.ExpenseList.forEach(element => {
        total1 += element.totalExpense;
      });
      this.Grandtotal = total1.toLocaleString();
    })
  }

  public DeleteProject(id) {
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
        this.fmsservice.DeleteProjectExpense(id).subscribe(res => {
          let test = res;
          this.getExpenses();
        })
        Swal.fire(
          'Deleted!',
          'Project Exenpse has been deleted.',
          'success'
        )
      }
      else {
        this.getExpenses();
      }
    })
  }

  public Edit(ID) {
    this.router.navigate(['/ProjectExpenses', ID]);
  }
  ExpenseType: any
  public GetExpenseType(event) {
    debugger
    this.ExpenseType = event.target.value;
    if (this.ExpenseType == 0) {
      this.getExpenses();
    }
    else {
      this.fmsservice.GetProjectExpense().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.expenseType == 'Service');
        this.ExpenseList = temp.filter(x => x.expenseType == this.ExpenseType && x.buildingid == localStorage.getItem('ProjectID'));
        let total1 = 0;
        this.ExpenseList.forEach(element => {
          total1 += element.totalExpense;
        });
        this.Grandtotal = total1.toLocaleString();
      })
    }
  }
  datelist;
  startdate: Date;
  enddate: Date;

  public selectedDate(value) {
    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger
    //Date date= new Date('dd-MM-yyyy');
    this.fmsservice.GetProjectExpenseByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.expenseType == 'Service');
      this.ExpenseList = temp.filter(x => x.buildingid == localStorage.getItem('ProjectID'));
      let total1 = 0;
      this.ExpenseList.forEach(element => {
        total1 += element.totalExpense;
      });
      this.Grandtotal = total1.toLocaleString();
    })
  }
  Category
  public GetCategoryID(event) {
    this.Category = event.target.value;
    if (this.Category == 0) {
      this.getExpenses();
    }
    else {
      this.fmsservice.GetProjectExpense().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.expenseType == 'Service' && x.buildingid == localStorage.getItem('ProjectID'));
        this.ExpenseList = temp.filter(x => x.itemCategory == this.Category);
        let total1 = 0;
        this.ExpenseList.forEach(element => {
          total1 += element.totalExpense;
        });
        this.Grandtotal = total1.toLocaleString();
      })
    }
  }
  SubCategory
  public GetSubCategoryID(event) {
    this.SubCategory = event.target.value;
    if (this.SubCategory == 0) {
      this.getExpenses();
    }
    else {
      this.fmsservice.GetProjectExpense().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.expenseType == 'Service' && x.buildingid == localStorage.getItem('ProjectID'));
        this.ExpenseList = temp.filter(x => x.itemSubCategory == this.SubCategory);
        let total1 = 0;
        this.ExpenseList.forEach(element => {
          total1 += element.totalExpense;
        });
        this.Grandtotal = total1.toLocaleString();
      })
    }
  }
  Item
  public GetItemID(event) {
    this.Item = event.target.value;
    if (this.Item == 0) {
      this.getExpenses();
    }
    else {
      this.fmsservice.GetProjectExpense().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.expenseType == 'Service' && x.buildingid == localStorage.getItem('ProjectID'));
        this.ExpenseList = temp.filter(x => x.item == this.Item);
        let total1 = 0;
        this.ExpenseList.forEach(element => {
          total1 += element.totalExpense;
        });
        this.Grandtotal = total1.toLocaleString();
      })
    }
  }
  StaffType
  public GetStaffTypeID(event) {
    this.StaffType = event.target.value;
    this.fmsservice.GetStaff(1).subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffList = temp.filter(x => x.staffTypeID == this.StaffType);
      }
    )
    if (this.StaffType == 0) {
      this.getExpenses();
    }
    else {
      this.fmsservice.GetProjectExpense().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.expenseType == 'Service' && x.buildingid == localStorage.getItem('ProjectID'));
        this.ExpenseList = temp.filter(x => x.staffTypeID == this.StaffType);
        let total1 = 0;
        this.ExpenseList.forEach(element => {
          total1 += element.totalExpense;
        });
        this.Grandtotal = total1.toLocaleString();
      })
    }
  }
  Staff
  StaffList: any
  public GetStaffID(event) {
    this.Staff = event.target.value;
    if (this.Staff == 0) {
      this.fmsservice.GetProjectExpense().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.expenseType == 'Service' && x.buildingid == localStorage.getItem('ProjectID'));
        this.ExpenseList = temp.filter(x => x.staffTypeID == this.StaffType);
        let total1 = 0;
        this.ExpenseList.forEach(element => {
          total1 += element.totalExpense;
        });
        this.Grandtotal = total1.toLocaleString();
      })
    }
    else {
      this.fmsservice.GetProjectExpense().subscribe(data => {
        debugger
        let temp: any = data.filter(x => x.expenseType == 'Service' && x.buildingid == localStorage.getItem('ProjectID'));
        this.ExpenseList = temp.filter(x => x.staffID == this.Staff);
        let total1 = 0;
        this.ExpenseList.forEach(element => {
          total1 += element.totalExpense;
        });
        this.Grandtotal = total1.toLocaleString();
      })
    }
  }

  //Export to Excel
  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('Doc'));
    this.exportAsExcelFile(hhh, "Expense Dashboard");
  }

  public tableToJson(table) {
    debugger
    var data = []; // first row needs to be headers
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi, '');
    }
    // go through cells 
    for (var i = 1; i < table.rows.length; i++) {
      var tableRow = table.rows[i];
      var rowData = {};
      for (var j = 0; j < tableRow.cells.length - 1; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
      } data.push(rowData);
    }
    return data;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    debugger;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

}
