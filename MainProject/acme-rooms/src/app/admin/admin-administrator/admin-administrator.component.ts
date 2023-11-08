import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

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

  //Pop-Ups
  addedNewAdminPopUp(name: string): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      showClass: {
        popup: '', // Establece la animación de salida como una cadena vacía
      }
    });
    Toast.fire({
      icon: "success",
      title: "New admin added!",
      text: "Admin name: " + name
    });
  }

  updatedAdminPopUp(id: number): void {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      showClass: {
        popup: '', // Establece la animación de salida como una cadena vacía
      }
    });
    Toast.fire({
      icon: "success",
      title: "Admin updated!",
      text: "Admin ID: " + id
    });
  }

  confirmDeleteAdmin(adminId: number){
    Swal.fire({
      title: "Are you sure you want to delete this admin?",
      text: "Admin ID: " + adminId,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAdmin(adminId)
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
          showClass: {
            popup: '', // Establece la animación de salida como una cadena vacía
          }
        });
        Toast.fire({
          icon: "success",
          title: "Admin deleted!",
          text: "Admin ID: " + adminId
        });
      }
    });
  }

  /*CREATE*/
  addAdmin() { }
  getAllAdmins() { }
  getAdminById() { }
  updateAdmin() { }
  deleteAdmin(adminId: number) { }
}
