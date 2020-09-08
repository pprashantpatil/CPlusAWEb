import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class FmsService {

  // public fmsUrl = 'http://14.192.17.225/digiFMSv2API/';
  //public fmsUrl = 'https://14.192.17.225/Exchange106API';



  // public fmsUrl = 'https://14.192.17.225/CTCAPI';
  //public fmsUrl = 'http://localhost:1807';
  // public fmsUrl = 'http://14.192.17.225/JEGTest';
  //public fmsUrl = 'http://14.192.17.225/JEG/';
  //public localurl = "http://localhost:1807/";
  //public fourteenurl = "http://14.192.17.225/FMSTestingApi/"
  //public fmsUrl1 = "http://14.192.17.225/JEG/"

  public fmsUrl1 = 'http://localhost:1807';
  public fmsUrl = 'http://localhost:1807';





  //public fmsUrl1 = 'http://23.101.22.93/CTCAPI';
  // public fmsUrl = localStorage.getItem('fmsurl');
  URL;
  constructor(public http: HttpClient) { }

  public Userlogin = true;

  public getlanguagemaster() {
    return this.http.get<any[]>(this.fmsUrl1 + '/Language/getLanguages');
  }

  updateTimeLinePlan(data) {

    this.URL = this.fmsUrl + '/Building/updateTimeLinePlan';
    return this.http.post(this.URL, data)
  }

  public GetBaseURLByCompanyID(CompanyID) {
    return this.http.get<any[]>(this.fmsUrl1 + '/User/GetBaseURLByCompanyID?CompanyID=' + CompanyID);
  }

  public DeleteBudgetReport(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/DeleteBudgetReport?ID=" + id);
  }
  public InsertBudgetReport(data) {
    this.URL = this.fmsUrl + '/Building/InsertBudgetReport';
    return this.http.post(this.URL, data)
  }
  public UpdateBudgetReport(data) {
    this.URL = this.fmsUrl + '/Building/UpdateBudgetReport';
    return this.http.post(this.URL, data)
  }
  public GetBudgetReport() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetBudgetReport");
  }



  public GetBudgetReports() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetBudgetReports");
  }





  public GetBudgetReportsByMonth() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetBudgetReportsByMonth");
  }

  public GetBudgetReportsStageWise() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetBudgetReportsStageWise");
  }
  public GetProjectUpdateMenu() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetProjectUpdateMenu");
  }
  public GetProjectUpdateMenuPhotos() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetProjectUpdateMenuPhotos");
  }
  public GetProjectUpdateMenuVideos() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetProjectUpdateMenuVideos");
  }
  public DeleteProjectUpdateMenu(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/DeleteProjectUpdateMenu?ID=" + id);
  }
  public InsertProjectUpdateMenu(data) {
    this.URL = this.fmsUrl + '/Building/InsertProjectUpdateMenu';
    return this.http.post(this.URL, data)
  }
  public InsertProjectUpdateMenuPhotos(data) {
    this.URL = this.fmsUrl + '/Building/InsertProjectUpdateMenuPhotos';
    return this.http.post(this.URL, data)
  }
  public InsertProjectUpdateMenuVideos(data) {
    this.URL = this.fmsUrl + '/Building/InsertProjectUpdateMenuVideos';
    return this.http.post(this.URL, data)
  }

  public getbuildingDashboardbyLanguageId(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/getBuildingDashboardbyLanguageID?ID=' + id);
  }
  public GetBuildingPlansLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetBuildingPlansLanguage?LanguageID=' + id);
  }
  public GetUpdateBuildingPlanLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUpdateBuildingPlanLanguage?LanguageID=' + id);
  }
  public GetBuildingUnitLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetBuildingUnitLanguage?ID=' + id);
  }
  public GetCommunityHallLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetCommunityHallLanguage?ID=' + id);
  }
  public GetBookcommunityhallLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetBookcommunityhallLanguage?ID=' + id);
  }
  public GetPaymentsLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetPaymentsLanguage?ID=' + id);
  }

  public GetNewPaymentLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetNewPaymentLanguage?ID=' + id);
  }
  public GetParkingLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetParkingLanguage?ID=' + id);
  }

  public GetAddparkingslotLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetAddparkingslotLanguage?ID=' + id);
  }


  public GetDashboardLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetDashboardLanguage?ID=' + id);
  }

  public PaymentForWaterBill6Months() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/PaymentForWaterBill6Months');
  }

  public PaymentForElectricalBill6Months() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/PaymentForElectricalBill6Months');
  }

  public GetAllScheduledRequestByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllScheduledRequestByMonth');
  }

  public GetAllMaintenanceRequestCountByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllMaintenanceRequestCountByMonth');
  }

  public GetAllInventoryItemsCountByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllInventoryItemsCountByMonth');
  }

  public GetAllInventoryUsedItemsCountByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllInventoryUsedItemsCountByMonth');
  }

  public GetAllExpiredInventoryItemsCountByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllExpiredInventoryItemsCountByMonth');
  }

  public GetVisitorsByTodayCountByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetVisitorsByTodayCountByMonth');
  }


  public GetGuestCountByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetGuestCountByMonth');
  }


  public GetVisitorParkingCountbyMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetVisitorParkingCountbyMonth');
  }


  public GetDeliveryCountByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetDeliveryCountByMonth');
  }


  public GetAllExpiringInventoryItemsCountByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllExpiringInventoryItemsCountByMonth');
  }



  public GetAllRegVendorsCountByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllRegVendorsCountByMonth');
  }



  public GetAllActivePOCountByMonth(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllActivePOCountByMonth?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }




  public GetVendorOutstandingPaymentCountbyMonth(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetVendorOutstandingPaymentCountbyMonth?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }




  public GetSumOfRentPaidAmountbyMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetSumOfRentPaidAmountbyMonth');
  }

  public GetAmenitiesPaymentsSumOfAmountByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAmenitiesPaymentsSumOfAmountByMonth');
  }


  public GetSumOfPenaltyByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetSumOfPenaltyByMonth');
  }


  public GetTenantNoticeCount() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetTenantNoticeCount');
  }


  public GetTenantParkingCounttByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetTenantParkingCounttByMonth');
  }

  public GetTenantRentpaidCountByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetTenantRentpaidCountByMonth');
  }


  public GetTenantRentpaidCount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetTenantRentpaidCount?MonthID=' + MonthID);
  }

  public GetNameofYetTovisit() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetNameofYetTovisit');
  }

  public GetSumOfPenalty(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetSumOfPenalty?MonthID=' + MonthID);
  }
  public GetNotExitedName(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetNotExitedName?MonthID=' + MonthID);
  }

  public GetAmenitiesCount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAmenitiesCount?MonthID=' + MonthID);
  }

  public GetAmenitiesPaymentsSumOfAmount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAmenitiesPaymentsSumOfAmount?MonthID=' + MonthID);
  }

  public GetTotalPenaltyCount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetTotalPenaltyCount?MonthID=' + MonthID);
  }

  public GetTenantParkingCountt(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetTenantParkingCountt?MonthID=' + MonthID);
  }

  public GetSumOfRentPaidAmount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetSumOfRentPaidAmount?MonthID=' + MonthID);
  }

  public GetRentPending(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetRentPending?MonthID=' + MonthID);
  }



  public GetTenantNoticeCountbyMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetTenantNoticeCountbyMonth');
  }



  public GetVendorPendingInvoiceCountbyMonth(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetVendorPendingInvoiceCountbyMonth?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetPhiliPayrolls(SDate, EDate) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetPhiliPayrolls?SDate=' + SDate + '&EDate=' + EDate);
  }



  public PaymentForSecurityBill6Months() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/PaymentForSecurityBill6Months');
  }

  public PaymentForMaintenanceBill6Months() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/PaymentForMaintenanceBill6Months');
  }

  public GetAllAssetCountByMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllAssetCountByMonth');
  }

  public GetNoOfUnits(BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetNoOfUnits?BuildingID=' + BuildingID);
  }


  public GetProjectProgressTracking(BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Announcement/GetProjectProgressTracking?BuildingID=' + BuildingID);
  }

  public UpdateBuildingProjectProgress(data, data1) {

    return this.http.get(this.fmsUrl + "/Tenant/UpdateBuildingProjectProgress?ID=" + data + "&StatusID=" + data1);
  }

  public UpdateBuildingProjectProgressApproval(data, ProjectComment) {

    return this.http.get(this.fmsUrl + "/Tenant/UpdateBuildingProjectProgressApproval?ID=" + data + "&ProjectComment=" + ProjectComment);
  }

  public UpdateBuildingProjectProgressReject(data, ProjectComment) {

    return this.http.get(this.fmsUrl + "/Tenant/UpdateBuildingProjectProgressReject?ID=" + data + "&ProjectComment=" + ProjectComment);
  }

  public GetInventoryItems(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetInventoryItems?MonthID=' + MonthID);
  }
  public GetInventoryQty(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetInventoryQty?MonthID=' + MonthID);
  }
  public GetOccupiedCountFromUnitMaster(BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetOccupiedCountFromUnitMaster?BuildingID=' + BuildingID);
  }

  public GetAvailableCountFromUnitMaster(BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAvailableCountFromUnitMaster?BuildingID=' + BuildingID);
  }



  public GetPaymentTotal(PaymentForID, BuildingID, LanguageID, Month) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetPaymentTotal?PaymentForID=' + PaymentForID + '&BuildingID=' + BuildingID + '&LanguageID=' + LanguageID + '&Month=' + Month);
  }

  public GetOccupancyTotalCount(BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetOccupancyTotalCount?BuildingID=' + BuildingID);
  }

  public GetOccupiedCount(BuildingID, Month, Booked) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetOccupiedCount?BuildingID=' + BuildingID + '&Month=' + Month + '&Booked=' + Booked);
  }


  public GetHandedOverCount(BuildingID, ConstructionStatusID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetHandedOverCount?BuildingID=' + BuildingID + '&ConstructionStatusID=' + ConstructionStatusID);
  }

  public GetOwnersByBuildingID(BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetOwnersByBuildingID?BuildingID=' + BuildingID);
  }


  public GetTenantCount(BuildingID, Month, TenantType) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetOwnerTenantCount?BuildingID=' + BuildingID + '&Month=' + Month + '&TenantType=' + TenantType);
  }

  public GetOwnerCount(BuildingID, Month, TenantType) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetOwnerTenantCount?BuildingID=' + BuildingID + '&Month=' + Month + '&TenantType=' + TenantType);
  }

  public GetOwnerDetails(MonthID, TenantTypeID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetOwnerTenantDetails?MonthID=' + MonthID + '&TenantTypeID=' + TenantTypeID);
  }

  public GetTenantsDetails(MonthID, TenantTypeID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetOwnerTenantDetails?MonthID=' + MonthID + '&TenantTypeID=' + TenantTypeID);
  }



  public GetStaffByBuildingID(BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStaffByBuildingID?BuildingID=' + BuildingID);
  }

  public GetSumOfStaffTotalSalary() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetSumOfStaffTotalSalary');
  }

  public GetStaffLeavesByMon(BuildingID, Month) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStaffLeavesByMon?BuildingID=' + BuildingID + '&Month=' + Month);
  }


  public GetAllAssetCount(LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllAssetCount?LanguageID=' + LanguageID);
  }

  public GetAllScheduledMaintenanceRequest(Month, BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllScheduledMaintenanceRequest?Month=' + Month + '&BuildingID=' + BuildingID);
  }

  public GetAllMaintenanceReqBuMonth(Month, BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllMaintenanceReqBuMonth?Month=' + Month + '&BuildingID=' + BuildingID);
  }

  public Get5YearWarrentyAssets(LanguageID, BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/Get5YearWarrentyAssets?LanguageID=' + LanguageID + '&BuildingID=' + BuildingID);
  }

  public GetOutOfWarrentyAssetCount(LanguageID, BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetOutOfWarrentyAssetCount?LanguageID=' + LanguageID + '&BuildingID=' + BuildingID);
  }

  public Get5YearWarrentyAssetCount(LanguageID, BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/Get5YearWarrentyAssetCount?LanguageID=' + LanguageID + '&BuildingID=' + BuildingID);
  }

  public GetInventoryItemsCount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetInventoryItemsCount?MonthID=' + MonthID);
  }

  public GetInventoryQtyCount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetInventoryQtyCount?MonthID=' + MonthID);
  }


  public GetInvenatoryUsedItemsCount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetInvenatoryUsedItemsCount?MonthID=' + MonthID);
  }

  public GetAllMaintenanceReqDetails(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllMaintenanceReqDetails?MonthID=' + MonthID);
  }

  public GetAllScheduledDetails(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllScheduledDetails?MonthID=' + MonthID);
  }


  public GetStaffLeavesDetails(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStaffLeavesDetails?MonthID=' + MonthID);
  }


  public GetExpiredInventoryItemsCount(LanguageID, MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetExpiredInventoryItemsCount?LanguageID=' + LanguageID + '&MonthID=' + MonthID);
  }

  public GetExpingInventoryItemsCount(LanguageID, MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetExpingInventoryItemsCount?LanguageID=' + LanguageID + '&MonthID=' + MonthID);
  }

  public GetAllActivePOCount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllActivePOCount?MonthID=' + MonthID);
  }

  public GetExpingInventoryItemsNames(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetExpingInventoryItemsNames?MonthID=' + MonthID);
  }

  public GetExpiredInventoryItemsName(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetExpiredInventoryItemsName?MonthID=' + MonthID);
  }


  public GetRegVendorsCount(LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetRegVendorsCount?LanguageID=' + LanguageID);
  }


  public GetVendorOutstandingPayAmount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetVendorOutstandingPayAmount?MonthID=' + MonthID);
  }

  public GetVendorOutstandingPaymenteCount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetVendorOutstandingPaymenteCount?MonthID=' + MonthID);
  }
  public GetPenaltyDetails(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetPenaltyDetails?MonthID=' + MonthID);
  }

  public GetVendoraPendingInvoiceName(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetVendoraPendingInvoiceName?MonthID=' + MonthID);
  }


  public GetVisitorsByTodayCount() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetVisitorsByTodayCount');
  }

  public GetVisitorsByTodayDetails() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetVisitorsByTodayDetails');
  }
  public GetAllActivePODetails(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllActivePODetails?MonthID=' + MonthID);
  }

  public GetOutOfWarrentyAssetName() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetOutOfWarrentyAssetName');
  }

  public GetVisitedCount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetVisitedCount?MonthID=' + MonthID);
  }


  public GetYetToVisitCount() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetYetToVisitCount');
  }



  public GetNotExitedCount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetNotExitedCount?MonthID=' + MonthID);
  }

  public GetGuestCount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetGuestCount?MonthID=' + MonthID);
  }


  public GetDeliveryCount(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetDeliveryCount?MonthID=' + MonthID);
  }


  public GetVisitorParkingCountt(MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetVisitorParkingCountt?MonthID=' + MonthID);
  }


  public GetNoOfTenantCount() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetNoOfTenantCount');
  }





  public GetVisitorParkingCounttCountbyMonth() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetVisitorParkingCounttCountbyMonth');
  }


  public GetContractorBuildingLists() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetContractorBuildingLists');
  }



  public GetProjectRequestAwardedMob() {
    return this.http.get<any[]>(this.fmsUrl + '/MobileUser/GetProjectRequestAwardedMob');
  }
  public GetOngoingProjects() {
    return this.http.get<any[]>(this.fmsUrl + '/ProjectRequest/GetOngoingProjects');
  }

  public GetClosedProjects() {
    return this.http.get<any[]>(this.fmsUrl + '/ProjectRequest/GetClosedProjects');
  }






  public GetAssetLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetAssetLanguageByLanguageID?ID=' + id);
  }

  public GetUpdateAssetLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUpdateAssetLanguageByLanguageID?ID=' + id);
  }

  public GetAssetServiceLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetAssetServiceLanguageByLanguageID?ID=' + id);
  }

  public GetInventoryLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetInventoryLanguage?ID=' + id);
  }

  public GetInventorytaddLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetInventorytaddLanguage?ID=' + id);
  }
  public GetPOLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetPOLanguage?ID=' + id);
  }

  public GetNewPOLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetNewPOLanguage?ID=' + id);
  }

  public GetFullInventoryLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetFullInventoryLanguage?ID=' + id);
  }

  public GetItemdashmasterLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetItemdashmasterLanguage?ID=' + id);
  }

  public GetEventPlanerLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetEventPlanerLanguageByLanguageID?ID=' + id);
  }

  public GetUpdateEventPlannerLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUpdateEventPlannerLanguageByLanguageID?ID=' + id);
  }
  public GetProjectRequestLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetProjectRequestLanguageByLanguageID?ID=' + id);
  }

  UpdateResourceDocument(data) {

    this.URL = this.fmsUrl + '/ResourceLocation/UpdateResourceDocument';
    return this.http.post(this.URL, data)
  }


  public DeleteResourceDocument(data) {
    return this.http.get<any[]>(this.fmsUrl + '/ResourceLocation/DeleteResourceDocument?ID=' + data);
  }


  public InsertResourceDocument(ResourceEntity) {

    return this.http.post(this.fmsUrl + "/ResourceLocation/InsertResourceDocument", ResourceEntity);
  }

  public GetResourceDocument(data) {
    return this.http.get<any[]>(this.fmsUrl + '/ResourceLocation/GetResourceDocument?BuildingID=' + data);
  }
  public GetUpdateProjectRequestLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUpdateProjectRequestLanguageByLanguageID?ID=' + id);
  }

  public GetAwardProjectBidLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetAwardProjectBidLanguageByLanguageID?ID=' + id);
  }

  public GetSupportLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetSupportLanguage?ID=' + id);
  }

  public GetUtilityPaymentsLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUtilityPaymentsLanguage?ID=' + id);
  }

  public GetNewUtilityPaymentLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetNewUtilityPaymentLanguage?ID=' + id);
  }

  public GetPurchaseReportLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetPurchaseReportLanguage?ID=' + id);
  }
  public GetPurchasereturnreportLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetPurchasereturnreportLanguage?ID=' + id);
  }

  public GetPurchaseOrderReportLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetPurchaseOrderReportLanguage?ID=' + id);
  }

  public GetNewOrderReportLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetNewOrderReportLanguage?ID=' + id);
  }
  public GetCreditNoteReportLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetCreditNoteReportLanguage?ID=' + id);
  }

  public GetOpenPoReportLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetOpenPoReportLanguage?ID=' + id);
  }
  public GetVendorPaymentReportLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetVendorPaymentReportLanguage?ID=' + id);
  }
  public GetComplaintdashboardLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetComplaintdashboardLanguage?ID=' + id);
  }
  public GetAnnouncementLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetAnnouncementLanguage?ID=' + id);
  }
  public GetPharmacyrequestLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetPharmacyrequestLanguage?ID=' + id);
  }
  public GetGroceryrequestLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetGroceryrequestLanguage?ID=' + id);
  }
  public GetDoctorrequestLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetDoctorrequestLanguage?ID=' + id);
  }
  public GetTechnologyLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetTechnologyLanguage?ID=' + id);
  }
  public GetNewtechnologyLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetNewtechnologyLanguage?ID=' + id);
  }
  public GetMaintainenceRequestLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetMaintainenceRequestLanguageByLanguageID?ID=' + id);
  }
  public GetUpadteMaintanceRequestLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUpadteMaintanceRequestLanguageByLanguageID?ID=' + id);
  }
  public GetScheduleMaintenanceLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetScheduleMaintenanceLanguageByLanguageID?ID=' + id);
  }
  public GetUpdateSheduleMantainceLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUpdateSheduleMantainceLanguageByLanguageID?ID=' + id);
  }

  public GetUpdateAnnouncementLanguage(id) {

    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUpdateAnnouncementLanguage?ID=' + id);
  }
  public GetCheckListLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetCheckListLanguageByLanguageID?ID=' + id);
  }
  public GetTansportationRequestByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetTansportationRequestByLanguageID?ID=' + id);
  }
  public GetUpdateTransportationRequestLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUpdateTransportationRequestLanguageByLanguageID?ID=' + id);
  }
  public GetVisitorLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetVisitorLanguageByLanguageID?ID=' + id);
  }
  public GetUpdateVisitorLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUpdateVisitorLanguageByLanguageID?ID=' + id);
  }
  public GetVisitorParkingLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetVisitorParkingLanguageByLanguageID?ID=' + id);
  }
  public GetTenantParkingAllocationLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetTenantParkingAllocationLanguage?ID=' + id);
  }
  public GetTenantnoticeLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetTenantnoticeLanguage?ID=' + id);
  }
  public GetTenanthistoryLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetTenanthistoryLanguage?ID=' + id);
  }
  public GetStaffLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetStaffLanguage?ID=' + id);
  }
  public GetStaffDetailsLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetStaffDetailsLanguage?ID=' + id);
  }
  public GetStaffLeavesLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetStaffLeavesLanguage?ID=' + id);
  }
  public GetApplystaffleavesLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetApplystaffleavesLanguage?ID=' + id);
  }
  public GetstaffsalaryLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetstaffsalaryLanguageByLanguageID?ID=' + id);
  }
  public GetemployeesalarydashboardByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetemployeesalarydashboardByLanguageID?ID=' + id);
  }
  public GetNewItemMasterLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetNewItemMasterLanguage?ID=' + id);
  }
  //vamsi
  public getAddorUpdateBuildingbyLanguageId(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/getAddOrUpdateBuildingbyLanguageID?ID=' + id);
  }
  public getBookCommunityHallEventDashBoardbyLanguageId(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/getBookCommunityHallEventDashBoardLanguage?ID=' + id);
  }
  public getaddnewcommunityeventbyLanguageId(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/getaddnewcommunityeventLanguage?ID=' + id);
  }
  public getCommercialWorkSpaceSetup(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetWorkSpaceLanguage?id=' + id);
  }
  public GetWorkSpaceDashboardLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetWorkSpaceDashboardLanguage?id=' + id);
  }
  public GetWorkSpaceBookingLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetWorkSpaceBookingLanguage?id=' + id);
  }
  public GetresourcelocationLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetresourcelocationLanguageByLanguageID?id=' + id);
  }
  public GetupdateresourcelocationLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetupdateresourcelocationLanguageByLanguageID?id=' + id);
  }
  public GetUserDashboardLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUserDashboardLanguageByLanguageID?id=' + id);
  }
  public GetUpdateUserLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUpdateUserLanguageByLanguageID?id=' + id);
  }
  public GetVendorLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetVendorLanguage?id=' + id);
  }
  public GetNewvendorLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetNewvendorLanguage?id=' + id);
  }
  public GetInvoicedashboardLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetInvoicedashboardLanguage?id=' + id);
  }
  public GetUpdateInvoiceDashboardLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUpdateInvoiceDashboardLanguage?id=' + id);
  }
  public GetVendorOutstandingPaymentsLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetVendorOutstandingPaymentsLanguage?id=' + id);
  }
  public GetVendorPaymentsLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetVendorPaymentsLanguage?id=' + id);
  }
  public GetPartialPaymentsLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetPartialPaymentsLanguage?id=' + id);
  }
  public GetVendorPaymentsDashboardLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetVendorPaymentsDashboardLanguage?id=' + id);
  }
  public GetCreditNotesLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetCreditNotesLanguage?id=' + id);
  }

  public GetNewCreditNotesLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetNewCreditNotesLanguage?id=' + id);
  }
  public GetVendorReturnLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetVendorReturnLanguage?id=' + id);
  }
  public GetNewVendorReturnLanguage(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetNewVendorReturnLanguage?id=' + id);
  }
  public GetTenantLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetTenantLanguageByLanguageID?id=' + id);
  }
  public GetUpdateTenantLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetUpdateTenantLanguageByLanguageID?id=' + id);
  }
  public GetTenentRentLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetTenentRentLanguageByLanguageID?id=' + id);
  }
  public GetTenentUpdateRentLanguageByLanguageID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetTenentUpdateRentLanguageByLanguageID?id=' + id);
  }
  // Dashboards By LanguageID


  public GetBuildinglist(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetBuildinglist?LanguageID=' + id);
  }


  public GetBuildingHallDetailsdashboard(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetBuildingHallDetailsdashboard?LanguageID=' + id);
  }
  public GetBookPartyHallAll(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetBookPartyHallAll?LanguageID=' + id);
  }
  public GetBuildingPlanList(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetBuildingPlanList?LanguageID=' + id);
  }

  public GetDistinctBuildingPlanList(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetDistinctBuildingPlanList?LanguageID=' + id);
  }

  public GetVersionMaster() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetVersionMaster');
  }
  public GetResourceLocation(id) {
    return this.http.get<any[]>(this.fmsUrl + '/ResourceLocation/GetResourceLocation?LanguageID=' + id);
  }

  // public GetBuildingStaff(id) {
  //   return this.http.get<any[]>(this.fmsUrl + 'Building/GetBuildingStaff?LanguageID=' + id);
  // }
  public GetBuildingPaymentsList(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetBuildingPaymentsList?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetUtilities(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/User/GetUtilities?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetPODashboard(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetPODashboard?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }


  public GetPurchaseReport(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetPurchaseReport?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetAgingReport(RentForMonthOf, RentTypeID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAgingReport?RentForMonthOf=' + RentForMonthOf + '&RentTypeID=' + RentTypeID);
  }

  public GetPurchaseReturnReport(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetPurchaseReturnReport?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetCreditNoteReport(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetCreditNoteReport?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetVendorPaymentReport(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetVendorPaymentReport?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetMaintenanceRequestList(TypeID, SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetMaintenanceRequestList?TypeID=' + TypeID + '&SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID + '&TypeID=' + TypeID);
  }

  public GetComplaintsDashboardWEB(SDate, EDate) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetComplaintsDashboardWEB?SDate=' + SDate + '&EDate=' + EDate);
  }

  // public GetMaintenanceRequestList1(SDate, EDate, LanguageID, TypeID) {
  //   debugger
  //   return this.http.get<any[]>(this.fmsUrl + 'Maintenance/GetMaintenanceRequestList?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID + '&TypeID=' + TypeID);
  //  }



  public GetAnnouncementList(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Announcement/GetAnnouncementList?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetPharmacyRequests(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Conceirge/GetPharmacyRequests?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetGroceryRequest(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Conceirge/GetGroceryRequest?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetDoctorRequest(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/DoctorRequest/GetDoctorRequest?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetDoctorVisitedlistWeb(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Conceirge/GetDoctorVisitedlistWeb?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetTechnologyRequest(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Technology/GetTechnologyRequest?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetTransportationRequest(SDate, EDate, LanguageID) {

    return this.http.get<any[]>(this.fmsUrl + '/TransportationRequest/GetTransportationRequest?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetTenantHistoryList(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetTenantHistoryList?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetScheduleRequest(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/ScheduleRequest/GetScheduleRequest?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetMaintenanceRequestlist(TypeID, SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetMaintenanceRequestList?TypeID=' + TypeID + '&SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetStaffLeaves(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStaffLeaves?LanguageID=' + id);
  }

  public GetContractorStaffLeaves(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetContractorStaffLeaves?LanguageID=' + id);
  }


  public GetEquipmentlist(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Equipment/GetEquipmentlist?LanguageID=' + id);
  }


  public GetHolidaysLists() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetHolidaysLists');
  }

  public GetCompanyDetails() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetCompanyDetails');
  }


  public GetArchitecturalStagesProcessCheck() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetArchitecturalStagesProcessCheck');
  }

  public GetCompanyInvoice(SDate, EDate) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetCompanyInvoice?SDate=' + SDate + '&EDate=' + EDate);
  }





  public GetHolidaysListsCount() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetHolidaysListsCount');
  }

  public GetAllAccount_Creation() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllAccount_Creation');
  }

  public GetProjectProcess() {
    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetProjectProcess');
  }

  public getAccount_transactionByID(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/getAccount_transactionByID?ID=' + ID);
  }

  public GetAccount_BudgetByID(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAccount_BudgetByID?ID=' + ID);
  }
  public GetParticular() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetParticular');
  }

  public getAccount_transaction() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/getAccount_transaction');
  }

  public GetAccount_Budget() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAccount_Budget');
  }


  public GetTransaction_Type_Master() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetTransaction_Type_Master');
  }







  public GetInventoryList(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Inventory/GetInventoryList?LanguageID=' + id);
  }

  // public GetUserslist(id) {
  //   return this.http.get<any[]>(this.fmsUrl + 'User/GetUserslist?LanguageID=' + id);
  // }

  public GetVendorList(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Vendor/GetVendorList?LanguageID=' + id);
  }

  public GetallCreditNotes(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Vendor/GetallCreditNotes?LanguageID=' + id);
  }

  public GetAssignedToTaskProjectRequest(RaisedBy, id) {
    return this.http.get<any[]>(this.fmsUrl + '/User/GetAssignedToTaskProjectRequest?LanguageID=' + id + '&RaisedBy=' + RaisedBy);
  }
  public GetScheduledMaintenance(id) {
    return this.http.get<any[]>(this.fmsUrl + '/ScheduledMaintenance/GetScheduledMaintenance?LanguageID=' + id);
  }

  public GetTenantList(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetTenantList?LanguageID=' + id);
  }

  public GetInspection_MenuByID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetInspection_MenuByID?ID=' + id);
  }

  public GetPayment_Schedule(TenantID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetPayment_Schedule?TenantID=' + TenantID);
  }

  public GetRentDashboard(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetRentDashboard?LanguageID=' + id);
  }


  public GetAmenitiesPayments() {
    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetAmenitiesPayments');
  }

  public GetTenantNotice(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetTenantNotice?LanguageID=' + id);
  }

  public GetVisitorList(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Visitors/GetVisitorList?LanguageID=' + id);
  }

  public GetStaffSalary(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStaffSalary?LanguageID=' + id);
  }

  public GetStaffSalarybymonth(SDate, EDate, Bid, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStaffSalarybymonth?SDate=' + SDate + '&EDate=' + EDate + '&Bid=' + Bid + '&LanguageID=' + LanguageID);
  }

  public GetStaffNoOfDays(ID, MonthID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStaffNoOfDays?ID=' + ID + '&MonthID=' + MonthID);
  }

  public GetFullInvetoryReport(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Inventory/GetFullInvetoryReport?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetItemType(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetItemType?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetInvoiceAttachments(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetInvoiceAttachments?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }


  // public GetAllAttendance(SDate, EDate) {
  //   return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllAttendance?SDate=' + SDate + '&EDate=' + EDate);
  // }



  public GetServiceHistory(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Equipment/GetServiceHistory?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }



  public GetFloor(BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetFloor?BuildingID=' + BuildingID);
  }


  public GetWorkSpaceDetails(BID, FID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetWorkSpaceDetails?BID=' + BID + '&FID=' + FID);
  }

  public GetPaymentsFor(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetPaymentsFor?LanguageID=' + id);
  }


  public InsertWorkplaceRequest(wsentity) {

    return this.http.post(this.fmsUrl + "/Building/InsertWorkplaceRequest", wsentity);
  }
  // public InsertSupport(SupportEntity) {
  //   
  //   return this.http.post(this.fmsUrl + "Equipment/InsertSupport", SupportEntity);
  // }


  public InsertSupport(SupportEntity) {

    return this.http.post(this.fmsUrl + "/Equipment/InsertSupport", SupportEntity);
  }

  public InsertHolidaysLists(HolidaysEntity) {

    return this.http.post(this.fmsUrl + "/Building/InsertHolidaysLists", HolidaysEntity);
  }

  public InsertEmployee_Benifits(EmployeeEntity) {

    return this.http.post(this.fmsUrl + "/Building/InsertEmployee_Benifits", EmployeeEntity);
  }

  public InsertAccount_Creation(AccountsEntity) {

    return this.http.post(this.fmsUrl + "/Building/InsertAccount_Creation", AccountsEntity);
  }

  public InsertWithholdingTax(WithholdingEntity) {

    return this.http.post(this.fmsUrl + "/Building/InsertWithholdingTax", WithholdingEntity);
  }

  public InsertAccount_transaction(TransactionEntity) {

    return this.http.post(this.fmsUrl + "/Building/InsertAccount_transaction", TransactionEntity);
  }

  public InsertAccount_Budget(TransactionEntity) {

    return this.http.post(this.fmsUrl + "/Building/InsertAccount_Budget", TransactionEntity);
  }




  public InsertStaffDetails(StaffEntity) {

    return this.http.post(this.fmsUrl + "/Building/InsertStaffDetails", StaffEntity);
  }

  public InsertPhiliPayrolls(StaffEntity) {

    return this.http.post(this.fmsUrl + "/Building/InsertPhiliPayrolls", StaffEntity);
  }


  public GetStaffDetails() {

    return this.http.get(this.fmsUrl + "/Building/GetStaffDetails");
  }

  public GetStaff_Payment() {

    return this.http.get<any[]>(this.fmsUrl + "/Building/GetStaff_Payment");
  }


  public GetEmployeeBenefitsWithoutId() {

    return this.http.get<any[]>(this.fmsUrl + "/Building/GetEmployeeBenefitsWithoutId");
  }



  public GetMyAbsentStaff(sdate, edate) {

    return this.http.get<any[]>(this.fmsUrl + "/Building/GetMyAbsentStaff?Startdate=" + sdate + '&Enddate=' + edate);
  }

  public GetLoginBy(SDate, EDate) {

    return this.http.get(this.fmsUrl + "/Building/GetLoginBy?SDate=" + SDate + '&EDate=' + EDate);
  }



  public GetAllAttendance(SDate, EDate) {

    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllAttendance?SDate=' + SDate + '&EDate=' + EDate);
  }


  public GetStaffExpense() {

    return this.http.get(this.fmsUrl + "/Building/GetStaffExpense");
  }



  public GetSupport() {

    return this.http.get(this.fmsUrl + "/Equipment/GetSupport");
  }
  public InsertUtilities(UtilityEntity) {

    return this.http.post(this.fmsUrl + "/MobileUser/InsertUtilities", UtilityEntity);
  }


  public InsertRent(RentEntity) {

    return this.http.post(this.fmsUrl + "/Tenant/InsertRent", RentEntity);
  }

  public InsertAmenitiesPayments(RentEntity) {

    return this.http.post(this.fmsUrl + "/Tenant/InsertAmenitiesPayments", RentEntity);
  }
  public InsertStaff_Payment(RentEntity) {

    return this.http.post(this.fmsUrl + "/Building/InsertStaff_Payment", RentEntity);
  }

  public InsertStaffExpense(RentEntity) {

    return this.http.post(this.fmsUrl + "/Building/InsertStaffExpense", RentEntity);
  }


  public InsertTechnologyRequest(TechnoEntity) {

    return this.http.post(this.fmsUrl + "/Technology/InsertTechnologyRequest", TechnoEntity);
  }

  public InsertAnnouncement(AnnouncementEntity) {

    return this.http.post(this.fmsUrl + "/Announcement/InsertAnnouncement", AnnouncementEntity);
  }

  public InsertVisitor(VisitorEntity) {

    return this.http.post(this.fmsUrl + "/Visitors/InsertVisitor", VisitorEntity);
  }

  // public InsertMaintenanceRequest(maintainanceEntity) {
  //   
  //   return this.http.post(this.fmsUrl + "Maintenance/InsertMaintenanceRequest", maintainanceEntity);
  // }


  public InsertScheduledMaintenance(ScheduledMaintainanceEntity) {

    return this.http.post(this.fmsUrl + "/ScheduledMaintenance/InsertScheduledMaintenance", ScheduledMaintainanceEntity);
  }

  public InsertProjectRequest(projectreqEntity) {

    return this.http.post(this.fmsUrl + "/ProjectRequest/InsertProjectRequest", projectreqEntity);
  }

  public InsertScheduleRequest(EventPlannerEntity) {

    return this.http.post(this.fmsUrl + "/ScheduleRequest/InsertScheduleRequest", EventPlannerEntity);
  }

  // public InsertUsers(UsersEntity) {
  //   
  //   return this.http.post(this.fmsUrl + "User/InsertUsers", UsersEntity);
  // }

  public InsertTransportationRequest(TransportEntity) {

    return this.http.post(this.fmsUrl + "/Building/InsertTransportationRequest", TransportEntity);
  }

  public InsertResourceLocation(ResourceEntity) {

    return this.http.post(this.fmsUrl + "/ResourceLocation/InsertResourceLocation", ResourceEntity);
  }

  public InsertWorkSpace_Master(floordetails) {

    return this.http.post(this.fmsUrl + "/Building/InsertWorkSpace_Master", floordetails);
  }


  public InsertEquipment(AssetsEntity) {

    return this.http.post(this.fmsUrl + "/Equipment/InsertEquipment", AssetsEntity);
  }


  public InsertProjectProcess(ProjectProgressEntity) {

    return this.http.post(this.fmsUrl + "/Building/ProjectProcess", ProjectProgressEntity);
  }


  public InsertPurchasePayment(VendorPaymentsEntity) {

    return this.http.post(this.fmsUrl + "/Purchase/InsertPurchasePayment", VendorPaymentsEntity);
  }

  public InsertInventory(newinventoryEntity) {

    return this.http.post(this.fmsUrl + "/Inventory/InsertInventory", newinventoryEntity);
  }

  public InsertTransportationPayment(Entity) {

    return this.http.post(this.fmsUrl + "/TransportationRequest/InsertTransportationPayment", Entity);
  }


  // public DeleteInventoryDocument(ID) {
  //   
  //   return this.http.post(this.fmsUrl + "Inventory/DeleteInventoryDocument?ID=" + ID, {});
  // }


  public DeleteInventoryDocument(ID) {

    return this.http.post(this.fmsUrl + "/Inventory/DeleteInventoryDocument?ID=" + ID, {});
  }

  // public DeleteScheduleRequestAttachment(ID) {
  //   
  //   return this.http.post(this.fmsUrl + "ScheduleRequest/DeleteScheduleRequestAttachment?ID=" + ID, {});
  // }

  public DeleteEquipmentInvoice(ID) {

    return this.http.post(this.fmsUrl + "/Equipment/DeleteEquipmentInvoice?ID=" + ID, {});
  }

  public DeleteEquipmentPhoto(ID) {

    return this.http.post(this.fmsUrl + "/Equipment/DeleteEquipmentPhoto?ID=" + ID, {});
  }

  public DeleteEquipmentAttachment(ID) {

    return this.http.post(this.fmsUrl + "/Equipment/DeleteEquipmentAttachment?ID=" + ID, {});
  }

  public DeleteAnnouncementDocument(ID) {

    return this.http.post(this.fmsUrl + "/Announcement/DeleteAnnouncementDocument?ID=" + ID, {});
  }
  public DeleteEquipment(ID) {

    return this.http.post(this.fmsUrl + "/Equipment/DeleteEquipment?ID=" + ID, {});
  }



  public DeleteArchitecturalStagesProcessCheck(ID) {

    return this.http.post(this.fmsUrl + "/Equipment/DeleteArchitecturalStagesProcessCheck?ID=" + ID, {});
  }

  public DeleteAccount_Creation(ID) {

    return this.http.post(this.fmsUrl + "/Building/DeleteAccount_Creation?ID=" + ID, {});
  }

  public DeleteAccount_transaction(ID) {

    return this.http.post(this.fmsUrl + "/Building/DeleteAccount_transaction?ID=" + ID, {});
  }

  public DeleteAccount_Budget(ID) {

    return this.http.post(this.fmsUrl + "/Building/DeleteAccount_Budget?ID=" + ID, {});
  }



  public DeleteStaffDetails(ID) {

    return this.http.post(this.fmsUrl + "/Building/DeleteStaffDetails?ID=" + ID, {});
  }

  public DeleteStaff_Payment(ID) {

    return this.http.post(this.fmsUrl + "/Building/DeleteStaff_Payment?ID=" + ID, {});
  }

  public DeleteEmployee_Benefits(ID) {

    return this.http.post(this.fmsUrl + "/Building/DeleteEmployee_Benefits?ID=" + ID, {});
  }

  public DeleteStaffExpense(ID) {

    return this.http.post(this.fmsUrl + "/Building/DeleteStaffExpense?ID=" + ID, {});
  }

  public DeleteHolidaysLists(ID) {

    return this.http.post(this.fmsUrl + "/Building/DeleteHolidaysLists?ID=" + ID, {});
  }

  public DeleteEquipmentType(ID) {

    return this.http.post(this.fmsUrl + "/Building/DeleteEquipmentType?ID=" + ID, {});
  }

  public DeleteItemType(ID) {

    return this.http.post(this.fmsUrl + "/Building/DeleteItemType?ID=" + ID, {});
  }

  public DeleteTechnologyDocument(ID) {

    return this.http.post(this.fmsUrl + "/Technology/DeleteTechnologyDocument?ID=" + ID, {});
  }

  public DeleteScheduleRequest(ID) {

    return this.http.post(this.fmsUrl + "/ScheduleRequest/DeleteScheduleRequest?ID=" + ID, {});
  }
  public DeleteScheduleRequestAttachment(ID) {

    return this.http.post(this.fmsUrl + "/ScheduleRequest/DeleteScheduleRequestAttachment?ID=" + ID, {});
  }

  public DeleteVendor(ID) {

    return this.http.post(this.fmsUrl + "/Vendor/DeleteVendor?ID=" + ID, {});
  }

  public DeleteInventory(ID) {

    return this.http.post(this.fmsUrl + "/Inventory/DeleteInventory?ID=" + ID, {});
  }


  public DeleteScheduledMaintenance(ID) {

    return this.http.post(this.fmsUrl + "/ScheduledMaintenance/DeleteScheduledMaintenance?ID=" + ID, {});
  }

  public CancelScheduleMaintenance(ID) {

    return this.http.post(this.fmsUrl + "/ScheduledMaintenance/CancelScheduleMaintenance?ID=" + ID, {});
  }

  public DeleteTenant(ID) {

    return this.http.post(this.fmsUrl + "/Tenant/DeleteTenant?ID=" + ID, {});
  }
  public DeleteRent(ID) {

    return this.http.post(this.fmsUrl + "/Tenant/DeleteRent?ID=" + ID, {});
  }

  public DeleteTenantDocument(ID) {

    return this.http.post(this.fmsUrl + "/Tenant/DeleteTenantDocument?ID=" + ID, {});
  }

  public DeleteTransportationRequest(ID) {

    return this.http.post(this.fmsUrl + "/TransportationRequest/DeleteTransportationRequest?ID=" + ID, {});
  }

  public DeleteAnnouncement(ID) {

    return this.http.post(this.fmsUrl + "/Announcement/DeleteAnnouncement?ID=" + ID, {});
  }

  public CancelTransportationRequests(ID) {

    return this.http.post(this.fmsUrl + "/TransportationRequest/CancelTransportationRequests?ID=" + ID, {});
  }



  public UpdateVendor(ID, Entity) {

    Entity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Vendor/UpdateVendor", Entity);
  }

  public ChangePasswordWEB(UserID, Entity) {

    Entity["UserID"] = UserID;
    return this.http.post(this.fmsUrl + "/Building/ChangePasswordWEB", Entity);
  }


  public UpdateEquipment(ID, AssetsEntity) {

    AssetsEntity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Equipment/UpdateEquipment", AssetsEntity);
  }

  public Update_Transmittals(ID, Entity) {
    Entity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Building/Update_Transmittals", Entity);
  }




  public UpdateBuildingStages(ID, AssetsEntity) {

    AssetsEntity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Tenant/UpdateBuildingStages", AssetsEntity);
  }

  public UpdateAccessReport(UserID, AssetsEntity) {

    AssetsEntity["UserID"] = UserID;
    return this.http.post(this.fmsUrl + "/User/UpdateAccessReport", AssetsEntity);
  }

  public UpdateAccount_transaction(ID, AssetsEntity) {

    AssetsEntity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Building/UpdateAccount_transaction", AssetsEntity);
  }

  public UpdateAccount_Budget(ID, BudgetEntity) {

    BudgetEntity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Building/UpdateAccount_Budget", BudgetEntity);
  }

  public UpdateAccount_Creation(ID, AccountsEntity) {

    AccountsEntity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Building/UpdateAccount_Creation", AccountsEntity);
  }

  public UpdateStaffDetails(ID, StaffEntity) {

    StaffEntity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Building/UpdateStaffDetails", StaffEntity);
  }

  public UpdateEmployeeBenifits(ID, Entity) {

    Entity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Building/UpdateEmployeeBenifits", Entity);
  }

  public UpdateHolidaysLists(ID, Entity) {

    Entity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Building/UpdateHolidaysLists", Entity);
  }


  public UpdateTechnologyRequest(ID, Entity) {

    Entity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Technology/UpdateTechnologyRequest", Entity);
  }

  public UpdateItemType(ID, ItemsEntity) {

    ItemsEntity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Inventory/UpdateItemType", ItemsEntity);
  }

  public UpdateSchedulRequestApprovalStatus(ID, Entity) {

    Entity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/ScheduleRequest/UpdateSchedulRequestApprovalStatus", Entity);
  }

  public UpdateScheduleReasonForCancel(ID, Entity) {

    Entity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/ScheduleRequest/UpdateScheduleReasonForCancel", Entity);
  }

  public UpdateScheduleRequest(ID, Entity) {

    Entity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/ScheduleRequest/UpdateScheduleRequest", Entity);
  }

  public UpdateScheduledMaintenance(ID, Entity) {

    Entity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/ScheduledMaintenance/UpdateScheduledMaintenance", Entity);
  }

  public UpdateProjectRequest(ID, Entity) {

    Entity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/ProjectRequest/UpdateProjectRequest", Entity);
  }

  PouseUsers(data) {
    debugger
    this.URL = this.fmsUrl + '/User/PouseUsers/';
    return this.http.post(this.URL, data)
  }
  public UpdateRent(ID, RentEntity) {

    RentEntity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Tenant/UpdateRent", RentEntity);
  }

  public UpdateAmenitiesPayments(ID, RentEntity) {

    RentEntity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Tenant/UpdateAmenitiesPayments", RentEntity);
  }

  public UpdateStaff_Payment(ID, RentEntity) {

    RentEntity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Building/UpdateStaff_Payment", RentEntity);
  }

  public UpdateStaffExpense(ID, RentEntity) {

    RentEntity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Building/UpdateStaffExpense", RentEntity);
  }


  public GetCountryType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetCountryType?LanguageID=' + id);
  }

  public GetStateType(id, CountryID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStateType?LanguageID=' + id + '&CountryID=' + CountryID);
  }

  public GetCityType(id, StateID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetCityType?LanguageID=' + id + '&StateID=' + StateID);
  }
  public SupportPhotoUpload(files) {
    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.fmsUrl + '/MasterDemo/SupportPhotoUpload/', testData);
  }


  // public TechReqDocUpload(files) {
  //   let testData: FormData = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //     testData.append('file_upload', files[i], files[i].name);
  //   }
  //   return this.http.post(this.fmsUrl + 'MasterDemo/TechReqDocUpload/', testData);
  // }

  public UploadUtilitiesDocument(files) {
    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.fmsUrl + '/MasterDemo/UploadUtilitiesDocument/', testData);
  }

  public VisitorPhotoUpload(files) {
    debugger
    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/VisitorPhotoUpload/', testData);
    debugger
  }

  public ScheduleMaintenancePhotoUpload(files) {
    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/ScheduleMaintenancePhotoUpload/', testData);
  }

  // public InventoryInvoiceUpload(files) {
  //   let testData: FormData = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //     testData.append('file_upload', files[i], files[i].name);
  //   }
  //   return this.http.post(this.fmsUrl + 'MasterDemo/InventoryInvoiceUpload/', testData);
  // }

  public ScheduleMaintenanceAttachmentUpload(files) {
    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/ScheduleMaintenanceAttachmentUpload/', testData);
  }

  public UploadCV(files) {
    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/UploadCV/', testData);
  }

  public UpdateEquipmentInvoice(Entity) {
    return this.http.post(this.fmsUrl + '/Equipment/UpdateEquipmentInvoice/', Entity);
  }

  public UpdateTechnologyDocument(Entity) {
    return this.http.post(this.fmsUrl + '/Technology/UpdateTechnologyDocument/', Entity);
  }


  public UpdateEquipmentAttachment(Entity) {
    return this.http.post(this.fmsUrl + '/Equipment/UpdateEquipmentAttachment/', Entity);
  }

  public UpdateAnnouncementDocument(Entity) {
    return this.http.post(this.fmsUrl + '/Announcement/UpdateAnnouncementDocument/', Entity);
  }




  public UpdateInventoryAttachment(Entity) {
    return this.http.post(this.fmsUrl + '/Inventory/UpdateInventoryAttachment/', Entity);
  }

  public EquipmentInvoiceUpload(files) {
    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/EquipmentInvoiceUpload/', testData);
  }

  public EquipmentPhotoUpload(files) {
    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/EquipmentPhotoUpload/', testData);
  }

  public InventoryInvoiceUpload(files) {

    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/InventoryInvoiceUpload/', testData);
  }

  public TechReqDocUpload(files) {

    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/TechReqDocUpload/', testData);
  }


  public AnnouncementAttachmentUpload(files) {

    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/AnnouncementAttachmentUpload/', testData);
  }



  public TransportationAttachmentUpload(files) {

    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/TransportationAttachmentUpload/', testData);
  }


  public ScheduleRequestPhotoUpload(files) {

    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/ScheduleRequestPhotoUpload/', testData);
  }


  public EquipmentAttachmentUpload(files) {
    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/EquipmentAttachmentUpload/', testData);
  }



  public ProjectProgressPhotosUpload(files) {
    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/ProjectProgressPhotosUpload/', testData);
  }



  public UpdateEquipmentPhoto(files) {
    debugger
    // let testData: FormData = new FormData();
    // for (let i = 0; i < files.length; i++) {
    //   testData.append('file_upload', files[i], files[i].name);
    // }
    return this.http.post<any[]>(this.fmsUrl + '/Equipment/UpdateEquipmentPhoto', files);
  }


  public ProjReqDocUpload(files) {

    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/ProjReqDocUpload', testData);
  }


  // public TransportationAttachmentUpload(files) {
  //   let testData: FormData = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //     testData.append('file_upload', files[i], files[i].name);
  //   }
  //   return this.http.post(this.fmsUrl + 'MasterDemo/TransportationAttachmentUpload/', testData);
  // }

  public ResLocDocUpload(files) {
    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post(this.fmsUrl + '/MasterDemo/ResLocDocUpload/', testData);
  }

  public GetTenantListByBuildingID(id, BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetTenantListByBuildingID?LanguageID=' + id + '&ID=' + BuildingID);
  }

  public GetTechnologyRequestType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetTechnologyRequestType?LanguageID=' + id);
  }
  public GePriorityType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GePriorityType?LanguageID=' + id);
  }

  public GetBuilding(LanguageID, BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetBuilding?LanguageID=' + LanguageID + '&ID=' + BuildingID);
  }
  // public GetUserType(id) {
  //   return this.http.get<any[]>(this.fmsUrl + 'MasterDemo/GetUserType?LanguageID=' + id);
  // }

  public GetStatusType() {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetStatusType');
  }

  public GetUnit_MasterbybID(BID, FloorID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetUnit_MasterbybID?BID=' + BID + '&FloorID=' + FloorID);
  }





  public GetStaffByDate(SDate, StartTime, StaffTypeID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStaffByDate?Date=' + SDate + '&StartTime=' + StartTime + '&StaffTypeID=' + StaffTypeID);
  }

  public GetRentType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetRentType?LanguageID=' + id);
  }

  public GetAmenitiesPaymentFor(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetAmenitiesPaymentFor?LanguageID=' + id);
  }

  public GetPaymentType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetPaymentType?LanguageID=' + id);
  }

  public GetCardType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetCardType?LanguageID=' + id);
  }

  public GetVisitorType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Visitors/GetVisitorType?LanguageID=' + id);
  }

  public GetVisitorIDType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Visitors/GetVisitorIDType?LanguageID=' + id);
  }

  public GetMaintenanceRequestType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetMaintenanceRequestType?LanguageID=' + id);
  }

  public GetMaintenanceFrequencyType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/ScheduledMaintenance/GetMaintenanceFrequencyType?LanguageID=' + id);
  }

  public GetCheckListType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Maintenance/GetCheckListType?LanguageID=' + id);
  }

  public GetProjectRequestType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetProjectRequestType?LanguageID=' + id);
  }

  public GetVendorType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetVendorType?LanguageID=' + id);
  }

  public GetVendorByTypeID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Vendor/GetVendorByTypeID?ID=' + id);
  }



  public GetRepeatType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetRepeatType?LanguageID=' + id);
  }


  // public GetRoleType(UserTypeID) {
  //   return this.http.get<any[]>(this.fmsUrl + 'MasterDemo/GetRoleType?UserTypeID=' + UserTypeID);
  // }

  // public GetUserrole(id) {
  //   return this.http.get<any[]>(this.fmsUrl + 'User/GetUserrole?LanguageID=' + id);
  // }

  public GetFloorTypebyBID(BID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetFloorTypebyBID?BID=' + BID);
  }

  public Get_WorkStationType_Master(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/Get_WorkStationType_Master?LanguageID=' + id);
  }

  public GetWorkplaceRequestWeb(WorkStationID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetWorkplaceRequestWeb?WorkStationID=' + WorkStationID);
  }

  public GetEquipmentType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetEquipmentType?LanguageID=' + id);
  }

  public GetParentEquipmentmaster(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Equipment/GetParentEquipmentmaster?LanguageID=' + id);
  }

  public GetProjectTrackingByProjectID(ProjectID) {
    return this.http.get<any[]>(this.fmsUrl + '/ProjectRequest/GetProjectTrackingByProjectID?ProjectID=' + ProjectID);
  }

  public GetAllvendorbidprojects() {
    return this.http.get<any[]>(this.fmsUrl + '/ProjectRequest/GetAllvendorbidprojects');
  }


  public GetRemindType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetRemindType?LanguageID=' + id);
  }
  //chidanand

  public GetBookPartyHallLanguageByID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Language/GetBookPartyHallLanguageByID?LanguageID=' + id);
  }
  // InsertBuilding(data) {

  //   this.URL = this.fmsUrl + 'Building/InsertBuilding';
  //   return this.http.post(this.URL, data)
  // }

  GetBuildinglist1(data) {

    this.URL = this.fmsUrl + '/Building/GetBuildinglist' + '?LanguageID=' + data;
    return this.http.get(this.URL)
  }

  // GetStaffNoOfDays(data) {

  //   this.URL = this.fmsUrl + '/Building/GetStaffNoOfDays' + '?ID=' + data;
  //   return this.http.get(this.URL)
  // }

  InsertBuildingPlan(data) {

    this.URL = this.fmsUrl + '/Building/InsertBuildingPlan';
    return this.http.post(this.URL, data)
  }

  InsertProjectProgressvideos(data) {

    this.URL = this.fmsUrl + '/Building/InsertProjectProgressvideos';
    return this.http.post(this.URL, data)
  }

  InsertBuildingHallDetails(data) {

    this.URL = this.fmsUrl + '/Building/InsertBuildingHallDetails';
    return this.http.post(this.URL, data)
  }



  GetContactListby_buldingid(data) {

    this.URL = this.fmsUrl + '/Building/GetContactListby_buldingid' + '?BuildingID=' + data;
    return this.http.get(this.URL)
  }



  GetBuildingHallDetailsByID(data) {

    this.URL = this.fmsUrl + '/Building/GetBuildingHallDetailsByID' + '?BuildingID=' + data;
    return this.http.get(this.URL)
  }


  GetAvailablePartyHall(data, data1, data3) {

    this.URL = this.fmsUrl + '/Building/GetAvailablePartyHall' + '?HallID=' + data + '&Date=' + data1 + '&Time=' + data3;
    return this.http.get(this.URL)
  }

  // GetPaymentsFor(data) {

  //   this.URL = this.fmsUrl + 'Building/GetPaymentsFor' + '?LanguageID=' + data;
  //   return this.http.get(this.URL)
  // }

  // GetPaymentType(data) {

  //   this.URL = this.fmsUrl + 'Purchase/GetPaymentType' + '?LanguageID=' + data;
  //   return this.http.get(this.URL)
  // }



  // InsertBuildingPayments(data) {

  //   this.URL = this.fmsUrl + 'Building/InsertBuildingPayments';
  //   return this.http.post(this.URL, data)
  // }

  InsertParkingType(data) {

    this.URL = this.fmsUrl + '/Building/InsertParkingType';
    return this.http.post(this.URL, data)
  }


  // GetFloor(data) {

  //   this.URL = this.fmsUrl + 'Building/GetFloor' + '?BuildingID=' + data;
  //   return this.http.get(this.URL)
  // }

  GetFacingList(LanguageID) {

    this.URL = this.fmsUrl + '/Building/GetFacingList?LanguageID=' + LanguageID;
    return this.http.get(this.URL)
  }

  // InsertUnit_Master(data) {

  //   this.URL = this.fmsUrl + '/Building/InsertUnit_Master';
  //   return this.http.post(this.URL, data)
  // }



  GetStaffType(data) {

    this.URL = this.fmsUrl + '/Building/GetStaffType' + '?LanguageID=' + data;
    return this.http.get(this.URL)
  }



  // InsertBuildingStaff(data) {

  //   this.URL = this.fmsUrl + 'Building/InsertBuildingStaff';
  //   return this.http.post(this.URL, data)
  // }

  GetStaffByBuildID(data) {

    this.URL = this.fmsUrl + '/Building/GetStaffByBuildID' + '?ID=' + data;
    return this.http.get(this.URL)
  }


  GetCobtractorStaffByBuildID(data) {

    this.URL = this.fmsUrl + '/Building/GetCobtractorStaffByBuildID' + '?ID=' + data;
    return this.http.get(this.URL)
  }


  GetLeaveType(data) {

    this.URL = this.fmsUrl + '/MasterDemo/GetLeaveType' + '?LanguageID=' + data;
    return this.http.get<any[]>(this.URL)
  }

  // InsertStaffLeaves(data) {

  //   this.URL = this.fmsUrl + 'Building/InsertStaffLeaves';
  //   return this.http.post(this.URL, data)
  // }

  InsertNotification(data) {

    this.URL = this.fmsUrl + '/User/InsertNotification/';
    return this.http.post(this.URL, data)
  }

  AnnouncementNotification(data) {

    this.URL = this.fmsUrl + '/User/AnnouncementNotification/';
    return this.http.post(this.URL, data)
  }

  // GetStaffSalary(data) {

  //   this.URL = this.fmsUrl + 'Building/GetStaffSalary' + '?LanguageID=' + data;
  //   return this.http.get(this.URL)
  // }


  BookHallUserType(data) {

    this.URL = this.fmsUrl + '/Building/BookHallUserType' + '?LanguageID=' + data;
    return this.http.get(this.URL)
  }
  //----will do from here 2marow
  GetTenantListByBuildingFloorID(data, data1, data2) {

    this.URL = this.fmsUrl + '/Tenant/GetTenantListByBuildingFloorID' + '?BuildingID=' + data + '&FloorID=' + data1 + '&LanguageID=' + data2;
    return this.http.get(this.URL)
  }


  // InsertBookPartyHall(data) {

  //   this.URL = this.fmsUrl + 'Building/InsertBookPartyHall';
  //   return this.http.post(this.URL, data)
  // }

  // GetCardType(data) {

  //   this.URL = this.fmsUrl + 'Tenant/GetCardType' + '?LanguageID=' + data;
  //   return this.http.get(this.URL)
  // }





  //Vamsi
  public getTenentTypelistbyLanguage(LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetTenantType?LanguageID=' + LanguageID);
  }

  public GetRentIncrementType(LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetRentIncrementType?LanguageID=' + LanguageID);
  }

  public GetAccountTypelist(LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetAccountType?languageid=' + LanguageID);
  }

  public GetSalaryTypeMaster() {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetSalaryTypeMaster');
  }

  public GetAccount_CreationByID(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAccount_CreationByID?ID=' + ID);
  }



  public TenantAttachmentDocumentUpload(files) {
    let fileData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      fileData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/TenantDocumentUpload', fileData);
  }


  public tenantprofileupload(files) {

    let fileData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      fileData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/TenantProfilePhotoUpload', fileData);

  }

  public insertTenantdetails(tenantentity) {

    return this.http.post(this.fmsUrl + "/Tenant/InsertTenant", tenantentity);
  }

  public savetenantAttachments(Entity) {
    return this.http.post(this.fmsUrl + "/Tenant/InsertTenantDocument", Entity);
  }

  public InsertInventoryConsume(Entity) {
    return this.http.post(this.fmsUrl + "/Inventory/InsertInventoryConsume", Entity);
  }

  public inserttenantAggrement(files) {

    let fileData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      fileData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + "/MasterDemo/UploadTenantAgreement", fileData);
  }
  public savetenantagrements(Entity) {
    return this.http.post(this.fmsUrl + "/Tenant/InsertTenantAgreement", Entity);
  }

  //Sanath
  public InsertItemType(data) {

    return this.http.post(this.fmsUrl + "/Inventory/InsertItemType", data);
  }

  public GetPOType() {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetPOType');
  }

  public GetSupervisors() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetSupervisors');
  }

  public GetItemTypes(LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetItemType?LanguageID=' + LanguageID);
  }

  public GetAlreadyPresentItem(Short) {
    return this.http.get<any[]>(this.fmsUrl + '/Inventory/GetAlreadyPresentItem?Short=' + Short);
  }

  public GetInventoryRequiredReport(SDate, EDate, LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Inventory/GetInventoryRequiredReport?SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetVendor() {
    return this.http.get<any[]>(this.fmsUrl + '/Vendor/GetVendor');
  }
  public GetAllStaff() {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllStaff');
  }
  public InsertCreditNotes(data) {

    return this.http.post(this.fmsUrl + "/Purchase/InsertCreditNotes", data);
  }

  public GetVendorServiceAreaMaster(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetVendorServiceAreaMaster?LanguageID=' + id);
  }

  public GetServiceType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetServiceType?LanguageID=' + id);
  }

  public GetBankType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetBankType?LanguageID=' + id);
  }

  public GetAccountType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetAccountType?LanguageID=' + id);
  }

  public InsertVendor(data) {

    return this.http.post(this.fmsUrl + "/Vendor/InsertVendor", data);
  }

  //mamata
  public GetAvailableInvetoryItems(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Inventory/GetAvailableInvetoryItems?LanguageID=' + id);
  }


  public GetStaff_PaymentByID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStaff_PaymentByID?ID=' + id);
  }

  public GetStaffExpenseByID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStaffExpenseByID?ID=' + id);
  }

  public GetPOType1(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetPOType?LanguageID=' + id);
  }

  public GetVendorForPurchase(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetVendorForPurchase?LanguageID=' + id);
  }
  public GetVendorPaymentDashboard(SDate, EDate) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetVendorPaymentDashboard?SDate=' + SDate + '&EDate=' + EDate);
  }

  public GetallPurchaseReturn(SDate, EDate) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetallPurchaseReturn?SDate=' + SDate + '&EDate=' + EDate);
  }

  public GetVendorPartialPayments(SDate, EDate) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetVendorPartialPayments?SDate=' + SDate + '&EDate=' + EDate);
  }

  public UpdatePurchasePayment(newinventoryEntity) {

    return this.http.post(this.fmsUrl + "/Purchase/UpdatePurchasePayment", newinventoryEntity);
  }

  public GetEquipment(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Equipment/GetEquipment?ID=' + id);
  }

  public Get_TransmittalsByID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/Get_TransmittalsByID?ID=' + id);
  }


  public GetStaffDetailsByID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStaffDetailsByID?ID=' + id);
  }

  public GetEmployeeBenefits(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetEmployeeBenefits?ID=' + id);
  }

  public GetHolidaysListsByID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetHolidaysListsByID?ID=' + id);
  }



  public GetInventorybyID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Inventory/GetInventorybyID?ID=' + id);
  }


  public GetAnnouncementListByID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Announcement/GetAnnouncementListByID?ID=' + id);
  }

  public GetItemTypebyID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Inventory/GetItemTypebyID?ID=' + id);
  }
  public GetInventoryType() {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetInventoryType');
  }

  public GetVendorByID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Vendor/GetVendorByID?ID=' + id);
  }

  public GetScheduleRequestByID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/ScheduleRequest/GetScheduleRequestByID?ID=' + id);
  }

  public GetScheduleRequestAttachment(id) {
    return this.http.get<any[]>(this.fmsUrl + '/ScheduleRequest/GetScheduleRequestAttachment?ID=' + id);
  }

  public GetProjectDocument(id) {
    return this.http.get<any[]>(this.fmsUrl + '/ProjectRequest/GetProjectDocument?ID=' + id);
  }

  public GetScheduledMaintenanceList(id, languageid) {
    return this.http.get<any[]>(this.fmsUrl + '/ScheduledMaintenance/GetScheduledMaintenanceList?ID=' + id + '&LanguageID=' + languageid);
  }

  public GetUsersdrop() {
    return this.http.get<any[]>(this.fmsUrl + '/User/GetUsersdrop');
  }

  public GetStaff(LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStaff?LanguageID=' + LanguageID);
  }

  public GetScheduleAttachment(id) {

    return this.http.get<any[]>(this.fmsUrl + '/ScheduledMaintenance/GetScheduleAttachment?ID=' + id);
  }

  public GetSchedulePhoto(id) {

    return this.http.get<any[]>(this.fmsUrl + '/ScheduledMaintenance/GetSchedulePhoto?ID=' + id);
  }
  public GetPurchaseReportDetails(InvoiceNo) {

    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetPurchaseReportDetails?InvoiceNo=' + InvoiceNo);
  }


  public GetPOItemDetails(POID) {

    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetPOItemDetails?POID=' + POID);
  }

  public UpdateComplaintsAssignedTo(ID, AssignedTo, AssignedToName, Entity) {

    Entity["ID"] = ID;
    Entity["AssignedTo"] = AssignedTo;
    Entity["AssignedToName"] = AssignedToName;
    return this.http.post(this.fmsUrl + "/Building/UpdateComplaintsAssignedTo?ID=" + ID + "&AssignedTo=" + AssignedTo + "&AssignedToName=" + AssignedToName, "");
  }

  public UpdateComplaintsAssignedToInternalUser(ID, AssignedTo, AssignedToName, Entity) {

    Entity["ID"] = ID;
    Entity["AssignedTo"] = AssignedTo;
    Entity["AssignedToName"] = AssignedToName;
    return this.http.post(this.fmsUrl + "/Building/UpdateComplaintsAssignedToInternalUser?ID=" + ID + "&AssignedTo=" + AssignedTo + "&AssignedToName=" + AssignedToName, "");
  }


  public UpdateTransportationRequestAssign(RowID, aaa, Entity) {

    Entity["ID"] = RowID;
    Entity["VendorID"] = aaa;
    return this.http.post(this.fmsUrl + "/TransportationRequest/UpdateTransportationRequestAssign", Entity);
  }


  public UpdatePharmacyAssigin(ID, aaa, Entity) {

    Entity["ID"] = ID;
    Entity["AssignedTo"] = aaa;
    return this.http.post(this.fmsUrl + "/Conceirge/UpdatePharmacyAssigin", Entity);
  }


  public UpdateGroceryAssigin(ID, aaa, Entity) {

    Entity["ID"] = ID;
    Entity["AssignedTo"] = aaa;
    return this.http.post(this.fmsUrl + "/Conceirge/UpdateGroceryAssigin", Entity);
  }

  public UpdateTenantNotice(ID, NoticeAccepted, NoticeReason, NoticeDate, tenentEntity) {

    tenentEntity["ID"] = ID;
    tenentEntity["NoticeAccepted"] = NoticeAccepted;
    tenentEntity["NoticeReason"] = NoticeReason;
    tenentEntity["NoticeDate"] = NoticeDate;
    return this.http.post(this.fmsUrl + "/Tenant/UpdateTenantNotice", tenentEntity);
  }

  public UpdatePharmacyCancelbit(ID, CancelBit, CancelledReason, Entity) {

    Entity["ID"] = ID;
    Entity["CancelBit"] = CancelBit;
    Entity["CancelledReason"] = CancelledReason;
    return this.http.post(this.fmsUrl + "/Conceirge/UpdatePharmacyCancelbit", Entity);
  }

  public UpdateGroceryCancelbit(ID, CancelBit, CancelReason, Entity) {

    Entity["ID"] = ID;
    Entity["CancelBit"] = CancelBit;
    Entity["CancelReason"] = CancelReason;
    return this.http.post(this.fmsUrl + "/Conceirge/UpdateGroceryCancelbit", Entity);
  }


  public UpdateDocCancelWeb(ID, CancelBit, CancelReason, Entity) {

    Entity["ID"] = ID;
    Entity["CancelBit"] = CancelBit;
    Entity["CancelReason"] = CancelReason;
    return this.http.post(this.fmsUrl + "/Conceirge/UpdateDocCancelWeb", Entity);
  }

  public UpdateUserComplaintsCompletion(ID, StateID, Entity) {

    Entity["ID"] = ID;
    Entity["StateID"] = StateID;
    return this.http.post(this.fmsUrl + "/Conceirge/UpdateUserComplaintsCompletion", Entity);
  }


  public UpdateDoctorVisitStatus(ID, StateID, Entity) {

    Entity["ID"] = ID;
    Entity["StateID"] = StateID;
    return this.http.post(this.fmsUrl + "/Conceirge/UpdateDoctorVisitStatus", Entity);
  }


  public UpdateTransportationRequest(TransReqID, Entity) {

    Entity["ID"] = TransReqID;
    return this.http.post(this.fmsUrl + "/TransportationRequest/UpdateTransportationRequest", Entity);
  }


  public UpdateAnnouncement(AnnouncementID, Entity) {

    Entity["ID"] = AnnouncementID;
    return this.http.post(this.fmsUrl + "/Announcement/UpdateAnnouncement", Entity);
  }


  public UpdateReadNotification(ID) {

    return this.http.post(this.fmsUrl + "/Purchase/UpdateReadNotification?ID=" + ID, '');
  }


  public UpdateInventoryDocument(ID, Entity) {

    Entity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/Inventory/UpdateInventoryDocument", Entity);
  }

  public UpdateScheduleRequestAttachment(ID, Entity) {

    Entity["ID"] = ID;
    return this.http.post(this.fmsUrl + "/ScheduleRequest/UpdateScheduleRequestAttachment", Entity);
  }

  public GetTenantDocumentByID(ID) {

    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetTenantDocumentByID?ID=' + ID);
  }

  public GetTenantAgreementByID(ID) {

    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetTenantAgreementByID?ID=' + ID);
  }


  public GetAlreadyPresentTenant(BuildingID, FloorID, Unit) {

    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetAlreadyPresentTenant?BuildingID=' + BuildingID + '&FloorID=' + FloorID + '&Unit=' + Unit);
  }

  public GetPaidRentList(BuildingID, FloorID, Unit, Date, RentTypeID, UserID) {

    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetPaidRentList?BuildingID=' + BuildingID + '&FloorID=' + FloorID + '&Unit=' + Unit + '&Date=' + Date + '&RentTypeID=' + RentTypeID + '&UserID=' + UserID);
  }





  public GetTenantListByID(ID) {

    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetTenantListByID?ID=' + ID);
  }

  public GetRentByID(ID) {

    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetRentByID?ID=' + ID);
  }

  public GetAmenitiesPaymentsByID(ID) {

    return this.http.get<any[]>(this.fmsUrl + '/Tenant/GetAmenitiesPaymentsByID?ID=' + ID);
  }

  public GetTransportationRequestBYID(ID) {

    return this.http.get<any[]>(this.fmsUrl + '/TransportationRequest/GetTransportationRequestBYID?ID=' + ID);
  }

  public GetEquipmentAttachment(ID) {

    return this.http.get<any[]>(this.fmsUrl + '/Equipment/GetEquipmentAttachment?ID=' + ID);
  }

  public GetAnnouncementDocument(ID) {

    return this.http.get<any[]>(this.fmsUrl + '/Announcement/GetAnnouncementDocument?ID=' + ID);
  }

  public GetEquipmentPhoto(ID) {

    return this.http.get<any[]>(this.fmsUrl + '/Equipment/GetEquipmentPhoto?ID=' + ID);
  }

  public GetEquipmentInvoice(ID) {

    return this.http.get<any[]>(this.fmsUrl + '/Equipment/GetEquipmentInvoice?ID=' + ID);
  }

  public GetInventoryDocument(ID) {

    return this.http.get<any[]>(this.fmsUrl + '/Inventory/GetInventoryDocument?ID=' + ID);
  }

  public InsertPO(entity) {
    return this.http.post(this.fmsUrl + "/Purchase/InsertPO", entity);
  }

  public savepoitems(entity) {
    return this.http.post(this.fmsUrl + "/Purchase/InsertPOItems", entity);
  }

  public getvendorlist(languageid) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetVendorForPurchase?LanguageID=' + languageid);
  }

  public getVendorPoids(vendorid, typeid) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetVendorPOIDs?VendorID=' + vendorid + '&Type=' + typeid);
  }
  public getItemsByOPID(poid) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetPOItemDetails?POID=' + poid);
  }

  public savePOinvoiceDetails(entity) {
    return this.http.post(this.fmsUrl + '/Purchase/InsertPurchaseReturn', entity);
  }

  public GetItemsToReturn(invoiceno) {

    return this.http.get(this.fmsUrl + '/Purchase/GetItemsToReturn?InvoiceNo=' + invoiceno);
  }


  public uploadvendorProjectbidattachment(files) {
    let formdata: FormData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }

    return this.http.post(this.fmsUrl + '/MasterDemo/vendorProjectbid/', formdata);
  }

  public Insertvendorbidproject(entity) {
    return this.http.post(this.fmsUrl + '/ProjectRequest/Insertvendorbidproject', entity);
  }

  public Getonlyprojectvendorlist(ProjectID) {
    return this.http.get(this.fmsUrl + "/ProjectRequest/Getonlyprojectvendorlist?ProjectID=" + ProjectID);
  }


  public Getvendorbidproject(projectid) {
    return this.http.get<any[]>(this.fmsUrl + "/Vendor/Getvendorbidproject?ProjectID=" + projectid);
  }

  public closeproject(projectID, AwardbidvendorID) {
    var entity = {};
    return this.http.post(this.fmsUrl + '/Vendor/AwardwinProjectRequest?ID=' + projectID + '&AwardbidvendorID=' + AwardbidvendorID, entity)
  }

  public GetProjectRequest(startDate, Enddate) {
    return this.http.get(this.fmsUrl + "/ProjectRequest/GetProjectRequest?SDate=" + startDate + "&EDate=" + Enddate);
  }

  public GetProjectRequestByID(projectrequestid) {

    return this.http.get(this.fmsUrl + "/ProjectRequest/GetProjectRequestByID?ID=" + projectrequestid);
  }
  public DeleteProjectRequest(projectrequestid) {
    return this.http.get(this.fmsUrl + "/ProjectRequest/DeleteProjectRequest?ID=" + projectrequestid);
  }
  public GetVisitorsByID(visitorId) {
    return this.http.get(this.fmsUrl + "/Visitors/GetVisitors?ID=" + visitorId);

  }
  public deletevisitor(visitor) {

    return this.http.get(this.fmsUrl + "/Visitors/DeleteVisitor?ID=" + visitor);

  }


  public GetParkingAllottedForTenantlist() {
    return this.http.get(this.fmsUrl + '/Tenant/GetParkingAllottedForTenantlist');
  }

  public GetParkingAllottedForTenantlist1() {
    return this.http.get(this.fmsUrl + '/Tenant/GetParkingAllottedForTenantlist1');
  }

  public GetFacinglist(LanguageID) {
    return this.http.get(this.fmsUrl + '/Building/GetFacingList?LanguageID=' + LanguageID);
  }

  public GetSlotListByID(buildingid, floorid) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetParkingSlotsByID?ID=' + buildingid + '&Floor=' + floorid);
  }

  public GetTenantSlotListByID1(buildingid, floorid) {

    return this.http.get<any[]>(this.fmsUrl + '/Building/GetParkingSlotsByID1?ID=' + buildingid + '&Floor=' + floorid);
  }


  public InsertParkingAllocation(slotentity) {
    return this.http.post(this.fmsUrl + '/Building/InsertParkingAllocation', slotentity);
  }

  public GetUsers(data, data1) {
    return this.http.get<any[]>(this.fmsUrl + '/User/GetUsers?ID=' + data + '&LanguageID=' + data1);
  }

  public GetRoleType(UserTypeID) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetRoleType?UserTypeID=' + UserTypeID);
  }

  public GetUserrole(id) {
    return this.http.get<any[]>(this.fmsUrl + '/User/GetUserrole?LanguageID=' + id);
  }





  public DecrptPassword(Password) {
    return this.http.get<any[]>(this.fmsUrl + '/User/DecrptPassword?Password=' + Password);
  }

  InsertUserRoles(data, data1, data2) {

    this.URL = this.fmsUrl + '/User/InsertUserRoles?UserID=' + data + '&RoleID=' + data1 + '&ModifiedBy=' + data2;
    return this.http.post(this.URL, data)
  }


  public GetUserType(id) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/GetUserType?LanguageID=' + id);
  }

  public GetUserslist(id) {
    return this.http.get<any[]>(this.fmsUrl + '/User/GetUserslist?LanguageID=' + id);
  }

  public DeleteUsers(data) {
    return this.http.get<any[]>(this.fmsUrl + '/User/DeleteUsers?ID=' + data);
  }

  public DeleteResourceLocation(data) {
    return this.http.get<any[]>(this.fmsUrl + '/ResourceLocation/DeleteResourceLocation?ID=' + data);
  }

  public GetResourceLocationByID(data) {
    return this.http.get<any[]>(this.fmsUrl + '/ResourceLocation/GetResourceLocationByID?ID=' + data);
  }


  public UpdateResourceLocation(ResourceEntity) {
    return this.http.post(this.fmsUrl + "/ResourceLocation/UpdateResourceLocation", ResourceEntity);
  }

  public UpdateBuilding(tenantentity) {
    return this.http.post(this.fmsUrl + "/Building/UpdateBuilding", tenantentity);
  }


  public DeleteBuilding(BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/DeleteBuilding?ID=' + BuildingID);
  }

  public GetBuildingPlanListBybuildingID(BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetBuildingPlanListBybuildingID?BID=' + BuildingID);
  }

  public DeleteBuildingPlan(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/DeleteBuildingPlan?ID=' + ID);
  }

  public GetBuildingHallDetailsBYHallID(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetBuildingHallDetailsBYHallID?ID=' + ID);
  }

  public UpdateBuildingHallDetails(tenantentity) {
    return this.http.post(this.fmsUrl + "/Building/UpdateBuildingHallDetails", tenantentity);
  }

  public DeleteBuildingHallDetails(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/DeleteBuildingHallDetails?ID=' + ID);
  }

  public DeleteBuildingPayments(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/DeleteBuildingPayments?ID=' + ID);
  }

  public GetParkingAllottedFloors(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetParkingAllottedFloors?ID=' + ID);
  }

  public GetParkingSlots(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetParkingSlots?BuildingID=' + ID);
  }
  public GetBuildingStaffByID(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetBuildingStaffByID?ID=' + ID);
  }
  public DeleteBuildingStaff(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/DeleteBuildingStaff?ID=' + ID);
  }

  public DeleteContractorStaff(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/DeleteContractorStaff?ID=' + ID);
  }
  public GetBuildingDocument(data) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetBuildingDocument?ID=' + data);
  }
  UpdateBuildingDocuments(data) {
    this.URL = this.fmsUrl + '/Building/UpdateBuildingDocuments';
    return this.http.post(this.URL, data)
  }
  public DeleteBuildingDocuments(data) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/DeleteBuildingDocuments?ID=' + data);
  }
  UpdateBookPartyHall(data) {
    this.URL = this.fmsUrl + '/Building/UpdateBookPartyHall';
    return this.http.post(this.URL, data)
  }
  public GetBookPartyHallBYID(data) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetBookPartyHallBYID?ID=' + data);
  }
  DeleteBookPartyHall(data) {
    this.URL = this.fmsUrl + '/Building/DeleteBookPartyHall';
    return this.http.post(this.URL, data)
  }
  UpdateStaffLeaves(data) {
    this.URL = this.fmsUrl + '/Building/UpdateStaffLeaves';
    return this.http.post(this.URL, data)
  }

  UpdateContractorStaffLeaves(data) {
    this.URL = this.fmsUrl + '/Building/UpdateContractorStaffLeaves';
    return this.http.post(this.URL, data)
  }
  InsertBuildingDocument(data) {

    this.URL = this.fmsUrl + '/Building/InsertBuildingDocument';
    return this.http.post(this.URL, data)
  }


  InsertLogin(data) {
    this.URL = this.fmsUrl + '/Building/InsertLogin';
    return this.http.post(this.URL, data)
  }

  InsertEquipmentAttachment(data) {
    this.URL = this.fmsUrl + '/Equipment/InsertEquipmentAttachment';
    return this.http.post(this.URL, data)
  }

  InsertProjectProgressPhotos(data) {
    this.URL = this.fmsUrl + '/Equipment/InsertProjectProgressPhotos';
    return this.http.post(this.URL, data)
  }

  InsertProjectDocument(data) {

    this.URL = this.fmsUrl + '/ProjectRequest/InsertProjectDocument';
    return this.http.post(this.URL, data)
  }

  InsertEquipmentPhoto(data) {
    this.URL = this.fmsUrl + '/Equipment/InsertEquipmentPhoto';
    return this.http.post(this.URL, data)
  }

  InsertActionIteamsAttachments(data) {
    this.URL = this.fmsUrl + '/Equipment/InsertActionIteamsAttachments';
    return this.http.post(this.URL, data)
  }


  InsertInventoryDocument(data) {
    this.URL = this.fmsUrl + '/Inventory/InsertInventoryDocument';
    return this.http.post(this.URL, data)
  }

  InsertTechnologyDocument(data) {
    this.URL = this.fmsUrl + '/Technology/InsertTechnologyDocument';
    return this.http.post(this.URL, data)
  }


  InsertAnnouncementDocument(data) {
    this.URL = this.fmsUrl + '/Announcement/InsertAnnouncementDocument';
    return this.http.post(this.URL, data)
  }

  InsertTransportationDocument(data) {
    this.URL = this.fmsUrl + '/TransportationRequest/InsertTransportationDocument';
    return this.http.post(this.URL, data)
  }

  InsertScheduleRequestAttachment(data) {
    this.URL = this.fmsUrl + '/ScheduleRequest/InsertScheduleRequestAttachment';
    return this.http.post(this.URL, data)
  }

  InsertEquipmentInvoice(data) {
    this.URL = this.fmsUrl + '/Equipment/InsertEquipmentInvoice';
    return this.http.post(this.URL, data)
  }

  InsertAccesReports(data) {
    this.URL = this.fmsUrl + '/User/InsertAccesReports';
    return this.http.post(this.URL, data)
  }
  InsertProjectTracking(data) {
    this.URL = this.fmsUrl + '/ProjectRequest/InsertProjectTracking';
    return this.http.post(this.URL, data)
  }

  InsertStaffSalary(data) {

    this.URL = this.fmsUrl + '/Building/InsertStaffSalary';
    return this.http.post(this.URL, data)
  }

  public GetCheckListDashboard(data) {
    return this.http.get<any[]>(this.fmsUrl + '/Maintenance/GetCheckListDashboard?ID=' + data);
  }

  InsertCheckList(data) {

    this.URL = this.fmsUrl + '/Maintenance/InsertCheckList';
    return this.http.post(this.URL, data)
  }

  public DeleteCheckList(data) {
    return this.http.get<any[]>(this.fmsUrl + '/Maintenance/DeleteCheckList?ID=' + data);
  }

  UpdateMaintenanceRequestAssign(data) {

    this.URL = this.fmsUrl + '/Maintenance/UpdateMaintenanceRequestAssign';
    return this.http.post(this.URL, data)
  }
  public GetMaintenanceDocument(data) {
    return this.http.get<any[]>(this.fmsUrl + '/Maintenance/GetMaintenanceDocument?ID=' + data);
  }
  UpdateMaintenanceRequestDocument(data) {
    this.URL = this.fmsUrl + '/Maintenance/UpdateMaintenanceRequestDocument';
    return this.http.post(this.URL, data)
  }

  public DeleteMaintenanceRequestDocument(data) {
    return this.http.get<any[]>(this.fmsUrl + '/Maintenance/DeleteMaintenanceRequestDocument?ID=' + data);
  }
  public DeleteMaintenanceRequest(data) {
    return this.http.get<any[]>(this.fmsUrl + '/Maintenance/DeleteMaintenanceRequest?ID=' + data);
  }


  public GetMaintenanceRequest(data) {
    return this.http.get<any[]>(this.fmsUrl + '/Maintenance/GetMaintenanceRequest?ID=' + data);
  }
  InsertMaintenanceDocument(data) {

    this.URL = this.fmsUrl + '/Maintenance/InsertMaintenanceDocument';
    return this.http.post(this.URL, data)
  }

  public GetTechnologyDocument(techid) {

    return this.http.get<any[]>(this.fmsUrl + "/Technology/GetTechnologyDocument?ID=" + techid);
  }

  public updatetechrequestattachment(entity) {

    return this.http.post(this.fmsUrl + "/Technology/UpdateTechnologyDocument", entity);

  }
  public UpdateTechnologyRequestAssign(entity) {

    return this.http.post(this.fmsUrl + "/Technology/UpdateTechnologyRequestAssign", entity);
  }
  public DeleteTechnology(techid) {
    return this.http.get(this.fmsUrl + "/Technology/DeleteTechnologyRequest?ID=" + techid);
  }

  public CancelTechnology(techid) {

    return this.http.get(this.fmsUrl + "/Technology/CancelTechnologyRequest?ID=" + techid);
  }

  UpdateScheduledMaintenancePhoto(data) {
    debugger
    this.URL = this.fmsUrl + '/ScheduledMaintenance/UpdateScheduledMaintenancePhoto';
    return this.http.post(this.URL, data)
  }

  UpdateAssainShuttle(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/UpdateAssainShuttle';
    return this.http.post(this.URL, data)
  }


  UpdateScheduledMaintenanceAttachment(data) {
    debugger
    this.URL = this.fmsUrl + '/ScheduledMaintenance/UpdateScheduledMaintenanceAttachment';
    return this.http.post(this.URL, data)
  }

  public DeleteScheduledMaintenancePhoto(data) {
    return this.http.get<any[]>(this.fmsUrl + '/ScheduledMaintenance/DeleteScheduledMaintenancePhoto?ID=' + data);
  }

  public DeleteScheduledMaintenanceAttachment(data) {
    return this.http.get<any[]>(this.fmsUrl + '/ScheduledMaintenance/DeleteScheduledMaintenanceAttachment?ID=' + data);
  }


  InsertSchedulePhoto(data) {
    debugger
    this.URL = this.fmsUrl + '/ScheduledMaintenance/InsertSchedulePhoto';
    return this.http.post(this.URL, data)
  }

  InsertScheduleAttachment(data) {
    debugger
    this.URL = this.fmsUrl + '/ScheduledMaintenance/InsertScheduleAttachment';
    return this.http.post(this.URL, data)
  }

  UpdateVisitor(VisitorsEntity) {
    return this.http.post(this.fmsUrl + "/Visitors/UpdateVisitor", VisitorsEntity);
  }
  public GetVisitorbytodaydate(buildingid) {
    return this.http.get(this.fmsUrl + '/Building/GetVisitorbytodaydate?BID=' + buildingid);
  }

  public GettenantdetailsByUnit(BID, FloorID) {
    return this.http.get(this.fmsUrl + '/Building/GettenantdetailsByUnit?BID=' + BID + '&FloorID=' + FloorID);
  }

  public Getnewhomedashboard(MonthID, BuldingID) {
    return this.http.get(this.fmsUrl + '/User/Getnewhomedashboard?MonthID=' + MonthID + '&BuldingID=' + BuldingID);
  }

  public GetTechnologyRequestByID(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Technology/GetTechnologyRequestByID?ID=' + ID);
  }
  UpdateVisitorExitime(entity) {
    return this.http.post(this.fmsUrl + "/Visitors/UpdateVisitorExitTime", entity);
  }
  GetVisitorDocument(visitorid) {
    return this.http.get<any[]>(this.fmsUrl + '/Visitors/GetVisitorDocument?ID=' + visitorid);
  }

  UpdateVisitorDocuments(entity) {
    return this.http.post(this.fmsUrl + "/Visitors/UpdateVisitorDocument", entity);
  }
  // InsertBuilding(data) {

  //   this.URL = this.fmsUrl + 'Building/InsertBuilding'
  //   return this.http.post(this.URL, data)
  // }

  // InsertUnit_Master(data) {

  //   this.URL = this.fmsUrl + '/Building/InsertUnit_Master';
  //   return this.http.post(this.URL, data)
  // }

  updateBuildingPlan(data) {

    this.URL = this.fmsUrl + '/Building/updateBuildingPlan';
    return this.http.post(this.URL, data)
  }

  public Delete_BuildingPlan(data) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + '/Building/Delete_BuildingPlan?ID=' + data);
  }

  InsertBookPartyHall(data) {

    this.URL = this.fmsUrl + '/Building/InsertBookPartyHall';
    return this.http.post(this.URL, data)
  }

  public GetCurrencyType() {

    return this.http.get(this.fmsUrl + '/Building/GetCurrencyType');
  }



  InsertBuildingStaff(data) {
    this.URL = this.fmsUrl + '/Building/InsertBuildingStaff';
    return this.http.post(this.URL, data)
  }

  InsertContractorPhiliStaff(data) {
    debugger;
    this.URL = this.fmsUrl + '/Building/InsertContractorPhiliStaff';
    return this.http.post(this.URL, data)
  }

  InsertPhiliStaff(data) {

    this.URL = this.fmsUrl + '/Building/InsertPhiliStaff';
    return this.http.post(this.URL, data)
  }


  public GetBuildingStaff(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetBuildingStaff?LanguageID=' + id);
  }

  public GetContractorStaff(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetContractorStaff?LanguageID=' + id);
  }


  public UpdateBuildingStaff(tenantentity) {
    return this.http.post(this.fmsUrl + "/Building/UpdateBuildingStaff", tenantentity);
  }

  InsertStaffLeaves(data) {

    this.URL = this.fmsUrl + '/Building/InsertStaffLeaves';
    return this.http.post(this.URL, data)
  }

  InsertContractorStaffLeaves(data) {
    debugger;
    this.URL = this.fmsUrl + '/Building/InsertContractorStaffLeaves';
    return this.http.post(this.URL, data)
  }


  // public InsertUsers(UsersEntity) {
  //   
  //   return this.http.post(this.fmsUrl + "User/InsertUsers", UsersEntity);
  // }

  UpdateUsers(data) {

    this.URL = this.fmsUrl + '/User/UpdateUsers';
    return this.http.post(this.URL, data)
  }

  public GetUnit_MasterbyfloorID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetUnit_MasterbyfloorID' + '?FloorID=' + id);
  }

  public InsertMaintenanceRequest(maintainanceEntity) {

    return this.http.post(this.fmsUrl + "/Maintenance/InsertMaintenanceRequest", maintainanceEntity);
  }

  UpdateMaintenanceRequest(data) {
    debugger
    this.URL = this.fmsUrl + '/Maintenance/UpdateMaintenanceRequest';
    return this.http.post(this.URL, data)
  }


  public GetTransportationDocument(id) {
    return this.http.get<any[]>(this.fmsUrl + '/TransportationRequest/GetTransportationDocument' + '?ID=' + id);
  }

  // public InsertItemPurchase(entity){
  //   return this.http.post(this.fmsUrl + "Purchase/InsertItemPurchase", entity);  
  // }


  InsertBuilding(data) {

    this.URL = this.fmsUrl + '/Building/InsertBuilding'
    return this.http.post(this.URL, data)
  }



  InsertBuildingPayments(data) {

    this.URL = this.fmsUrl + '/Building/InsertBuildingPayments';
    return this.http.post(this.URL, data)
  }

  public ExistParkingType(data, data1, data2) {
    return this.http.get(this.fmsUrl + '/Building/ExistParkingType' + '?Building=' + data + '&Floor=' + data1 + '&Facing=' + data2);
  }

  public Sproc_ExistUnit_Master(data) {
    return this.http.get(this.fmsUrl + '/Building/Sproc_ExistUnit_Master' + '?BuildingID=' + data);
  }

  public InsertUsers(UsersEntity) {

    return this.http.post(this.fmsUrl + "/User/InsertUsers", UsersEntity);
  }


  InsertUnit_Master(data) {
    this.URL = this.fmsUrl + '/Building/InsertUnit_Master';
    return this.http.post(this.URL, data)
  }
  public InsertItemPurchase(entity) {
    return this.http.post(this.fmsUrl + "/Purchase/InsertItemPurchase", entity);
  }
  public getPurchaseReturnItem_byInvoiceID(invoiceid, vendorid) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/getPurchaseReturnItem_byInvoiceID?InvoiceNo=' + invoiceid + "&vendorId=" + vendorid);
  }
  public UpdatePurchaseReturnItem(InvoiceNo, returnCount) {
    return this.http.post(this.fmsUrl + "/Purchase/UpdatePurchaseReturnItem?InvoiceNo=" + InvoiceNo + "&returnCount=" + returnCount, "")
  }
  public GetCreditsAttachments(InvoiceNo, VendorID) {
    return this.http.get<any[]>(this.fmsUrl + '/Purchase/GetCreditsAttachments?InvoiceNo=' + InvoiceNo + '&VendorID=' + VendorID);
  }

  public GetNotification() {
    return this.http.get<any[]>(this.fmsUrl + '/User/GetNotification');
  }



  public GetContractorUnits(ContractorID, ProjectID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetContractorUnits?ContractorID=' + ContractorID + "&ProjectID=" + ProjectID);
  }


  // InsertUnit_Master(data) {

  //   this.URL = this.fmsUrl + '/Building/InsertUnit_Master';
  //   return this.http.post(this.URL, data)
  // }


  public GetUnit_MasterByBuildingID(id) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetUnit_MasterByBuildingID?BuildingID=' + id);
  }


  public DeleteUnit_MasterBYID(ID) {

    return this.http.get(this.fmsUrl + "/Building/DeleteUnit_MasterBYID?ID=" + ID);
  }

  UpdateUnit_Master(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/UpdateUnit_Master';
    return this.http.post(this.URL, data)
  }

  public GetAllNotifications() {
    return this.http.get<any[]>(this.fmsUrl + '/User/GetAllNotifications');
  }

  public UpdateTenant(tenantentity) {
    return this.http.post(this.fmsUrl + "/Tenant/UpdateTenant", tenantentity);
  }
  public UpdateTenantAgreement(tenantentity) {

    return this.http.post(this.fmsUrl + "/Tenant/UpdateTenantAgreement", tenantentity);
  }
  public UpdateTenantDocument(tenantentity) {
    return this.http.post(this.fmsUrl + "/Tenant/UpdateTenantDocument", tenantentity);
  }

  public DeleteTenantAgreement(agreementid) {
    return this.http.get<any[]>(this.fmsUrl + '/Tenant/DeleteTenantAgreement?ID=' + agreementid);
  }



  public emptyvalues = [];

  isEmpty(obj) {
    this.emptyvalues.length = 0;
    for (var key in obj) {

      if (obj.hasOwnProperty(key)) {
        if (obj[key] == '' || obj[key] == "" || obj[key] == 0 || obj[key] == undefined || obj[key] == "undefined") {
          this.emptyvalues.push(key);
        }

        else {

        }
      }
      else {

      }

    }
    return this.emptyvalues;

  }

  public validateEmail(email) {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  public phonenumber(inputtxt) {

    var phoneno = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneno.test(inputtxt);
    // if (inputtxt.value.match(phoneno)) {
    //   return true;
    // }
    // else {
    //   // alert("message");
    //   return false;
    // }
  }

  public strongpassword(input) {

    var password = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,15})$/;
    return password.test(input);
    // if (inputtxt.value.match(phoneno)) {
    //   return true;
    // }
    // else {
    //   // alert("message");
    //   return false;
    // }
  }

  public GetUnitfloorbyBuildingID(ID) {

    return this.http.get(this.fmsUrl + "/Building/GetUnitfloorbyBuildingID?BuildingID=" + ID);
  }

  public deleteunitfloor(ID) {

    return this.http.get(this.fmsUrl + "/Building/deleteunitfloor?BuildingID=" + ID);
  }


  InsertVisitorDocument(data) {
    debugger
    this.URL = this.fmsUrl + '/Visitors/InsertVisitorDocument';
    return this.http.post(this.URL, data)
  }

  UpdateVisitorDocument(data) {
    debugger
    this.URL = this.fmsUrl + '/Visitors/UpdateVisitorDocument';
    return this.http.post(this.URL, data)
  }


  public GetParkingTypebybuilding(ID) {

    return this.http.get(this.fmsUrl + "/Tenant/GetParkingTypebybuilding?Building=" + ID);
  }


  public GetLoginBasedModule(id) {
    return this.http.get<any[]>(this.fmsUrl + '/User/GetLoginBasedModule' + '?ID=' + id);
  }

  UpdateBuildingPayments(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/UpdateBuildingPayments';
    return this.http.post(this.URL, data)
  }


  public GetBuildingPaymentsID(ID) {

    return this.http.get(this.fmsUrl + "/Building/GetBuildingPaymentsID?ID=" + ID);
  }




  //Jobs

  InsertJobPostings(data) {
    this.URL = this.fmsUrl + '/Building/InsertJobPostings';
    return this.http.post(this.URL, data)
  }
  InsertStaffWorkSchedule(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/InsertStaffWorkSchedule';
    return this.http.post(this.URL, data)
  }

  public GetStafff() {

    return this.http.get(this.fmsUrl + "/Building/GetStafff");
  }
  public GetDaysMaster() {

    return this.http.get(this.fmsUrl + "/Building/GetDaysMaster");
  }
  public GetJobPostings() {

    return this.http.get(this.fmsUrl + "/Building/GetJobPostings");
  }
  public GetStaffWorkSchedule() {

    return this.http.get<any[]>(this.fmsUrl + "/Building/GetStaffWorkSchedules");
  }
  public DeleteStaffWorkSchedule(id) {

    return this.http.get(this.fmsUrl + "/Building/DeleteStaffWorkSchedule?ID=" + id);
  }
  public DeleteJobPostings(id) {

    return this.http.get(this.fmsUrl + "/Building/DeleteJobPostings?ID=" + id);
  }
  public GetJobPostingsByID(id) {

    return this.http.get(this.fmsUrl + "/Building/GetJobPostingsByID?ID=" + id);
  }
  public GetStaffWorkScheduleByID(id) {

    return this.http.get(this.fmsUrl + "/Building/GetStaffWorkScheduleByID?ID=" + id);
  }
  updateJobPostings(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/updateJobPostings';
    return this.http.post(this.URL, data)
  }
  updateStaffWorkSchedule(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/updateStaffWorkSchedule';
    return this.http.post(this.URL, data)
  }

  //Project


  InsertProject_Master(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/InsertProject_Master';
    return this.http.post(this.URL, data)
  }
  public GetProject_Master() {

    return this.http.get(this.fmsUrl + "/Building/GetProject_Master");
  }

  public deleteProject_Master(ID) {

    return this.http.get(this.fmsUrl + "/Building/deleteProject_Master?ID=" + ID);
  }
  public GetProject_MasterByID(id) {

    return this.http.get(this.fmsUrl + "/Building/GetProject_MasterByID?ID=" + id);
  }
  UpdateProject_Master(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/UpdateProject_Master';
    return this.http.post(this.URL, data)
  }
  public GetProject_MasterByAccountID(accid) {

    return this.http.get(this.fmsUrl + "/Building/GetProject_MasterByAccountID?AccountID=" + accid);
  }
  public GetExpensiveHead_Master() {

    return this.http.get(this.fmsUrl + "/Building/GetExpensiveHead_Master");
  }

  InsertProject_Budget(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/InsertProject_Budget';
    return this.http.post(this.URL, data)
  }

  public GetMonthMaster() {

    return this.http.get(this.fmsUrl + "/Building/GetMonthMaster");
  }
  public GetProject_Budget() {

    return this.http.get(this.fmsUrl + "/Building/GetProject_Budget");
  }
  public DeleteProject_Budget(ID) {

    return this.http.get(this.fmsUrl + "/Building/DeleteProject_Budget?ID=" + ID);
  }
  public GetProject_BudgetByID(id) {

    return this.http.get(this.fmsUrl + "/Building/GetProject_BudgetByID?ID=" + id);
  }
  UpdateProject_Budget(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/UpdateProject_Budget';
    return this.http.post(this.URL, data)
  }
  //  public GetTransaction_Type_Master() {
  //     
  //     return this.http.get(this.fmsUrl + "/Building/GetTransaction_Type_Master");
  //   }
  InsertProjectTransaction(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/InsertProjectTransaction';
    return this.http.post(this.URL, data)
  }
  public GetAllProjectTransaction() {

    return this.http.get(this.fmsUrl + "/Building/GetAllProjectTransaction");
  }
  public DeleteProjectTransaction(ID) {

    return this.http.get(this.fmsUrl + "/Building/DeleteProjectTransaction?ID=" + ID);
  }
  public GetProjectTransactionByID(id) {

    return this.http.get(this.fmsUrl + "/Building/GetProjectTransactionByID?ID=" + id);
  }
  UpdateProjectTransaction(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/UpdateProjectTransaction';
    return this.http.post(this.URL, data)
  }

  InsertLeaves(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/InsertLeaves';
    return this.http.post(this.URL, data)
  }

  public DeleteLeaves(ID) {

    return this.http.get(this.fmsUrl + "/Building/DeleteLeaves?ID=" + ID);
  }
  public GetLeavesByID(id) {

    return this.http.get(this.fmsUrl + "/Building/GetLeavesByID?ID=" + id);
  }
  UpdateLeaves(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/UpdateLeaves';
    return this.http.post(this.URL, data)
  }

  public GetShuttleMaster() {

    return this.http.get(this.fmsUrl + "/Building/GetShuttleMaster");
  }
  InsertBuildingShuttle(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/InsertBuildingShuttle';
    return this.http.post(this.URL, data)
  }
  public GetBuildingShuttle() {

    return this.http.get(this.fmsUrl + "/Building/GetBuildingShuttle");
  }
  public DeleteBuildingShuttle(ID) {

    return this.http.get(this.fmsUrl + "/Building/DeleteBuildingShuttle?ID=" + ID);
  }
  UpdateBuildingShuttle(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/UpdateBuildingShuttle';
    return this.http.post(this.URL, data)
  }
  public GetBuildingShuttleByID(id) {

    return this.http.get(this.fmsUrl + "/Building/GetBuildingShuttleByID?ID=" + id);
  }


  public CashChequePhotoUpload(files) {

    let testData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      testData.append('file_upload', files[i], files[i].name);
    }
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/CashChequePhotoUpload/', testData);
  }


  public GetReportmaintenanceRequest(TypeID, SDate, EDate, LanguageID) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetReportmaintenanceRequest?TypeID=' + TypeID + '&SDate=' + SDate + '&EDate=' + EDate + '&LanguageID=' + LanguageID);
  }

  public GetLeaves() {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetLeaves');
  }

  public GetmaintenanceservicesHistoryby_AssetID(data) {
    debugger
    return this.http.get(this.fmsUrl + "/Building/GetmaintenanceservicesHistoryby_AssetID?AssetID=" + data);
  }


  public GetAllCOmplaintByTenantID(data) {
    debugger
    return this.http.get(this.fmsUrl + "/Building/GetAllCOmplaintByTenantID?UserID=" + data);
  }

  public GetAllTransportationRequestByID(data) {
    debugger
    return this.http.get(this.fmsUrl + "/Building/GetAllTransportationRequestByID?RequestBy=" + data);
  }


  public GetAllMaintenanceRequestByTenantID(data) {
    debugger
    return this.http.get(this.fmsUrl + "/Building/GetAllMaintenanceRequestByTenantID?RaisedBy=" + data);
  }

  public GetPatyHallByTenantID(data) {
    debugger
    return this.http.get(this.fmsUrl + "/Building/GetPatyHallByTenantID?TenantID=" + data);
  }

  public GetAllScheduleRequestByTenantID(data) {
    debugger
    return this.http.get(this.fmsUrl + "/Building/GetAllScheduleRequestByTenantID?RaisedBy=" + data);
  }

  public GetStaffByType(id) {

    return this.http.get(this.fmsUrl + "/Building/GetStaffByType?Type=" + id);
  }

  public GetNoOfUnitsModal(BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetNoOfUnitsModal?BuildingID=' + BuildingID);
  }

  public GetOccupiedCountFromUnitMasterModal(BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetOccupiedCountFromUnitMasterModal?BuildingID=' + BuildingID);
  }
  public GetAvailableCountFromUnitMasterModal(BuildingID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAvailableCountFromUnitMasterModal?BuildingID=' + BuildingID);
  }
  public GetLeavesCount(StaffID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetLeavesCount?StaffID=' + StaffID);
  }

  //   getIpCliente(): Observable<string> {
  //     return this.http.get('http://api.ipify.org/?format=jsonp&callback=JSONP_CALLBACK') // ...using post request '
  //     .map((res:Response) => {console.log('res ', res);
  //                             console.log('res.json() ', res.text());
  //                             //console.log('parseado ', JSON.parse(res.text()));
  //                             console.log('parseado  stringify ', JSON.stringify(res.text()));
  //                             let ipVar = res.text();
  //                             let num = ipVar.indexOf(":");
  //                             let num2 = ipVar.indexOf("\"});");
  //                             ipVar = ipVar.slice(num+2,num2);
  //                             console.log('ipVar -- ',ipVar);
  //                             return ipVar}); // ...and calling .json() on the response to return data
  //     //.catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if any
  // }
  public GetAccessReport() {
    return this.http.get<any[]>(this.fmsUrl + '/User/GetAccessReport');
  }

  public InsertTenantInventorymaster(data) {

    return this.http.post(this.fmsUrl + "/Tenant/InsertTenantInventorymaster", data);
  }

  public GetTenantInventorymasterByID(id) {

    return this.http.get(this.fmsUrl + "/Tenant/GetTenantInventorymasterByID?ID=" + id);
  }

  public UpdateTenantInventorymaster(data) {

    return this.http.post(this.fmsUrl + "/Tenant/UpdateTenantInventorymaster", data);
  }

  public GetTenantInventorymaster() {

    return this.http.get(this.fmsUrl + "/Tenant/GetTenantInventorymaster");
  }

  public GetTodaysLeavesCount() {

    return this.http.get(this.fmsUrl + "/Building/GetTodaysLeavesCount");
  }

  public GetTodaysAttendanceCount() {

    return this.http.get(this.fmsUrl + "/Building/GetTodaysAttendanceCount");
  }


  public PendingPOCount() {

    return this.http.get(this.fmsUrl + "/Building/PendingPOCount");
  }

  public DeleteTenantInventorymaster(data) {
    return this.http.get<any[]>(this.fmsUrl + '/Tenant/DeleteTenantInventorymaster?ID=' + data);
  }


  public Uploaditemphoto(files) {

    var formData = new FormData();
    var file = new Blob([
      JSON.stringify({})
    ], { type: 'application/json' });
    formData.append('somename', file);
    return this.http.post<any[]>(this.fmsUrl + '/Tenant/Uploaditemphoto/', formData);
  }


  InsertServiceTable(data) {
    this.URL = this.fmsUrl + '/Purchase/InsertServiceTable';
    return this.http.post(this.URL, data)
  }


  public GetPOApproval() {
    debugger
    return this.http.get(this.fmsUrl + "/Building/GetPOApproval");
  }


  public GetServiceTable() {

    return this.http.get(this.fmsUrl + "/Inventory/GetServiceTable");
  }

  public GetAllAssetCountModal(LanguageID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetAllAssetCountModal?LanguageID=' + LanguageID);
  }

  public UpdateApprovalPO(data, data1, data3) {
    debugger
    return this.http.get(this.fmsUrl + "/Building/UpdateApprovalPO?ID=" + data + "&ApprovalType=" + data1 + "&Comments=" + data3);
  }

  public GetItemTypeByEID(LID, EID) {

    return this.http.get(this.fmsUrl + "/Purchase/GetItemTypeByEID?LanguageID=" + LID + '&EID=' + EID);
  }


  public GetUnit_MasterDashborad(BuildingID) {

    return this.http.get<any[]>(this.fmsUrl + "/Tenant/GetUnit_MasterDashborad?BuildingID=" + BuildingID);
  }

  public GetRSVPTable() {

    return this.http.get(this.fmsUrl + "/Purchase/GetRSVPTable");
  }

  public CompleteInspection_Menu(ID, Notes) {

    return this.http.get(this.fmsUrl + "/Building/CompleteInspection_Menu?ID=" + ID + '&Notes=' + Notes, {});
  }
  public DeleteInspection_Menu(ID) {

    return this.http.get(this.fmsUrl + "/Building/DeleteInspection_Menu?ID=" + ID, {});
  }
  public GetInspection_Menu() {

    return this.http.get(this.fmsUrl + "/Building/GetInspection_Menu");
  }

  public InsertInspection_Menu(InspectionEntity) {

    return this.http.post(this.fmsUrl + "/Building/InsertInspection_Menu", InspectionEntity);
  }
  public NotSubmitInspection_Menu(ID, NoShowComments) {


    return this.http.post(this.fmsUrl + "/Building/NotSubmitInspection_Menu?ID=" + ID + '&NoShowComments=' + NoShowComments, {});
  }
  public UpdateInspection_Menu(Entity) {
    return this.http.post(this.fmsUrl + '/Building/UpdateInspection_Menu/', Entity);
  }

  public InsertTenantUnits(Entity) {
    return this.http.post(this.fmsUrl + '/Building/InsertTenantUnits/', Entity);
  }

  public InsertTenantInspection(Entity) {
    return this.http.post(this.fmsUrl + '/Tenant/InsertTenantInspection/', Entity);
  }

  public InsertTenantInspectionImages(Entity) {
    return this.http.post(this.fmsUrl + '/Tenant/InsertTenantInspectionImages/', Entity);
  }


  public InsertTenantInspectionVideo(Entity) {
    return this.http.post(this.fmsUrl + '/Tenant/InsertTenantInspectionVideo/', Entity);
  }

  public InsertBuildingStages(Entity) {
    return this.http.post(this.fmsUrl + '/Tenant/InsertBuildingStages/', Entity);
  }





  //Chidanand

  public GetProjectProgressPhotos(ID) {

    return this.http.get(this.fmsUrl + "/Building/GetProjectProgressPhotos?ID=" + ID);
  }

  public GetProjectProgressVideos(ID) {

    return this.http.get(this.fmsUrl + "/Building/GetProjectProgressVideos?ID=" + ID);
  }

  public GetInspectionErrorListByID(ID) {

    return this.http.get(this.fmsUrl + "/Building/GetInspectionErrorListByID?ID=" + ID);
  }
  public GetBuildingProjectProgress() {

    return this.http.get(this.fmsUrl + "/Tenant/GetBuildingProjectProgress");
  }

  public GetBuildingStages() {

    return this.http.get<any[]>(this.fmsUrl + "/Tenant/GetBuildingStages");
  }


  public GetProjectContractorAssign() {

    return this.http.get<any[]>(this.fmsUrl + "/Tenant/GetProjectContractorAssign");
  }


  public GetBuildingStagesByID(ID) {

    return this.http.get(this.fmsUrl + "/Tenant/GetBuildingStagesByID?ID=" + ID);
  }

  // public GetProjectProgressTracking(data) {
  //   
  //   return this.http.get(this.fmsUrl1 + "/Tenant/GetProjectProgressTracking?BuildingID=" + data);
  // }


  public GetAllProjectProgressTracking() {

    return this.http.get(this.fmsUrl + "/Tenant/GetAllProjectProgressTracking");
  }

  public UpdateBuildingProjectProgressfinance(Entity) {

    return this.http.post(this.fmsUrl + "/Tenant/UpdateBuildingProjectProgressfinance", Entity);
  }

  public UpdateFinanceAprrovals(Entity) {

    return this.http.post(this.fmsUrl + "/Tenant/UpdateFinanceAprrovals", Entity);
  }


  public InsertProjectContractorAssign(Entity) {
    return this.http.post(this.fmsUrl + '/Tenant/InsertProjectContractorAssign/', Entity);
  }

  public InsertContractorDocuments(Entity) {
    return this.http.post(this.fmsUrl + '/User/InsertContractorDocuments/', Entity);
  }

  public InsertContractorPO(Entity) {
    return this.http.post(this.fmsUrl + '/User/InsertContractorPO/', Entity);
  }


  public InsertContractorInvoice(Entity) {
    debugger;
    return this.http.post(this.fmsUrl + '/User/InsertContractorInvoice/', Entity);
  }


  public GetStaffUploadedPhotos(ID) {

    return this.http.get<any[]>(this.fmsUrl + "/Building/GetStaffUploadedPhotos?ID=" + ID);
  }

  public GetBuildingProjectProgresQCApprovalPhotos(ID) {

    return this.http.get(this.fmsUrl + "/Building/GetBuildingProjectProgresQCApprovalPhotos?ID=" + ID);
  }

  public GetStaffUploadedVideos(ID) {

    return this.http.get(this.fmsUrl + "/Building/GetStaffUploadedVideos?ID=" + ID);
  }



  public GetDashboardProjectProgress(ProjectID) {

    return this.http.get(this.fmsUrl + "/Building/GetDashboardProjectProgress?ProjectID=" + ProjectID);
  }

  public Get_ActionItemsAttachments(ID) {

    return this.http.get(this.fmsUrl + "/Announcement/Get_ActionItemsAttachments?ID=" + ID);
  }
  public GetStagesByUnit(units) {

    return this.http.get(this.fmsUrl + "/Building/GetStagesByUnit?Units=" + units);
  }

  public GetCurrentStage(Unit) {

    return this.http.get(this.fmsUrl + "/Tenant/GetCurrentStage?Unit=" + Unit);
  }

  public GetCompletedStagesByUnit(Units) {

    return this.http.get<any[]>(this.fmsUrl + "/Tenant/GetCompletedStagesByUnit?Units=" + Units);
  }

  public GetRemainingStagesByUnit(Units) {

    return this.http.get<any[]>(this.fmsUrl + "/Tenant/GetRemainingStagesByUnit?Units=" + Units);
  }
  public GetStagesVendorDetails(BuildingID, StageID, Units) {

    return this.http.get(this.fmsUrl + "/Tenant/GetStagesVendorDetails?BuildingID=" + BuildingID + '&StageID=' + StageID + '&Units=' + Units);
  }


  public GetStagesStaffDetails(BuildingID, StageID, Units) {

    return this.http.get(this.fmsUrl + "/Tenant/GetStagesStaffDetails?BuildingID=" + BuildingID + '&StageID=' + StageID + '&Units=' + Units);
  }

  public GetPrevVendorDetails(BuildingID, Units) {

    return this.http.get<any[]>(this.fmsUrl + "/Tenant/GetPrevVendorDetails?BuildingID=" + BuildingID + '&Units=' + Units);
  }

  public GetNatureOfWorkMaster() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetNatureOfWorkMaster");
  }

  public Insert_SubContractor(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Insert_SubContractor', Entity);
  }
  public Insert_Transmittals(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Insert_Transmittals', Entity);
  }

  public Insert_ProjectTimeLine(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Insert_ProjectTimeLine', Entity);
  }



  public InsertArchitecturalProjectTimeline(Entity) {
    return this.http.post(this.fmsUrl + '/Building/InsertArchitecturalProjectTimeline', Entity);
  }



  public Insert_ActionItems(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Insert_ActionItems', Entity);
  }


  public Insert_DailyReport(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Insert_DailyReport', Entity);
  }


  public Get_Transmittals() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Get_Transmittals");
  }



  public Get_ProjectTimeLine() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/Get_ProjectTimeLine");
  }


  // public Get_SubContractor() {
  //   debugger;
  //   return this.http.get<any[]>(this.fmsUrl + "/Building/Get_SubContractor");
  // }

  public Get_SubContractor() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/Get_SubContractor");
  }


  public Insert_Projects(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Insert_Projects', Entity);
  }
  public Get_Projects() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Get_Projects");
  }
  public Insert_ProjectFiles(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Insert_ProjectFiles', Entity);
  }
  public Get_ProjectFiles() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Get_ProjectFiles");
  }

  public Insert_ClientContacts(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Insert_ClientContacts', Entity);
  }
  public Get_ClientContacts() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/Get_ClientContacts");
  }

  public Get_ArchitecturalProjectTimeLine() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/Get_ArchitecturalProjectTimeLine");
  }


  public Insert_Info_Exchange(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Insert_Info_Exchange', Entity);
  }
  public Get_Info_Exchange(SDate, EDate) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Get_Info_Exchange?SDate=" + SDate + '&EDate=' + EDate);
  }


  public GetBuildingProjectProgressByDate(SDate, EDate) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/GetBuildingProjectProgressByDate?SDate=" + SDate + '&EDate=' + EDate);
  }

  public Get_ActionItems(SDate, EDate) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/Get_ActionItems?SDate=" + SDate + '&EDate=' + EDate);
  }

  public InsertProjectTeam(Entity) {
    return this.http.post(this.fmsUrl + '/Building/InsertProjectTeam', Entity);
  }
  public GetProjectTeam() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetProjectTeam");
  }

  public InsertProjectWorks(Entity) {
    return this.http.post(this.fmsUrl + '/Building/InsertProjectWorks', Entity);
  }

  public InsertContractorProjectWorks(Entity) {
    return this.http.post(this.fmsUrl + '/Building/InsertContractorProjectWorks', Entity);
  }
  public GetProjectWorks() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/GetProjectWorks");
  }

  public GetContractorProjectWorks() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/GetContractorProjectWorks");
  }
  public Get_DailyReport() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Get_DailyReport");
  }

  public ResoucesFlodersUpload(files, Path) {

    let testData: FormData = new FormData();
    if (files[0] != undefined) {
      for (let i = 0; i < files.length; i++) {
        testData.append('file_upload', files[i], files[i].name);
      }
    }

    testData.append('Path', Path);
    return this.http.post<any[]>(this.fmsUrl + '/MasterDemo/ResoucesFlodersUpload/', testData);
  }


  public getchapterfolder(Entity) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/getResoucesFloders?directorypath=' + Entity);
  }

  public getchapterfiles(Entity) {
    return this.http.get<any[]>(this.fmsUrl + '/MasterDemo/getResoucesFiles?directorypath=' + Entity);
  }

  public InsertResourcePDF(Entity) {

    return this.http.post(this.fmsUrl + "/Tenant/InsertResourcePDF", Entity);
  }
  public InsertResourceVideos(Entity) {

    return this.http.post(this.fmsUrl + "/Tenant/InsertResourceVideos", Entity);
  }

  public Insert_SiteVisitAssign(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Insert_SiteVisitAssign', Entity);
  }
  public Get_SiteVisitAssign() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Get_SiteVisitAssign");
  }
  public Insert_SiteVisitReports(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Insert_SiteVisitReports', Entity);
  }
  public Get_SiteVisitReports() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Get_SiteVisitReports");
  }
  public Insert_Punch_List(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Insert_Punch_List', Entity);
  }
  public GetPunch_List() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetPunch_List");
  }
  public InsertPunch_List_Assign(Entity) {
    return this.http.post(this.fmsUrl + '/Building/InsertPunch_List_Assign', Entity);
  }
  public GetPunch_List_Assign() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetPunch_List_Assign");
  }
  public InsertMeetingMinutes(Entity) {
    return this.http.post(this.fmsUrl + '/Building/InsertMeetingMinutes', Entity);
  }

  public CreateOutlookMeetings(Entity) {
    return this.http.post(this.fmsUrl + '/Building/CreateOutlookMeetings', Entity);
  }
  public GetMeetingMinutes() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetMeetingMinutes");
  }

  Insert_PunchListReviewDocument(data) {
    this.URL = this.fmsUrl + '/Building/Insert_PunchListReviewDocument';
    return this.http.post(this.URL, data)
  }
  public InsertPunchListReview(Entity) {
    return this.http.post(this.fmsUrl + '/Building/InsertPunchListReview', Entity);
  }
  public GetPunchListReviewDocument(data) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetPunchListReviewDocument?ID=' + data);
  }
  public Update_Projects(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Update_Projects', Entity);
  }
  public Delete_Projects(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Delete_Projects?ID=" + id);
  }
  public Delete_ClientContacts(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Delete_ClientContacts?ID=" + id);
  }
  public Update_ClientContacts(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Update_ClientContacts', Entity);
  }

  public Delete_Info_Exchange(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Delete_Info_Exchange?ID=" + id);
  }
  public Update_Info_Exchange(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Update_Info_Exchange', Entity);
  }
  public DeleteProjectTeam(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/DeleteProjectTeam?ID=" + id);
  }
  public Update_ProjectTeam(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Update_ProjectTeam', Entity);
  }
  public DeleteProjectWorks(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/DeleteProjectWorks?ID=" + id);
  }

  public DeleteContractorProjectWorks(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/DeleteContractorProjectWorks?ID=" + id);
  }
  public Update_ProjectWorks(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Update_ProjectWorks', Entity);
  }

  public Update_ContractorProjectWorks(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Update_ContractorProjectWorks', Entity);
  }

  public DeleteMeetingMinutes(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/DeleteMeetingMinutes?ID=" + id);
  }
  public Update_MeetingMinutes(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Update_MeetingMinutes', Entity);

  }

  public Delete_Punch_List_Assign(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Delete_Punch_List_Assign?ID=" + id);
  }
  public UpdatePunch_List_Assign(Entity) {
    debugger
    return this.http.post(this.fmsUrl + '/Building/UpdatePunch_List_Assign', Entity);
  }

  public Delete_SiteVisitAssign(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Delete_SiteVisitAssign?ID=" + id);
  }
  public Update_SiteVisitAssign(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Update_SiteVisitAssign', Entity);
  }

  public Delete_Punch_List(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Delete_Punch_List?ID=" + id);
  }
  public UpdatePunch_List(Entity) {
    return this.http.post(this.fmsUrl + '/Building/UpdatePunch_List', Entity);
  }
  public Delete_Transmittals(id) {
    debugger;
    return this.http.post(this.fmsUrl + "/Announcement/Delete_Transmittals?ID=" + id, {});
  }

  public Delete_SubContractor(id) {
    debugger;
    return this.http.post(this.fmsUrl + "/Announcement/Delete_SubContractor?ID=" + id, {});
  }

  public Update_SubContractor(Entity) {
    return this.http.post(this.fmsUrl + '/Announcement/Update_SubContractor', Entity);
  }

  public Get_SubContractorByDate(SDate, EDate) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + '/Announcement/Get_SubContractorByDate?SDate=' + SDate + '&EDate=' + EDate);
  }
  public Delete_ActionItems(id) {
    debugger;
    return this.http.post(this.fmsUrl + "/Announcement/Delete_ActionItems?ID=" + id, {});
  }

  public Update_ActionItems(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Update_ActionItems', Entity);
  }

  public Delete_ProjectTimeLine(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Delete_ProjectTimeLine?ID=" + id);
  }

  public Update_ProjectTimeLine(Entity) {
    return this.http.post(this.fmsUrl + '/Building/Update_ProjectTimeLine', Entity);
  }
  public Get_ProjectTimeLineByDate(SDate, EDate) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + '/Announcement/Get_ProjectTimeLineByDate?SDate=' + SDate + '&EDate=' + EDate);
  }

  public Delete_DailyReport(id) {
    debugger;
    return this.http.post(this.fmsUrl + "/Announcement/Delete_DailyReport?ID=" + id, {});
  }
  public Get_DailyReportByDate(SDate, EDate) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + '/Announcement/Get_DailyReportByDate?SDate=' + SDate + '&EDate=' + EDate);
  }
  public GetProjectWorksByDate(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Announcement/GetProjectWorksByDate?SDate=' + SDate + '&EDate=' + EDate);
  }

  public GetContractorProjectWorksByDate(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Announcement/GetContractorProjectWorksByDate?SDate=' + SDate + '&EDate=' + EDate);
  }


  public GetMeetingMinutesByDate(SDate, EDate) {
    return this.http.get<any[]>(this.fmsUrl + '/Announcement/GetMeetingMinutesByDate?SDate=' + SDate + '&EDate=' + EDate);
  }
  public GetPunch_List_AssignByDate(SDate, EDate) {
    return this.http.get<any[]>(this.fmsUrl + '/Announcement/GetPunch_List_AssignByDate?SDate=' + SDate + '&EDate=' + EDate);
  }

  public Update_DailyReport(Entity) {
    return this.http.post(this.fmsUrl + '/Announcement/Update_DailyReport', Entity);
  }

  public InsertDocuments(Entity) {
    return this.http.post(this.fmsUrl + '/User/InsertDocuments', Entity);
  }

  public GetContractorPO() {

    return this.http.get(this.fmsUrl + "/User/GetContractorPO");
  }


  public GetContractorPOByContractorID(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/User/GetContractorPOByContractorID?ID=' + ID);
  }


  InsertProjectContractorAssign_workPhotos(data) {
    this.URL = this.fmsUrl + '/Building/InsertProjectContractorAssign_workPhotos';
    return this.http.post(this.URL, data)
  }
  InsertProjectContractorAssign_work(data) {
    this.URL = this.fmsUrl + '/Building/InsertProjectContractorAssign_work';
    return this.http.post(this.URL, data)
  }

  public GetProjectContractorAssign_work() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/GetProjectContractorAssign_work");
  }
  public GetProjectContractorAssign_workPhotos() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/GetProjectContractorAssign_workPhotos");
  }
  public GetDocuments() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/GetDocuments");
  }
  public GetContractorDocuments() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/GetContractorDocuments");
  }


  public GetContractorInvoice() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/GetContractorInvoice");
  }


  public UpdateContractorPayments(Entity) {
    return this.http.post(this.fmsUrl + '/Building/UpdateContractorPayments', Entity);
  }


  InsertProjectContractorAssign_workStage(data) {
    this.URL = this.fmsUrl + '/Building/InsertProjectContractorAssign_workStage';
    return this.http.post(this.URL, data)
  }
  public UpdateSupport(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/UpdateSupport?ID=" + id);
  }
  public CompleteSupport(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/CompleteSupport?ID=" + id);
  }
  public CloseTicket(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/CloseTicket?ID=" + id);
  }
  public ReopenTicket(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/ReopenTicket?ID=" + id);
  }

  public CompanyDetails(Entity) {

    return this.http.post(this.fmsUrl + "/Building/CompanyDetails", Entity);
  }

  public InsertCompanyInvoice(Entity) {

    return this.http.post(this.fmsUrl + "/Building/InsertCompanyInvoice", Entity);
  }



  public InsertArchitecturalStagesProcessCheck(Entity) {

    return this.http.post(this.fmsUrl + "/Building/InsertArchitecturalStagesProcessCheck", Entity);
  }


  public DeleteCompany(ID) {

    return this.http.post(this.fmsUrl + "/Building/DeleteCompany?ID=" + ID, {});
  }


  public EnableCompany(ID) {

    return this.http.post(this.fmsUrl + "/Building/EnableCompany?ID=" + ID, {});
  }

  public GetContractorInvoiceByID(ID) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetContractorInvoiceByID?ID=' + ID);
  }

  public UpdateContractorInvoice(Entity) {
    return this.http.post(this.fmsUrl + '/Building/UpdateContractorInvoice', Entity);
  }


  public Get_TransmittalsByDate(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/Get_TransmittalsByDate?SDate=' + SDate + '&EDate=' + EDate);
  }

  public Delete_ContractorDocuments(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Delete_ContractorDocuments?ID=" + id);
  }


  public UpdateCompanyInvoice(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/UpdateCompanyInvoice?ID=" + id);
  }


  InsertDailyUpdateMenuPhotos(data) {
    this.URL = this.fmsUrl + '/Building/InsertDailyUpdateMenuPhotos';
    return this.http.post(this.URL, data)
  }
  InsertDailyUpdateMenuVideos(data) {
    debugger
    this.URL = this.fmsUrl + '/Building/InsertDailyUpdateMenuVideos';
    return this.http.post(this.URL, data)
  }
  InsertDailyUpdateMenu(data) {
    this.URL = this.fmsUrl + '/Building/InsertDailyUpdateMenu';
    return this.http.post(this.URL, data)
  }

  public GetDailyUpdateMenu() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/GetDailyUpdateMenu");
  }
  public GetDailyUpdateMenuPhotos() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetDailyUpdateMenuPhotos");
  }
  public GetDailyUpdateMenuVideos() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/GetDailyUpdateMenuVideos");
  }

  public GetTotalNoOfUsers() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/GetTotalNoOfUsers");
  }
  //prashant
  public GetProjectContractorAssignByDate(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetProjectContractorAssignByDate?SDate=' + SDate + '&EDate=' + EDate);
  }
  public GetContractorDocumentsByDate(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetContractorDocumentsByDate?SDate=' + SDate + '&EDate=' + EDate);
  }
  public GetContractorInvoiceByDate(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetContractorInvoiceByDate?SDate=' + SDate + '&EDate=' + EDate);
  }
  public GetContractorPOByDate(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetContractorPOByDate?SDate=' + SDate + '&EDate=' + EDate);
  }
  public GetDailyUpdateMenuByDate(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetDailyUpdateMenuByDate?SDate=' + SDate + '&EDate=' + EDate);
  }
  public GetSupportByDate(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetSupportByDate?SDate=' + SDate + '&EDate=' + EDate);
  }

  public Delete_ContractorInvoice(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/Delete_ContractorInvoice?ID=" + id);
  }
  public Update_ContractorPO(Entity) {
    debugger;
    this.URL = this.fmsUrl + '/Building/Update_ContractorPO';
    return this.http.post(this.URL, Entity)

  }


  public GetNewMeetingminutes() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetNewMeetingminutes");
  }

  public GetCategoryItemMaster() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetCategoryItemMaster");
  }

  public GetUploadedBy() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetUploadedBy");
  }


  public GetChatConversationDetailsByUserID(UserID, ReceiverID) {

    return this.http.get<any[]>(this.fmsUrl + "/Building/GetChatConversationDetailsByUserID?UserID=" + UserID + '&ReceiverID=' + ReceiverID);
  }

  public GetChatConversationDetailsByStaffID(SenderID, ReceiverID) {

    return this.http.get<any[]>(this.fmsUrl + "/Building/GetChatConversationDetailsByStaffID?SenderID=" + SenderID + '&ReceiverID=' + ReceiverID);
  }


  public InsertChatDetailsUser(Entity) {
    debugger;
    this.URL = this.fmsUrl + '/Building/InsertChatDetailsUser';
    return this.http.post(this.URL, Entity)
  }

  public InsertChatDetails(Entity) {
    debugger;
    this.URL = this.fmsUrl + '/Building/InsertChatDetails';
    return this.http.post(this.URL, Entity)
  }



  public UpdateChatDetails(Entity) {
    debugger;
    this.URL = this.fmsUrl + '/Building/UpdateChatDetails';
    return this.http.post(this.URL, Entity)
  }



  public InsertNewMeetingminutes(Entity) {
    debugger;
    this.URL = this.fmsUrl + '/Building/InsertNewMeetingminutes';
    return this.http.post(this.URL, Entity)
  }
  public UpdateNewMeetingminutes(Entity) {
    debugger;
    this.URL = this.fmsUrl + '/Building/UpdateNewMeetingminutes';
    return this.http.post(this.URL, Entity)
  }
  public DeleteNewMeetingminutes(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/DeleteNewMeetingminutes?ID=" + id);
  }
  public GetNewMeetingminutesByDate(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetNewMeetingminutesByDate?SDate=' + SDate + '&EDate=' + EDate);
  }
  public Update_ProjectTimeLineAddAccomplishment(Entity) {
    debugger;
    this.URL = this.fmsUrl + '/Building/Update_ProjectTimeLineAddAccomplishment';
    return this.http.post(this.URL, Entity)
  }

  public Update_ArchitecturalProjectTimeLineAddAccomplishment(Entity) {
    debugger;
    this.URL = this.fmsUrl + '/Building/Update_ArchitecturalProjectTimeLineAddAccomplishment';
    return this.http.post(this.URL, Entity)
  }
  public GetStaffWorkScheduleByDate(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetStaffWorkScheduleByDate?SDate=' + SDate + '&EDate=' + EDate);
  }


  InsertDailyReportPhotos(data) {
    this.URL = this.fmsUrl + '/Building/InsertDailyReportPhotos';
    return this.http.post(this.URL, data)
  }

  public GetDailyReportPhotos() {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/GetDailyReportPhotos");
  }

  InsertTimeLinePlan(data) {

    this.URL = this.fmsUrl + '/Building/InsertTimeLinePlan';
    return this.http.post(this.URL, data)
  }
  public GetTimeLinePlan() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetTimeLinePlan");
  }
  public DeleteTimeLinePlan(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/DeleteTimeLinePlan?ID=" + id);
  }



  public GetAllAssetbymonths(BuildingID, MonthID) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetAllAssetbymonths?BuildingID=" + BuildingID + '&MonthID=' + MonthID);
  }

  public Get5YearWarrentyAssetsNew(BuildingID) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/Get5YearWarrentyAssetsNew?BuildingID=" + BuildingID);
  }

  public GetItemPurchase() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetItemPurchase");
  }

  InsertProjectExpense(data) {
    this.URL = this.fmsUrl + '/Building/InsertProjectExpense';
    return this.http.post(this.URL, data)
  }
  public GetProjectExpense() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetProjectExpense");
  }
  public DeleteProjectExpense(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/DeleteProjectExpense?ID=" + id);
  }
  UpdateProjectExpense(data) {
    this.URL = this.fmsUrl + '/Building/UpdateProjectExpense';
    return this.http.post(this.URL, data)
  }

  public GetProjectExpenseByDate(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetProjectExpenseByDate?SDate=' + SDate + '&EDate=' + EDate);
  }

  public GetProjectExpenseGraphData() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetProjectExpenseGraphData");
  }

  public GetProjectExpenseGraphDataInventory() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetProjectExpenseGraphDataInventory");
  }

  public GetProjectExpenseGraphDataService() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetProjectExpenseGraphDataService");
  }

  public GetBuildingStagesByUnit(Unit) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetBuildingStagesByUnit?Unit=' + Unit);
  }




  public GetArchitecturalStages() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetArchitecturalStages");
  }

  public DeleteArchitecturalProjectTimeline(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/DeleteArchitecturalProjectTimeline?ID=" + id);
  }
  public UpdateArchitecturalProjectTimeline(data) {
    this.URL = this.fmsUrl + '/Building/UpdateArchitecturalProjectTimeline';
    return this.http.post(this.URL, data)
  }

  public GetProjectWorkAssign(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetProjectWorkAssign?SDate=' + SDate + '&EDate=' + EDate);
  }

  public DeleteProjectWorkAssign(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/DeleteProjectWorkAssign?ID=" + id);
  }
  public UpdateProjectWorkAssign(data) {
    this.URL = this.fmsUrl + '/Building/UpdateProjectWorkAssign';
    return this.http.post(this.URL, data)
  }
  public InsertProjectWorkAssign(data) {
    this.URL = this.fmsUrl + '/Building/InsertProjectWorkAssign';
    return this.http.post(this.URL, data)
  }

  public GetPendingStagesProcessCheck(ProjectID) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetPendingStagesProcessCheck?ProjectID=' + ProjectID);
  }

  public GetDesignProjectInvoices(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Announcement/GetDesignProjectInvoices?SDate=' + SDate + '&EDate=' + EDate);
  }
  public InsertDesignProjectInvoices(data) {
    this.URL = this.fmsUrl + '/Announcement/InsertDesignProjectInvoices';
    return this.http.post(this.URL, data)
  }
  public DeleteDesignProjectInvoices(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Announcement/DeleteDesignProjectInvoices?ID=" + id);
  }
  public UpdateDesignInvoices(data) {
    this.URL = this.fmsUrl + '/Announcement/UpdateDesignInvoices';
    return this.http.post(this.URL, data)
  }

  public SendSMS(data) {
    debugger;
    this.URL = this.fmsUrl + '/User/SendSMS';
    return this.http.post(this.URL, data)
  }


  public sendeoutlookmail(data) {
    debugger;
    this.URL = this.fmsUrl + 'https://14.192.17.225/CASASARCHAPI/Building/sendeoutlookmail';
    return this.http.post(this.URL, data)
  }


  public SendMail(data) {
    debugger
    let url = "https://14.192.17.225/AmazeIncAPI/Website/SendMail";
    return this.http.post(url, data)
  }




  public GetMyTasks() {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetMyTasks");
  }

  public DeleteMyTasks(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/DeleteMyTasks?ID=" + id);
  }

  public InsertMyTasks(Entity) {
    debugger;
    this.URL = this.fmsUrl + '/Building/InsertMyTasks';
    return this.http.post(this.URL, Entity)
  }

  public UpdateMyTasks(Entity) {
    debugger;
    this.URL = this.fmsUrl + '/Building/UpdateMyTasks';
    return this.http.post(this.URL, Entity)
  }
  public GetMyTasksByDate(SDate, EDate) {
    debugger
    return this.http.get<any[]>(this.fmsUrl + '/Building/GetMyTasksByDate?SDate=' + SDate + '&EDate=' + EDate);
  }

  public CompleteMyTasks(id) {
    debugger;
    return this.http.get(this.fmsUrl + "/Building/CompleteMyTasks?ID=" + id);
  }
  public GetProjectExpenseGraphDataByBuildingID(BuildingID) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetProjectExpenseGraphDataByBuildingID?Buildingid=" + BuildingID);
  }
  public GetProjectExpenseGraphDataInventoryByBuildingID(BuildingID) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetProjectExpenseGraphDataInventoryByBuildingID?Buildingid=" + BuildingID);
  }
  public GetProjectExpenseGraphDataServiceByBuildingID(BuildingID) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetProjectExpenseGraphDataServiceByBuildingID?Buildingid=" + BuildingID);
  }
  public GetBudgetReportsStageWiseByBuildingID(BuildingID) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetBudgetReportsStageWiseByBuildingID?Buildingid=" + BuildingID);
  }
  public GetProjectExpenseUpdate(BuildingID) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetProjectExpenseUpdate?BuidlingID=" + BuildingID);
  }
  public GetBudgetReportsByMonthByBuildingID(BuildingID) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetBudgetReportsByMonthByBuildingID?Buildingid=" + BuildingID);
  }

  public Get_ArchitecturalProjectTimeLineByDate(SDate, EDate) {
    return this.http.get<any[]>(this.fmsUrl + '/Building/Get_ArchitecturalProjectTimeLineByDate?SDate=' + SDate + '&EDate=' + EDate);
  }
  public GetBudgetReportsLessthan(ProjectID) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetBudgetReportsLessthan?ProjectID=" + ProjectID);
  }

  public GetBudgetReportsGreaterthan(ProjectID) {
    debugger;
    return this.http.get<any[]>(this.fmsUrl + "/Building/GetBudgetReportsGreaterthan?ProjectID=" + ProjectID);

  }
}

