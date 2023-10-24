import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { environment, apiControllers, apiUrls } from 'src/environments/environment';

@Component({
  selector: 'app-admin-administrator',
  templateUrl: './admin-administrator.component.html',
  styleUrls: ['./admin-administrator.component.css']
})
export class AdminAdministratorComponent {
  adminName = "xxxx"
  adminId = 1
  adminEmail = "admin@admin.admin"
  adminPassword = "Admin12345@"
  adminPhone = 612334455
  constructor(private requestService: RequestService) { }

  /*CREATE*/
  addAdmin() { }

  getAllAdmins() { }
  getAdminById() { }
  updateAdmin() { }
  deleteAdmin() { }
}
