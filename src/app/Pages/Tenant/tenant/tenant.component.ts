import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
// import * as XLSX from 'xlsx';
// const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
// const EXCEL_EXTENSION = '.xlsx';
// import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrls: ['./tenant.component.css']
})
export class TenantComponent implements OnInit {

  public pageMenuTitle;
  public tenant_PageTitle;
  public tenant_breadchrumb;
  public tenant_button_New;
  public tenant_search;
  public tenant_TenantName;
  public tenant_Tenanttype;
  public tenant_Phoneno;
  public tenant_Building;
  public tenant_Floor;
  public tenant_Unit;
  public tenant_Actions;
  public TenantList: any;
  public filteredtenantlist;
  public TenantSearch;
  public buildinglist;
  public confirmButtonText;
  public TenentAttachmentlist = [];
  public TenentlAgreementist = [];
  isupdatefiles = false;
  TenantAgreement = [];
  selectedTenentID;
  isAttachments = false;
  currentdocid;

  TenantID:any;
  date:any;
  Description:any;
  bit:any;


  FileName: any;
  FileType: any;
  base64textString: any;
  selectedlanguage: any;
  public filenamedetails = [];
  public filetypedetails = [];
  public base64textStringdetails = [];


  FileName1: any;
  FileType1: any;
  base64textString1: any;
  selectedlanguage1: any;
  public filenamedetails1 = [];
  public filetypedetails1 = [];
  public base64textStringdetails1 = [];




  constructor(public fmsservice: FmsService, public router: Router) { }

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetTenantLanguageByLanguageID(selectedlanguage);
    this.GetTenantList(selectedlanguage);
    this.getbuildingdropdown(selectedlanguage);
  }


  handleFileSelect1(evt) {
    debugger
    for (var i = 0; i < evt.target.files.length; i++) {
      debugger
      //console.log(evt);
      var File = evt.target.files[i];
      debugger
      // console.log(File);
      //let subStringData=File.substr(12,27);
      //console.log(X);
      var FileName = File.name.split('.')[0];
      var FileType = File.name.split('.')[1];

      debugger
      console.log(FileName);
      console.log(FileType);
      this.FileName = FileName;
      this.FileType = FileType;
      //this.filenamedetails.push({fname:this.FileName,ffile:this.FileType,base:this.base64textString});
      //this.filetypedetails.push(this.FileType);

      var files = evt.target.files;
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded1.bind(this);
        reader.readAsBinaryString(file);


      }

      this.filenamedetails.push({ fname: this.FileName, ffile: this.FileType, base: this.base64textStringdetails });
      debugger
    }


  }
  _handleReaderLoaded1(readerEvt) {

    debugger
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.base64textStringdetails.push(this.base64textString)
    console.log(this.base64textString);
    debugger

  }


  handleFileSelect2(evt) {
    debugger
    for (var i = 0; i < evt.target.files.length; i++) {
      debugger
      //console.log(evt);
      var File = evt.target.files[i];
      debugger
      // console.log(File);
      //let subStringData=File.substr(12,27);
      //console.log(X);
      var FileName1 = File.name.split('.')[0];
      var FileType1 = File.name.split('.')[1];

      debugger
      console.log(FileName1);
      console.log(FileType1);
      this.FileName1 = FileName1;
      this.FileType1 = FileType1;
      //this.filenamedetails.push({fname:this.FileName,ffile:this.FileType,base:this.base64textString});
      //this.filetypedetails.push(this.FileType);

      var files = evt.target.files;
      var file = files[i];
      if (files && file) {
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded2.bind(this);
        reader.readAsBinaryString(file);


      }

      this.filenamedetails1.push({ fname: this.FileName1, ffile: this.FileType1, base: this.base64textStringdetails1 });
      debugger
    }


  }
  _handleReaderLoaded2(readerEvt) {

    debugger
    var binaryString1 = readerEvt.target.result;
    this.base64textString1 = btoa(binaryString1);
    this.base64textStringdetails1.push(this.base64textString1)
    console.log(this.base64textString1);
    debugger

  }




  GetTenantLanguageByLanguageID(id) {
    this.fmsservice.GetTenantLanguageByLanguageID(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.tenant_PageTitle = res[0].tenant_PageTitle;
        this.tenant_breadchrumb = res[0].tenant_breadchrumb;
        this.tenant_button_New = res[0].tenant_button_New;
        this.tenant_search = res[0].tenant_search;
        this.tenant_TenantName = res[0].tenant_TenantName;
        this.tenant_Tenanttype = res[0].tenant_Tenanttype;
        this.tenant_Phoneno = res[0].tenant_Phoneno;
        this.tenant_Building = res[0].tenant_Building;
        this.tenant_Floor = res[0].tenant_Floor;
        this.tenant_Unit = res[0].tenant_Unit;
        this.tenant_Actions = res[0].tenant_Actions;
      }

    )
  }


  public GetTenantList(languageid) {
    debugger;
    this.fmsservice.GetTenantList(languageid).subscribe(
      res => {
        this.TenantList = res;
        this.filteredtenantlist = this.TenantList;
      }
    )
  }

  isupdate(doc) {
    debugger;
this.currentdocid=doc.id;
    this.isupdatefiles = true;
  }

  public getbuildingdropdown(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(res => {

      this.buildinglist = res;

    })
  }

  public filterbybuildingname(even) {
    if (even.target.value == "none") {
      this.filteredtenantlist = this.TenantList;
    }
    else {
      this.filteredtenantlist = this.TenantList.filter(x => x.buildingName == even.target.value);
    }
  }


  public EditTenent(evn) {

    let TenentID = evn.id;
    this.router.navigate(['/Updatetenent', TenentID]);
  }


  GettenantID(data,data1){
    debugger

    this.TenantID=data

    this.bit=data1

  }

  public DeleteTeanantAttachment(Attachment) {

    let agreementid = Attachment.id;
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
        if (this.confirmButtonText = "Yes, delete it!") {
          //   this.DeleteTenant(evn.id);
          this.fmsservice.DeleteTenantAgreement(agreementid).subscribe(res => {


          })
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }

  public DeleteTenent(evn) {

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
        if (this.confirmButtonText = "Yes, delete it!") {
          this.DeleteTenant(evn.id);
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }

  public DeleteTenant(ID) {

    this.fmsservice.DeleteTenant(ID).subscribe(res => {

      this.GetTenantList(1);
    })
  }
  public TenentAttachments(evn) {
    debugger;
    let ID = evn.id;
    this.GetTenantDocumentByID(ID);
  }

  public GetTenantDocumentByID(ID) {
    this.TenantAgreement.length = 0;
    this.selectedTenentID = ID;
    this.isAttachments = true;
    this.fmsservice.GetTenantDocumentByID(ID).subscribe(res => {
      debugger;
      this.TenentAttachmentlist = res;

    })
  }

  public TenentAgreements(evn) {
    debugger;
    let ID = evn.id;
    this.GetTenantAgreementByID(ID);
  }

  public GetTenantAgreementByID(ID) {
    this.TenantAgreement.length = 0;
    this.selectedTenentID = ID;
    this.isAttachments = false;
    this.fmsservice.GetTenantAgreementByID(ID).subscribe(res => {
      debugger;
      this.TenentlAgreementist = res;
    })
  }

  public DeleteTenantDocument(Attachment) {
    let agreementid = Attachment.id;
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
        if (this.confirmButtonText = "Yes, delete it!") {
          //   this.DeleteTenant(evn.id);
          this.fmsservice.DeleteTenantDocument(agreementid).subscribe(res => {


          })
        }
        Swal.fire(
          'Deleted!',
          'Your Data has been deleted.',
          'success'
        )
      }
    })
  }


  public TenantAgreementUpload(files: File[]) {
    debugger;
    this.TenantAgreement.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.TenantAgreement.push(files[i]);
    }
  }


  public uploadagreements(tenentID) {

    this.fmsservice.inserttenantAggrement(this.TenantAgreement).subscribe(res => {
      debugger;

      for (let i = 0; i < res.length; i++) {
        let agrementimgOrxlurl = "";
        let agrementpdfurl = "null";
        let ext = res[i].toString().substr(res[i].toString().lastIndexOf('.') + 1);
        if (ext == "jpg" || ext == "jpeg" || ext == "bmp" || ext == "gif" || ext == "png" || ext == "xls" || ext == "xlsx") {
          agrementimgOrxlurl = res[i].toString();
        }
        if (ext == "pdf") {
          agrementpdfurl == res[i].toString();
        }
        debugger;
    
        if(this.isupdatefiles){
          
          let updateEntity = {
            ID: this.currentdocid,
            Attachment: agrementimgOrxlurl,
            PDF: agrementpdfurl,
          }
          this.fmsservice.UpdateTenantAgreement(updateEntity).subscribe(res => {
            debugger;
  
            Swal.fire("Updated Successfully");
  
  
          })
        }
        else{
          let Entity = {
            TenantID: tenentID,
            Attachment: agrementimgOrxlurl,
            PDF: agrementpdfurl,
          }
          this.fmsservice.savetenantagrements(Entity).subscribe(res => {

            Swal.fire("saved Successfully");
  
          })
        }
     
        

      }
    })
  }


  public uploadattachments(tenentID) {

    this.fmsservice.TenantAttachmentDocumentUpload(this.TenantAgreement).subscribe(res => {
      debugger;
      for (let i = 0; i < res.length; i++) {
        let attachmentimgOrxlurl = "";
        let attachmentpdfurl = "null";
        let ext = res[i].toString().substr(res[i].toString().lastIndexOf('.') + 1);
        if (ext == "jpg" || ext == "jpeg" || ext == "bmp" || ext == "gif" || ext == "png" || ext == "xls" || ext == "xlsx") {
          attachmentimgOrxlurl = res[i].toString();
        }
        if (ext == "pdf") {
          attachmentpdfurl == res[i].toString();
        }

        debugger;
   
        if(this.isupdatefiles){
          
          let updateEntity = {
            ID: this.currentdocid,
            Attachment: attachmentimgOrxlurl,
            PDF: attachmentpdfurl,
          }
          this.fmsservice.UpdateTenantDocument(updateEntity).subscribe(res => {
            debugger;
  
            Swal.fire("Updated Successfully");
  
  
          })
        }
        else{
          let Entity = {
            TenantID: tenentID,
            Attachment: attachmentimgOrxlurl,
            PDF: attachmentpdfurl,
          }
          this.fmsservice.savetenantAttachments(Entity).subscribe(res => {
            debugger;
  
            Swal.fire("saved Successfully");
  
  
          })
        }
     
      }

    })

  }

  updatedDocuments() {
    debugger;
    
    if (this.isAttachments) {
      this.uploadattachments(this.selectedTenentID);
    }
    else {
      this.uploadagreements(this.selectedTenentID);
    }
  }

  

  // public gettenantexcel() {
  //   let hhh = this.tableToJson(document.getElementById('Tenant_master'));
  //   this.exportAsExcelFile(hhh, "Tenant");
  // }

  // public tableToJson(table) {
  //   debugger
  //   var data = []; // first row needs to be headers
  //   var headers = [];
  //   for (var i = 0; i < table.rows[0].cells.length; i++) {
  //     headers[i] = table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi, '');
  //   }
  //   // go through cells 
  //   for (var i = 1; i < table.rows.length; i++) {
  //     var tableRow = table.rows[i];
  //     var rowData = {};
  //     for (var j = 0; j < tableRow.cells.length - 1; j++) {
  //       rowData[headers[j]] = tableRow.cells[j].innerHTML;
  //     } data.push(rowData);
  //   }
  //   return data;
  // }

  // public exportAsExcelFile(json: any[], excelFileName: string): void {
  //   debugger;
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  //   const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  // private saveAsExcelFile(buffer: any, fileName: string): void {
  //   const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
  //   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  // }


  SaveTenentInspection(){
    debugger
    var filter={
      "Date":this.date,
      "TenantID":this.TenantID,
      "Description":this.Description,
      "bit":this.bit
    }

    this.fmsservice.InsertTenantInspection(filter).subscribe(data=>{
      debugger

      if(data!=undefined){
this.SavePhoto();
this.Savevideo();
this.clear();

      }
    })
  }






  SavePhoto(){
    debugger

    for (let j = 0; j < this.filenamedetails.length; j++) {

      var obj = {
        "TenantID":this.TenantID,
        "bit":this.bit,
        "FileType": this.filenamedetails[j].ffile,
        "FileName": this.filenamedetails[j].fname,
        "modifieddate": new Date(),
        "Base64Data": this.filenamedetails[j].base[j]
      }
      debugger;
      this.fmsservice.InsertTenantInspectionImages(obj).subscribe(data => {
        debugger
        if (data != undefined) {

         
        }
      })
      if ((this.filenamedetails.length - 1) == j) {
        Swal.fire('Saved Successfully');
      
      }
    }

   


   
  }




  Savevideo(){
    debugger

    for (let j = 0; j < this.filenamedetails1.length; j++) {

      var obj = {
        "TenantID":this.TenantID,       
        "bit":this.bit,
        "FileType": this.filenamedetails1[j].ffile,
        "FileName": this.filenamedetails1[j].fname,
        "modifieddate": new Date(),
        "Base64Data": this.filenamedetails1[j].base[j]
      }
      debugger;
      this.fmsservice.InsertTenantInspectionVideo(obj).subscribe(data => {
        debugger
        if (data != undefined) {
        }
      })
      if ((this.filenamedetails1.length - 1) == j) {
        Swal.fire('Saved Successfully');
      
      }
    }
  }

  clear(){
    debugger

    this.date='',
    this.TenantID='',
    this.Description=''
    

  }



}
