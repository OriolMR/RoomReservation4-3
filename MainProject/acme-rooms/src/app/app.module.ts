import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { HelloUserComponent } from './hello-user/hello-user.component';
import { AppRoutingModule } from './app-routing.module';
import { ReservasComponent } from './reservas/reservas.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReservationComponent } from './reservation/reservation.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { ReserveListComponent } from './reserve-list/reserve-list.component';
import { PopUpComponent } from './pop-up/pop-up.component';
import { AdminCountryComponent } from './admin-country/admin-country.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestService } from './services/request.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationInterceptorService } from './services/authentication-interceptor.service';
import { RoomsComponent } from './rooms/rooms.component';
import { AdminCityComponent } from './admin-city/admin-city.component';
import { AdminOfficeComponent } from './admin-office/admin-office.component';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { AdminRoomComponent } from './admin-room/admin-room.component';
import { AdminAdministratorComponent } from './admin-administrator/admin-administrator.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { NoReservaComponent } from './no-reserva/no-reserva.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { DatepickerComponent } from './datepicker/datepicker.component';


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
    AllRoomsComponent,
    ViewAllComponent,
    DatepickerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
