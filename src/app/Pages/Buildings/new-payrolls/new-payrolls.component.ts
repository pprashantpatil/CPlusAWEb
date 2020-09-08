import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ThemeService } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-new-payrolls',
  templateUrl: './new-payrolls.component.html',
  styleUrls: ['./new-payrolls.component.css']
})
export class NewPayrollsComponent implements OnInit {

  PayrollsID: any;

  constructor(public fmsservice: FmsService, private route: ActivatedRoute) { }
  Buildinglist: any;
  selectedlanguage: any;
  Stafflist: any;
  public BuildingID: any;
  public BuildingName: any;
  public Staffname: any;

  public StaffEntity = {
    StaffID: 0,
    StaffName: "Name",
    Designation: "",
    Department: "",
    MobileNo: 0,
    EmailID: "",
    TotalLeavesEntitled: 0,
    LeavesthisMonth: 2,
    LOPDays: 0,
    LOPAmount: 0,
    GrossSalaryMonthly: 0,
    DeductionPF: 0,
    DeductionPT: 0,
    DeductionTax: 0,
    DeductionInsurance: 0,
    NetPayMonthly: 0

  }

  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetBuildinglist1(this.selectedlanguage).subscribe(data => {
      debugger
      this.Buildinglist = data;
      this.route.params.subscribe(params => {
        debugger;
        this.PayrollsID = params['id'];
        if (params['id'] != undefined) {
          this.PayrollsID = params['id'];
          this.GetStaffDetailsByID(this.PayrollsID);
        }

      }
      );
    })

    this.fmsservice.GetStaffByBuildID(69).subscribe(data => {
      debugger
      this.Stafflist = data;

      this.Staffname = this.Stafflist[0].name
    })

  }

  StaffSalDetails;
  FilteredSalDetails;
  StaffmonthlySalary;
  StaffsalaryPerDay;
  Staffavailableleaves;
  BaseSalary;
  public GetStaffID(evn) {
    debugger;
    this.fmsservice.GetStaffSalary(1).subscribe(
      res => {
        debugger;
        this.StaffSalDetails = res;
        this.FilteredSalDetails = this.StaffSalDetails.filter(x => x.id == evn.target.value);
        this.StaffmonthlySalary = this.FilteredSalDetails[0].grossSalary;
        this.StaffsalaryPerDay = this.FilteredSalDetails[0].salaryPerDay;
        this.Staffavailableleaves = this.FilteredSalDetails[0].availableleaves;
        this.BaseSalary = this.FilteredSalDetails[0].baseSal
        this.GetStaffNoOfDays(this.FilteredSalDetails[0].id);

      }
    )
  }


  NoofDaysLists = [];
  NoOfLeaves;
  LOPAmounts;
  NetPay;
  //TotalSalAfterLeavesDeductions;
  NoOfLeavesTookMonthly;
  public GetStaffNoOfDays(ID) {
    debugger;
    this.fmsservice.GetStaffNoOfDays(ID, 10).subscribe(data => {
      debugger
      this.NoofDaysLists = data;

      let NoOfLeavesTook = 0;
      let NoOfLeavesTookMonthly = 0;
      let TotalSalAfterLeavesDeductions = 0
      for (let i = 0; i < this.NoofDaysLists.length; i++) {
        // if (this.NoofDaysLists[i].noOfDays == "Half Day") {
        //   this.NoofDaysLists[i].noOfDays = 0.5;
        // }
        NoOfLeavesTookMonthly = NoOfLeavesTookMonthly + Number(this.NoofDaysLists[i].noOfDays);

      }

      let salperday = this.StaffmonthlySalary / 30
      this.LOPAmounts = (NoOfLeavesTookMonthly - 2) * salperday

      TotalSalAfterLeavesDeductions = this.StaffmonthlySalary - (NoOfLeavesTookMonthly * salperday);
      this.NoOfLeaves = Number(NoOfLeavesTookMonthly) - 2;

      // this.LOPAmounts=Number(TotalSalAfterLeavesDeductions);

      this.NetPay = (this.StaffEntity.GrossSalaryMonthly - this.StaffEntity.LOPAmount) - (this.StaffEntity.DeductionPF + this.StaffEntity.DeductionPT + this.StaffEntity.DeductionTax)
    })
  }





  public GetStaffDetailsByID(ID) {
    debugger;
    this.fmsservice.GetStaffDetailsByID(ID).subscribe(
      res => {
        debugger;
        // this.fmsservice.GetStaffByBuildID(69).subscribe(data => {
        //   debugger
        //   this.Stafflist = data;

        //   this.Staffname = this.Stafflist[0].name
        // })
        this.StaffEntity.StaffID = res[0].id;
        this.StaffEntity.Designation = res[0].designation;
        this.StaffEntity.Department = res[0].department;
        this.StaffEntity.MobileNo = res[0].mobileNo;
        this.StaffEntity.EmailID = res[0].emailID;
        this.Staffavailableleaves = res[0].totalLeavesEntitled;
        this.StaffEntity.LeavesthisMonth = res[0].leavesthisMonth;
        this.NoOfLeaves= res[0].lopDays;
        this.LOPAmounts = res[0].lopAmount;
        this.StaffEntity.GrossSalaryMonthly = res[0].grossSalaryMonthly;
        this.StaffEntity.DeductionPF = res[0].deductionPF;
        this.StaffEntity.DeductionPT = res[0].deductionPT;
        this.StaffEntity.DeductionTax = res[0].deductionTax;
        this.StaffEntity.DeductionInsurance = res[0].deductionInsurance;
        this.StaffEntity.NetPayMonthly = res[0].netPayMonthly;
        this.BaseSalary=res[0].baseSal;
       this.StaffmonthlySalary=res[0].grossSalary;
      }
    )
  }


  public UpdateStaffDetails() {
    debugger;
    this.StaffEntity.LOPAmount= this.LOPAmounts;
    this.StaffEntity.LOPDays=this.NoOfLeaves;
    this.StaffEntity.TotalLeavesEntitled=this.Staffavailableleaves;
    this.fmsservice.UpdateStaffDetails(this.PayrollsID, this.StaffEntity).subscribe(res => {
      debugger;
      Swal.fire('Payrolls Updated Successfully!');
    })
  }




  getbuildingID(Building) {
    debugger

    if (Building.target) {
      this.BuildingID = Building.target.value;
    } else {
      this.BuildingID = Building;
    }
    this.BuildingID = Building.target.value
    debugger
    var build = this.Buildinglist.filter(X => X.id == this.BuildingID)

    this.BuildingName = build[0].name

    this.fmsservice.GetStaffByBuildID(69).subscribe(data => {
      debugger
      this.Stafflist = data;

      this.Staffname = this.Stafflist[0].name
    })
  }



  public InsertStaffDetails() {
    debugger;
    this.StaffEntity.TotalLeavesEntitled = this.Staffavailableleaves;
    this.StaffEntity.LOPDays = this.NoOfLeaves;
    this.StaffEntity.LOPAmount = this.LOPAmounts;
    this.StaffEntity.GrossSalaryMonthly = this.StaffmonthlySalary;
    this.StaffEntity.NetPayMonthly = (this.StaffEntity.GrossSalaryMonthly - this.StaffEntity.LOPAmount) - (this.StaffEntity.DeductionPF + this.StaffEntity.DeductionPT + this.StaffEntity.DeductionTax)
    this.fmsservice.InsertStaffDetails(this.StaffEntity).subscribe(res => {
      debugger;
      Swal.fire('Saved Successfully');
      this.Clear();
    })
  }

  public Clear() {
    this.StaffEntity.StaffID = 0,
      this.StaffEntity.StaffName = "Name",
      this.StaffEntity.Designation = "",
      this.StaffEntity.Department = "",
      this.StaffEntity.MobileNo = 0,
      this.StaffEntity.EmailID = "",
      this.StaffEntity.TotalLeavesEntitled = 0,
      this.StaffEntity.LeavesthisMonth = 0,
      this.StaffEntity.LOPDays = 0,
      this.StaffEntity.LOPAmount = 0,
      this.StaffEntity.GrossSalaryMonthly = 0,
      this.StaffEntity.DeductionPF = 0,
      this.StaffEntity.DeductionPT = 0,
      this.StaffEntity.DeductionTax = 0,
      this.StaffEntity.DeductionInsurance = 0

  }

}
