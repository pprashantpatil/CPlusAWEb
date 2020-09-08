import { Component, OnInit } from '@angular/core';
import { FmsService } from 'src/app/services/fms.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-updatetenent',
  templateUrl: './updatetenent.component.html',
  styleUrls: ['./updatetenent.component.css']
})
export class UpdatetenentComponent implements OnInit {
  public pageMenuTitle;
  public updateTenant_PageTitle;
  public updateTenant_breadchrumb;
  public updateTenant_button_Dashboard;
  public updateTenant_button_save;
  public updateTenant_Type;
  public updateTenant_Building;
  public updateTenant_Floor;
  public updateTenant_Unit;
  public updateTenant_TenantName;
  public updateTenant_TenantType;
  public updateTenant_PrimaryContactName;
  public updateTenant_NumberOfResidents;
  public updateTenant_NumberOfAdults;
  public updateTenant_NumberOfChildren;
  public updateTenant_NumberOfPets;
  public updateTenant_PhoneNumber;
  public updateTenant_EmergencyContactNumber;
  public updateTenant_Email;
  public updateTenant_Address;
  public updateTenant_LeasePeriod;
  public updateTenant_Rent_Month;
  public updateTenant_Security_Deposit;
  public updateTenant_Rent_Increase_Year;
  public updateTenant_Select_OnceInYear;
  public updateTenant_Select_TwoYearsOnce;
  public updateTenant_Select_ThreeYearsOnce;
  public updateTenant_RentDueOn;
  public updateTenant_MaintenanceAmount_Month;
  public updateTenant_SinkingFundAmount;
  public updateTenant_OtherFee;
  public updateTenant_InventoryProvidedByOwner;
  public updateTenant_ExitTerms;
  public updateTenant_ElectricityMeterNumber;
  public updateTenant_WaterMeterNumber;
  public updateTenant_GasMeterNumber;
  public updateTenant_EBANKDETAILS;
  public updateTenant_BankName;
  public updateTenant_AccountNumber;
  public updateTenant_AccountType;
  public updateTenant_SwiftCode;
  public updateTenant_Comments;
  public updateTenant_Attachment;
  public updateTenant_Agreement;
  public updateTenant_ProfilePhoto;
  public updateTenant_LeaseStartDate;
  public updateTenant_LeaseEndDate;
  public itemlist: any;
  public itemdd: any;
  public InventoryProvision = [];
  public selecteditemsModule = [];
  isedit = false;
  countryname: any
  cityname: any;


  public TenentTypelist;
  public buildinglist;
  public floorlist;
  public unitList;
  public rentIncrementList;
  public bankAccountTypelist;
  public tenentattachments: any = [];
  public TenantAgreement: any = [];
  public profilephoto;
  public tenentidforatachments;
  public Tenentsid;
  public TenentlistByID;
  editAttachmentslist = [];
  editAggrementlist = [];
  editProfilephoto;
  public Countrylist;


  public tenant = {
    TenantType: 2,
    BuildingID: 0,
    FloorID: 0,
    Unit: 0,
    Tenant: "",
    TenantTypeID: 0,
    PrimaryContact: "",
    NoOfResidents: 1,
    NoOfPets: "1",
    NoOfAdults: 0,
    NoOfChildren: 0,
    PhoneNo: "",
    EmailID: "",
    Address: "",
    LeasePeriod: "",
    RentPerMonth: "",
    SecurityDeposit: "",
    RentIncrement: "",
    RentIncrementTypeID: 0,
    RentDue: "",
    Attachment: "NULL",
    MaintenanceAmount: "",
    OtherFee: "",
    InventoryProvision: "",
    Terms: "",
    ElectricityNo: "",
    WatermeterNo: "",
    GasMeterNo: "2563",
    SinkingFund: "",
    BankName: "",
    AccountNo: "",
    AccountTypeID: 0,
    SwiftCode: "",
    EmergencyNumber: "",
    Comments: "",
    ProfilePhoto: "",
    LeaseStartDate: "",
    LeaseEndDate: "",
    LanguageID: 0,
    Country: "",
    State: "",
    City: "",
    Zipcode: "",
    NoticePeriod: 0,
    ConstructionStatusID:0
  };




  constructor(public fmsservice: FmsService, private route: ActivatedRoute, private datePipe: DatePipe) { }

  ngOnInit() {
    let selectedlanguage = localStorage.getItem('selectedLanguageID');
    this.tenant.LanguageID = Number(selectedlanguage);
    this.GetUpdateTenantLanguageByLanguageID(selectedlanguage);
    this.getTenentTypelistbyLanguage(selectedlanguage);
    this.getbuildingList(selectedlanguage);
    this.getRentIncremenType(selectedlanguage);
    this.GetAccountTypelist(selectedlanguage);
    this.GetStatusType();
    this.tenant.Country = "Philippines"
    this.fmsservice.GetCountryType(selectedlanguage).subscribe(data => {
      debugger

      this.Countrylist = data;
    });

    this.route.params.subscribe(params => {

      this.Tenentsid = params['id'];
      if (this.Tenentsid != undefined) {
        this.isedit = true;
        this.GetTenantListByID(this.Tenentsid);
        this.GetTenantAgreementByID(this.Tenentsid);
        this.GetTenantDocumentByID(this.Tenentsid);

      }
    }
    );

    this.fmsservice.GetTenantInventorymaster().subscribe(
      data => {
        debugger
        this.itemlist = data;
        this.itemdd = {
          singleSelection: false,
          idField: 'id',
          textField: 'itemName',
          selectAllText: 'Select All',
          unSelectAllText: 'UnSelect All',
          // itemsShowLimit: 3,
          allowSearchFilter: true
        };
        let filterList = this.tenant.InventoryProvision.split(',');
        for (let j = 0; j < filterList.length; j++) {
          for (let k = 0; k < this.itemlist.length; k++) {
            if (this.itemlist[k].itemName == filterList[j]) {
              var etty = {
                'id': this.itemlist[k].id,
                'itemName': this.itemlist[k].itemName
              }
              this.selecteditemsModule.push(etty);
            }
          }
        }

      }, error => {
      }
    )

  }



  Statelist;
  countryID;

  public getcountryID(evn) {
    debugger;
    this.countryID = evn.target.value;
    this.tenant.Country = evn.currentTarget.selectedOptions[0].value;

    this.fmsservice.GetStateType(1, 2).subscribe(data => {
      debugger
      this.Statelist = data;
      this.fmsservice.GetCityType(1, 6).subscribe(data => {
        debugger
        this.citylist = data;
      })

    })
  }


  stateID;
  citylist;
  getstateID(evn) {
    debugger;
    this.stateID = evn.target.value;
    this.tenant.State = evn.currentTarget.selectedOptions[0].value;
    this.fmsservice.GetCityType(1, this.stateID).subscribe(data => {
      debugger

      this.citylist = data;
    })

  }



  public getcityID(evn) {
    debugger;
    //this.stateID = evn.target.value;
    this.tenant.City = evn.currentTarget.selectedOptions[0].value;
  }

  Statuslist
  public GetStatusType() {
    this.fmsservice.GetStatusType().subscribe(
      res => {
        debugger;
        this.Statuslist = res;
      }
    )
  }


  GetUpdateTenantLanguageByLanguageID(id) {

    this.fmsservice.GetUpdateTenantLanguageByLanguageID(id).subscribe(
      res => {
        this.pageMenuTitle = res[0].pageMenuTitle;
        this.updateTenant_PageTitle = res[0].updateTenant_PageTitle;
        this.updateTenant_breadchrumb = res[0].updateTenant_breadchrumb;
        this.updateTenant_button_Dashboard = res[0].updateTenant_button_Dashboard;
        this.updateTenant_button_save = res[0].updateTenant_button_save;
        this.updateTenant_Type = res[0].updateTenant_Type;
        this.updateTenant_Building = res[0].updateTenant_Building;
        this.updateTenant_Floor = res[0].updateTenant_Floor;
        this.updateTenant_Unit = res[0].updateTenant_Unit;
        this.updateTenant_TenantName = res[0].updateTenant_TenantName;
        this.updateTenant_TenantType = res[0].updateTenant_TenantType;
        this.updateTenant_PrimaryContactName = res[0].updateTenant_PrimaryContactName;
        this.updateTenant_NumberOfResidents = res[0].updateTenant_NumberOfResidents;
        this.updateTenant_NumberOfAdults = res[0].updateTenant_NumberOfAdults;
        this.updateTenant_NumberOfChildren = res[0].updateTenant_NumberOfChildren;
        this.updateTenant_NumberOfPets = res[0].updateTenant_NumberOfPets;
        this.updateTenant_PhoneNumber = res[0].updateTenant_PhoneNumber;
        this.updateTenant_EmergencyContactNumber = res[0].updateTenant_EmergencyContactNumber;
        this.updateTenant_Email = res[0].updateTenant_Email;
        this.updateTenant_Address = res[0].updateTenant_Address;
        this.updateTenant_LeasePeriod = res[0].updateTenant_LeasePeriod;
        this.updateTenant_Rent_Month = res[0].updateTenant_Rent_Month;
        this.updateTenant_Security_Deposit = res[0].updateTenant_Security_Deposit;
        this.updateTenant_Rent_Increase_Year = res[0].updateTenant_Rent_Increase_Year;
        this.updateTenant_Select_OnceInYear = res[0].updateTenant_Select_OnceInYear;
        this.updateTenant_Select_TwoYearsOnce = res[0].updateTenant_Select_TwoYearsOnce;
        this.updateTenant_Select_ThreeYearsOnce = res[0].updateTenant_Select_ThreeYearsOnce;
        this.updateTenant_RentDueOn = res[0].updateTenant_RentDueOn;
        this.updateTenant_MaintenanceAmount_Month = res[0].updateTenant_MaintenanceAmount_Month;
        this.updateTenant_SinkingFundAmount = res[0].updateTenant_SinkingFundAmount;
        this.updateTenant_OtherFee = res[0].updateTenant_OtherFee;
        this.updateTenant_InventoryProvidedByOwner = res[0].updateTenant_InventoryProvidedByOwner;
        this.updateTenant_ExitTerms = res[0].updateTenant_ExitTerms;

        this.updateTenant_ElectricityMeterNumber = res[0].updateTenant_ElectricityMeterNumber;
        this.updateTenant_WaterMeterNumber = res[0].updateTenant_WaterMeterNumber;
        this.updateTenant_GasMeterNumber = res[0].updateTenant_GasMeterNumber;
        this.updateTenant_EBANKDETAILS = res[0].updateTenant_EBANKDETAILS;
        this.updateTenant_BankName = res[0].updateTenant_BankName;
        this.updateTenant_AccountNumber = res[0].updateTenant_AccountNumber;
        this.updateTenant_AccountType = res[0].updateTenant_AccountType;
        this.updateTenant_SwiftCode = res[0].updateTenant_SwiftCode;
        this.updateTenant_Comments = res[0].updateTenant_Comments;
        this.updateTenant_Attachment = res[0].updateTenant_Attachment;
        this.updateTenant_Agreement = res[0].updateTenant_Agreement;
        this.updateTenant_ProfilePhoto = res[0].updateTenant_ProfilePhoto;
        this.updateTenant_LeaseStartDate = res[0].updateTenant_LeaseStartDate;
        this.updateTenant_LeaseEndDate = res[0].updateTenant_LeaseEndDate;

      }

    )
  }
  public getTenentTypelistbyLanguage(languageid) {
    this.fmsservice.getTenentTypelistbyLanguage(languageid).subscribe(res => {

      this.TenentTypelist = res;

    })
  }


  public getbuildingList(languageid) {
    debugger;
    this.fmsservice.GetBuildinglist(languageid).subscribe(res => {
      this.buildinglist = res;
    })
  }


  public getfloorlist(buildingid) {
    debugger;
    if (buildingid != 0) {
      this.tenant.BuildingID = buildingid;
      this.fmsservice.GetFloor(buildingid).subscribe(res => {
        debugger;
        this.floorlist = res.filter(x => x.floor != 'Basement 1' && x.floor != 'Basement 2' && x.floor != 'Basement 3' && x.floor != 'Basement 4');


      })
    }

  }

  public getunitlist(floorid) {
    this.tenant.FloorID = floorid;

    this.fmsservice.GetUnit_MasterbybID(this.tenant.BuildingID, floorid).subscribe(res => {

      this.unitList = res;
    })
  }


  Tenantdetails
  public getunitid(unitid) {
    this.tenant.Unit = unitid;
    this.fmsservice.GetAlreadyPresentTenant(this.tenant.BuildingID, this.tenant.FloorID, unitid).subscribe(res => {
      debugger;
      this.Tenantdetails = res;
      if (res.length > 0) {
        Swal.fire("Tenant is already present for this particular unit");
        this.tenant.BuildingID = 0;
        this.tenant.FloorID = 0;
        this.tenant.Unit = 0;
      }
    })

  }


  public gettenanttypeid(teananttypeid) {
    this.tenant.TenantTypeID = teananttypeid;
  }
  getrentIncrementid(rentincrementid) {
    this.tenant.RentIncrementTypeID = rentincrementid;
  }
  getaccounttype(accountTypeId) {
    this.tenant.AccountTypeID = accountTypeId;
  }
  public getRentIncremenType(languageid) {
    this.fmsservice.GetRentIncrementType(languageid).subscribe(res => {
      this.rentIncrementList = res;
    })
  }
  public GetAccountTypelist(languageid) {
    this.fmsservice.GetAccountTypelist(languageid).subscribe(res => {
      this.bankAccountTypelist = res;
    })
  }






  public TenantDocumentUpload(files: File[]) {

    this.tenentattachments.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.tenentattachments.push(files[i]);
    }
  }

  public TenantAgreementUpload(files: File[]) {

    this.TenantAgreement.length = 0;
    for (let i = 0; i < files.length; i++) {
      this.TenantAgreement.push(files[i]);
    }
  }

  public tentantProfilePhotoupload(files: File[]) {
    this.profilephoto = files;
  }




  public inserttenatdetails() {
    debugger;
    if (this.tenant.LeaseStartDate > this.tenant.LeaseEndDate) {
      Swal.fire("Start Date Can Not Be Greater Than End Date ");
    }
    else {
      let Noofchildren = this.tenant.NoOfResidents - this.tenant.NoOfAdults
      if (this.isedit) {
        debugger;
        let tenenatUpdateEntity = {
          ID: this.Tenentsid,
          BuildingID: +this.tenant.BuildingID,
          FloorID: +this.tenant.FloorID,
          Unit: this.tenant.Unit,
          Tenant: this.tenant.Tenant,
          TenantTypeID: +this.tenant.TenantTypeID,
          NoOfResidents: this.tenant.NoOfResidents.toString(),
          NoOfPets: this.tenant.NoOfPets.toString(),
          NoOfAdults: this.tenant.NoOfAdults.toString(),
          NoOfChildren: Noofchildren,
          PrimaryContact: this.tenant.PrimaryContact,
          PhoneNo: this.tenant.PhoneNo.toString(),
          EmailID: this.tenant.EmailID,
          Address: this.tenant.Address,
          LeasePeriod: this.tenant.LeasePeriod.toString(),
          RentPerMonth: this.tenant.RentPerMonth.toString(),
          SecurityDeposit: this.tenant.SecurityDeposit.toString(),
          RentIncrement: this.tenant.RentIncrement.toString(),
          RentIncrementTypeID: +this.tenant.RentIncrementTypeID,
          RentDue: this.tenant.RentDue.toString(),
          // Attachment: this.tenant.Attachment,
          MaintenanceAmount: this.tenant.MaintenanceAmount.toString(),
          OtherFee: this.tenant.OtherFee.toString(),
          InventoryProvision: this.tenant.InventoryProvision,
          Terms: this.tenant.Terms,
          ElectricityNo: this.tenant.ElectricityNo.toString(),
          WatermeterNo: this.tenant.WatermeterNo.toString(),
          GasMeterNo: this.tenant.GasMeterNo.toString(),
          SinkingFund: this.tenant.SinkingFund.toString(),
          BankName: this.tenant.BankName,
          AccountNo: this.tenant.AccountNo.toString(),
          AccountTypeID: +this.tenant.AccountTypeID,
          SwiftCode: this.tenant.SwiftCode,
          EmergencyNumber: this.tenant.EmergencyNumber.toString(),
          Comments: this.tenant.Comments,
          //  ProfilePhoto: this.tenant.ProfilePhoto,
          LeaseStartDate: this.tenant.LeaseStartDate,
          LeaseEndDate: this.tenant.LeaseEndDate,
          TenantType: +this.tenant.TenantType,
          //LanguageID: +this.tenant.LanguageID
          Country: this.tenant.Country,
          State: this.tenant.State,
          City: this.tenant.City,
          Zipcode: this.tenant.Zipcode,
          NoticePeriod: this.tenant.NoticePeriod,
          ConstructionStatusID:this.tenant.ConstructionStatusID
          
        }



        this.fmsservice.UpdateTenant(tenenatUpdateEntity).subscribe(res => {
          debugger;
          Swal.fire("Tenant Updated Successfully");
        })
      }
      else {
        this.fmsservice.tenantprofileupload(this.profilephoto).subscribe(res => {
          debugger;
          let Noofchildren = this.tenant.NoOfResidents - this.tenant.NoOfAdults
          this.tenant.ProfilePhoto = res.toString();
          let Entity = {
            BuildingID: +this.tenant.BuildingID,
            FloorID: +this.tenant.FloorID,
            Unit: this.tenant.Unit,
            Tenant: this.tenant.Tenant,
            TenantTypeID: +this.tenant.TenantTypeID,
            PrimaryContact: this.tenant.PrimaryContact,
            NoOfResidents: this.tenant.NoOfResidents,
            NoOfPets: this.tenant.NoOfPets.toString(),
            NoOfAdults: this.tenant.NoOfAdults.toString(),
            NoOfChildren: Noofchildren,
            PhoneNo: this.tenant.PhoneNo.toString(),
            EmailID: this.tenant.EmailID,
            Address: this.tenant.Address,
            LeasePeriod: this.tenant.LeasePeriod.toString(),
            RentPerMonth: this.tenant.RentPerMonth.toString(),
            SecurityDeposit: this.tenant.SecurityDeposit.toString(),
            RentIncrement: this.tenant.RentIncrement.toString(),
            RentIncrementTypeID: +this.tenant.RentIncrementTypeID,
            RentDue: this.tenant.RentDue.toString(),
            Attachment: this.tenant.Attachment,
            MaintenanceAmount: this.tenant.MaintenanceAmount.toString(),
            OtherFee: this.tenant.OtherFee.toString(),
            InventoryProvision: this.tenant.InventoryProvision,
            Terms: this.tenant.Terms,
            //ParkingSlots = Entity.ParkingSlots,
            ElectricityNo: this.tenant.ElectricityNo.toString(),
            WatermeterNo: this.tenant.WatermeterNo.toString(),
            GasMeterNo: this.tenant.GasMeterNo.toString(),
            SinkingFund: this.tenant.SinkingFund.toString(),
            BankName: this.tenant.BankName,
            AccountNo: this.tenant.AccountNo.toString(),
            AccountTypeID: +this.tenant.AccountTypeID,
            SwiftCode: this.tenant.SwiftCode,
            EmergencyNumber: this.tenant.EmergencyNumber.toString(),
            Comments: this.tenant.Comments,
            ProfilePhoto: this.tenant.ProfilePhoto,
            LeaseStartDate: this.tenant.LeaseStartDate,
            LeaseEndDate: this.tenant.LeaseEndDate,
            TenantType: +this.tenant.TenantType,
            LanguageID: +this.tenant.LanguageID,
            Country: this.tenant.Country,
            State: this.tenant.State,
            City: this.tenant.City,
            Zipcode: this.tenant.Zipcode,
            NoticePeriod: this.tenant.NoticePeriod,
            ConstructionStatusID:this.tenant.ConstructionStatusID
            // TenantDocument = Entity.TenantDocument
          }
          this.fmsservice.insertTenantdetails(Entity).subscribe(res => {
            let tenentID = res;
            this.uploadattachments(tenentID);
            this.uploadagreements(tenentID);
            Swal.fire("Tenant Saved Successfully");
            this.clear();

          })
        })
      }
    }


  }





  public uploadattachments(tenentID) {

    this.fmsservice.TenantAttachmentDocumentUpload(this.tenentattachments).subscribe(res => {

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


        let Entity = {
          TenantID: tenentID,
          Attachment: attachmentimgOrxlurl,
          PDF: attachmentpdfurl,
        }
        debugger;
        this.fmsservice.savetenantAttachments(Entity).subscribe(res => {


          let ttt = res;


        })
      }

    })

  }

  public uploadagreements(tenentID) {

    this.fmsservice.inserttenantAggrement(this.TenantAgreement).subscribe(res => {


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

        let Entity = {
          TenantID: tenentID,
          Attachment: agrementimgOrxlurl,
          PDF: agrementpdfurl,
        }
        debugger;
        this.fmsservice.savetenantagrements(Entity).subscribe(res => {


        })

      }
    })
  }

  public GetTenantListByID(Tenentid) {
    this.fmsservice.GetTenantListByID(Tenentid).subscribe(res => {
      debugger;
      let selectedlanguage = localStorage.getItem('selectedLanguageID');
      this.tenant.Tenant = res[0].tenantName;
      this.tenant.ConstructionStatusID=res[0].constructionStatusID
      this.tenant.TenantType = res[0].tenantType;
      this.tenant.BuildingID = res[0].buildingID;
      this.tenant.FloorID = res[0].floorID;
      this.getfloorlist(this.tenant.BuildingID);
      this.tenant.Unit = res[0].unit;
      this.getunitlist(this.tenant.FloorID);
      this.tenant.TenantTypeID = res[0].tenantTypeID;
      this.getTenentTypelistbyLanguage(selectedlanguage);
      this.tenant.PrimaryContact = res[0].primaryContact;
      this.tenant.NoOfResidents = res[0].noOfResidents;
      this.tenant.NoOfPets = res[0].noOfPets;
      this.tenant.NoOfAdults = res[0].noOfAdults;
      this.tenant.NoOfChildren = res[0].noOfChildren;
      this.tenant.PhoneNo = res[0].phoneNo;
      this.tenant.EmailID = res[0].email;
      this.tenant.Address = res[0].address;
      this.tenant.LeasePeriod = res[0].leasePeriod;
      this.tenant.RentPerMonth = res[0].rentPerMonth;
      this.tenant.SecurityDeposit = res[0].securityDeposit;
      this.tenant.RentIncrement = res[0].rentIncrement;
      this.tenant.RentIncrementTypeID = res[0].rentIncrementTypeID;
      this.getRentIncremenType(selectedlanguage);
      this.tenant.RentDue = res[0].rentDueOn;
      this.tenant.Attachment = res[0].attachment;
      this.tenant.MaintenanceAmount = res[0].maintenanceAmount;
      this.tenant.OtherFee = res[0].otherFee;
      this.tenant.InventoryProvision = res[0].inventoryProvided;
      this.tenant.Terms = res[0].exitTerms;
      this.tenant.ElectricityNo = res[0].electricMeterNo;
      this.tenant.WatermeterNo = res[0].waterMeterNo;
      this.tenant.GasMeterNo = res[0].gasMeterNo;
      this.tenant.SinkingFund = res[0].sinkingFund;
      this.tenant.BankName = res[0].bankName;
      this.tenant.AccountNo = res[0].accountNumber;
      this.tenant.AccountTypeID = res[0].tenantType;
      this.GetAccountTypelist(selectedlanguage);
      this.tenant.SwiftCode = res[0].swiftCode;
      this.tenant.EmergencyNumber = res[0].emergencyContactNo;
      this.tenant.Comments = res[0].comments;
      this.tenant.ProfilePhoto = res[0].profilePhoto;
      this.tenant.Country = res[0].country;
     
      this.tenant.NoticePeriod = res[0].noticePeriod
      debugger
      let userrole = this.tenant.InventoryProvision.split(',');
      let FillteredModels = [];
      debugger;
      for (let i = 0; i < userrole.length; i++) {
        let userselectedModule = this.itemlist.filter(x => x.id == userrole[i].trim());
        FillteredModels.push(userselectedModule[0]);
        this.InventoryProvision.push(userselectedModule[0]);
      }
      this.selecteditemsModule = FillteredModels;


      debugger;
      // for (let i = 0; i < filterList.length; i++) {
      //   let userselectedModule = filterList.filter(x => x.itemName == userrole[i].trim());
      //   FillteredModels.push(userselectedModule[0]);
      //   this.selecteditemlist.push(userselectedModule[0]);
      // }
      // this.selecteditemsModule = FillteredModels;
      debugger;
      // this.fmsservice.GetCountryType(selectedlanguage).subscribe(data => {
      //   debugger
      //   this.Countrylist = data;
      //   debugger
      //   var list = this.Countrylist.filter(x => x.short == res[0].country)
      //   debugger
      //   this.tenant.Country = list[0].id;
      //   this.countryname=list[0].short;

      // });

      this.fmsservice.GetCityType(1, 6).subscribe(data => {
        debugger
        this.citylist = data;


      })

      //this.tenant.State=res[0].state;
      this.tenant.City = res[0].city;
      debugger
      this.tenant.Zipcode = res[0].zipcode;
      debugger; .0
      if (this.tenant.ProfilePhoto != null) {
        debugger;
        if (this.tenant.ProfilePhoto.length > 3) {
          this.editProfilephoto = this.tenant.ProfilePhoto.replace(/^.{3}/g, 'http://14.192.17.225//');
        }
      }

      this.tenant.LeaseStartDate = this.datePipe.transform(res[0].leaseStartDate, 'yyyy-MM-dd');
      this.tenant.LeaseEndDate = this.datePipe.transform(res[0].leaseEndDate, 'yyyy-MM-dd');
      this.updateTenant_button_save = "Update";
    })
  }


  public GetTenantAgreementByID(ID) {
    this.editAggrementlist.length = 0;
    this.fmsservice.GetTenantAgreementByID(ID).subscribe(res => {
      debugger;
      this.editAggrementlist = res;
    })
  }
  public GetTenantDocumentByID(ID) {
    debugger;
    this.editAttachmentslist.length = 0;
    this.fmsservice.GetTenantDocumentByID(ID).subscribe(res => {
      debugger;
      this.editAttachmentslist = res;

    })
  }

  clear() {
    this.tenant = {
      TenantType: 2,
      BuildingID: 0,
      FloorID: 0,
      Unit: 0,
      Tenant: "",
      TenantTypeID: 0,
      PrimaryContact: "",
      NoOfResidents: 0,
      NoOfPets: "",
      NoOfAdults: 0,
      NoOfChildren: 0,
      PhoneNo: "",
      EmailID: "",
      Address: "",
      LeasePeriod: "",
      RentPerMonth: "",
      SecurityDeposit: "",
      RentIncrement: "",
      RentIncrementTypeID: 0,
      RentDue: "",
      Attachment: "NULL",
      MaintenanceAmount: "",
      OtherFee: "",
      InventoryProvision: "",
      Terms: "",
      ElectricityNo: "",
      WatermeterNo: "",
      GasMeterNo: "",
      SinkingFund: "",
      BankName: "",
      AccountNo: "",
      AccountTypeID: 0,
      SwiftCode: "",
      EmergencyNumber: "",
      Comments: "",
      ProfilePhoto: "",
      LeaseStartDate: "",
      LeaseEndDate: "",
      LanguageID: 0,
      Zipcode: "",
      Country: "",
      State: "",
      City: "",
      NoticePeriod: 0,
      ConstructionStatusID:0
    };
  }
  // public GetTenantprofilephoto(ID) {

  //   this.fmsservice.GetTenantDocumentByID(ID).subscribe(res => {
  //     debugger;
  //     this.editAttachmentslist = res;

  //   })
  // }

  public getitemID(item: any) {
    debugger
    this.InventoryProvision.push(item.itemName);
    let comaseparated = this.InventoryProvision.join(",");
    this.tenant.InventoryProvision = comaseparated;
  }

  onItemDeSelect(item: any) {
    var index = this.InventoryProvision.findIndex(x => x.id == item.id)
    this.InventoryProvision.splice(index, 1);

  }
  selecteditemlist1;
  selecteditemlist;
  onSelectAll(items: any) {

    console.log(items);
    this.selecteditemlist1.push(items)
    this.selecteditemlist = this.selecteditemlist1[0]


  }

}
