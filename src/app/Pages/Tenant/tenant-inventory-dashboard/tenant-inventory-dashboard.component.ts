import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tenant-inventory-dashboard',
  templateUrl: './tenant-inventory-dashboard.component.html',
  styleUrls: ['./tenant-inventory-dashboard.component.css']
})
export class TenantInventoryDashboardComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }

  public tenantlist: any;
  public Search: any;

  ngOnInit() {
    this.GetTenantInventory();
  }


  public GetTenantInventory() {
    this.fmsservice.GetTenantInventorymaster().subscribe(data => {
      debugger
      this.tenantlist = data;
    })
  }

  public deletetenantmaster(id) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.fmsservice.DeleteTenantInventorymaster(id).subscribe(data => {
          debugger
          if (data != null || data != undefined) {
            Swal.fire(
              'Deleted!',
              'Deleted Successfully',
              'success'
            )
            this.GetTenantInventory();
          }
        })
      }
    })
  }

}
