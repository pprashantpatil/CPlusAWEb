import { Component, OnInit } from '@angular/core';
import { FmsService } from '../../../services/fms.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-supstaffworkdash',
  templateUrl: './supstaffworkdash.component.html',
  styleUrls: ['./supstaffworkdash.component.css']
})
export class SupstaffworkdashComponent implements OnInit {

  constructor(public fmsservice: FmsService,) { }
  public leavelist:any;
  selectedlanguage:any;
  BuildingStaffList:any;
  detailslist:any;
  Staffsearch:any;
  supstaffworklist:any;

  ngOnInit() {
    this.selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
      debugger
      this.detailslist = data;
      let StaffID = localStorage.getItem("userid");
      var list=this.detailslist.filter(x=>x.supervisorID==StaffID)

      this.supstaffworklist=list


     
    })
  }



  public DeleteSchdule(id) {
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
        this.fmsservice.DeleteStaffWorkSchedule(id).subscribe(res => {
          let test = res;
          this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
            debugger
            this.detailslist = data;
            let StaffID = localStorage.getItem("userid");
            var list=this.detailslist.filter(x=>x.supervisorID==StaffID)
      
            this.supstaffworklist=list
      
      
           
          })
        })
        Swal.fire(
          'Deleted!',
          'Schedule been deleted.',
          'success'
        )
      }
      else {
        this.fmsservice.GetStaffWorkSchedule().subscribe(data => {
          debugger
          this.detailslist = data;
          let StaffID = localStorage.getItem("userid");
          var list=this.detailslist.filter(x=>x.supervisorID==StaffID)
          this.supstaffworklist=list
        })

      }
    })
  }

}
