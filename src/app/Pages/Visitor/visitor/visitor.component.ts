import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {

  constructor(public fmsservice: FmsService,public datepipe: DatePipe) { }
  public pageMenuTitle;
  public visitorLanguage_PageTitle;
  public visitorLanguage_breadchrumb;
  public visitorLanguage_button_Newvisitor;
  public visitorLanguage_search;
  public visitorLanguage_VisitorType;
  public visitorLanguage_VisitorName;
  public visitorLanguage_VisitorPhoneNumber;
  public visitorLanguage_IDType;
  public visitorLanguage_IDNumber;
  public visitorLanguage_EntryDateTime;
  public visitorLanguage_Building;
  public visitorLanguage_Floor;
  public visitorLanguage_Unit;
  public visitorLanguage_NoOfVisitors;
  public visitorLanguage_ExitDateTime;
  public visitorLanguage_Address;
  public visitorLanguage_Actions;
  public VisitorList: any;
  public searchvisitor;
  filteredVisitorlist;
  buildingList;
  attID:any;
  public mindate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public exitTimeupdatemodel;
  public exitDateupdatemodel= this.datepipe.transform(new Date(), 'yyyy-MM-dd');
  public selectedVisitorID;
  public selectedVisitorattachment=[];
  public UploadedVisitorattachment = [];
  selectedVisitorattachmentdetails;
  updateattacmentshow=false;

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.GetVisitorLanguageByLanguageID(selectedlanguage);
    this.GetVisitorList(selectedlanguage);
    this.getbuildingList(selectedlanguage);
    
  }
  public GetVisitorLanguageByLanguageID(languageid) {
    this.fmsservice.GetVisitorLanguageByLanguageID(languageid).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.visitorLanguage_PageTitle = res[0].visitorLanguage_PageTitle;
        this.visitorLanguage_breadchrumb = res[0].visitorLanguage_breadchrumb;
        this.visitorLanguage_button_Newvisitor = res[0].visitorLanguage_button_Newvisitor;
        this.visitorLanguage_search = res[0].visitorLanguage_search;
        this.visitorLanguage_VisitorType = res[0].visitorLanguage_VisitorType;
        this.visitorLanguage_VisitorName = res[0].visitorLanguage_VisitorName;
        this.visitorLanguage_VisitorPhoneNumber = res[0].visitorLanguage_VisitorPhoneNumber;
        this.visitorLanguage_IDType = res[0].visitorLanguage_IDType;
        this.visitorLanguage_IDNumber = res[0].visitorLanguage_IDNumber;
        this.visitorLanguage_EntryDateTime = res[0].visitorLanguage_EntryDateTime;
        this.visitorLanguage_Building = res[0].visitorLanguage_Building;
        this.visitorLanguage_Floor = res[0].visitorLanguage_Floor;
        this.visitorLanguage_Unit = res[0].visitorLanguage_Unit;
        this.visitorLanguage_NoOfVisitors = res[0].visitorLanguage_NoOfVisitors;
        this.visitorLanguage_ExitDateTime = res[0].visitorLanguage_ExitDateTime;
        this.visitorLanguage_Address = res[0].visitorLanguage_Address;
        this.visitorLanguage_Actions = res[0].visitorLanguage_Actions;

      }
    )
  }

  public GetVisitorList(languageid) {
    this.fmsservice.GetVisitorList(languageid).subscribe(
      res => {
        this.VisitorList = res;
        this.filteredVisitorlist = this.VisitorList;
      }
    )
  }

  Floorlist;
  public onselectbuilding(evn) {
    debugger;
    let buildingid = evn.target.value;
    if (buildingid != 'none') {
      this.filteredVisitorlist = this.VisitorList.filter(x => x.buildingid == buildingid);
      this.fmsservice.GetFloor(buildingid).subscribe(
        res => {
          debugger;
          this.Floorlist = res;
          // this.FilteredGroceryList = this.GroceryList.filter(x => x.buildingID == this.BuildingID);
        }
      )
    }
    else {
      this.filteredVisitorlist = this.VisitorList;
      this.fmsservice.GetFloor(buildingid).subscribe(
        res => {
          debugger;
          this.Floorlist = res;
          //  this.FilteredGroceryList = this.GroceryList.filter(x => x.buildingID == this.BuildingID);
        }
      )

    }

  }

  public getbuildingList(languageid) {
    this.fmsservice.GetBuildinglist(languageid).subscribe(res => {
      this.buildingList = res;
    })
  }
  public deletevisitor(visitorid) {

    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.fmsservice.deletevisitor(visitorid).subscribe(res => {
          let selectedlanguage = localStorage.getItem('selectedLanguageID');
          this.GetVisitorList(selectedlanguage);

          Swal.fire(
            'Deleted!',

            'success'
          )
        })

        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',

          'error'
        )
      }
    })

  }


  public UpdateVisitorExitime() {
    debugger;

    if(this.VisitorEntryTime>this.exitTimeupdatemodel){
      Swal.fire("Please Check Exit Time");
    }else{
 let entity = {
      ID: this.selectedVisitorID,
      ExitDate: this.exitDateupdatemodel,
      ExitTime: this.exitTimeupdatemodel
    }

    this.fmsservice.UpdateVisitorExitime(entity).subscribe(res => {
      let selectedlanguage = localStorage.getItem('selectedLanguageID');
      this.GetVisitorList(selectedlanguage);
      Swal.fire("Exit time Updated successfully");
    })
    }
   
  }

  VisitorPhotoIndividual
  VisitorEntryTime;
  getvisitordetails(visitordetails) {
    
    this.selectedVisitorID = visitordetails.id;
    this.VisitorPhotoIndividual=visitordetails.actPhoto;
     this.VisitorEntryTime=visitordetails.entryDateTime;
    this.fmsservice.GetVisitorDocument(this.selectedVisitorID).subscribe(res => {
      debugger;
      this.selectedVisitorattachmentdetails = res;
      
      if (res.length > 0) {
        this.selectedVisitorattachment = res;
        this.updateattacmentshow=true;
      }
      else {
        this.updateattacmentshow=false;
        this.selectedVisitorattachment.length=0;
      }

    })

  }


  updatephoto(data){
    debugger;

    this.attID=data

  }

 
  public attachments1 = [];
  onAttachmentFileAdded(files: File[]) {
    debugger;
    for (let i = 0; i < files.length; i++) {
      debugger
      this.UploadedVisitorattachment.push(files[i])
    }

  }


 


 


  exporttoexcel() {
    debugger;
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Visitor List',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Visitor List'
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(this.filteredVisitorlist);
  }

  public attachments = [];

  onupdatevisitoracctamentdocument() {
    debugger;
    // this.fmsservice.VisitorPhotoUpload(this.UploadedVisitorattachment).subscribe(res => {

    //   debugger;
    //   // let attachmentdetails = res;


    //   let entity = {
    //     ID: this.selectedVisitorattachment[0].id,
    //     Attachment: res,
    //     pdf: "null"
    //   }

    //   this.fmsservice.UpdateVisitorDocuments(entity).subscribe(res => {
    //     Swal.fire("Updated successfully ")
    //   })
    // })

    this.fmsservice.VisitorPhotoUpload(this.UploadedVisitorattachment).subscribe(res => {
debugger
      for (let i = 0; i < res.length; i++) {

        let PhotosEntity = {
          docpathURL1: res[0],
          pdfurl: null
        }
        debugger
        this.attachments.push(PhotosEntity);
      }
      debugger
      this.UpdateVisitorDocument();

    })
  }


  UpdateVisitorDocument(){
    debugger
        for(var i=0;i<this.attachments.length;i++){
          debugger
          var filter={
            'VisitorID': this.selectedVisitorID,
            'Attachment':this.attachments[i].docpathURL1,
            'ModifiedBy':new Date()
          }
    debugger
          this.fmsservice.InsertVisitorDocument(filter).subscribe(data=>{
            debugger
            if(data!=undefined){
              Swal.fire("Photo Updated successfully");
    
            }
    
          })
        }
    
        
      }

}
