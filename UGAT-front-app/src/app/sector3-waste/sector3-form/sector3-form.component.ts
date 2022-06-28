import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Government } from '../../model/government';
import { Sector3Waste} from '../../model/sector3-waste';
import { GovernmentService } from '../../service/government.service';
import { Sector3WasteService} from '../../service/sector3-waste.service';
import { AuthenticationService } from '../../service/authentication.service';
import { NotificationService } from '../../service/notification.service';
import { Role } from '../../enum/role.enum';

@Component({
  selector: 'app-sector3-form',
  templateUrl: './sector3-form.component.html',
  styleUrls: ['./sector3-form.component.css']
})
export class Sector3FormComponent implements OnInit, OnDestroy {

  public governments: Government[];
  public governmentsCities: {}; 
  public periodsByCity: Government[];  
  private subscriptions: Subscription[] = [];
  public submitOff: boolean = true;
  public scopeAllInputs: boolean = false;
  public subSectorAllInputs: boolean = true;
  private currentUsername: string;
  private currentUserFullName: string;
  public scopeElements = [];
  public scopeElements1 = [
    { key: 'Waste generated inside the city and treated inside the city', value: '1-Waste generated inside the city and treated inside the city' }, 
    { key: 'Waste generated inside the city and treated outside the city', value: '3-Waste generated inside the city and treated outside the city' }];  

  constructor( 
    private governmentService: GovernmentService,
    private sector3WasteService: Sector3WasteService,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;
    this.currentUserFullName = this.authenticationService.getUserFromLocalCache().firstName+' '+this.authenticationService.getUserFromLocalCache().lastName;
    this.getGovernments(false);
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
    if (sectorValue.includes('Waste Water')){
      this.subSectorAllInputs = false;
    }else{
      this.subSectorAllInputs = true;
    }
    this.scopeElements = this.scopeElements1;
  }

  public onChangeScope(sectorValue: any){    
    this.submitOff = false;
    this.scopeAllInputs = true;   
  }

  public onSubmit(sectorForm: NgForm) {
    if (this.areInputsValid(sectorForm)){
      const formData = this.sector3WasteService.createSectorFormDate(this.currentUsername, sectorForm.value);
    this.subscriptions.push(
      this.sector3WasteService.addSector3(formData).subscribe(
        (response: Sector3Waste) => {          
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

  private areInputsValid(sectorForm: NgForm): boolean{
    function isNumber(n:any):boolean {
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

    const organic = sectorForm.value['organic'];
    const paper = sectorForm.value['paper'];
    const plastic = sectorForm.value['plastic'];
    const glass = sectorForm.value['glass'];
    const gardening = sectorForm.value['gardening'];
    const inert = sectorForm.value['inert'];
    const water = sectorForm.value['water'];

    if (isNull(organic) && isNull(paper) && isNull(plastic) && 
    isNull(glass) && isNull(gardening) && isNull(inert) && isNull(water)) {
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
