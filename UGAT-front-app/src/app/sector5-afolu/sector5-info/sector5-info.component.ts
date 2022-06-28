import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse} from '@angular/common/http';
import { CustomHttpRespone } from '../../model/custom-http-response';
import { Government } from '../../model/government';
import { Sector5AFOLU} from '../../model/sector5-afolu';
import { AuthenticationService } from '../../service/authentication.service';
import { GovernmentService } from '../../service/government.service';
import { Sector5AFOLUService} from '../../service/sector5-afolu.service';
import { NotificationService } from '../../service/notification.service';
import { Role } from '../../enum/role.enum';

@Component({
  selector: 'app-sector5-info',
  templateUrl: './sector5-info.component.html',
  styleUrls: ['./sector5-info.component.css']
})
export class Sector5InfoComponent implements OnInit, OnDestroy  {
  private subscriptions: Subscription[] = [];  
  private currentUserFullName: string;
  private currentUsername: string;

  /*Totals of subsecotr1*/
  public sumCows: number;
  public sumBuffaloes: number;
  public sumSheep: number;
  public sumCamel: number;
  public sumHorses: number;
  public sumSwine: number;
  public sumPoultry: number;
  public sumMulesAndAssess : number;
  public sumOther: number;

  /*Totals of subsecotr2*/
  public sumLandEmission1: number;
  public sumLandEmission2: number;
  public sumLandEmission3: number;

  /*Totals of subsecotr3*/
  public sumBurning: number;
  public sumBurningForest: number;
  public sumBurningGrass: number;
  public sumBurningCrop: number;
  public sumBurningOther: number;
  public sumLiming: number;
  public sumUrea: number;
  public sumRice: number;

  constructor( 
    private governmentService: GovernmentService,   
    private authenticationService: AuthenticationService,
    private sector5AFOLUService: Sector5AFOLUService,    
    private notificationService: NotificationService) {    
  } 

  ngOnInit(): void {   
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;      
    this.currentUserFullName = this.authenticationService.getUserFromLocalCache().firstName+' '+this.authenticationService.getUserFromLocalCache().lastName;     
    this.getallSector5Records(false);
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
  public allSector5Records: Sector5AFOLU[];
  public filteredSector5Records: Sector5AFOLU[];
  public governments: Government[];
  public governmentsCities: {};        
  public scopeElements = [];
  public scopeElements1 = [
    { key: 'Scope 1', value: 'Scope 1' }];
  public landEmissionElements = [
    { key:'Forest Land', value:'1-Forest Land' },
    { key:'Forest land remaining forest land', value:'Forest land remaining forest land' },
    { key:'Crop Land converted in  forest land', value:'Crop Land converted in  forest land' },
    { key:'Grassland converted in  forest land', value:'Grassland converted in  forest land' },
    { key:'Settlements converted in  forest land', value:'Settlements converted in  forest land' },
    { key:'Wetlands converted in  forest land', value:'Wetlands converted in  forest land' },
    { key:'Other lands converted in forest land', value:'Other lands converted in forest land' },
    { key:'Crop Land', value:'Crop Land' },
    { key:'Crop Land  remaining in Crop Land', value:'Crop Land  remaining in Crop Land' },
    { key:'Grass land converted  Crop Land', value:'Grass land converted  Crop Land' },
    { key:'Settlements converted in Crop Land', value:'Settlements converted in Crop Land' },
    { key:'Wetlands converted in Crop Land', value:'Wetlands converted in Crop Land' },
    { key:'Fores land converted in Crop Land', value:'Fores land converted in Crop Land' },
    { key:'Other Lands converted in Crop Land', value:'Other Lands converted in Crop Land' },
    { key:'Grassland', value:'Grassland' },
    { key:'Grassland remaining in Grassland', value:'Grassland remaining in Grassland' },
    { key:'Crop Land converted in Grassland', value:'Crop Land converted in Grassland' },
    { key:'Forest land cobverted in Grasland', value:'Forest land cobverted in Grasland' },
    { key:'Settlements converted in Grassland', value:'Settlements converted in Grassland' },
    { key:'Wetlands converted in Grassland', value:'Wetlands converted in Grassland' },
    { key:'Other Lands converted in Grassland', value:'Other Lands converted in Grassland' },
    { key:'Wetland', value:'Wetland' },
    { key:'Wetland remaining in Wetland', value:'Wetland remaining in Wetland' },
    { key:'Cropland converted in Wetland', value:'Cropland converted in Wetland' },
    { key:'Forest land Converted in Wetland', value:'Forest land Converted in Wetland' },
    { key:'Settlements converted in Wetland', value:'Settlements converted in Wetland' },
    { key:'Grassland converted in Wetland', value:'Grassland converted in Wetland' },
    { key:'Other land converted in Wetland', value:'Other land converted in Wetland' },
    { key:'Settlement', value:'Settlement' },
    { key:'Settlement remaining in Settlement', value:'Settlement remaining in Settlement' },
    { key:'Cropland converted in Settlement', value:'Cropland converted in Settlement' },
    { key:'Wetland coverted in Settlement', value:'Wetland coverted in Settlement' },
    { key:'Grassland converted in Settlement', value:'Grassland converted in Settlement' },
    { key:'Forestland converted in Settlement', value:'Forestland converted in Settlement' },
    { key:'Other land converted in Settlement', value:'Other land converted in Settlement' },
    { key:'Other land', value:'Other land' },
    { key:'Other Land remaining Other Land', value:'Other Land remaining Other Land' },
    { key:'Crop Land converted in Other Land', value:'Crop Land converted in Other Land' },
    { key:'Grassland converted in Other Land', value:'Grassland converted in Other Land' },
    { key:'Forest land converted in Other Land', value:'Forest land converted in Other Land' },
    { key:'Settlements converted in Other land', value:'Settlements converted in Other land' },
    { key:'Wetland converted on Other land', value:'Wetland converted on Other land' }];

  public showResults1: boolean = false;
  public showResults2: boolean = false;
  public showResults3: boolean = false;
  public booleanSort: boolean = false;
  public selectedCity : string;
  public selectedInventoryPeriod : string;
  public selectedSubSector : string;
  public selectedScope : string;

  public onChangeCity(cityValue: any){     
    this.selectedCity = cityValue;
    this.filterSector5Records();    
  }

  public onChangePeriod(periodValue: any){     
    this.selectedInventoryPeriod = periodValue;       
    this.filterSector5Records();   
  }

  public onChangeSector(sectorValue: any){
    this.selectedSubSector = sectorValue;                    
    this.scopeElements = this.scopeElements1;                          
    this.filterSector5Records();
  }

  public onChangeScope(scope: any){
    this.selectedScope = scope;       
    this.filterSector5Records();    
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

  public getallSector5Records(showNotification: boolean): void {    
    this.refreshing = true;
    this.subscriptions.push(
      this.sector5AFOLUService.getAllSector5().subscribe(
        (response: Sector5AFOLU[]) => {
          this.sector5AFOLUService.addAllSector5ToLocalCache(response);
          this.allSector5Records = response; 
          this.filterSector5Records();          
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

  public onDeleteSector5(id: number): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.sector5AFOLUService.deleteSector5(id).subscribe(
        (response: CustomHttpRespone) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getallSector5Records(false);                    
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);
        }
      )
    );
    
  }

  public filterSector5Records(): void {          
    if (!this.isNull(this.selectedScope)){ 
      this.getallSector5Records(false);                 
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
        this.filteredSector5Records = this.allSector5Records
        .filter((item) =>
          keys.every((key) =>
            values.some((val) => item[key].toLowerCase().includes(val.toLowerCase()))
          )
        );
      }else{
        this.filteredSector5Records = this.allSector5Records;
      }
      
      if (this.selectedSubSector=="Livestock (Live units/Heads)"){
        this.showResults1 = true;
        this.showResults2 = false;
        this.showResults3 = false;
      }else if(this.selectedSubSector=="Land Use Change"){
        this.showResults1 = false;
        this.showResults2 = true;
        this.showResults3 = false;
      }else if(this.selectedSubSector=="Other Aggregated sources"){
        this.showResults1 = false;
        this.showResults2 = false;
        this.showResults3 = true;
      }
      
      if (!this.isAdminOrManager){  
        this.filteredSector5Records = this.filteredSector5Records
        .filter(record => record.userName == this.currentUsername);
      }

      this.calculateTotals();
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
        this.filteredSector5Records.sort((a, b) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0)
        this.booleanSort = !this.booleanSort
    }
    else{
        this.filteredSector5Records.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
        this.booleanSort = !this.booleanSort
    }
  }

  calculateTotals():void{
    /*Totals for subSector 1*/
    this.sumCows = 0
    this.sumBuffaloes = 0;
    this.sumSheep = 0;
    this.sumCamel = 0;
    this.sumHorses = 0;
    this.sumSwine = 0;
    this.sumPoultry = 0;
    this.sumMulesAndAssess  = 0;
    this.sumOther = 0;
    /*Totals for subSector 2*/
    this.sumLandEmission1 = 0;
    this.sumLandEmission2 = 0;
    this.sumLandEmission3 = 0;
    /*Totals for subSector 3*/
    this.sumBurning = 0;
    this.sumBurningForest = 0;
    this.sumBurningGrass = 0;
    this.sumBurningCrop = 0;
    this.sumBurningOther = 0;
    this.sumLiming = 0;
    this.sumUrea = 0;
    this.sumRice = 0;

    this.filteredSector5Records.forEach(record => {
      /*Totals for subSector 1*/
      this.sumCows = this.sumCows + record.cows ;
      this.sumBuffaloes = this.sumBuffaloes + record.buffaloes ;
      this.sumSheep = this.sumSheep + record.sheep ;
      this.sumCamel = this.sumCamel + record.camel ;
      this.sumHorses = this.sumHorses + record.horses ;
      this.sumSwine = this.sumSwine + record.swine ;
      this.sumPoultry = this.sumPoultry + record.poultry ;
      this.sumMulesAndAssess  = this.sumMulesAndAssess  + record.mulesAndAssess  ;
      this.sumOther = this.sumOther + record.other ;
      /*Totals for subSector 2*/
      this.sumLandEmission1 = this.sumLandEmission1 + record.landEmission1 ;
      this.sumLandEmission2 = this.sumLandEmission2 + record.landEmission2 ;
      this.sumLandEmission3 = this.sumLandEmission3 + record.landEmission3 ;
      /*Totals for subSector 3*/
      this.sumBurning = this.sumBurning + record.burning ;
      this.sumBurningForest = this.sumBurningForest + record.burningForest ;
      this.sumBurningGrass = this.sumBurningGrass + record.burningGrass ;
      this.sumBurningCrop = this.sumBurningCrop + record.burningCrop ;
      this.sumBurningOther = this.sumBurningOther + record.burningOther ;
      this.sumLiming = this.sumLiming + record.liming ;
      this.sumUrea = this.sumUrea + record.urea ;
      this.sumRice = this.sumRice + record.rice ;

    });    
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
