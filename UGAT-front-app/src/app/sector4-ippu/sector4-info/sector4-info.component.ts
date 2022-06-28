import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse} from '@angular/common/http';
import { CustomHttpRespone } from '../../model/custom-http-response';
import { Government } from '../../model/government';
import { Sector4IPPU} from '../../model/sector4-IPPU';
import { AuthenticationService } from '../../service/authentication.service';
import { GovernmentService } from '../../service/government.service';
import { Sector4IPPUService} from '../../service/sector4-ippu.service';
import { NotificationService } from '../../service/notification.service';
import { Role } from '../../enum/role.enum';

@Component({
  selector: 'app-sector4-info',
  templateUrl: './sector4-info.component.html',
  styleUrls: ['./sector4-info.component.css']
})
export class Sector4InfoComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = []; 
  private currentUserFullName: string;
  private currentUsername: string; 

  /*Totals of subsecotr1*/
  public sumClinker: number;          
  public sumLime: number;
  public sumGlass: number;
  public sumAmmonia: number;
  public sumNitricAcid: number;
  public sumAdipicAcid: number;
  public sumOthersAcid: number;
  public sumCarbide: number;
  public sumTitanium: number;
  public sumSoda: number;
  public sumMetallurgical: number;
  public sumIron: number;
  public sumFerroalloy: number;
  public sumAluminum: number;
  public sumMagnesium: number;
  public sumLead: number;
  public sumZinc: number;

  /*Totals of subsecotr2*/
  public sumOther: number;
  public sumLubricants: number;
  public sumParafin: number;              
  public sumPetroleum: number;               
  public sumAromatics: number;               
  public sumFluids: number;               
  public sumPfc: number;                 
  public sumHfc: number;
  public sumOther2: number;

  constructor( 
    private governmentService: GovernmentService, 
    private authenticationService: AuthenticationService,  
    private sector4IPPUService: Sector4IPPUService,    
    private notificationService: NotificationService) {    
  } 

  ngOnInit(): void {   
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;      
    this.currentUserFullName = this.authenticationService.getUserFromLocalCache().firstName+' '+this.authenticationService.getUserFromLocalCache().lastName;     
    this.getallSector4Records(false);
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
  public allSector4Records: Sector4IPPU[];
  public filteredSector4Records: Sector4IPPU[];
  public governments: Government[];
  public governmentsCities: {};        
  public scopeElements = [];
  public scopeElements1 = [
    { key: 'Waste generated inside the city and treated inside the city', value: '1-Waste generated inside the city and treated inside the city' }, 
    { key: 'Waste generated inside the city and treated outside the city', value: '3-Waste generated inside the city and treated outside the city' }];  
  public showResults1: boolean = false;
  public showResults2: boolean = false;
  public booleanSort: boolean = false;
  public selectedCity : string;
  public selectedInventoryPeriod : string;
  public selectedSubSector : string;
  public selectedScope : string;

  public onChangeCity(cityValue: any){     
    this.selectedCity = cityValue;
    this.filterSector4Records();    
  }

  public onChangePeriod(periodValue: any){     
    this.selectedInventoryPeriod = periodValue;       
    this.filterSector4Records();   
  }

  public onChangeSector(sectorValue: any){
    this.selectedSubSector = sectorValue;                    
    this.scopeElements = this.scopeElements1;                          
    this.filterSector4Records();
  }

  public onChangeScope(scope: any){
    this.selectedScope = scope;       
    this.filterSector4Records();    
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
  
  public getallSector4Records(showNotification: boolean): void {    
    this.refreshing = true;
    this.subscriptions.push(
      this.sector4IPPUService.getAllSector4().subscribe(
        (response: Sector4IPPU[]) => {
          this.sector4IPPUService.addAllSector4ToLocalCache(response);
          this.allSector4Records = response; 
          this.filterSector4Records();          
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

  public onDeleteSector4(id: number): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.sector4IPPUService.deleteSector4(id).subscribe(
        (response: CustomHttpRespone) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getallSector4Records(false);                    
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);
        }
      )
    );
    
  }

  public filterSector4Records(): void {              
    if (!this.isNull(this.selectedScope)){ 
      this.getallSector4Records(false);                 
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
        this.filteredSector4Records = this.allSector4Records
        .filter((item) =>
          keys.every((key) =>
            values.some((val) => item[key].toLowerCase().includes(val.toLowerCase()))
          )
        );
      }else{
        this.filteredSector4Records = this.allSector4Records;
      }
      
      if (this.selectedSubSector=="Industrial Production"){
        this.showResults1 = true;
        this.showResults2 = false;
      }else if(this.selectedSubSector=="Product Use"){
        this.showResults1 = false;
        this.showResults2 = true;
      }

      if (!this.isAdminOrManager){  
        this.filteredSector4Records = this.filteredSector4Records
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
        this.filteredSector4Records.sort((a, b) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0)
        this.booleanSort = !this.booleanSort
    }
    else{
        this.filteredSector4Records.sort((a, b) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
        this.booleanSort = !this.booleanSort
    }
  }

  calculateTotals():void{
    /*Totals for subSector 1*/
    this.sumClinker= 0;          
    this.sumLime= 0;
    this.sumGlass= 0;
    this.sumAmmonia= 0;
    this.sumNitricAcid= 0;
    this.sumAdipicAcid= 0;
    this.sumOthersAcid= 0;
    this.sumCarbide= 0;
    this.sumTitanium= 0;
    this.sumSoda= 0;
    this.sumMetallurgical= 0;
    this.sumIron= 0;
    this.sumFerroalloy= 0;
    this.sumAluminum= 0;
    this.sumMagnesium= 0;
    this.sumLead= 0;
    this.sumZinc= 0;
    this.sumOther= 0;

    /*Totals for subSector 2*/
    this.sumLubricants= 0;
    this.sumParafin= 0;
    this.sumPetroleum= 0;
    this.sumAromatics= 0;
    this.sumFluids= 0;
    this.sumPfc= 0;
    this.sumHfc= 0;
    this.sumOther2= 0;

    this.filteredSector4Records.forEach(record => {
      /*Totals for subSector 1*/
      this.sumClinker = this.sumClinker + record.clinker ;
      this.sumLime = this.sumLime + record.lime ;
      this.sumGlass = this.sumGlass + record.glass ;
      this.sumAmmonia = this.sumAmmonia + record.ammonia ;
      this.sumNitricAcid = this.sumNitricAcid + record.nitricAcid ;
      this.sumAdipicAcid = this.sumAdipicAcid + record.adipicAcid ;
      this.sumOthersAcid = this.sumOthersAcid + record.othersAcid ;
      this.sumCarbide = this.sumCarbide + record.carbide ;
      this.sumTitanium = this.sumTitanium + record.titanium ;
      this.sumSoda = this.sumSoda + record.soda ;
      this.sumMetallurgical = this.sumMetallurgical + record.metallurgical ;
      this.sumIron = this.sumIron + record.iron ;
      this.sumFerroalloy = this.sumFerroalloy + record.ferroalloy ;
      this.sumAluminum = this.sumAluminum + record.aluminum ;
      this.sumMagnesium = this.sumMagnesium + record.magnesium ;
      this.sumLead = this.sumLead + record.leadProduction ;
      this.sumZinc = this.sumZinc + record.zinc ;
      this.sumOther = this.sumOther + record.other ;

      /*Totals for subSector 2*/
      this.sumLubricants= this.sumLubricants + record.lubricants;
      this.sumParafin= this.sumParafin + record.parafin;
      this.sumPetroleum= this.sumPetroleum + record.petroleum;
      this.sumAromatics= this.sumAromatics + record.aromatics;
      this.sumFluids= this.sumFluids + record.fluids;
      this.sumPfc= this.sumPfc + record.pfc;
      this.sumHfc= this.sumHfc + record.hfc;
      this.sumOther2= this.sumOther2 + record.other2;
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
