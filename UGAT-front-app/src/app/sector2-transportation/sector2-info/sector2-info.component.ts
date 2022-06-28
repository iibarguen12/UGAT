import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse} from '@angular/common/http';
import { CustomHttpRespone } from '../../model/custom-http-response';
import { Government } from '../../model/government';
import { Sector2Transportation} from '../../model/sector2-transportation';
import { GovernmentService } from '../../service/government.service';
import { ConvertionService } from '../../service/convertion.service';
import { AuthenticationService } from '../../service/authentication.service';
import { Sector2TransportationService} from '../../service/sector2-transportation.service';
import { NotificationService } from '../../service/notification.service';
import { Role } from '../../enum/role.enum';

@Component({
  selector: 'app-sector2-info',
  templateUrl: './sector2-info.component.html',
  styleUrls: ['./sector2-info.component.css']
})
export class Sector2InfoComponent implements OnInit, OnDestroy {
/*********/
  /*General*/
  /*********/
  private subscriptions: Subscription[] = []; 
  private currentUserFullName: string;
  private currentUsername: string; 

  public sumDiesel: number;
  public sumGasoline: number;              
  public sumNaturalGas: number;               
  public sumLgn: number;               
  public sumPropane: number;               
  public sumElectricity: number;                 
  public sumOther: number;

  constructor( 
    private governmentService: GovernmentService,   
    private authenticationService: AuthenticationService,
    private convertionService:ConvertionService,
    private sector2TransportationService: Sector2TransportationService,    
    private notificationService: NotificationService) {    
  } 

  ngOnInit(): void {      
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;      
    this.currentUserFullName = this.authenticationService.getUserFromLocalCache().firstName+' '+this.authenticationService.getUserFromLocalCache().lastName;  
    this.getallSector2Records(false);
    this.getGovernments(false); 
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  /***********/
  /*Show Info*/
  /***********/
  public refreshing: boolean;
  public allSector2Records: Sector2Transportation[];
  public filteredSector2Records: Sector2Transportation[];
  public governments: Government[];
  public governmentsCities: {};        
  public scopeElements = [];
  public scopeElements1 = [
    { key: 'Fossil fuel purchased and used by vehicles inside city boundaries', value: '1-Fossil fuel purchased and used by vehicles inside city boundaries' }, 
    { key: 'Electricity purchased for e-vehicles', value: '2-Electricity purchased for e-vehicles' }, 
    { key: 'Volume of fuel purchased in the city but utilized by vehicles outside of city boundaries', value: '3-Volume of fuel purchased in the city but utilized by vehicles outside of city boundaries' }];       
  public showResults: boolean = false;
  public booleanSort: boolean = false;
  public selectedCity : string;
  public selectedInventoryPeriod : string;
  public selectedSubSector : string;
  public selectedScope : string;

  public onChangeCity(cityValue: any){     
    this.selectedCity = cityValue;
    this.filterSector2Records();    
  }

  public onChangePeriod(periodValue: any){     
    this.selectedInventoryPeriod = periodValue;       
    this.filterSector2Records();   
  }

  public onChangeSector(sectorValue: any){
    this.selectedSubSector = sectorValue;                    
    this.scopeElements = this.scopeElements1;                          
    this.filterSector2Records();
  }

  public onChangeScope(scope: any){
    this.selectedScope = scope;       
    this.filterSector2Records();    
  }  

  public getGovernments(showNotification: boolean): void {    
    this.subscriptions.push(
      this.governmentService.getGovernments().subscribe(
        (response: Government[]) => {
          this.governmentService.addGovernmentsToLocalCache(response);
          this.governments = response;
          if (this.isAdminOrManager){
            this.governmentsCities = this.governments            
            .map(({cityName}) => ({cityName}))
            .filter((value, index, self) =>
            index === self.findIndex((t) => (
              t.cityName === value.cityName
            ))); 
          }else{
            this.governmentsCities = this.governments
            .filter(goverment => goverment.personInCharge == this.currentUserFullName)
            .map(({cityName}) => ({cityName}))
            .filter((value, index, self) =>
            index === self.findIndex((t) => (
              t.cityName === value.cityName
            ))); 
          }                 
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} government(s) loaded successfully.`);
          }          
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);          
        }
      )
    );
  }
  
  public getallSector2Records(showNotification: boolean): void {    
    this.refreshing = true;
    this.subscriptions.push(
      this.sector2TransportationService.getAllSector2().subscribe(
        (response: Sector2Transportation[]) => {
          this.sector2TransportationService.addAllSector2ToLocalCache(response);
          this.allSector2Records = response;                                
          this.filterSector2Records();       
          this.refreshing = false;
          if (showNotification) {
            if (this.isAdminOrManager){
              this.sendNotification(NotificationType.SUCCESS, `${response.length} record(s) loaded successfully.`);
            }else{
              this.sendNotification(NotificationType.SUCCESS, `Record(s) loaded successfully.`);
            }            
          }          
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;          
        }
      )
    );
  }

  public onDeleteSector2(id: number): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.sector2TransportationService.deleteSector2(id).subscribe(
        (response: CustomHttpRespone) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getallSector2Records(false);                    
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);
        }
      )
    );
    
  }

  public filterSector2Records(): void {             
    if (!this.isNull(this.selectedScope)){
      this.getallSector2Records(false);                   
      var keys: string[] = [];     
      var values: string[] = [];
      var filter: boolean = false;

      if (this.selectedCity!="All"){
        keys.push("city");
        values.push(this.selectedCity)
        filter = true;
      }

      if (this.selectedInventoryPeriod!="All"){
        keys.push("inventoryPeriod");
        values.push(this.selectedInventoryPeriod)
        filter = true;
      }

      if (this.selectedSubSector!="All"){
        keys.push("subSector");
        values.push(this.selectedSubSector)
        filter = true;
      }

      if (this.selectedScope!="All"){
        keys.push("scope");
        values.push(this.selectedScope)
        filter = true;
      }
      
      if (filter){
        this.filteredSector2Records = this.allSector2Records
        .filter((item) =>
          keys.every((key) =>
            values.some((val) => item[key].toLowerCase().includes(val.toLowerCase()))
          )
        );
      }else{
        this.filteredSector2Records = this.allSector2Records;
      }
      
      if (!this.isAdminOrManager){  
        this.filteredSector2Records = this.filteredSector2Records
        .filter(record => record.userName == this.currentUsername);
      }
      this.calculateConvertions();
      this.calculateTotals();
      this.showResults = true;
    } 
  }

  public isNull(x: any): boolean{
    if (x== "" || x == null || x === null || typeof x === 'undefined') {
      return true;
    }
    return false;
  }  

  sortFunction(colName: any, boolean: any) {
    if (boolean == true){
        this.filteredSector2Records.sort((a, b) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0)
        this.booleanSort = !this.booleanSort
    }
    else{
        this.filteredSector2Records.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
        this.booleanSort = !this.booleanSort
    }
  }

  public calculateConvertions():void{               
    this.filteredSector2Records.forEach(record => {
      let inventoryYear: number= Number(record.inventoryPeriod.split(" ").pop());
      let scopeNr: number;    
      switch (record.scope) {
        case 'Fossil fuel purchased and used by vehicles inside city boundaries':
          scopeNr = 1;
          break;
        case 'Electricity purchased for e-vehicles':
          scopeNr = 2;
          break;
        case 'Volume of fuel purchased in the city but utilized by vehicles outside of city boundaries':
          scopeNr = 3;
          break;            
        default:
          scopeNr = 1;
      }
      record.diesel = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR2,scopeNr,inventoryYear,record.diesel,"diesel");
      record.gasoline = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR2,scopeNr,inventoryYear,record.gasoline,"gasoline");
      record.naturalGas = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR2,scopeNr,inventoryYear,record.naturalGas,"naturalGas");
      record.lgn = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR2,scopeNr,inventoryYear,record.lgn,"lgn");
      record.propane = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR2,scopeNr,inventoryYear,record.propane,"propane");
      record.electricity = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR2,scopeNr,inventoryYear,record.electricity,"electricity");      
      record.other = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR2,scopeNr,inventoryYear,record.other,"other");      
    });    
  }

  calculateTotals():void{
    this.sumDiesel= 0;
    this.sumGasoline= 0;
    this.sumNaturalGas= 0;
    this.sumLgn= 0;
    this.sumPropane= 0;
    this.sumElectricity= 0;
    this.sumOther= 0;

    this.filteredSector2Records.forEach(record => {
      this.sumDiesel= this.sumDiesel + record.diesel;
      this.sumGasoline= this.sumGasoline + record.gasoline;
      this.sumNaturalGas= this.sumNaturalGas + record.naturalGas;
      this.sumLgn= this.sumLgn + record.lgn;
      this.sumPropane= this.sumPropane + record.propane;
      this.sumElectricity= this.sumElectricity + record.electricity;
      this.sumOther= this.sumOther + record.other;
    });  
    
    this.sumDiesel= Number(this.sumDiesel.toFixed(3));
    this.sumGasoline= Number(this.sumGasoline.toFixed(3));
    this.sumNaturalGas= Number(this.sumNaturalGas.toFixed(3));
    this.sumLgn= Number(this.sumLgn.toFixed(3));
    this.sumPropane= Number(this.sumPropane.toFixed(3));
    this.sumElectricity= Number(this.sumElectricity.toFixed(3));
    this.sumOther= Number(this.sumOther.toFixed(3));
  }

  public get isAdmin(): boolean {
    return this.getUserRole() === Role.ADMIN || this.getUserRole() === Role.SUPER_ADMIN;
  }

  public get isManager(): boolean {
    return this.isAdmin || this.getUserRole() === Role.MANAGER;
  }

  public get isAdminOrManager(): boolean {
    return this.isAdmin || this.isManager;
  }

  private getUserRole(): string {
    return this.authenticationService.getUserFromLocalCache().role;
  }	

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
