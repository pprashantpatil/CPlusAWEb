import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css']
})
export class RSVPComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }

  public rsvptabledata: any;
  public Search: any;
  public selectedlanguage: any;
  public buildinglist: any;
  public building: any;

  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetRsvptable();
    this.Getbuilding(this.selectedlanguage)
  }

  public GetRsvptable() {
    this.fmsservice.GetRSVPTable().subscribe(data => {
      debugger
      this.rsvptabledata = data;
    })
  }

  public Getbuilding(languageID) {
    this.fmsservice.GetBuildinglist(languageID).subscribe(data => {
      debugger
      this.buildinglist = data;
    })
  }

  public GetbuildingId(even) {
    debugger
    this.building = even.target.value;

  }

}
