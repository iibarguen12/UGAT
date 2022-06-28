import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { AuthenticationGuard } from './guard/authentication.guard';
import { NotificationModule } from './notification.module';
import { NotificationService } from './service/notification.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { AboutComponent } from './about/about.component';
import { GovernmentComponent } from './government/government.component';
import { SectorComponent } from './sector/sector.component';
import { Sector1EnergyComponent } from './sector1-energy/sector1-energy.component';
import { Sector2TransportationComponent } from './sector2-transportation/sector2-transportation.component';
import { Sector3WasteComponent } from './sector3-waste/sector3-waste.component';
import { Sector4IPPUComponent } from './sector4-ippu/sector4-ippu.component';
import { Sector5AFOLUComponent } from './sector5-afolu/sector5-afolu.component';
import { Sector1FormComponent } from './sector1-energy/sector1-form/sector1-form.component';
import { Sector1InfoComponent } from './sector1-energy/sector1-info/sector1-info.component';
import { Sector2FormComponent } from './sector2-transportation/sector2-form/sector2-form.component';
import { Sector2InfoComponent } from './sector2-transportation/sector2-info/sector2-info.component';
import { Sector3FormComponent } from './sector3-waste/sector3-form/sector3-form.component';
import { Sector3InfoComponent } from './sector3-waste/sector3-info/sector3-info.component';
import { Sector4FormComponent } from './sector4-ippu/sector4-form/sector4-form.component';
import { Sector4InfoComponent } from './sector4-ippu/sector4-info/sector4-info.component';
import { Sector5FormComponent } from './sector5-afolu/sector5-form/sector5-form.component';
import { Sector5InfoComponent } from './sector5-afolu/sector5-info/sector5-info.component';
import { TotalsComponent } from './totals/totals.component'; 

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    HomeComponent,
    HeaderComponent,
    ProfileComponent,
    AboutComponent,
    GovernmentComponent,
    SectorComponent,
    Sector1EnergyComponent,
    Sector2TransportationComponent,
    Sector3WasteComponent,
    Sector4IPPUComponent,
    Sector5AFOLUComponent,
    Sector1FormComponent,
    Sector1InfoComponent,
    Sector2FormComponent,
    Sector2InfoComponent,
    Sector3FormComponent,
    Sector3InfoComponent,
    Sector4FormComponent,
    Sector4InfoComponent,
    Sector5FormComponent,
    Sector5InfoComponent,
    TotalsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NotificationModule,
    BrowserAnimationsModule
  ],
  providers: [NotificationService, AuthenticationGuard, AuthenticationService, UserService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },    
    { provide: LocationStrategy, useClass: PathLocationStrategy }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
