import { Component, OnInit } from '@angular/core';
import {FmsService} from '../../../services/fms.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tenantcomplaintdashboard',
  templateUrl: './tenantcomplaintdashboard.component.html',
  styleUrls: ['./tenantcomplaintdashboard.component.css']
})
export class TenantcomplaintdashboardComponent implements OnInit {
  ComplaintlistList:any;
  BuildingSearch:any;
  constructor(public fmsService:FmsService) { }

  ngOnInit() {

    this.fmsService.GetAllCOmplaintByTenantID(localStorage.getItem('userid')).subscribe(data => { 
      debugger
            this.ComplaintlistList = data;          
           
          });

  }

}
