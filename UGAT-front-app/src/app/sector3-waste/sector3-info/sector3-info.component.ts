import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse} from '@angular/common/http';
import { CustomHttpRespone } from '../../model/custom-http-response';
import { Government } from '../../model/government';
import { Sector3Waste} from '../../model/sector3-waste';
import { AuthenticationService } from '../../service/authentication.service';
import { GovernmentService } from '../../service/government.service';
import { ConvertionService } from '../../service/convertion.service';
import { Sector3WasteService} from '../../service/sector3-waste.service';
import { NotificationService } from '../../service/notification.service';
import { Role } from '../../enum/role.enum';

@Component({
  selector: 'app-sector3-info',
  templateUrl: './sector3-info.component.html',
  styleUrls: ['./sector3-info.component.css']
})
export class Sector3InfoComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];  
  private currentUserFullName: string;
  private currentUsername: string;
  
  public sumOrganic: number;
  public sumPaper: number;              
  public sumPlastic: number;               
  public sumGlass: number;               
  public sumGardening: number;               
  public sumInert: number;                 
  public sumWater: number;

  constructor( 
    private governmentService: GovernmentService, 
    private authenticationService: AuthenticationService,
    private convertionService:ConvertionService,  
    private sector3WasteService: Sector3WasteService,    
    private notificationService: NotificationService) {    
  } 

  ngOnInit(): void {     
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;      
    this.currentUserFullName = this.authenticationService.getUserFromLocalCache().firstName+' '+this.authenticationService.getUserFromLocalCache().lastName;   
    this.getallSector3Records(false);
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
  public allSector3Records: Sector3Waste[];
  public filteredSector3Records: Sector3Waste[];
  public governments: Government[];
  public governmentsCities: {};        
  public scopeElements = [];
  public scopeElements1 = [
    { key: 'Waste generated inside the city and treated inside the city', value: '1-Waste generated inside the city and treated inside the city' }, 
    { key: 'Waste generated inside the city and treated outside the city', value: '3-Waste generated inside the city and treated outside the city' }];  
  public showResults: boolean = false;
  public booleanSort: boolean = false;
  public selectedCity : string;
  public selectedInventoryPeriod : string;
  public selectedSubSector : string;
  public selectedScope : string;

  public onChangeCity(cityValue: any){     
    this.selectedCity = cityValue;
    this.filterSector3Records();    
  }

  public onChangePeriod(periodValue: any){     
    this.selectedInventoryPeriod = periodValue;       
    this.filterSector3Records();   
  }

  public onChangeSector(sectorValue: any){
    this.selectedSubSector = sectorValue;                    
    this.scopeElements = this.scopeElements1;                          
    this.filterSector3Records();
  }

  public onChangeScope(scope: any){
    this.selectedScope = scope;       
    this.filterSector3Records();    
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
  
  public getallSector3Records(showNotification: boolean): void {    
    this.refreshing = true;
    this.subscriptions.push(
      this.sector3WasteService.getAllSector3().subscribe(
        (response: Sector3Waste[]) => {
          this.sector3WasteService.addAllSector3ToLocalCache(response);
          this.allSector3Records = response; 
          this.filterSector3Records();         
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

  public onDeleteSector3(id: number): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.sector3WasteService.deleteSector3(id).subscribe(
        (response: CustomHttpRespone) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getallSector3Records(false);                    
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);
        }
      )
    );
    
  }

  public filterSector3Records(): void {              
    if (!this.isNull(this.selectedScope)){
      this.getallSector3Records(false);                  
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
        this.filteredSector3Records = this.allSector3Records
        .filter((item) =>
          keys.every((key) =>
            values.some((val) => item[key].toLowerCase().includes(val.toLowerCase()))
          )
        );
      }else{
        this.filteredSector3Records = this.allSector3Records;
      }
      
      if (!this.isAdminOrManager){  
        this.filteredSector3Records = this.filteredSector3Records
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
        this.filteredSector3Records.sort((a, b) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0)
        this.booleanSort = !this.booleanSort
    }
    else{
        this.filteredSector3Records.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
        this.booleanSort = !this.booleanSort
    }
  }

  public calculateConvertions():void{               
    this.filteredSector3Records.forEach(record => {
      let inventoryYear: number= Number(record.inventoryPeriod.split(" ").pop());
      let scopeNr: number;   
      let goverment: Government = this.governments.find(t=> t.cityName == record.city && t.inventoryPeriod == record.inventoryPeriod);
      let population:number = 0;
      if (!this.isNull(goverment)){
        population = goverment.population;
      }
      
      switch (record.scope) {
        case 'Waste generated inside the city and treated inside the city':
          scopeNr = 1;
          break;        
        case 'Waste generated inside the city and treated outside the city':
          scopeNr = 3;
          break;            
        default:
          scopeNr = 1;
      }
      
      record.organic = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR3,scopeNr,inventoryYear,record.organic,"OrganicFraction",population);
      record.paper = 0;
      record.plastic = 0;
      record.glass = 0;
      record.gardening = 0;
      record.inert = 0;
      record.water = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR3,scopeNr,inventoryYear,record.water,"WasteWater",population);      
    });    
  }

  calculateTotals():void{
    this.sumOrganic= 0;
    this.sumPaper= 0;
    this.sumPlastic= 0;
    this.sumGlass= 0;
    this.sumGardening= 0;
    this.sumInert= 0;
    this.sumWater= 0;

    this.filteredSector3Records.forEach(record => {
      this.sumOrganic= this.sumOrganic + record.organic;
      this.sumPaper= this.sumPaper + record.paper;
      this.sumPlastic= this.sumPlastic + record.plastic;
      this.sumGlass= this.sumGlass + record.glass;
      this.sumGardening= this.sumGardening + record.gardening;
      this.sumInert= this.sumInert + record.inert;
      this.sumWater= this.sumWater + record.water;
    }); 
    
    this.sumOrganic= Number(this.sumOrganic.toFixed(3));
    this.sumWater= Number(this.sumWater.toFixed(3));
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
