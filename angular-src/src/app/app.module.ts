import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import {DataTableModule} from "angular2-datatable";

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuctionComponent } from './components/auction/auction.component';
import { RulesComponent } from './components/rules/rules.component';
import { StandingsComponent } from './components/standings/standings.component';

import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';
import {PlayerService} from './services/player.service';
import {StandingsService} from './services/standings.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/auth.guard';
import { PlayerComponent } from './components/player/player.component';
import { DataFilterPipe } from './pipes/data-filter.pipe';
import { TimeleftPipe } from './pipes/timeleft.pipe';
import { TeamPipe } from './pipes/team.pipe';

const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'rules', component: RulesComponent},
  {path:'player', component: PlayerComponent, canActivate:[AuthGuard]},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'standings', component: StandingsComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'auction', component: AuctionComponent, canActivate:[AuthGuard]}

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    PlayerComponent,
    DataFilterPipe,
    AuctionComponent,
    RulesComponent,
    TimeleftPipe,
    TeamPipe,
    StandingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    DataTableModule
  ],
  providers: [ValidateService, AuthService, AuthGuard, PlayerService, StandingsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
