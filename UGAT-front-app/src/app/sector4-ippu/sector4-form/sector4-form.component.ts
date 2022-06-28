import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Government } from '../../model/government';
import { Sector4IPPU} from '../../model/sector4-IPPU';
import { GovernmentService } from '../../service/government.service';
import { Sector4IPPUService} from '../../service/sector4-ippu.service';
import { AuthenticationService } from '../../service/authentication.service';
import { NotificationService } from '../../service/notification.service';
import { Role } from '../../enum/role.enum';

@Component({
  selector: 'app-sector4-form',
  templateUrl: './sector4-form.component.html',
  styleUrls: ['./sector4-form.component.css']
})
export class Sector4FormComponent implements OnInit, OnDestroy {

  private currentUsername: string;
  private currentUserFullName: string;
  public governments: Government[];  
  public governmentsCities: {}; 
  public periodsByCity: Government[]; 
  private subscriptions: Subscription[] = [];
  public submitOff: boolean = true;
  public sector1AllInputs: boolean = false;
  public sector2AllInputs: boolean = false;
  public selectedSubSector: string;
  public selectedScope: string;
  public scopeElements = [];
  public scopeElements1 = [
    { key: 'Industry Type', value: '1-Industry Type' }];

  constructor( 
    private governmentService: GovernmentService,
    private sector4IPPUService: Sector4IPPUService,
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
    this.selectedSubSector = sectorValue;    
    this.scopeElements = this.scopeElements1;
    if (sectorValue == 'Industrial Production' && this.selectedScope == "Industry Type"){
      this.sector1AllInputs = true;
      this.sector2AllInputs = false;
    }else if(sectorValue == 'Product Use' && this.selectedScope == "Industry Type"){
      this.sector1AllInputs = false;
      this.sector2AllInputs = true;
    } 
  }

  public onChangeScope(scopeValue: any){  
    this.selectedScope = scopeValue;
    this.submitOff = false;    
    if (this.selectedSubSector == 'Industrial Production'){
      this.sector1AllInputs = true;
      this.sector2AllInputs = false;
    }else if(this.selectedSubSector == 'Product Use'){
      this.sector1AllInputs = false;
      this.sector2AllInputs = true;
    }        
  }

  ngOnInit(): void {
    this.currentUserFullName = this.authenticationService.getUserFromLocalCache().firstName+' '+this.authenticationService.getUserFromLocalCache().lastName;
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;
    this.getGovernments(false);
  }

  public onSubmit(sectorForm: NgForm) {
    if (this.areInputsValid(sectorForm)){
      const formData = this.sector4IPPUService.createSectorFormDate(this.currentUsername, sectorForm.value);
    this.subscriptions.push(
      this.sector4IPPUService.addSector4(formData).subscribe(
        (response: Sector4IPPU) => {          
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

  private areInputsValid(sectorForm: NgForm):boolean{
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
        
    if (this.selectedSubSector == 'Industrial Production'){
      
      const clinker = sectorForm.value['clinker'];
      const lime = sectorForm.value['lime'];
      const glass = sectorForm.value['glass'];
      const ammonia = sectorForm.value['ammonia'];
      const nitricAcid = sectorForm.value['nitricAcid'];
      const adipicAcid = sectorForm.value['adipicAcid'];
      const othersAcid = sectorForm.value['othersAcid'];
      const carbide = sectorForm.value['carbide'];
      const titanium = sectorForm.value['titanium'];
      const soda = sectorForm.value['soda'];
      const metallurgical = sectorForm.value['metallurgical'];
      const iron = sectorForm.value['iron'];
      const ferroalloy = sectorForm.value['ferroalloy'];
      const aluminum = sectorForm.value['aluminum'];
      const magnesium = sectorForm.value['magnesium'];
      const lead = sectorForm.value['lead'];
      const zinc = sectorForm.value['zinc'];
      const other = sectorForm.value['other'];

      if (isNull(clinker) && isNull(lime) && isNull(glass) && isNull(ammonia) && isNull(nitricAcid) && isNull(adipicAcid) 
      && isNull(othersAcid) && isNull(carbide) && isNull(titanium) && isNull(soda) && isNull(metallurgical) && isNull(iron)
      && isNull(ferroalloy) && isNull(aluminum) && isNull(magnesium) && isNull(lead) && isNull(zinc) && isNull(other)) {
        this.sendNotification(NotificationType.ERROR, "Must fill the required inputs.");      
        return false;
      }
      
    }else if(this.selectedSubSector == 'Product Use'){
      const lubricants = sectorForm.value['lubricants'];
      const parafin = sectorForm.value['parafin'];
      const petroleum = sectorForm.value['petroleum'];
      const aromatics = sectorForm.value['aromatics'];
      const fluids = sectorForm.value['fluids'];
      const pfc = sectorForm.value['pfc'];
      const hfc = sectorForm.value['hfc'];
      const other2 = sectorForm.value['other2'];

      if (isNull(lubricants) && isNull(parafin) && isNull(petroleum) && isNull(aromatics) 
      && isNull(fluids) && isNull(pfc) && isNull(hfc) && isNull(other2) ) {
        this.sendNotification(NotificationType.ERROR, "Must fill the required inputs.");      
        return false;
      }
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
