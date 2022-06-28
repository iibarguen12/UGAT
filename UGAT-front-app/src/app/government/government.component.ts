import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Government } from '../model/government';
import { GovernmentService } from '../service/government.service';
import { NotificationService } from '../service/notification.service';
import { UserService } from '../service/user.service';
import { NotificationType } from '../enum/notification-type.enum';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CustomHttpRespone } from '../model/custom-http-response';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { FileUploadStatus } from '../model/file-upload.status';
import { Role } from '../enum/role.enum';
import { User } from '../model/user';


@Component({
  selector: 'app-government',
  templateUrl: './government.component.html',
  styleUrls: ['./government.component.css']
})
export class GovernmentComponent implements OnInit, OnDestroy {
  public users: User[];
  public governments: Government[];
  public government: Government;
  public refreshing: boolean;
  public selectedGovernment: Government;
  public fileName: string;
  public profileImage: File;
  private subscriptions: Subscription[] = [];
  public editGovernment = new Government();
  private currentUsername: string;
  private currentCityName: string;
  private currentInventoryPeriod: string;
  public fileStatus = new FileUploadStatus(); 
  public showCurrentPassword: boolean = false;
  public showNewPassword: boolean = false;
  public showConfirmPassword: boolean = false; 

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private governmentService: GovernmentService, private userService: UserService,
              private notificationService: NotificationService) {}

  ngOnInit(): void {    
    this.getGovernments(false);
    this.getUsers(false);
  }

  public getGovernments(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.governmentService.getGovernments().subscribe(
        (response: Government[]) => {
          this.governmentService.addGovernmentsToLocalCache(response);
          this.governments = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} government(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        }
      )
    );

  }

  public getUsers(showNotification: boolean): void {
    this.refreshing = true;
    this.subscriptions.push(
      this.userService.getUsers().subscribe(
        (response: User[]) => {
          this.userService.addUsersToLocalCache(response);
          this.users = response;
          this.refreshing = false;
          if (showNotification) {
            this.sendNotification(NotificationType.SUCCESS, `${response.length} user(s) loaded successfully.`);
          }
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.refreshing = false;
        }
      )
    );

  }

  public onSelectGovernment(selectedGovernment: Government): void {
    this.selectedGovernment = selectedGovernment;
    this.clickButton('openGevernmentInfo');
  }

  public saveNewGovernment(): void {
    this.clickButton('new-government-save');
  }

  public onAddNewGovernment(governmentForm: NgForm): void {
    const formData = this.governmentService.createGovernmentFormDate(null, governmentForm.value);
    this.subscriptions.push(
      this.governmentService.addGovernment(formData).subscribe(
        (response: Government) => {
          this.clickButton('new-government-close');
          this.getGovernments(false);
          this.fileName = null;
          this.profileImage = null;
          governmentForm.reset();
          this.sendNotification(NotificationType.SUCCESS, `${response.cityName} ${response.inventoryPeriod} added successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null;
        }
      )
      );
  }

  public onUpdateGovernment(): void {
    const formData = this.governmentService.createGovernmentFormDate(this.currentUsername, this.editGovernment);
    this.subscriptions.push(
      this.governmentService.updateGovernment(formData).subscribe(
        (response: Government) => {
          this.clickButton('closeEditGovernmentModalButton');
          this.getGovernments(false);
          this.fileName = null;
          this.profileImage = null;
          this.sendNotification(NotificationType.SUCCESS, `${response.cityName} ${response.inventoryPeriod} updated successfully`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.profileImage = null;
        }
      )
      );
  } 

  public onDeleteGovernment(cityName: string, inventoryPeriod: string): void {
    this.subscriptions.push(
      this.governmentService.deleteGovernment(cityName,inventoryPeriod).subscribe(
        (response: CustomHttpRespone) => {
          this.sendNotification(NotificationType.SUCCESS, response.message);
          this.getGovernments(false);
        },
        (error: HttpErrorResponse) => {
          this.sendNotification(NotificationType.ERROR, error.error.message);
        }
      )
    );
    
  }

  public onEditGovernment(editgovernment: Government): void {
    this.editGovernment = editgovernment;
    this.currentCityName = editgovernment.cityName;
    this.currentInventoryPeriod = editgovernment.inventoryPeriod;
    this.clickButton('openGovernmentEdit');
  }

  public onChangePersonInCharge(personInCharge: any, type: number){
    if (type == 1){
      var contactEmail = (<HTMLInputElement>document.getElementById("contactEmail"));
      var usersEmail = this.users.filter(user => user.firstName +' '+ user.lastName == personInCharge);
      usersEmail.forEach(user => {
        contactEmail.value = user.email 
      });
    }else if(type == 2){
      var contactEmail = (<HTMLInputElement>document.getElementById("contactEmail2"));
      var usersEmail = this.users.filter(user => user.firstName +' '+ user.lastName == personInCharge);
      usersEmail.forEach(user => {
        contactEmail.value = user.email 
      });
    }
    
  }

  public searchUGovernments(searchTerm: string): void {
    const results: Government[] = [];
    for (const government of this.governmentService.getGovernmentsFromLocalCache()) {
      if (government.cityName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          government.inventoryPeriod.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          government.personInCharge.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
          government.verificationContact.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
          results.push(government);
      }
    }
    this.governments = results;
    if (results.length === 0 || !searchTerm) {
      this.governments = this.governmentService.getGovernmentsFromLocalCache();
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

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  private clickButton(buttonId: string): void {
    document.getElementById(buttonId).click();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
