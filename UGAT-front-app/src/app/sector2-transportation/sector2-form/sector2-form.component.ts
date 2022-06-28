import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Government } from '../../model/government';
import { Sector2Transportation} from '../../model/sector2-transportation'
import { GovernmentService } from '../../service/government.service';
import { Sector2TransportationService} from '../../service/sector2-transportation.service';
import { AuthenticationService } from '../../service/authentication.service';
import { NotificationService } from '../../service/notification.service';
import { Role } from '../../enum/role.enum';

@Component({
  selector: 'app-sector2-form',
  templateUrl: './sector2-form.component.html',
  styleUrls: ['./sector2-form.component.css']
})
export class Sector2FormComponent implements OnInit, OnDestroy {

  public governments: Government[]; 
  public governmentsCities: {}; 
  public periodsByCity: Government[];
  private subscriptions: Subscription[] = [];
  public submitOff: boolean = true;
  public scopeElements = [];
  public scopeElements1 = [
    { key: 'Fossil fuel purchased and used by vehicles inside city boundaries', value: '1-Fossil fuel purchased and used by vehicles inside city boundaries' }, 
    { key: 'Electricity purchased for e-vehicles', value: '2-Electricity purchased for e-vehicles' }, 
    { key: 'Volume of fuel purchased in the city but utilized by vehicles outside of city boundaries', value: '3-Volume of fuel purchased in the city but utilized by vehicles outside of city boundaries' }];       
  public scope1And2AllInputs: boolean = false; 
  public scope2AllInputs: boolean = false;   
  private currentUsername: string;
  private currentUserFullName: string;

  constructor( 
    private governmentService: GovernmentService,
    private sector2TransportationService: Sector2TransportationService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService) {    
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

  public onChangeCity(cityValue){    
    this.periodsByCity = this.governments.filter(government => government.cityName == cityValue);
  }

  public onChangeSector(sectorValue){
    /*var scope = (<HTMLInputElement>document.getElementById("scope")).value;*/
    this.scopeElements = this.scopeElements1;
  }

  public onChangeScope(sectorValue: any){
    if (sectorValue.includes('Electricity purchased')){
      this.scope1And2AllInputs = false;      
      this.scope2AllInputs = true;
    }else{
      this.scope1And2AllInputs = true;      
      this.scope2AllInputs = false;
    }
    this.submitOff = false;    
  }

  ngOnInit(): void {
    this.currentUserFullName = this.authenticationService.getUserFromLocalCache().firstName+' '+this.authenticationService.getUserFromLocalCache().lastName;
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;
    this.getGovernments(false);
  }
  
  public onSubmit(sectorForm: NgForm) {
    if (this.areInputsValid(sectorForm)){
      const formData = this.sector2TransportationService.createSectorFormDate(this.currentUsername, sectorForm.value);
    this.subscriptions.push(
      this.sector2TransportationService.addSector2(formData).subscribe(
        (response: Sector2Transportation) => {          
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
    function isNumber(n):boolean {
      return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }

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

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
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
