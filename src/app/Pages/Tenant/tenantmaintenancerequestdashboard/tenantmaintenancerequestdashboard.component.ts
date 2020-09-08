import { Component, OnInit } from '@angular/core';
import {FmsService} from '../../../services/fms.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-tenantmaintenancerequestdashboard',
  templateUrl: './tenantmaintenancerequestdashboard.component.html',
  styleUrls: ['./tenantmaintenancerequestdashboard.component.css']
})
export class TenantmaintenancerequestdashboardComponent implements OnInit {
  MaintenanceList:any;
  BuildingSearch:any;
  constructor(public fmsService:FmsService) { }

  ngOnInit() {

    this.fmsService.GetAllMaintenanceRequestByTenantID(localStorage.getItem('userid')).subscribe(data => {
      
      debugger
            this.MaintenanceList = data;
           
      
           
          });
      
  }


  DeleteMaintenanceRequest(maintID) {
    debugger

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover maintenance request!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this.fmsService.DeleteMaintenanceRequest(maintID).subscribe(data => {
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your maintenance request has been deleted.',
              'success'
            )
            this.fmsService.GetAllMaintenanceRequestByTenantID(localStorage.getItem('userid')).subscribe(data => {
      
              debugger
                    this.MaintenanceList = data;
                   
              
                   
                  });
          }
        })


      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your maintenance request is safe :)',
          'error'
        )
      }
    })



  }

}
