import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NotificationType } from '../../enum/notification-type.enum';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Government } from '../../model/government';
import { Sector5AFOLU} from '../../model/sector5-afolu';
import { GovernmentService } from '../../service/government.service';
import { Sector5AFOLUService} from '../../service/sector5-afolu.service';
import { AuthenticationService } from '../../service/authentication.service';
import { NotificationService } from '../../service/notification.service';
import { Role } from '../../enum/role.enum';

@Component({
  selector: 'app-sector5-form',
  templateUrl: './sector5-form.component.html',
  styleUrls: ['./sector5-form.component.css']
})
export class Sector5FormComponent implements OnInit, OnDestroy {

  private currentUsername: string;
  private currentUserFullName: string;
  public governments: Government[]; 
  public governmentsCities: {}; 
  public periodsByCity: Government[]; 
  private subscriptions: Subscription[] = [];
  public submitOff: boolean = true;
  public selectedSubSector: string;
  public selectedScope: string;
  public sector1AllInputs: boolean = false;
  public sector2AllInputs: boolean = false;
  public sector3AllInputs: boolean = false;
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

  constructor( 
    private governmentService: GovernmentService,
    private sector5AFOLUService: Sector5AFOLUService,
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

  public onChangeCity(cityValue: any){    
    this.periodsByCity = this.governments.filter(government => government.cityName == cityValue);
  }

  public onChangeSector(sectorValue: any){  
    this.selectedSubSector =  sectorValue;    
    this.scopeElements = this.scopeElements1;
    if (sectorValue == 'Livestock (Live units/Heads)' && this.selectedScope == "Scope 1"){
      this.sector1AllInputs = true;
      this.sector2AllInputs = false;
      this.sector3AllInputs = false;
    }else if(sectorValue == 'Land Use Change' && this.selectedScope == "Scope 1"){
      this.sector1AllInputs = false;
      this.sector2AllInputs = true;
      this.sector3AllInputs = false;
    }else if(sectorValue == 'Other Aggregated sources' && this.selectedScope == "Scope 1"){
      this.sector1AllInputs = false;
      this.sector2AllInputs = false;
      this.sector3AllInputs = true;
    } 
  }

  public onChangeScope(scopeValue: any){    
    this.submitOff = false;    
    if (this.selectedSubSector == 'Livestock (Live units/Heads)'){
      this.sector1AllInputs = true;
      this.sector2AllInputs = false;
      this.sector3AllInputs = false;
    }else if(this.selectedSubSector == 'Land Use Change'){
      this.sector1AllInputs = false;
      this.sector2AllInputs = true;
      this.sector3AllInputs = false;
    }else if(this.selectedSubSector == 'Other Aggregated sources'){
      this.sector1AllInputs = false;
      this.sector2AllInputs = false;
      this.sector3AllInputs = true;
    }        
  }

  ngOnInit(): void {
    this.currentUserFullName = this.authenticationService.getUserFromLocalCache().firstName+' '+this.authenticationService.getUserFromLocalCache().lastName;
    this.currentUsername = this.authenticationService.getUserFromLocalCache().username;
    this.getGovernments(false);
  }

  public onSubmit(sectorForm: NgForm) {
    if (this.areInputsValid(sectorForm)){
      const formData = this.sector5AFOLUService.createSectorFormDate(this.currentUsername, sectorForm.value);
    this.subscriptions.push(
      this.sector5AFOLUService.addSector5(formData).subscribe(
        (response: Sector5AFOLU) => {          
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

    
    if (this.selectedSubSector == 'Livestock (Live units/Heads)'){
      
      const cows = sectorForm.value['cows'];
      const buffaloes = sectorForm.value['buffaloes'];
      const sheep = sectorForm.value['sheep'];
      const camel = sectorForm.value['camel'];
      const horses = sectorForm.value['horses'];
      const swine = sectorForm.value['swine'];
      const poultry = sectorForm.value['poultry'];
      const mulesAndAssess = sectorForm.value['mulesAndAssess'];
      const other = sectorForm.value['other'];

      if (isNull(cows) && isNull(buffaloes) && isNull(sheep) && isNull(camel) && isNull(horses) && isNull(swine) 
      && isNull(poultry) && isNull(mulesAndAssess) && isNull(other)) {
        this.sendNotification(NotificationType.ERROR, "Must fill the required inputs.");  
        return false;    
      }
      
    }else if(this.selectedSubSector == 'Land Use Change'){
      const landEmission1 = sectorForm.value['landEmission1'];
      const landEmission2 = sectorForm.value['landEmission2'];
      const landEmission3 = sectorForm.value['landEmission3'];

      if (isNull(landEmission1) && isNull(landEmission2) && isNull(landEmission3)) {
        this.sendNotification(NotificationType.ERROR, "Must fill the required inputs."); 
        return false;     
      }
    }else if(this.selectedSubSector == 'Other Aggregated sources'){
      const burning = sectorForm.value['burning'];
      const burningForest = sectorForm.value['burningForest'];
      const burningGrass = sectorForm.value['burningGrass'];
      const burningCrop = sectorForm.value['burningCrop'];
      const burningOther = sectorForm.value['burningOther'];
      const liming = sectorForm.value['liming'];
      const urea = sectorForm.value['urea'];
      const rice = sectorForm.value['rice'];

      if (isNull(burning) && isNull(burningForest) && isNull(burningGrass) && isNull(burningCrop) 
      && isNull(burningOther) && isNull(liming) && isNull(urea) && isNull(rice) ) {
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
