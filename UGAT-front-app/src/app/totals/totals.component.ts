import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from '../enum/notification-type.enum';
import { HttpErrorResponse} from '@angular/common/http';
import { CustomHttpRespone } from '../model/custom-http-response';
import { Government } from '../model/government';
import { Sector1Energy} from '../model/sector1-energy';
import { Sector2Transportation} from '../model/sector2-transportation';
import { Sector3Waste} from '../model/sector3-waste';
import { AuthenticationService } from '../service/authentication.service';
import { GovernmentService } from '../service/government.service';
import { ConvertionService } from '../service/convertion.service';
import { Sector1EnergyService} from '../service/sector1-energy.service';
import { Sector2TransportationService} from '../service/sector2-transportation.service';
import { Sector3WasteService} from '../service/sector3-waste.service';
import { NotificationService } from '../service/notification.service';
import { Role } from '../enum/role.enum';

@Component({
  selector: 'app-totals',
  templateUrl: './totals.component.html',
  styleUrls: ['./totals.component.css']
})
export class TotalsComponent implements OnInit, OnDestroy  {
  public totalSector1Scope1: number = 0;
  public totalSector1Scope2: number = 0;
  public totalSector1Scope3: number = 0;

  public totalSector2Scope1: number = 0;
  public totalSector2Scope2: number = 0;
  public totalSector2Scope3: number = 0;

  public totalSector3Scope1: number = 0;
  public totalSector3Scope2: number = 0;
  public totalSector3Scope3: number = 0;

  public totalSector1: number = 0;
  public totalSector2: number = 0;
  public totalSector3: number = 0;
  public totalAllSectors: number = 0;
  
  private subscriptions: Subscription[] = [];  
  private currentUserFullName: string;
  private currentUsername: string;
  
  public sumPopulation: number;

  public sumDiesel: number;
  public sumGasoline: number;              
  public sumNaturalGas: number;               
  public sumLgn: number;               
  public sumPropane: number;               
  public sumElectricity: number;                 
  public sumOther: number;

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
    private sector1EnergyService: Sector1EnergyService,
    private sector2TransportationService: Sector2TransportationService,
    private sector3WasteService: Sector3WasteService,    
    private notificationService: NotificationService) {    
  } 

  ngOnInit(): void {     
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;      
    this.currentUserFullName = this.authenticationService.getUserFromLocalCache().firstName+' '+this.authenticationService.getUserFromLocalCache().lastName;       
    this.getGovernments(false); 
    this.getallSector1Records(false);
    this.getallSector2Records(false);
    this.getallSector3Records(false);
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
  public allSector1Records: Sector1Energy[];
  public filteredSector1Records: Sector1Energy[];
  public allSector2Records: Sector2Transportation[];
  public filteredSector2Records: Sector2Transportation[];
  public allSector3Records: Sector3Waste[];
  public filteredSector3Records: Sector3Waste[];
  public governments: Government[];
  public governmentsPerUser: {};        
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
    console.log("Called onChangeCity");       
    this.selectedCity = cityValue;
    this.getallSector1Records(false);
    this.getallSector2Records(false);
    this.getallSector3Records(false);     
  }

  public onChangePeriod(periodValue: any){  
    console.log("Called onChangePeriod");   
    this.selectedInventoryPeriod = periodValue;       
    this.getallSector1Records(false);
    this.getallSector2Records(false);
    this.getallSector3Records(false);     
  }

  public getGovernments(showNotification: boolean): void {    
    this.subscriptions.push(
      this.governmentService.getGovernments().subscribe(
        (response: Government[]) => {
          this.governmentService.addGovernmentsToLocalCache(response);
          this.governments = response;
          if (this.isAdminOrManager){
            this.governmentsPerUser = this.governments            
            .map(({cityName}) => ({cityName}))
            .filter((value, index, self) =>
            index === self.findIndex((t) => (
              t.cityName === value.cityName
            ))); 
          }else{
            this.governmentsPerUser = this.governments
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
  
  public getallSector1Records(showNotification: boolean): void {    
    this.refreshing = true;
    this.subscriptions.push(
      this.sector1EnergyService.getAllSector1().subscribe(
        (response: Sector1Energy[]) => {
          this.sector1EnergyService.addAllSector1ToLocalCache(response);
          this.allSector1Records = response; 
          this.filterSector1Records();          
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

  public isNull(x: any): boolean{
    if (x== "" || x == null || x === null || typeof x === 'undefined') {
      return true;
    }
    return false;
  }  

  public calculateConvertionsSector1():void{               
    this.filteredSector1Records.forEach(record => {
      let inventoryYear: number= Number(record.inventoryPeriod.split(" ").pop());
      let scopeNr: number;    
      switch (record.scope) {
        case 'Fossil fuel used for building or home boilers, as well fixed energy generation units':
          scopeNr = 1;
          break;
        case 'Electricity purchased used in buildings':
          scopeNr = 2;
          break;
        case 'Electricity loses in the transmition  and distribution process':
          scopeNr = 3;
          break;            
        default:
          scopeNr = 1;
      }
      record.diesel = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR1,scopeNr,inventoryYear,record.diesel,"diesel");
      record.gasoline = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR1,scopeNr,inventoryYear,record.gasoline,"gasoline");
      record.naturalGas = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR1,scopeNr,inventoryYear,record.naturalGas,"naturalGas");
      record.lgn = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR1,scopeNr,inventoryYear,record.lgn,"lgn");
      record.propane = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR1,scopeNr,inventoryYear,record.propane,"propane");
      record.electricity = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR1,scopeNr,inventoryYear,record.electricity,"electricity");      
      record.other = this.convertionService.tonsToTCO2e(this.convertionService.SECTOR1,scopeNr,inventoryYear,record.other,"other",0,
      record.diesel,record.gasoline,record.naturalGas,record.lgn,record.propane);     
    });    
  }

  calculateTotalsSector1():void{
    this.sumDiesel= 0;
    this.sumGasoline= 0;
    this.sumNaturalGas= 0;
    this.sumLgn= 0;
    this.sumPropane= 0;
    this.sumElectricity= 0;
    this.sumOther= 0;

    this.totalSector1Scope1 = 0;
    this.totalSector1Scope2 = 0;
    this.totalSector1Scope3 = 0;
    this.totalSector1 = 0;

    this.filteredSector1Records.forEach(record => {
      this.sumDiesel= this.sumDiesel + record.diesel;
      this.sumGasoline= this.sumGasoline + record.gasoline;
      this.sumNaturalGas= this.sumNaturalGas + record.naturalGas;
      this.sumLgn= this.sumLgn + record.lgn;
      this.sumPropane= this.sumPropane + record.propane;
      this.sumElectricity= this.sumElectricity + record.electricity;
      this.sumOther= this.sumOther + record.other;
      if (record.scope == 'Fossil fuel used for building or home boilers, as well fixed energy generation units'){
        this.totalSector1Scope1 = this.totalSector1Scope1 +
        record.diesel + record.gasoline + record.naturalGas + 
        record.lgn + record.propane + record.electricity + record.other;
      }else if (record.scope == 'Electricity purchased used in buildings'){
        this.totalSector1Scope2 = this.totalSector1Scope2 +
        record.diesel + record.gasoline + record.naturalGas + 
        record.lgn + record.propane + record.electricity + record.other;
      }/*else if (record.scope == 'Electricity loses in the transmition  and distribution process'){
        this.totalSector1Scope3 = this.totalSector1Scope3 +
        record.diesel + record.gasoline + record.naturalGas + 
        record.lgn + record.propane + record.electricity + record.other;
      }*/
      else{
        null;
      }

    }); 

    this.totalSector1 = this.totalSector1Scope1 + this.totalSector1Scope2;// + this.totalSector1Scope3;
    this.totalSector1Scope1 = Number(this.totalSector1Scope1.toFixed(3));
    this.totalSector1Scope2 = Number(this.totalSector1Scope2.toFixed(3));
    this.totalSector1Scope3 = 0;//Number(this.totalSector1Scope3.toFixed(3));
    this.totalSector1 = Number(this.totalSector1.toFixed(3));
  }

  public calculateConvertionsSector2():void{               
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

  calculateTotalsSector2():void{
    this.sumDiesel= 0;
    this.sumGasoline= 0;
    this.sumNaturalGas= 0;
    this.sumLgn= 0;
    this.sumPropane= 0;
    this.sumElectricity= 0;
    this.sumOther= 0;

    this.totalSector2Scope1 = 0;
    this.totalSector2Scope2 = 0;
    this.totalSector2Scope3 = 0;
    this.totalSector2 = 0;

    this.filteredSector2Records.forEach(record => {
      this.sumDiesel= this.sumDiesel + record.diesel;
      this.sumGasoline= this.sumGasoline + record.gasoline;
      this.sumNaturalGas= this.sumNaturalGas + record.naturalGas;
      this.sumLgn= this.sumLgn + record.lgn;
      this.sumPropane= this.sumPropane + record.propane;
      this.sumElectricity= this.sumElectricity + record.electricity;
      this.sumOther= this.sumOther + record.other;

      if (record.scope == 'Fossil fuel purchased and used by vehicles inside city boundaries'){
        this.totalSector2Scope1 = this.totalSector2Scope1 +
        record.diesel + record.gasoline + record.naturalGas + 
        record.lgn + record.propane + record.electricity + record.other;
      }else if (record.scope == 'Electricity purchased for e-vehicles'){
        this.totalSector2Scope2 = this.totalSector2Scope2 +
        record.diesel + record.gasoline + record.naturalGas + 
        record.lgn + record.propane + record.electricity + record.other;
      }/*else if (record.scope == 'Volume of fuel purchased in the city but utilized by vehicles outside of city boundaries'){
        this.totalSector2Scope3 = this.totalSector2Scope3 +
        record.diesel + record.gasoline + record.naturalGas + 
        record.lgn + record.propane + record.electricity + record.other;
      }*/
      else{
        null;
      }

    }); 
    
    this.totalSector2 = this.totalSector2Scope1 + this.totalSector2Scope2 + 0 ; //this.totalSector2Scope3;
    this.totalSector2Scope1 = Number(this.totalSector2Scope1.toFixed(3));
    this.totalSector2Scope2 = Number(this.totalSector2Scope2.toFixed(3));
    this.totalSector2Scope3 = 0; //Number(this.totalSector2Scope3.toFixed(3));    
    this.totalSector2 = Number(this.totalSector2.toFixed(3));
       
  }
  
  public calculateConvertionsSector3():void{               
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

  calculateTotalsSector3():void{
    this.sumOrganic= 0;
    this.sumPaper= 0;
    this.sumPlastic= 0;
    this.sumGlass= 0;
    this.sumGardening= 0;
    this.sumInert= 0;
    this.sumWater= 0;

    this.totalSector3Scope1 = 0;
    this.totalSector3Scope2 = 0;
    this.totalSector3Scope3 = 0;
    this.totalSector3 = 0;

    this.sumPopulation = 0;
    /*
    this.filteredSector3Records.forEach(record => {
      this.sumOrganic= this.sumOrganic + record.organic;
      this.sumPaper= this.sumPaper + record.paper;
      this.sumPlastic= this.sumPlastic + record.plastic;
      this.sumGlass= this.sumGlass + record.glass;
      this.sumGardening= this.sumGardening + record.gardening;
      this.sumInert= this.sumInert + record.inert;
      this.sumWater= this.sumWater + record.water;

      if (record.scope == 'Waste generated inside the city and treated inside the city'){
        this.totalSector3Scope1 = this.totalSector3Scope1 +
        record.organic + record.paper + record.plastic + 
        record.glass + record.gardening + record.inert + record.water;
      }else if (record.scope == 'Waste generated inside the city and treated outside the city'){
        this.totalSector3Scope3 = this.totalSector3Scope3 +
        record.organic + record.paper + record.plastic + 
        record.glass + record.gardening + record.inert + record.water;
      }
      
    }); 
    */

    //New calculation for total Sector1 Scop3 waste    
    
    if (this.selectedCity == "All" || this.isNull(this.selectedCity)){
      if (this.selectedInventoryPeriod == "All"|| this.isNull(this.selectedInventoryPeriod)){
        this.sumPopulation = 10;
        this.governments.forEach(city => {          
            this.sumPopulation = this.sumPopulation + city.population;          
        }); 
      }else{        
        this.governments.forEach(city => {
          if (city.inventoryPeriod == this.selectedInventoryPeriod){
            this.sumPopulation = this.sumPopulation + city.population;                     
          }
        }); 
      }
      
    }else{
      if (this.selectedInventoryPeriod == "All"|| this.isNull(this.selectedInventoryPeriod)){        
        this.governments.forEach(city => {
          if (city.cityName == this.selectedCity){                
              this.sumPopulation = this.sumPopulation + city.population;                               
          }
        }); 
      }else{        
        this.governments.forEach(city => {
          if (city.inventoryPeriod == this.selectedInventoryPeriod && 
              city.cityName == this.selectedCity){                
            
                this.sumPopulation = this.sumPopulation + city.population;                                                     
          }
        }); 
      }     
    }

    this.totalSector3Scope1 = this.sumPopulation * 0.28843;

    this.totalSector3 = this.totalSector3Scope1;

    this.totalSector3Scope1 = Number(this.totalSector3Scope1.toFixed(3));
    this.totalSector3Scope2 = 0;
    this.totalSector3Scope3 = 0;
    this.totalSector3 = Number(this.totalSector3.toFixed(3));        
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

  public filterSector1Records(): void {                                   
    var keys: string[] = [];     
    var values: string[] = [];
    var filter: boolean = false;

    if (!this.isNull(this.selectedCity) && this.selectedCity!="All"){
      keys.push("city");
      values.push(this.selectedCity)
      filter = true;
    }

    if (!this.isNull(this.selectedInventoryPeriod) && this.selectedInventoryPeriod!="All"){
      keys.push("inventoryPeriod");
      values.push(this.selectedInventoryPeriod)
      filter = true;
    }

    if (filter){
      this.filteredSector1Records = this.allSector1Records
      .filter((item) =>
        keys.every((key) =>
          values.some((val) => item[key].toLowerCase().includes(val.toLowerCase()))
        )
      );
    }else{
      this.filteredSector1Records = this.allSector1Records;
    }
    
    if (!this.isAdminOrManager){  
      this.filteredSector1Records = this.filteredSector1Records
      .filter(record => record.userName == this.currentUsername);
    }
    this.calculateConvertionsSector1();
    this.calculateTotalsSector1();    
    this.totalAllSectors = this.totalSector1 + this.totalSector2 + this.totalSector3;
    this.totalAllSectors = Number(this.totalAllSectors.toFixed(3));
  } 
  
  public filterSector2Records(): void {                                   
    var keys: string[] = [];     
    var values: string[] = [];
    var filter: boolean = false;

    if (!this.isNull(this.selectedCity) && this.selectedCity!="All"){
      keys.push("city");
      values.push(this.selectedCity)
      filter = true;
    }

    if (!this.isNull(this.selectedInventoryPeriod) && this.selectedInventoryPeriod!="All"){
      keys.push("inventoryPeriod");
      values.push(this.selectedInventoryPeriod)
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
    this.calculateConvertionsSector2();
    this.calculateTotalsSector2();   
    this.totalAllSectors = this.totalSector1 + this.totalSector2 + this.totalSector3;
    this.totalAllSectors = Number(this.totalAllSectors.toFixed(3)); 
  } 

  public filterSector3Records(): void {                                   
    var keys: string[] = [];     
    var values: string[] = [];
    var filter: boolean = false;

    if (!this.isNull(this.selectedCity) && this.selectedCity!="All"){
      keys.push("city");
      values.push(this.selectedCity)
      filter = true;
    }

    if (!this.isNull(this.selectedInventoryPeriod) && this.selectedInventoryPeriod!="All"){
      keys.push("inventoryPeriod");
      values.push(this.selectedInventoryPeriod)
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
    this.calculateConvertionsSector3();
    this.calculateTotalsSector3();    
    this.totalAllSectors = this.totalSector1 + this.totalSector2 + this.totalSector3;
    this.totalAllSectors = Number(this.totalAllSectors.toFixed(3));
  } 

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
