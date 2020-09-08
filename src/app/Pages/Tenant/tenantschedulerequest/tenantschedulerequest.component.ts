import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service'
import Swal from 'sweetalert2'



@Component({
  selector: 'app-tenantschedulerequest',
  templateUrl: './tenantschedulerequest.component.html',
  styleUrls: ['./tenantschedulerequest.component.css']
})
export class TenantschedulerequestComponent implements OnInit {
  ScheduleMaintenanceList: any;
  BuildingSearch: any;

  constructor(public fmsService: FmsService) { }

  ngOnInit() {

    this.fmsService.GetAllScheduleRequestByTenantID(localStorage.getItem('userid')).subscribe(data => {

      debugger
      this.ScheduleMaintenanceList = data;



    });
  }

}
