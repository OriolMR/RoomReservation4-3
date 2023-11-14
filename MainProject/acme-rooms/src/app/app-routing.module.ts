import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

// Importa los componentes que deseas enlazar a las rutas
import { HomeComponent } from 'src/app/views/home/home.component';
import { LoginComponent } from 'src/app/views/login/login.component';
import { MainpageComponent } from './views/mainpage/mainpage.component';
import { HelloUserComponent } from 'src/app/views/hello-user/hello-user.component';
import { ReservasComponent } from './views/reservas/reservas.component';
import { ReservationComponent } from './views/reservation/reservation.component';
import { AdminCountryComponent } from './admin/admin-country/admin-country.component';
import { AdminCityComponent } from './admin/admin-city/admin-city.component';
import { AdminOfficeComponent } from './admin/admin-office/admin-office.component';
import { AdminReservationComponent } from './admin/admin-reservation/admin-reservation.component';
import { AdminRoomComponent } from './admin/admin-room/admin-room.component';
import { AdminAdministratorComponent } from './admin/admin-administrator/admin-administrator.component';
import { AdminUserComponent } from './admin/admin-user/admin-user.component';
import { RoomsComponent } from './views/rooms/rooms.component';
import { NoReservaComponent } from 'src/app/views/reservation/components/no-reserva/no-reserva.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { LoginPopupComponent } from 'src/app/login-popup/login-popup.component';

// Define las rutas
const routes: Routes = [
  { path: 'view-all-rooms', component: ViewAllComponent },
  { path: 'hello-user', component: HelloUserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: MainpageComponent},
  { path: 'reservas', component: ReservasComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'adminProfile', component: AdminCountryComponent },
  { path: 'adminProfile/cities', component: AdminCityComponent },
  { path: 'adminProfile/offices', component: AdminOfficeComponent },
  { path: 'adminProfile/reservations', component: AdminReservationComponent },
  { path: 'adminProfile/rooms', component: AdminRoomComponent },
  { path: 'adminProfile/users', component: AdminUserComponent },
  { path: 'adminProfile/administrators', component: AdminAdministratorComponent },
  { path: 'noReserva', component: NoReservaComponent },
  { path: '**', component: HomeComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' },
  { path: 'login-popup', component: LoginPopupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true } as ExtraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
