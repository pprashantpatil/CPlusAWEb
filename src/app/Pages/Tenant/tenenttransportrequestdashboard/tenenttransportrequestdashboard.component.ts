import { Component, OnInit } from '@angular/core';
import {FmsService} from '../../../services/fms.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tenenttransportrequestdashboard',
  templateUrl: './tenenttransportrequestdashboard.component.html',
  styleUrls: ['./tenenttransportrequestdashboard.component.css']
})
export class TenenttransportrequestdashboardComponent implements OnInit {
  TransportList:any;
  BuildingSearch:any;


  constructor(public fmsService:FmsService) { }

  ngOnInit() {
    
    this.fmsService.GetAllTransportationRequestByID(localStorage.getItem('userid')).subscribe(data => { 
      debugger
            this.TransportList = data;          
           
          });
  }


 
  DeletetransportRequest(ID) {
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

        this.fmsService.DeleteTransportationRequest(ID).subscribe(data => {
          debugger
          if (data != undefined) {
            Swal.fire(
              'Deleted!',
              'Your Transport request has been deleted.',
              'success'
            )
            this.fmsService.GetAllTransportationRequestByID(localStorage.getItem('userid')).subscribe(data => { 
              debugger
                    this.TransportList = data;          
                   
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
