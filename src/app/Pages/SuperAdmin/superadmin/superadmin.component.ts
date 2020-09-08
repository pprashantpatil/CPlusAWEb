import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }

  ngOnInit() {
    this.fmsservice.Userlogin = false;
  }

}
