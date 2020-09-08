import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-finance-dashboard',
  templateUrl: './finance-dashboard.component.html',
  styleUrls: ['./finance-dashboard.component.css']
})
export class FinanceDashboardComponent implements OnInit {

  constructor(public fmsService: FmsService, private route: ActivatedRoute, public datepipe: DatePipe, public router: Router) { }
  Contractorlist: any;
  PendingCount: any;
  PaidCount: any;
  ProjectAssignedLists1: any;
  InvoiceList: any;
  FilteredInvoiceList: any;
  SupplierPaidInvoices: any;
  SupplierPendingInvoices: any;
  VendorList: any;
  FilteredVendorList: any;
  CreditLists: any;
  CreditNotesCount: any;
  projectlist: any;
  ProjectType: any;
  pendingClientCount: any;
  PaidclientCount: any;
  innerWidth: any;
  MobUI: any;

  public barChartLegend = true;
  public barChartType: ChartType = 'bar';
  public barChartType1: ChartType = 'bar';
  public barChartData1: ChartDataSets[] = [
    { data: [], label: 'Complete Percentage' }
  ];
  public barChartLabels1: Label[] = ['PRE-DESIGN PHASE', 'SCHEMATIC DESIGN PHASE', 'DESIGN PHASE', 'DOCUMENTATION PHASE', 'ADMINISTRATION PHASE'];
  public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
    scales: { xAxes: [{}], yAxes: [{ ticks: { min: 0, stepSize: 100, max: 500, } }] },
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


  public barChartData3: ChartDataSets[] = [
    { data: [], label: 'Actual Hours' },
    { data: [], label: 'Budget Hours' },
    { data: [], label: 'Overbudget Hours' },

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

  public barChartData4: ChartDataSets[] = [
    { data: [], label: ' Budget Hours' },
    // { data: [], label: 'Project Budget Hours' },

  ];

  ProjectProgress: any;
  projectlist1: any;

  projectlist10: any;
  ngOnInit() {

    this.GetBudgetReportsLessthan();
    this.GetBudgetReportsGreaterthan();
    this.GetBudgetReportsStageWise();
    this.GetBudgetReportsByMonth();
    this.fmsService.Get_ArchitecturalProjectTimeLine().subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist10 = temp.filter(x => x.projectID == 109 && x.accomplishment == '100%');
      // this.Count=this.projectlist.length;
    })
    this.fmsService.GetDashboardProjectProgress(localStorage.getItem('ProjectID')).subscribe(
      res => {
        this.ProjectProgress = res;
        this.ProjectProgress = [this.ProjectProgress[0].total, this.ProjectProgress[1].total, this.ProjectProgress[2].total, this.ProjectProgress[3].total, this.ProjectProgress[4].total];
        this.barChartData1[0].data = this.ProjectProgress;

      }
    )





    this.innerWidth = window.innerWidth;
    if (this.innerWidth <= 1337) {
      this.MobUI = 1;
      localStorage.setItem('MobUI', this.MobUI);
    } else {
      this.MobUI = 0;
      localStorage.setItem('MobUI', this.MobUI);
    }
    this.Contractorid = 0;

    this.ProjectType = localStorage.getItem('ProjectType');
    this.fmsService.Get_SubContractor().subscribe(data => {
      debugger
      let temp: any = data;
      this.Contractorlist = temp.filter(x => x.companyID == 1);

    })

    this.fmsService.GetDesignProjectInvoices('2020/01/01', '2022/01/01').subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist1 = temp.filter(x => x.projectID == localStorage.getItem('ProjectID') && x.status == 0);
      this.pendingClientCount = this.projectlist1.length;
    })

    this.fmsService.GetDesignProjectInvoices('2020/01/01', '2022/01/01').subscribe(data => {
      debugger
      let temp: any = data;
      this.projectlist = temp.filter(x => x.projectID == localStorage.getItem('ProjectID') && x.status == 1);
      this.PaidclientCount = this.projectlist.length;
    })

    this.fmsService.GetVendorList(1).subscribe(
      res => {
        debugger;
        this.VendorList = res;
        this.FilteredVendorList = this.VendorList;
      }
    )

    this.fmsService.GetallCreditNotes(1).subscribe(
      res => {
        debugger;
        this.CreditLists = res;
        this.CreditNotesCount = this.CreditLists.length;
      }
    )

    this.fmsService.GetContractorInvoice().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectAssignedLists = temp.filter(x => x.paidAmount == 0);
      this.PendingCount = this.ProjectAssignedLists.length;
    })

    this.fmsService.GetContractorInvoice().subscribe(data => {
      debugger
      let temp: any = data;
      this.ProjectAssignedLists1 = temp.filter(x => x.paidAmount != 0 && x.projectID == localStorage.getItem('ProjectID'));
      this.PaidCount = this.ProjectAssignedLists1.length;
    })


    this.fmsService.GetInvoiceAttachments("2020-01-01", "2020-12-31", 1).subscribe(
      res => {
        debugger;
        this.InvoiceList = res;
        this.FilteredInvoiceList = this.InvoiceList.filter(x => x.status == 'Pending');
        this.SupplierPendingInvoices = this.FilteredInvoiceList.length;
      }
    )

    this.fmsService.GetInvoiceAttachments("2020-01-01", "2020-12-31", 1).subscribe(
      res => {
        debugger;
        this.InvoiceList = res;
        this.FilteredInvoiceList = this.InvoiceList.filter(x => x.status == 'Paid');
        this.SupplierPaidInvoices = this.FilteredInvoiceList.length;
      }
    )
  }


  BudgetReportsByMonthLists: any;
  BudgetReportsByMonthData: any;

  public async GetBudgetReportsByMonth() {
    await this.fmsService.GetBudgetReportsByMonth().subscribe(
      res => {
        debugger
        this.BudgetReportsByMonthLists = res;
        this.BudgetReportsByMonthData = [this.BudgetReportsByMonthLists[0].total, this.BudgetReportsByMonthLists[1].total, this.BudgetReportsByMonthLists[2].total, this.BudgetReportsByMonthLists[3].total, this.BudgetReportsByMonthLists[4].total, this.BudgetReportsByMonthLists[5].total, this.BudgetReportsByMonthLists[6].total, this.BudgetReportsByMonthLists[7].total, this.BudgetReportsByMonthLists[8].total, this.BudgetReportsByMonthLists[9].total, this.BudgetReportsByMonthLists[10].total, this.BudgetReportsByMonthLists[11].total];
        this.barChartData4[0].data = this.BudgetReportsByMonthData;

      }
    )
  }


  BudgetReportsLessThanLists: any;
  BudgetReportsData: any;
  public async GetBudgetReportsLessthan() {
    await this.fmsService.GetBudgetReportsLessthan(localStorage.getItem('ProjectID')).subscribe(
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
    await this.fmsService.GetBudgetReportsGreaterthan(localStorage.getItem('ProjectID')).subscribe(
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
    await this.fmsService.GetBudgetReportsStageWise().subscribe(
      res => {
        debugger
        this.BudgetReportsStageWiseLists = res;
        this.BudgetReportsStagewiseData = [this.BudgetReportsStageWiseLists[0].total, this.BudgetReportsStageWiseLists[1].total, this.BudgetReportsStageWiseLists[2].total, this.BudgetReportsStageWiseLists[3].total, this.BudgetReportsStageWiseLists[4].total];
        this.barChartData3[1].data = this.BudgetReportsStagewiseData;

      }
    )
  }


  Contractorid: any;
  ProjectAssignedLists: any;
  public GetContractorID(event) {
    debugger
    this.Contractorid = event.target.value;
    if (this.Contractorid == 0) {
      this.fmsService.GetContractorInvoice().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.paidAmount == 0);
        this.PendingCount = this.ProjectAssignedLists.length;
      })

      this.fmsService.GetContractorInvoice().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists1 = temp.filter(x => x.paidAmount != 0 && x.projectID == localStorage.getItem('ProjectID'));
        this.PaidCount = this.ProjectAssignedLists1.length;
      })
    }
    else {
      this.fmsService.GetContractorInvoice().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists = temp.filter(x => x.contractorID == this.Contractorid && x.paidAmount == 0);
        this.PendingCount = this.ProjectAssignedLists.length;
      })

      this.fmsService.GetContractorInvoice().subscribe(data => {
        debugger
        let temp: any = data;
        this.ProjectAssignedLists1 = temp.filter(x => x.contractorID == this.Contractorid && x.paidAmount != 0 && x.projectID == localStorage.getItem('ProjectID'));
        this.PaidCount = this.ProjectAssignedLists1.length;
      })
    }
  }





  VendorID: any;
  public FilterByVendorName(evn) {
    debugger;
    this.VendorID = evn.target.value;

    if (this.VendorID == 'none') {
      this.fmsService.GetInvoiceAttachments("2020-01-01", "2020-12-31", 1).subscribe(
        res => {
          debugger;
          this.InvoiceList = res;
          this.FilteredInvoiceList = this.InvoiceList.filter(x => x.status == 'Pending');
          this.SupplierPendingInvoices = this.FilteredInvoiceList.length;
        }
      )

      this.fmsService.GetInvoiceAttachments("2020-01-01", "2020-12-31", 1).subscribe(
        res => {
          debugger;
          this.InvoiceList = res;
          this.FilteredInvoiceList = this.InvoiceList.filter(x => x.status == 'Paid');
          this.SupplierPaidInvoices = this.FilteredInvoiceList.length;
        }
      )
    }
    else {
      this.fmsService.GetInvoiceAttachments("2020-01-01", "2020-12-31", 1).subscribe(
        res => {
          debugger;
          this.InvoiceList = res;
          this.FilteredInvoiceList = this.InvoiceList.filter(x => x.status == 'Pending' && x.name == this.VendorID);
          this.SupplierPendingInvoices = this.FilteredInvoiceList.length;
        }
      )

      this.fmsService.GetInvoiceAttachments("2020-01-01", "2020-12-31", 1).subscribe(
        res => {
          debugger;
          this.InvoiceList = res;
          this.FilteredInvoiceList = this.InvoiceList.filter(x => x.status == 'Paid' && x.name == this.VendorID);
          this.SupplierPaidInvoices = this.FilteredInvoiceList.length;
        }
      )
    }
  }


}
