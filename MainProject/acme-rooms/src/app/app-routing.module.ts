import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

// Importa los componentes que deseas enlazar a las rutas
import { HomeComponent } from 'src/app/home/home.component';
import { LoginComponent } from 'src/app/login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { HelloUserComponent } from 'src/app/hello-user/hello-user.component';
import { ReservasComponent } from './reservas/reservas.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AdminCountryComponent } from './admin-country/admin-country.component';
import { AdminCityComponent } from './admin-city/admin-city.component';
import { AdminOfficeComponent } from './admin-office/admin-office.component';
import { AdminReservationComponent } from './admin-reservation/admin-reservation.component';
import { AdminRoomComponent } from './admin-room/admin-room.component';
import { AdminAdministratorComponent } from './admin-administrator/admin-administrator.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { RoomsComponent } from './rooms/rooms.component';
import { NoReservaComponent } from 'src/app/no-reserva/no-reserva.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { ViewAllComponent } from './view-all/view-all.component';

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
  { path: 'all-rooms', component: AllRoomsComponent },
  { path: 'noReserva', component: NoReservaComponent },
  { path: '**', component: HomeComponent },
  { path:'', redirectTo: '/register', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true } as ExtraOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
