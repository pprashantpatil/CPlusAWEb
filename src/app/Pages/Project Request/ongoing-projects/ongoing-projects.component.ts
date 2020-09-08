import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ExportToCsv } from 'export-to-csv';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-ongoing-projects',
  templateUrl: './ongoing-projects.component.html',
  styleUrls: ['./ongoing-projects.component.css']
})
export class OngoingProjectsComponent implements OnInit {


  constructor(public fmsservice: FmsService) { }
  public pageMenuTitle: any;
  public Project_bereadcrumb: any;
  public project_pageTitle: any;

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetProjectRequestLanguageByLanguageID(selectedlanguage);
    this.GetOngoingProjects();
  }
  public GetProjectRequestLanguageByLanguageID(LanguageID) {
    this.fmsservice.GetProjectRequestLanguageByLanguageID(LanguageID).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.Project_bereadcrumb = res[0].Project_bereadcrumb;
        this.project_pageTitle = res[0].project_pageTitle;
      }
    )
  }

  Ongoingprojects
  public GetOngoingProjects() {
    this.fmsservice.GetOngoingProjects().subscribe(
      res => {
        this.Ongoingprojects = res;
      }
    )
  }
}
