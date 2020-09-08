import { Component, OnInit } from '@angular/core';
import {FmsService} from '../../../services/fms.service'
import Swal from 'sweetalert2';
import {ActivatedRoute,Router} from '@angular/router'


@Component({
  selector: 'app-shuttledashboard',
  templateUrl: './shuttledashboard.component.html',
  styleUrls: ['./shuttledashboard.component.css']
})
export class ShuttledashboardComponent implements OnInit {
  shuttlelist:any;
  Search1:any;
  traveltype:any;
  Vendlist:any;
  VendorID:any;
  VendorsByIDList:any;
  public aaa;
  public FileteredVendorsByIDList;
  public vendorname;
  public vendorphno;
  public RowID
  
  constructor(public fmsservice:FmsService,public activatedRoute:ActivatedRoute,public router:Router) { }

  ngOnInit() {

   
    this.fmsservice.GetBuildingShuttle().subscribe(data=>{
      debugger
      this.shuttlelist=data;
    });
  
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetVendorType(selectedlanguage)
  }

  public DeleteBuildingShuttle(id) {
    debugger;
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
        this.fmsservice.DeleteBuildingShuttle(id).subscribe(res => {
          let test = res;
          this.fmsservice.GetBuildingShuttle().subscribe(data=>{
            this.shuttlelist=data;
          });
        
        })
        Swal.fire(
          'Deleted!',
          'Data Has been deleted.',
          'success'
        )
      }
      else {
        this.fmsservice.GetBuildingShuttle().subscribe(data=>{
          debugger
          this.shuttlelist=data;
        });
      }
    })
  }


  public EditTransReq(evn) {
    debugger;
    let TransReqID = evn.id;
    let traveltype=evn.travelType
    localStorage.setItem('traveltype',traveltype);
    this.traveltype=localStorage.getItem('traveltype');
  
    this.router.navigate(['/UpdateTransportationRequest', TransReqID]);

  }
  public GetVendorType(languageid) {
    debugger;
    this.fmsservice.GetVendorType(languageid).subscribe(
      res => {
        debugger;
        this.Vendlist = res;
      }
    )
  }
  public VendorByID(evn) {
    debugger;
    this.VendorID = evn.target.value
    this.GetVendorByTypeID(this.VendorID)
  }
  public GetVendorByTypeID(VendorID) {
    debugger;
    this.fmsservice.GetVendorByTypeID(VendorID).subscribe(
      res => {
        debugger;
        this.VendorsByIDList = res;
      }
    )
  }
  public VendorName(evn) {
    debugger;
    this.aaa = evn.target.value;
    this.FileteredVendorsByIDList = this.VendorsByIDList.filter(x => x.id == this.aaa);
    this.vendorname = this.FileteredVendorsByIDList[0].emailID;
    this.vendorphno = this.FileteredVendorsByIDList[0].phoneNo;
  }

  public VendorAssignment(evn) {
    debugger;
    this.RowID = evn.id;
  }
  public UpdateAssignedTo() {
    debugger;
    // Swal.fire('Updated Successfully!')
    var Entity =
    {
      'ID': this.RowID,
      'Raisedto': this.aaa,
      'StatusID':8
    }
    this.fmsservice.UpdateAssainShuttle(Entity).subscribe(res => {
      debugger;
      Swal.fire('Transportation Request Assigned Successfully');
     
    this.fmsservice.GetBuildingShuttle().subscribe(data=>{
      debugger
      this.shuttlelist=data;
    });
    })
  }
}
