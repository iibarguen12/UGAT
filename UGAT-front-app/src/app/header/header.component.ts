import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { AuthenticationService } from '../service/authentication.service';
import { NotificationService } from '../service/notification.service';
import { NotificationType } from '../enum/notification-type.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {  

  public isHeaderButton1Active: Boolean = localStorage.getItem('headreButton1') == '1';  
  public isHeaderButton2Active: Boolean = localStorage.getItem('headreButton2') == '1';
  public isHeaderButton3Active: Boolean = localStorage.getItem('headreButton3') == '1';
  public isHeaderButton4Active: Boolean = localStorage.getItem('headreButton4') == '1';
  public isHeaderButton5Active: Boolean = localStorage.getItem('headreButton5') == '1';
  public isHeaderButton6Active: Boolean = localStorage.getItem('headreButton6') == '1';

  public user: User;
  constructor(private router: Router, private authenticationService: AuthenticationService,
    private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.user = this.authenticationService.getUserFromLocalCache();      
  }

  public isActive(button : Number): void{
    localStorage.setItem('headreButton1', '0');
    localStorage.setItem('headreButton2', '0');
    localStorage.setItem('headreButton3', '0');
    localStorage.setItem('headreButton4', '0');
    localStorage.setItem('headreButton5', '0');
    localStorage.setItem('headreButton6', '0');

    switch (button) {
      case 1:
        localStorage.setItem('headreButton1', '1');
        this.goHome();
        break;
      case 2:
        localStorage.setItem('headreButton2', '1');
        this.goUsers();
        break;
      case 3:
        localStorage.setItem('headreButton3', '1');
        this.goAbout();
        break;
      case 4:
        localStorage.setItem('headreButton4', '1');
        this.goCities();
        break;
      case 5:
        localStorage.setItem('headreButton5', '1');
        this.goSectors();
        break;
      case 6:
        localStorage.setItem('headreButton6', '1');
        this.goProfile();
        break;
      default:
        null;
    }

  }

  public onLogOut(): void {
    this.authenticationService.logOut();
    this.router.navigate(['/login']);
    this.sendNotification(NotificationType.SUCCESS, `You've been successfully logged out`);
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occurred. Please try again.');
    }
  }

  public goHome():void{
    this.router.navigateByUrl('/home');
  }

  public goUsers():void{
    this.router.navigateByUrl('/user/management');
  }

  public goAbout():void{
    this.router.navigateByUrl('/about');
  }

  public goCities():void{
    this.router.navigateByUrl('/government');
  }

  public goSectors():void{
    this.router.navigateByUrl('/sector');
  }

  public goProfile():void{
    this.router.navigateByUrl('/user/profile');
  }
}
