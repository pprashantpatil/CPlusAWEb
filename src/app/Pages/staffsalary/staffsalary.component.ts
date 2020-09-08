import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-staffsalary',
  templateUrl: './staffsalary.component.html',
  styleUrls: ['./staffsalary.component.css']
})
export class StaffsalaryComponent implements OnInit {

  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  public pageMenuTitle;
  public staffsalary_PageTitle;
  public staffsalary_breadchrumb;
  public staffsalary_Building;
  public staffsalary_StaffName;
  public staffsalary_Role;
  public staffsalary_Leaves;
  public staffsalary_CrossSalary;
  public staffsalary_Deductions;
  public staffsalary_NetSalary;
  public staffsalary_Actions;
  public staffsalary_Button_pay;
  public StaffsalaryList = [];
  selectedlanguage: any;
  Buildinglist: any;
  buildingID: any;
  serachtext:any;

  ID: any;
  too: any;
  month: any;
  gross: any;
  staff: any;
  Deductions: any;
  NetSalary: any;
  buildname: any;
  Remarks: any;
  paymentID: any;
  Chequeno: any;
  bankname: any;
  month1: any;

  Build: any;
  StaffName: any;
  Role: any;
  Leaves: any;
  GrossSalary: any
  StaffsalaryList1: any;
  buildingname: any;
  month3: any;



  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetstaffsalaryLanguageByLanguageID(this.selectedlanguage);
    this.GetStaffSalary(this.selectedlanguage);

    this.fmsservice.GetBuildinglist(this.selectedlanguage).subscribe(
      res => {
        this.Buildinglist = res;
      }
    )
  }

  closemodal(evn) {
    debugger;
    let modal = document.getElementById('id01');
    // if (evn.target == modal) {
    //modal.classList.remove("show");
    modal.style.display = "none";
    // }
  }
  public GetstaffsalaryLanguageByLanguageID(languageid) {
    this.fmsservice.GetstaffsalaryLanguageByLanguageID(languageid).subscribe(
      res => {
        debugger;
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.staffsalary_PageTitle = res[0].staffsalary_PageTitle;
        this.staffsalary_breadchrumb = res[0].staffsalary_breadchrumb;
        this.staffsalary_Building = res[0].staffsalary_Building;
        this.staffsalary_StaffName = res[0].staffsalary_StaffName;
        this.staffsalary_Role = res[0].staffsalary_Role;
        this.staffsalary_Leaves = res[0].staffsalary_Leaves;
        this.staffsalary_CrossSalary = res[0].staffsalary_CrossSalary;
        this.staffsalary_Deductions = res[0].staffsalary_Deductions;
        this.staffsalary_NetSalary = res[0].staffsalary_NetSalary;
        this.staffsalary_Actions = res[0].staffsalary_Actions;
        this.staffsalary_Button_pay = res[0].staffsalary_Button_pay;


      }
    )
  }
  openModel() {
    debugger;
    document.getElementById('id01').style.display = 'block'
  }


  public GetStaffSalary(languageid) {
    this.fmsservice.GetStaffSalary(languageid).subscribe(
      res => {
        debugger;
        this.StaffsalaryList1 = res;

        this.StaffsalaryList1.forEach(value => {

          if (value.h == 2) {
            debugger
            this.Build = value.building,
              this.StaffName = value.staff
            this.Role = value.role
            this.Leaves = value.leavestook
            this.GrossSalary = value.monthlySalary

            if (value.diffOfLeaves > 0) {

              this.Deductions = parseInt(value.diffOfLeaves) * parseInt(value.salaryPerDay)
              value['Deductions'] = this.Deductions;
            }
            else {

              this.Deductions = '0'
              value['Deductions'] = this.Deductions;
            }

            this.NetSalary = parseInt(this.GrossSalary) - parseInt(this.Deductions)
            value['NetSalary'] = this.NetSalary;
            debugger;

            this.StaffsalaryList.push(value);
            debugger
            debugger
          }


        });
      }
    )
  }


  FilterBuilding(buildingID) {
    debugger

    this.buildingID = buildingID.target.value;

    if (this.buildingID == "none") {
      this.fmsservice.GetStaffSalary(this.selectedlanguage).subscribe(
        res => {
          debugger;
          this.StaffsalaryList1 = res;

          this.StaffsalaryList1.forEach(value => {

            if (value.h == 2) {
              debugger
              this.Build = value.building,
                this.StaffName = value.staff
              this.Role = value.role
              this.Leaves = value.leavestook
              this.GrossSalary = value.monthlySalary

              if (value.diffOfLeaves > 0) {

                this.Deductions = parseInt(value.diffOfLeaves) * parseInt(value.salaryPerDay)
                value['Deductions'] = this.Deductions;
              }
              else {

                this.Deductions = '0'
                value['Deductions'] = this.Deductions;
              }

              this.NetSalary = parseInt(this.GrossSalary) - parseInt(this.Deductions)
              value['NetSalary'] = this.NetSalary;
              debugger;

              this.StaffsalaryList.push(value);
              debugger
            }


          });
        }
      )
    }

    else {

      // this.fmsservice.GetStaffSalary(this.selectedlanguage).subscribe(
      //   res => {
      //     debugger;
      //     this.StaffsalaryList=res;

      //     var list =this.StaffsalaryList.filter(X=>X.buildingID==this.buildingID)
      //     this.StaffsalaryList=list;
      //   }
      // )

      this.fmsservice.GetStaffSalary(this.selectedlanguage).subscribe(
        res => {
          debugger;
          this.StaffsalaryList = res;

          this.StaffsalaryList.forEach(value => {

            if (value.h == 2) {
              debugger
              this.Build = value.building,
                this.StaffName = value.staff
              this.Role = value.role
              this.Leaves = value.leavestook
              this.GrossSalary = value.monthlySalary

              if (value.diffOfLeaves > 0) {

                this.Deductions = parseInt(value.diffOfLeaves) * parseInt(value.salaryPerDay)
                value['Deductions'] = this.Deductions;
              }
              else {

                this.Deductions = '0'
                value['Deductions'] = this.Deductions;
              }

              this.NetSalary = parseInt(this.GrossSalary) - parseInt(this.Deductions)
              value['NetSalary'] = this.NetSalary;
              debugger;

              this.StaffsalaryList.push(value);
              var list = this.StaffsalaryList.filter(X => X.buildingID == this.buildingID)
              this.StaffsalaryList = list;
              debugger
            }


          });
        }
      )

    }

  }


  pay(data) {
    debugger


    this.ID = data.id,
      this.too = data.todaydate,
      this.month = data.month,
      this.gross = data.monthlySalary,
      this.staff = data.staff,
      this.Deductions = data.Deductions,
      this.NetSalary = data.NetSalary,
      this.buildname = data.building






  }


  paymenttype(paymentID) {
    debugger
    this.paymentID = paymentID.target.value;


  }


  paysalary() {
    debugger
    var Entity = {
      'Building': this.buildname,
      'StaffName': this.staff,
      'Month': this.too,
      'GrossSalary': this.gross,
      'Deductions': this.Deductions,
      'NetSalary': this.NetSalary,
      'Paymenttype': this.paymentID,
      'Remarks': this.Remarks,
      'Chequeno': this.Chequeno != undefined ? this.Chequeno : null,
      'BankName': this.bankname != undefined ? this.bankname : null,
      'LanguageID': this.selectedlanguage
    }


    this.fmsservice.InsertStaffSalary(Entity).subscribe(data => {
      debugger
      if (data != undefined) {

        Swal.fire("Staff Salary Paid Successfully")
       

        this.StaffsalaryList.length = 0

        this.fmsservice.GetStaffSalary(this.selectedlanguage).subscribe(
          res => {
            debugger;
            this.StaffsalaryList1 = res;

            this.StaffsalaryList1.forEach(value => {

              if (value.h == 2) {
                debugger
                this.Build = value.building,
                  this.StaffName = value.staff
                this.Role = value.role
                this.Leaves = value.leavestook
                this.GrossSalary = value.monthlySalary

                if (value.diffOfLeaves > 0) {

                  this.Deductions = parseInt(value.diffOfLeaves) * parseInt(value.salaryPerDay)
                  value['Deductions'] = this.Deductions;
                }
                else {

                  this.Deductions = '0'
                  value['Deductions'] = this.Deductions;
                }

                this.NetSalary = parseInt(this.GrossSalary) - parseInt(this.Deductions)
                value['NetSalary'] = this.NetSalary;
                debugger;

                this.StaffsalaryList.push(value);
                debugger
                debugger
              }


            });
          }
        )
        debugger
        this.InsertNotification()
      }

    })
  }



  InsertNotification() {
    debugger

    var Entity = {
      'Date': new Date(),
      'Event': 'Salary Paid',
      'FromUser': 'Admin',
      'ToUser': this.staff,
      'Message': this.Remarks,
      'Photo': 'photo',
      'Building': this.buildname,
    }

    this.fmsservice.InsertNotification(Entity).subscribe(data => {
      debugger
      if (data != undefined) {

        this.clear();

      }
    })
  }

  clear() {
    debugger
    this.Remarks = '',
      this.Chequeno = '',
      this.bankname = '',
      this.paymentID
  }


  filtermonth(month1) {
    debugger
    this.month1 = month1.target.value;

    if (this.month1 == '') {
      this.GetStaffSalary(this.selectedlanguage)
    }

    else {

      // this.fmsservice.GetStaffSalary(this.selectedlanguage).subscribe(
      //   res => {
      //     debugger;
      //     this.StaffsalaryList=res;

      //     var list=this.StaffsalaryList.filter(x=>x.month==this.month1)
      //     this.StaffsalaryList=list;
      //   }
      // );

      this.fmsservice.GetStaffSalary(this.selectedlanguage).subscribe(
        res => {
          debugger;
          this.StaffsalaryList = res;

          this.StaffsalaryList.forEach(value => {

            if (value.h == 2) {
              debugger
              this.Build = value.building,
                this.StaffName = value.staff
              this.Role = value.role
              this.Leaves = value.leavestook
              this.GrossSalary = value.monthlySalary

              if (value.diffOfLeaves > 0) {

                this.Deductions = parseInt(value.diffOfLeaves) * parseInt(value.salaryPerDay)
                value['Deductions'] = this.Deductions;
              }
              else {

                this.Deductions = '0'
                value['Deductions'] = this.Deductions;
              }

              this.NetSalary = parseInt(this.GrossSalary) - parseInt(this.Deductions)
              value['NetSalary'] = this.NetSalary;
              debugger;

              this.StaffsalaryList.push(value);
              var list = this.StaffsalaryList.filter(x => x.month == this.month1)
              this.StaffsalaryList = list;
              debugger
            }
          });
        }
      )

    }

  }




}

