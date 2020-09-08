import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-closed-projects',
  templateUrl: './closed-projects.component.html',
  styleUrls: ['./closed-projects.component.css']
})
export class ClosedProjectsComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }

  ngOnInit() {
    this.GetClosedProjects();
  }

  Closedprojects
  public GetClosedProjects() {
    this.fmsservice.GetClosedProjects().subscribe(
      res => {
        this.Closedprojects = res;
      }
    )
  }
}
