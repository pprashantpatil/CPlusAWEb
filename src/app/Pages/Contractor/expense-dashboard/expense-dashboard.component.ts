import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-expense-dashboard',
  templateUrl: './expense-dashboard.component.html',
  styleUrls: ['./expense-dashboard.component.css']
})
export class ExpenseDashboardComponent implements OnInit {
  public barChartLegend = true;
  public barChartType: ChartType = 'bar';

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

  public barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Total Expense' },
    { data: [], label: 'Labour Expense' },
    { data: [], label: 'Material Expense' },

  ];
  constructor(public fmsService: FmsService, private route: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {
    this.GetProjectExpenseGraphDataInventory();



  }

  InventoryData
  public async GetProjectExpenseGraphDataInventory() {
    await this.fmsService.GetProjectExpenseGraphDataInventory().subscribe(
      res => {
        debugger
        this.InventoryData = res;
        // this.barChartData = this.ExpensesData;
        this.InventoryData = [this.InventoryData[11].total, this.InventoryData[10].total, this.InventoryData[9].total, this.InventoryData[8].total, this.InventoryData[7].total,
        this.InventoryData[6].total, this.InventoryData[5].total, this.InventoryData[4].total, this.InventoryData[3].total, this.InventoryData[2].total, this.InventoryData[1].total, this.InventoryData[0].total];
        this.barChartData[1].data = this.InventoryData;
        this.GetProjectExpenseGraphDataService();
      }
    )
  }


  ServiceData
  public async GetProjectExpenseGraphDataService() {
    await this.fmsService.GetProjectExpenseGraphDataService().subscribe(
      res => {
        debugger
        this.ServiceData = res;
        // this.barChartData = this.ExpensesData;
        this.ServiceData = [this.ServiceData[11].total, this.ServiceData[10].total, this.ServiceData[9].total, this.ServiceData[8].total, this.ServiceData[7].total,
        this.ServiceData[6].total, this.ServiceData[5].total, this.ServiceData[4].total, this.ServiceData[3].total, this.ServiceData[2].total, this.ServiceData[1].total, this.ServiceData[0].total];
        this.barChartData[2].data = this.ServiceData;
        this.GetAllMaintenanceRequestCountByMonth();

      }
    )
  }



  ExpensesData: any
  public async GetAllMaintenanceRequestCountByMonth() {

    await this.fmsService.GetProjectExpenseGraphData().subscribe(
      res => {
        debugger
        this.ExpensesData = res;
        // this.barChartData = this.ExpensesData;
        this.ExpensesData = [this.ExpensesData[11].total, this.ExpensesData[10].total, this.ExpensesData[9].total, this.ExpensesData[8].total, this.ExpensesData[7].total,
        this.ExpensesData[6].total, this.ExpensesData[5].total, this.ExpensesData[4].total, this.ExpensesData[3].total, this.ExpensesData[2].total, this.ExpensesData[1].total, this.ExpensesData[0].total];
        this.barChartData[0].data = this.ExpensesData;
      }
    )
  }

}
