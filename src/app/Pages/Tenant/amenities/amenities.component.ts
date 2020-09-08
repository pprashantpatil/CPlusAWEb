import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.css']
})
export class AmenitiesComponent implements OnInit {

  constructor(public fmsservice: FmsService, public router: Router) { }
  public Search;
  public Monthlist: any;
  public month: any;
  ngOnInit() {
    this.GetAmenitiesPayments();    
  }

  RentList;
  FilteredRentList;

  public GetAmenitiesPayments() {
    debugger
    this.fmsservice.GetAmenitiesPayments().subscribe(
      res => {
        debugger;
        this.RentList = res;
        this.FilteredRentList = this.RentList;
      }
    )
  }


  public Edit(evn) {
    debugger;
    let ID = evn.id;
    this.router.navigate(['/UpdateAmenitiesedit', ID]);
  }



  public Getdate(even) {
    debugger;
    this.month = even.target.value;
  }

}
