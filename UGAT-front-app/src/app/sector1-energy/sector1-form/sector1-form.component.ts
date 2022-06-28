import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse} from '@angular/common/http';
import { Government } from '../../model/government';
import { Sector1Energy} from '../../model/sector1-energy'
import { GovernmentService } from '../../service/government.service';
import { Sector1EnergyService} from '../../service/sector1-energy.service';
import { AuthenticationService } from '../../service/authentication.service';
import { NotificationService } from '../../service/notification.service';
import { Role } from '../../enum/role.enum';

@Component({
  selector: 'app-sector1-form',
  templateUrl: './sector1-form.component.html',
  styleUrls: ['./sector1-form.component.css']
})
export class Sector1FormComponent implements OnInit, OnDestroy {  
  /*********/
  /*General*/
  /*********/

  private currentUsername: string;
  private currentUserFullName: string;

  constructor(
    private governmentService: GovernmentService,
    private sector1EnergyService: Sector1EnergyService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService) {    
  } 

  ngOnInit(): void {
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;
    this.currentUserFullName = this.authenticationService.getUserFromLocalCache().firstName+' '+this.authenticationService.getUserFromLocalCache().lastName;
    this.getGovernments(false);    
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }
  /**********/
  /*Add Info*/
  /**********/
  public option1: boolean = true;
  public governments: Government[];
  public governmentsCities: {}; 
  public periodsByCity: Government[];
  private subscriptions: Subscription[] = [];
  public submitOff: boolean = true;
  public subSectorElements1 = [
    { key: 'Residential Buildings', value: '1-Residential Buildings' }, 
    { key: 'Commercial and institurional buildings', value: '2-Commercial and institurional buildings' },
    { key: 'Manufacturing industries and construction', value: '3-Manufacturing industries and construction' },
    { key: 'Energy industries', value: '4-Energy industries' },
    { key: 'Agriculture, Forestry and Fishing activities', value: '5-Agriculture, Forestry and Fishing activities' },
    { key: 'Non-Specified sources', value: '6-Non-Specified sources' },
    { key: 'Fugitive emissions from mining, processing, storage and transportation of coal', value: '7-Fugitive emissions from mining, processing, storage and transportation of coal' },
    { key: 'Fugitive emissions from oil and natural gas systems', value: '8-Fugitive emissions from oil and natural gas systems' }];
  public scopeElements = [];
  public scopeElements1 = [
    { key: 'Fossil fuel used for building or home boilers, as well fixed energy generation units', value: '1-Fossil fuel used for building or home boilers, as well fixed energy generation units' }, 
    { key: 'Electricity purchased used in buildings', value: '2-Electricity purchased used in buildings' }, 
    { key: 'Electricity loses in the transmition  and distribution process', value: '3-Electricity loses in the transmition  and distribution process' }];
  public scopeElements2 = [
      { key: 'Emissions from Leakages', value: '1-Emissions from Leakages' }];    
  public scope1AllInputs: boolean = false; 
  public scope2And3AllInputs: boolean = false; 
  public scope1DieselGasolineInputs: boolean = false;   

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

  public onChangeSector(sectorValue){
    var scope = (<HTMLInputElement>document.getElementById("scope")).value;

    if (sectorValue.includes('Fugitive emissions')){
      this.scopeElements = this.scopeElements2;
      this.scope1DieselGasolineInputs = false;
      this.scope2And3AllInputs = false;   
      if (scope !== ""){
        this.scope1AllInputs = true;  
      }   
    }else{
      this.scopeElements = this.scopeElements1;
      this.scope1DieselGasolineInputs = true;      
    }
  }

  public onChangeCity(cityValue){    
    this.periodsByCity = this.governments.filter(government => government.cityName == cityValue);
  }

  public onChangeScope(sectorValue: any){
    if (sectorValue.includes('Fossil fuel')){
      this.scope1AllInputs = true;
      this.scope1DieselGasolineInputs = true;
      this.scope2And3AllInputs = false;
    }else if(sectorValue.includes('Emissions from Leakages')){
      this.scope1AllInputs = true;
      this.scope1DieselGasolineInputs = false;
      this.scope2And3AllInputs = false;
    }else if (sectorValue.includes('Electricity')){
      this.scope2And3AllInputs = true;
      this.scope1AllInputs = false;
    }else{
      this.scope1AllInputs = false;
      this.scope1DieselGasolineInputs = false;
      this.scope2And3AllInputs = false;
    }
    this.submitOff = false;    
  }  
  
  public onSubmit(sectorForm: NgForm) {
    
    if (this.areInputsValid(sectorForm)){
      const formData = this.sector1EnergyService.createSectorFormDate(this.currentUsername, sectorForm.value);
    this.subscriptions.push(
      this.sector1EnergyService.addSector1(formData).subscribe(
        (response: Sector1Energy) => {          
          this.getGovernments(false);          
          sectorForm.reset();
          this.sendNotification(NotificationType.SUCCESS, `Information saved successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);          
        }
      )
      );
    }
  }
  
  private areInputsValid(sectorForm: NgForm): boolean {

    function isNull(x: any): boolean{
      if (x== "" || x == null || x === null || typeof x === 'undefined') {
        return true;
      }
      return false;
    }

    const city = sectorForm.value['city'];
    if (isNull(city) || city === 'city'){
      this.sendNotification(NotificationType.ERROR, "Must select a City.");
      return false;   
    }

    const inventoryPeriod = sectorForm.value['inventoryPeriod'];
    if (isNull(inventoryPeriod) || inventoryPeriod === 'inventoryPeriod'){
      this.sendNotification(NotificationType.ERROR, "Must select an Inventory Period.");
      return false;   
    }

    const subSector = sectorForm.value['subSector'];
    if (isNull(subSector) || subSector === 'subSector'){
      this.sendNotification(NotificationType.ERROR, "Must select a Sub Sector.");
      return false;   
    }

    const scope = sectorForm.value['scope'];
    if (isNull(scope) || scope === 'scope'){
      this.sendNotification(NotificationType.ERROR, "Must select a Scope.");
      return false;   
    }    

    const diesel = sectorForm.value['diesel'];
    const gasoline = sectorForm.value['gasoline'];
    const naturalGas = sectorForm.value['naturalGas'];
    const lgn = sectorForm.value['lgn'];
    const propane = sectorForm.value['propane'];
    const other = sectorForm.value['other'];
    const electricity = sectorForm.value['electricity'];
    
    if (isNull(diesel) && isNull(gasoline) && isNull(naturalGas) && 
    isNull(lgn) && isNull(propane) && isNull(other) && isNull(electricity)) {
      this.sendNotification(NotificationType.ERROR, "Must fill the required inputs."); 
      return false;      
    }

    return true;
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
