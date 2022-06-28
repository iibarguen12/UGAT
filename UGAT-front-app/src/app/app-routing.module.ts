import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AuthenticationGuard } from './guard/authentication.guard';
import { HomeComponent} from './home/home.component';
import { ProfileComponent} from './profile/profile.component';
import { AboutComponent} from './about/about.component'
import { GovernmentComponent } from './government/government.component';
import { SectorComponent} from './sector/sector.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/management', component: UserComponent, canActivate: [AuthenticationGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  { path: 'user/profile', component: ProfileComponent, canActivate: [AuthenticationGuard]},
  { path: 'about', component: AboutComponent, canActivate: [AuthenticationGuard]},
  { path: 'government', component:GovernmentComponent, canActivate:[AuthenticationGuard]},
  { path: 'sector', component:SectorComponent, canActivate:[AuthenticationGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
