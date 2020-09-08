import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-site-visit-reports-dashboard',
  templateUrl: './site-visit-reports-dashboard.component.html',
  styleUrls: ['./site-visit-reports-dashboard.component.css']
})
export class SiteVisitReportsDashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService,) { }
  projectlist1
  projectID
  options;
  value:any;
  ngOnInit() {
      this.projectID=0;
      this.options = {
        theme: 'default',
        range: 'tm',
        dayNames: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        presetNames: ['This Month', 'Last Month', 'This Week', 'Last Week', 'This Year', 'Last Year', 'Start', 'End'],
        dateFormat: 'dd/MM/yyyy',
        outputFormat: 'DD/MM/YYYY',
        startOfWeek: 4,
  
      };
    this.fmsservice.Get_Projects().subscribe(data => {
      debugger
      this.projectlist1 = data;
    })

    this.Get_SiteVisitReports();
  }

  GetProjectID(event) {
    debugger
    this.projectID = event.target.value;
    if (event.target.value == 0) {
      this.Get_SiteVisitReports();
    }
    else {
      this.fmsservice.Get_SiteVisitReports().subscribe(data => {
        debugger
        let temp: any = data;
        this.projectlist = temp.filter(x=>x.projectId ==this.projectID);
      })
    }
  }
  projectlist
  public Get_SiteVisitReports() {
    this.fmsservice.Get_SiteVisitReports().subscribe(data => {
      debugger
      this.projectlist = data;
    })
  }


  Attachmentlist
  public Attachment(evn) {
    let id=evn.id;
   this.fmsservice.Get_SiteVisitReports().subscribe(data => {
     debugger
     let temp:any=data;
     this.Attachmentlist= temp.filter(x=>x.id==id);
     
   })
 }

}
