import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../services/fms.service';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-staff-main-dashboard',
  templateUrl: './staff-main-dashboard.component.html',
  styleUrls: ['./staff-main-dashboard.component.css']
})
export class StaffMainDashboardComponent implements OnInit {
  public pickeroptions: any;
  public barChartLegend = true;
  public barChartType: ChartType = 'bar';
  public barChartType1: ChartType = 'bar';

  public barChartOptions_56: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ ticks: { min: 0, stepSize: 2000, max: 15000, } }] },
    plugins: {
      datalabels: {
        anchor: 'start',
        align: 'start',
      }
    }
  };

  public barChartOptions_567: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ ticks: { min: 0, stepSize: 20, max: 100, } }] },
    plugins: {
      datalabels: {
        anchor: 'start',
        align: 'start',
      }
    }
  };


  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ ticks: { min: 0, stepSize: 100, max: 1000, } }] },
    plugins: {
      datalabels: {
        anchor: 'start',
        align: 'start',
      }
    }
  };

  public barChartOptions_5678: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{ ticks: { min: 0, stepSize: 1000, max: 10000, } }] },
    plugins: {
      datalabels: {
        anchor: 'start',
        align: 'start',
      }
    }
  };


  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'Green',

    },

    { // red
      backgroundColor: '#29b1f0',

    },

    { // red
      backgroundColor: '#FF0000',

    }
  ];



  public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  public barChartLabels1: Label[] = ['PRE-DESIGN PHASE', 'SCHEMATIC DESIGN PHASE', 'DESIGN PHASE', 'DOCUMENTATION PHASE', 'ADMINISTRATION PHASE'];


  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Total Expense' },
    { data: [], label: 'Labour Expense' },
    { data: [], label: 'Material Expense' },

  ];


  public barChartData1: ChartDataSets[] = [
    { data: [], label: 'Complete Percentage' }
  ];


  public barChartColorsVisitors: Color[] = [
    { backgroundColor: '#7ebefe' },
    { backgroundColor: '#5adad4' },
    { backgroundColor: '#1db5b5' },
    { backgroundColor: '#e94b26' },

  ]
  public barChartData2: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 2000, 0, 0, 0, 0], label: 'Total Expense' },
    { data: [0, 0, 0, 0, 0, 0, 500, 0, 0, 0, 0], label: 'Material Expense' },
    { data: [0, 0, 0, 0, 0, 0, 500, 0, 0, 0, 0], label: 'Labour Expense' },
    { data: [0, 0, 0, 0, 0, 0, 1000, 0, 0, 0, 0], label: 'Other Expense' }
  ];


  public barChartData3: ChartDataSets[] = [
    { data: [], label: 'Actual Hours' },
    { data: [], label: 'Budget Hours' },
    { data: [], label: 'Overbudget Hours' },

  ];



  public barChartData4: ChartDataSets[] = [
    { data: [], label: 'Budget Hours ' },
    { data: [], label: 'Actual Hours ' },

  ];






  constructor(public fmsservice: FmsService, private datePipe: DatePipe) { }
  BuildingStaffList: any;
  FilteredBuildingStaffList: any;
  ProjectID: any;
  TotalNoOfStaffCount: any;
  ProjectTeamList: any;
  AssignedTo: any;
  StaffLeaves: any;
  NoOfStaffLeavesCount: any;
  projectlist: any;
  TotalNoOfMeetings: any;
  detailslist: any;
  NoOfReviewsCount: any;
  StaffLeaves2: any;
  StaffLeaves3: any;
  ApprovedCount: any;
  RejectedCount: any;
  value: any;
  ProjectName: any;
  LoginTypeID: any;
  Buildinglist: any;
  AbsenteesLists: any;
  AbsenteesCount: any;
  ActionItemsLists: any;
  ActionItemsListsToDO: any;
  ActionItemsListsDoing: any;
  ActionItemsListsDone: any;
  DailyReports: any;
  AssetsLists: any;
  AssetsCount: any;
  EmailsLists: any;
  Warrantygreaterthenfive: any;
  WarrantyAssetsCount: any;
  StaffLists: any;
  memberlist: any;
  DailyStaffID: any;
  CategoryLists: any;
  EquipmentTypeList: any;
  InventoryLists: any;
  LoginID: any;
  ClientContacts: any;
  username: any;
  ContactID: any;
  ProjectType: any;
  architecturalLists: any;
  ProjectProgress: any;
  innerWidth: any;
  MobUI: any;
  ngOnInit() {
    debugger;

    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1337) {
      this.MobUI = 1;
      localStorage.setItem('MobUI', this.MobUI);
    } else {
      this.MobUI = 0;
      localStorage.setItem('MobUI', this.MobUI);
    }


    this.fmsservice.GetDashboardProjectProgress(localStorage.getItem('ProjectID')).subscribe(
      res => {
        this.ProjectProgress = res;
        this.ProjectProgress = [this.ProjectProgress[0].total, this.ProjectProgress[1].total, this.ProjectProgress[2].total, this.ProjectProgress[3].total, this.ProjectProgress[4].total];
        this.barChartData1[0].data = this.ProjectProgress;

      }
    )
    this.ProjectID = localStorage.getItem('ProjectID');
    this.ProjectName = localStorage.getItem('ProjectName');
    this.ProjectType = localStorage.getItem('ProjectType');
    this.MonthID = 7;
    this.DailyStaffID = 0;
    this.ContactID = "none";
    this.LoginID = localStorage.getItem("LoginTypeID");
    // this.ProjectID = localStorage.getItem('ProjectID');
    this.username = localStorage.getItem('username');
    let UserID = localStorage.getItem('userid');
    this.GetInventory();
    this.GetPODashborad();
    this.GetSuppilerDetails();
    this.GetProjectExpenseGraphDataInventory();
    //this.GetBudgetReports();
    this.GetBudgetReportsLessthan();
    this.GetBudgetReportsGreaterthan();
    this.GetBudgetReportsStageWise();
    this.GetBudgetReportsByMonth();


    this.fmsservice.Get_ProjectTimeLineByDate('2020/06/01', '2020/06/30').subscribe(data => {
      debugger
      this.ProjectTimelineLists = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID);
      this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
    })

    this.fmsservice.Get_ArchitecturalProjectTimeLine().subscribe(data => {
      debugger
      let temp: any = data;
      this.architecturalLists = temp.filter(x => x.projectID == this.ProjectID);
    })


    this.fmsservice.Get_ClientContacts().subscribe(data => {
      let temp: any = data;
      this.ClientContacts = temp.filter(x => x.projectID == this.ProjectID);
    })


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

    this.fmsservice.GetBuildingStaff(1).subscribe(data => {
      debugger
      this.StaffLists = data.filter(x => x.buildingid == localStorage.getItem('ProjectID'));
    })

    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      let temp: any = data
      this.memberlist = temp.filter(x => x.projectID == localStorage.getItem('ProjectID'));
    })


    this.AssignedTo = 'none';
    this.fmsservice.GetMyAbsentStaff('2020-01-01', '2020-12-31').subscribe(
      res => {
        debugger;
        this.AbsenteesLists = res.filter(x => x.buildingid == localStorage.getItem('ProjectID'));
        this.AbsenteesCount = this.AbsenteesLists.length;

      }
    )
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };

    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      this.ProjectTeamList = data.filter(x => x.projectID == localStorage.getItem('ProjectID'));
    })


    this.fmsservice.GetProjectTeam().subscribe(
      res => {
        debugger;
        this.BuildingStaffList = res;
        this.FilteredBuildingStaffList = this.BuildingStaffList.filter(x => x.projectID == localStorage.getItem('ProjectID'));
        this.TotalNoOfStaffCount = this.FilteredBuildingStaffList.length;
      }
    )


    this.fmsservice.GetStaffLeaves(1).subscribe(
      res => {
        let temp: any = res
        this.StaffLeaves = temp.filter(x => x.buildingid == this.ProjectID && x.status == null);
        this.NoOfStaffLeavesCount = this.StaffLeaves.length;

      }
    )


    this.fmsservice.GetAllAssetbymonths(this.ProjectID, 6).subscribe(
      res => {
        let temp: any = res
        this.AssetsLists = temp;
        this.AssetsCount = this.AssetsLists.length;
      }
    )

    this.fmsservice.Get5YearWarrentyAssetsNew(this.ProjectID).subscribe(
      res => {
        let temp: any = res
        this.Warrantygreaterthenfive = temp;
        this.WarrantyAssetsCount = this.Warrantygreaterthenfive.length;
      }
    )



    this.fmsservice.GetStaffLeaves(1).subscribe(
      res => {
        let temp: any = res
        this.StaffLeaves2 = temp.filter(x => x.buildingid == this.ProjectID && x.status == "Approved");
        this.ApprovedCount = this.StaffLeaves2.length;

      }
    )


    this.fmsservice.Get_Info_Exchange('2020-01-01', '2020-12-31').subscribe(data => {
      debugger
      let temp: any = data;
      this.EmailsLists = temp.filter(x => x.projectID == this.ProjectID);
    })

    this.fmsservice.GetStaffLeaves(1).subscribe(
      res => {
        let temp: any = res
        this.StaffLeaves3 = temp.filter(x => x.buildingid == this.ProjectID && x.status == "Rejected");
        this.RejectedCount = this.StaffLeaves3.length;

      }
    )

    this.fmsservice.GetMeetingMinutes().subscribe(data => {
      debugger
      this.projectlist = data.filter(x => x.projectID == this.ProjectID && x.dateflag == 1);
      this.TotalNoOfMeetings = this.projectlist.length;
    })


    this.fmsservice.GetMeetingMinutes().subscribe(data => {
      debugger
      this.projectlist1 = data.filter(x => x.projectID == this.ProjectID && x.meetingType == 'Direct Meeting' && x.dateflag == 1);
      this.PhysicalMeetingCount = this.projectlist1.length;
    })

    this.fmsservice.GetMeetingMinutes().subscribe(data => {
      debugger
      this.projectlist2 = data.filter(x => x.projectID == this.ProjectID && x.meetingType == 'Virtual Meeting' && x.dateflag == 1);
      this.VirtualMeetingCount = this.projectlist2.length;
    })

    this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
      debugger
      this.detailslist = data.filter(x => x.buildingID == this.ProjectID);
      this.NoOfReviewsCount = this.detailslist.length;

    })



    //Project Timeline


    this.LoginTypeID = localStorage.getItem('LoginTypeID');
    this.ProjectID = localStorage.getItem('ProjectID');
    this.StaffID = localStorage.getItem('UserID')
    this.pickeroptions = {
      theme: 'default',
      range: 'tm',
      dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
      dateFormat: 'dd/MM/yyyy',
      outputFormat: 'YYYY/MM/DD',
      startOfWeek: 1
    };
    this.Get_ProjectTimeLine();
    this.fmsservice.Get_Projects().subscribe(data => {
      debugger
      this.projectlist1 = data;
    })
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.Buildinglist = data;
    })




    this.fmsservice.GetProjectTeam().subscribe(data => {
      debugger
      this.ProjectTeamList = data.filter(x => x.projectID == localStorage.getItem('ProjectID'));
    })

    if (this.LoginTypeID == '1') {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsLists = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID);
      })


      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsToDO = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'To Do');
      })


      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDoing = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Doing');
      })

      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsListsDone = data.filter(x => x.staffID == this.StaffID && x.projectId == this.ProjectID && x.status == 'Done');
      })

    } else {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID);
      })
    }
    this.fmsservice.GetBuildinglist(1).subscribe(data => {
      debugger
      this.Buildinglist = data;
    })


    this.fmsservice.Get_DailyReportByDate('2020-01-01', '2020-12-31').subscribe(data => {
      debugger
      let temp: any = data;
      this.DailyReports = temp.filter(x => x.projectID == this.ProjectID);

    })


  }

  BudgetReportsLists: any;
  BudgetReportsData: any;
  // public async GetBudgetReports() {
  //   await this.fmsservice.GetBudgetReports().subscribe(
  //     res => {
  //       debugger
  //       this.BudgetReportsLists = res;
  //       this.BudgetReportsData = [this.BudgetReportsLists[0].total, this.BudgetReportsLists[1].total, this.BudgetReportsLists[2].total, this.BudgetReportsLists[3].total, this.BudgetReportsLists[4].total];
  //       this.barChartData3[1].data = this.BudgetReportsData;
  //     }
  //   )
  // }


  BudgetReportsLessThanLists: any;

  public async GetBudgetReportsLessthan() {
    await this.fmsservice.GetBudgetReportsLessthan(localStorage.getItem('ProjectID')).subscribe(
      res => {
        debugger
        this.BudgetReportsLessThanLists = res;
        this.BudgetReportsData = [this.BudgetReportsLessThanLists[0].total, this.BudgetReportsLessThanLists[1].total, this.BudgetReportsLessThanLists[2].total, this.BudgetReportsLessThanLists[3].total, this.BudgetReportsLessThanLists[4].total];
        this.barChartData3[0].data = this.BudgetReportsData;
      }
    )
  }

  BudgetReportsGreaterThanLists: any;

  public async GetBudgetReportsGreaterthan() {
    await this.fmsservice.GetBudgetReportsGreaterthan(localStorage.getItem('ProjectID')).subscribe(
      res => {
        debugger
        this.BudgetReportsGreaterThanLists = res;
        this.BudgetReportsData = [this.BudgetReportsGreaterThanLists[0].total, this.BudgetReportsGreaterThanLists[1].total, this.BudgetReportsGreaterThanLists[2].total, this.BudgetReportsGreaterThanLists[3].total, this.BudgetReportsGreaterThanLists[4].total];
        this.barChartData3[2].data = this.BudgetReportsData;
      }
    )
  }



  BudgetReportsStageWiseLists: any;
  BudgetReportsStagewiseData: any;
  public async GetBudgetReportsStageWise() {
    await this.fmsservice.GetBudgetReportsStageWiseByBuildingID(localStorage.getItem('ProjectID')).subscribe(
      res => {
        debugger
        this.BudgetReportsStageWiseLists = res;
        this.BudgetReportsStagewiseData = [this.BudgetReportsStageWiseLists[0].total, this.BudgetReportsStageWiseLists[1].total, this.BudgetReportsStageWiseLists[2].total, this.BudgetReportsStageWiseLists[3].total, this.BudgetReportsStageWiseLists[4].total];
        this.barChartData3[1].data = this.BudgetReportsStagewiseData;

      }
    )
  }


  BudgetReportsByMonthLists: any;
  BudgetReportsByMonthData: any;
  BudgetReportsByMonthLists2: any;
  public async GetBudgetReportsByMonth() {
    await this.fmsservice.GetBudgetReportsByMonthByBuildingID(localStorage.getItem('ProjectID')).subscribe(
      res => {
        debugger
        this.BudgetReportsByMonthLists = res;
        this.BudgetReportsByMonthData = [this.BudgetReportsByMonthLists[0].total, this.BudgetReportsByMonthLists[1].total, this.BudgetReportsByMonthLists[2].total, this.BudgetReportsByMonthLists[3].total, this.BudgetReportsByMonthLists[4].total, this.BudgetReportsByMonthLists[5].total, this.BudgetReportsByMonthLists[6].total, this.BudgetReportsByMonthLists[7].total, this.BudgetReportsByMonthLists[8].total, this.BudgetReportsByMonthLists[9].total, this.BudgetReportsByMonthLists[10].total, this.BudgetReportsByMonthLists[11].total];
        this.barChartData4[0].data = this.BudgetReportsByMonthData;

      }
    )
    await this.fmsservice.GetProjectExpenseUpdate(localStorage.getItem('ProjectID')).subscribe(
      res => {
        debugger
        this.BudgetReportsByMonthLists2 = res;
        let temp = [this.BudgetReportsByMonthLists2[0].total, this.BudgetReportsByMonthLists2[1].total, this.BudgetReportsByMonthLists2[2].total, this.BudgetReportsByMonthLists2[3].total, this.BudgetReportsByMonthLists2[4].total, this.BudgetReportsByMonthLists2[5].total, this.BudgetReportsByMonthLists2[6].total, this.BudgetReportsByMonthLists2[7].total, this.BudgetReportsByMonthLists2[8].total, this.BudgetReportsByMonthLists2[9].total, this.BudgetReportsByMonthLists2[10].total, this.BudgetReportsByMonthLists2[11].total];
        this.barChartData4[1].data = temp;

      }
    )

  }




  InventoryData
  public async GetProjectExpenseGraphDataInventory() {
    await this.fmsservice.GetProjectExpenseGraphDataInventoryByBuildingID(localStorage.getItem('ProjectID')).subscribe(
      res => {
        debugger
        this.InventoryData = res;
        // this.barChartData = this.ExpensesData;
        this.InventoryData = [this.InventoryData[0].total, this.InventoryData[1].total, this.InventoryData[2].total, this.InventoryData[3].total, this.InventoryData[4].total,
        this.InventoryData[5].total, this.InventoryData[6].total, this.InventoryData[7].total, this.InventoryData[8].total, this.InventoryData[9].total, this.InventoryData[10].total, this.InventoryData[11].total];
        this.barChartData[1].data = this.InventoryData;
        this.GetProjectExpenseGraphDataService();
      }
    )
  }


  ServiceData
  public async GetProjectExpenseGraphDataService() {
    await this.fmsservice.GetProjectExpenseGraphDataServiceByBuildingID(localStorage.getItem('ProjectID')).subscribe(
      res => {
        debugger
        this.ServiceData = res;
        // this.barChartData = this.ExpensesData;
        this.ServiceData = [this.ServiceData[0].total, this.ServiceData[1].total, this.ServiceData[2].total, this.ServiceData[3].total, this.ServiceData[4].total,
        this.ServiceData[5].total, this.ServiceData[6].total, this.ServiceData[7].total, this.ServiceData[8].total, this.ServiceData[9].total, this.ServiceData[10].total, this.ServiceData[11].total];
        this.barChartData[2].data = this.ServiceData;
        this.GetAllMaintenanceRequestCountByMonth();

      }
    )
  }



  ExpensesData: any
  public async GetAllMaintenanceRequestCountByMonth() {

    await this.fmsservice.GetProjectExpenseGraphDataByBuildingID(localStorage.getItem('ProjectID')).subscribe(
      res => {
        debugger
        this.ExpensesData = res;
        // this.barChartData = this.ExpensesData;
        this.ExpensesData = [this.ExpensesData[0].total, this.ExpensesData[1].total, this.ExpensesData[2].total, this.ExpensesData[3].total, this.ExpensesData[4].total,
        this.ExpensesData[5].total, this.ExpensesData[6].total, this.ExpensesData[7].total, this.ExpensesData[8].total, this.ExpensesData[9].total, this.ExpensesData[10].total, this.ExpensesData[11].total];
        this.barChartData[0].data = this.ExpensesData;
      }
    )
  }









  StaffID;
  StaffLeaves1: any;
  PhysicalMeetingCount: any;
  projectlist1: any;
  projectlist2: any;
  VirtualMeetingCount: any;
  public GetStaffID(evn) {
    debugger;
    if (evn.target.value == 'none') {
      this.fmsservice.GetStaffLeaves(1).subscribe(
        res => {
          let temp: any = res
          this.StaffLeaves = temp.filter(x => x.buildingid == this.ProjectID && x.status == null);
          this.NoOfStaffLeavesCount = this.StaffLeaves.length;
        }
      )
      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.projectID == this.ProjectID);
        this.TotalNoOfMeetings = this.projectlist.length;
      })


      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        this.projectlist1 = data.filter(x => x.projectID == this.ProjectID && x.meetingType == 'Direct Meeting');
        this.PhysicalMeetingCount = this.projectlist1.length;
      })

      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        this.projectlist2 = data.filter(x => x.projectID == this.ProjectID && x.meetingType == 'Virtual Meeting');
        this.VirtualMeetingCount = this.projectlist2.length;
      })

      this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
        debugger
        this.detailslist = data.filter(x => x.buildingID == this.ProjectID);
        this.NoOfReviewsCount = this.detailslist.length;

      })

      this.fmsservice.GetStaffLeaves(1).subscribe(
        res => {
          let temp: any = res
          this.StaffLeaves2 = temp.filter(x => x.buildingid == this.ProjectID && x.status == "Approved");
          this.ApprovedCount = this.StaffLeaves2.length;

        }
      )


      this.fmsservice.GetStaffLeaves(1).subscribe(
        res => {
          let temp: any = res
          this.StaffLeaves3 = temp.filter(x => x.buildingid == this.ProjectID && x.status == "Rejected");
          this.RejectedCount = this.StaffLeaves3.length;

        }
      )


    }
    else {
      this.StaffID = evn.target.value;
      this.StaffLeaves1 = this.StaffLeaves.filter(x => x.buildingid == this.ProjectID && x.staffID == this.StaffID && x.status == null);
      this.NoOfStaffLeavesCount = this.StaffLeaves1.length;


      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        this.projectlist = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID);
        this.TotalNoOfMeetings = this.projectlist.length;
      })


      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        this.projectlist1 = data.filter(x => x.projectID == this.ProjectID && x.meetingType == 'Direct Meeting' && x.staffID == this.StaffID);
        this.PhysicalMeetingCount = this.projectlist1.length;
      })

      this.fmsservice.GetMeetingMinutes().subscribe(data => {
        debugger
        this.projectlist2 = data.filter(x => x.projectID == this.ProjectID && x.meetingType == 'Virtual Meeting' && x.staffID == this.StaffID);
        this.VirtualMeetingCount = this.projectlist2.length;
      })


      this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
        debugger
        this.detailslist = data.filter(x => x.staffID == this.StaffID && x.buildingID == this.ProjectID);
        this.NoOfReviewsCount = this.detailslist.length;

      })



      this.fmsservice.GetStaffLeaves(1).subscribe(
        res => {
          let temp: any = res
          this.StaffLeaves2 = temp.filter(x => x.buildingid == this.ProjectID && x.status == "Approved" && x.staffID == this.StaffID);
          this.ApprovedCount = this.StaffLeaves2.length;

        }
      )


      this.fmsservice.GetStaffLeaves(1).subscribe(
        res => {
          let temp: any = res
          this.StaffLeaves3 = temp.filter(x => x.buildingid == this.ProjectID && x.status == "Rejected" && x.staffID == this.StaffID);
          this.RejectedCount = this.StaffLeaves3.length;

        }
      )

    }

  }


  datelist;
  startdate: Date;
  enddate: Date;
  ProjectTimelineLists: any;
  FilteredProjectTimelineLists: any;
  public selectedDate(value) {
    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger
    //Date date= new Date('dd-MM-yyyy');
    if (this.LoginTypeID == 1) {
      this.fmsservice.Get_ProjectTimeLineByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
      })
    }
    else {
      this.fmsservice.Get_ProjectTimeLineByDate(this.startdate, this.enddate).subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.projectID == this.ProjectID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
      })
    }

  }



  public Get_ProjectTimeLine() {
    if (this.LoginTypeID == '1') {
      this.fmsservice.Get_ProjectTimeLine().subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.staffID == this.StaffID && x.projectID == this.ProjectID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
      })
    } else {
      this.fmsservice.Get_ProjectTimeLine().subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.projectID == this.ProjectID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
      })
    }
  }




  public SelectStaffDate(value) {
    debugger;

    debugger
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    debugger;

    this.fmsservice.GetMyAbsentStaff(this.startdate, this.enddate).subscribe(
      res => {
        debugger;
        this.AbsenteesLists = res;
        this.AbsenteesCount = this.AbsenteesLists.length;


      }
    )

  }




  public selectedActionItemsDate(value) {
    debugger;
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];

    this.fmsservice.Get_ActionItems(this.startdate, this.enddate).subscribe(data => {
      debugger
      this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID);
    })
  }



  public SelectMeetingDetailsStaffDate(value) {
    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];
    this.fmsservice.GetMeetingMinutesByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      let temp = data;
      this.projectlist = data.filter(x => x.projectID == this.ProjectID && x.dateflag == 0);
      this.TotalNoOfMeetings = this.projectlist.length;
    })


    this.fmsservice.GetMeetingMinutesByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      let temp = data;
      this.projectlist1 = data.filter(x => x.meetingType == 'Direct Meeting' && x.projectID == this.ProjectID && x.dateflag == 0);
      this.PhysicalMeetingCount = this.projectlist1.length;
    })


    this.fmsservice.GetMeetingMinutesByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      let temp = data;
      this.projectlist2 = data.filter(x => x.meetingType == 'Virtual Meeting' && x.projectID == this.ProjectID && x.dateflag == 0);
      this.VirtualMeetingCount = this.projectlist2.length;
    })

    this.fmsservice.GetMeetingMinutes().subscribe(data => {
      debugger
      this.projectlist1 = data.filter(x => x.projectID == this.ProjectID && x.meetingType == 'Direct Meeting' && x.staffID == this.StaffID);
      this.PhysicalMeetingCount = this.projectlist1.length;
    })

    this.fmsservice.GetMeetingMinutes().subscribe(data => {
      debugger
      this.projectlist2 = data.filter(x => x.projectID == this.ProjectID && x.meetingType == 'Virtual Meeting' && x.staffID == this.StaffID);
      this.VirtualMeetingCount = this.projectlist2.length;
    })




  }


  value1: any;
  public SelectProjectReviewsDate(value1) {
    this.datelist = value1.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];

    this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
      debugger
      this.detailslist = data.filter(x => x.buildingID == 2);
      this.NoOfReviewsCount = this.detailslist.length;

    })
  }



  public selectedDailyReportsDate(value) {

    this.datelist = value.split('-');
    debugger
    this.startdate = this.datelist[0];
    this.enddate = this.datelist[1];

    this.fmsservice.Get_DailyReportByDate(this.startdate, this.enddate).subscribe(data => {
      debugger
      let temp: any = data;
      this.EmailsLists = temp.filter(x => x.projectID == this.ProjectID);
    })

  }



  MonthID
  public GetMonthID(evn) {
    debugger;
    this.MonthID = evn.target.value;
    this.fmsservice.GetAllAssetbymonths(this.ProjectID, this.MonthID).subscribe(
      res => {
        let temp: any = res
        this.AssetsLists = temp;
        this.AssetsCount = temp[0].assetsCount;
      }
    )
  }


  public GetStaffIDprojectTimelines(evn) {
    this.StaffID = evn.target.value;
    if (this.StaffID == 0) {
      this.fmsservice.Get_ProjectTimeLine().subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.projectID == this.ProjectID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
      })
    }
    else {
      this.fmsservice.Get_ProjectTimeLine().subscribe(data => {
        debugger
        this.ProjectTimelineLists = data.filter(x => x.projectID == this.ProjectID && x.staffID == this.StaffID);
        this.FilteredProjectTimelineLists = this.ProjectTimelineLists;
      })
    }
  }

  SID: any;
  public GetStaffIDActionItems(evn) {
    this.SID = evn.target.value
    if (this.SID == 'none') {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID);
      })
    }
    else {
      this.fmsservice.Get_ActionItems('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        this.ActionItemsLists = data.filter(x => x.projectId == this.ProjectID && x.staffID == this.SID);
      })
    }
  }



  public GetStaffIDDailyReports(event) {
    this.StaffID = event.target.value;
    if (this.StaffID == 0) {
      this.fmsservice.Get_DailyReport().subscribe(data => {
        debugger
        let temp: any = data;
        this.DailyReports = temp.filter(x => x.projectID == this.ProjectID);
      })
    }
    else {
      this.fmsservice.Get_DailyReport().subscribe(data => {
        debugger
        let temp: any = data;
        this.DailyReports = temp.filter(x => x.projectID == this.ProjectID && x.createdBy == this.StaffID);
      })
    }
  }


  NewList: any
  photo: any
  supportlist1 = []
  photo1: any;
  ImagesOne: any;
  public GetPhotos(evn) {
    debugger
    let id = evn.id;
    this.fmsservice.GetDailyReportPhotos().subscribe(data => {
      debugger
      let temp: any = data;
      this.supportlist1 = temp.filter(x => x.dailyReportID == id);
      this.ImagesOne = this.supportlist1[0].photos;
    })
  }


  Attachmentlist
  public Attachment(evn) {
    let id = evn.id;
    this.fmsservice.Get_Info_Exchange('2020-01-01', '2020-12-31').subscribe(data => {
      debugger
      let temp: any = data;
      this.Attachmentlist = temp.filter(x => x.id == id);

    })
  }




  InventoryList: any
  Currentquanity: any;
  Expiringqty: any;
  Expiriredqty: any;
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


  public GetDashboardProjectProgress() {
    debugger;

    this.fmsservice.GetDashboardProjectProgress(localStorage.getItem('ProjectID')).subscribe(
      res => {
        this.ProjectProgress = res;
        this.ProjectProgress = [this.ProjectProgress[0].total, this.ProjectProgress[1].total, this.ProjectProgress[2].total, this.ProjectProgress[3].total, this.ProjectProgress[4].total];
        this.barChartData1[0].data = this.ProjectProgress;

      }
    )
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




  ContactsName: any;
  public GetContacts(evn) {
    debugger;
    if (evn.target.value == "none") {
      this.fmsservice.Get_Info_Exchange('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        let temp: any = data;
        this.EmailsLists = temp.filter(x => x.projectID == this.ProjectID);
      })
    }
    else {
      this.fmsservice.Get_Info_Exchange('2020-01-01', '2020-12-31').subscribe(data => {
        debugger
        let temp: any = data;
        this.EmailsLists = temp.filter(x => x.projectID == this.ProjectID && x.firstName == evn.target.value);
      })
    }
  }

}
