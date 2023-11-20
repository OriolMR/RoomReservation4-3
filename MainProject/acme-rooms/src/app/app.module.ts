import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { HelloUserComponent } from './views/hello-user/hello-user.component';
import { AppRoutingModule } from './app-routing.module';
import { ReservasComponent } from './views/reservas/reservas.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReservationComponent } from './views/reservation/reservation.component';
import { MainpageComponent } from './views/mainpage/mainpage.component';
import { ReserveListComponent } from './views/reservation/components/reserve-list/reserve-list.component';
import { PopUpComponent } from './views/reservation/components/pop-up/pop-up.component';
import { AdminCountryComponent } from './admin/admin-country/admin-country.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestService } from './services/request.service';
import { AuthenticationService } from './services/authentication-service/authentication.service';
import { AuthenticationInterceptorService } from './services/authentication-service/authentication-interceptor.service';
import { RoomsComponent } from './views/rooms/rooms.component';
import { AdminCityComponent } from './admin/admin-city/admin-city.component';
import { AdminOfficeComponent } from './admin/admin-office/admin-office.component';
import { AdminReservationComponent } from './admin/admin-reservation/admin-reservation.component';
import { AdminRoomComponent } from './admin/admin-room/admin-room.component';
import { AdminAdministratorComponent } from './admin/admin-administrator/admin-administrator.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { NoReservaComponent } from './views/reservation/components/no-reserva/no-reserva.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { LoginPopupComponent } from './login-popup/login-popup.component';

//POP-UP
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthConfigModule } from './auth/auth-config.module';

@NgModule({
  declarations: [
    AppComponent,
    MainpageComponent,
    HomeComponent,
    NavbarComponent,
    ReservationComponent,
    LoginComponent,
    HelloUserComponent,
    ReservasComponent,
    ReserveListComponent,
    RoomsComponent,
    PopUpComponent,
    AdminCountryComponent,
    AdminCityComponent,
    AdminOfficeComponent,
    AdminReservationComponent,
    AdminRoomComponent,
    AdminAdministratorComponent,
    AdminUserComponent,
    NoReservaComponent,
    ViewAllComponent,
    DatepickerComponent,
    LoginPopupComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SweetAlert2Module,
    AuthConfigModule
  ],
  providers: [
 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptorService,
      multi: true,
    },
    
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
