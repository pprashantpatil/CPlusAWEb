import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute } from '@angular/router'
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.css']
})
export class CreateCompanyComponent implements OnInit {

  constructor(public fmsservice: FmsService, public activatedRoute: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit() {
  }

  Name: any;
  Address: any;
  PhoneNo: any;
  UserName: any;
  Password: any;
  EmailID: any;
  ContactName: any;
  NoOfUsers: any;
  public insertCompanyDetails() {

    Swal.fire("New Database is not Created....Please Contact Backend Team");
    // let Entity = {
    //   'Name': this.Name,
    //   'Address': this.Address,
    //   'PhoneNo': this.PhoneNo,
    //   'UserName': this.UserName,
    //   'Password': this.Password,
    //   'EmailID': this.EmailID,
    //   'ContactName': this.ContactName,
    //   'NoOfUsers': this.NoOfUsers
    // }
    // this.fmsservice.CompanyDetails(Entity).subscribe((data) => {
    //   if (data != null && data != undefined) {
    //     Swal.fire('Saved Successfully');
    //     location.href = "#/CompanyDashboard";
    //   }
    // })


  }

}
