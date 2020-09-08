import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-credit-notes',
  templateUrl: './credit-notes.component.html',
  styleUrls: ['./credit-notes.component.css']
})
export class CreditNotesComponent implements OnInit {

  constructor(public fmsservice: FmsService) { }

  public pageMenuTitle;
  public vendor_PageTitle;
  public vendor_BreadChrumb;
  public vendor_NewButton;
  public vendor_Excel;
  public vendor_Search;
  public vendor_Name;
  public vendor_Date;
  public vendor_InvoiceNumber;
  public vendor_Remarks;
  public vendor_Amount;
  public CreditLists: any;
  public Search;


  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetCreditNotesLanguage(selectedlanguage);
    this.GetallCreditNotes(selectedlanguage);
  }
  GetCreditNotesLanguage(id) {
    this.fmsservice.GetCreditNotesLanguage(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.vendor_PageTitle = res[0].vendor_PageTitle;
        this.vendor_BreadChrumb = res[0].vendor_BreadChrumb;
        this.vendor_NewButton = res[0].vendor_NewButton;
        this.vendor_Excel = res[0].vendor_Excel;
        this.vendor_Search = res[0].vendor_Search;
        this.vendor_Name = res[0].vendor_Name;
        this.vendor_Date = res[0].vendor_Date;
        this.vendor_InvoiceNumber = res[0].vendor_InvoiceNumber;
        this.vendor_Remarks = res[0].vendor_Remarks;
        this.vendor_Amount = res[0].vendor_Amount;

      }

    )
  }

  public GetallCreditNotes(languageid) {
    this.fmsservice.GetallCreditNotes(languageid).subscribe(
      res => {
        debugger;
        this.CreditLists = res;
      }
    )
  }
  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Credits List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Credits List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.CreditLists);
  }

}
