import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private oidcSecurityService: OidcSecurityService) { }

  ngOnInit() {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData }) => {
      if (isAuthenticated) {
        // Lógica si el usuario está autenticado
        console.log('El usuario está autenticado');
        console.log('Datos del usuario:', userData);
        // ... (más lógica)
      } else {
        // Lógica si el usuario no está autenticado
        console.log('El usuario no está autenticado');
        // ... (más lógica)
      }
    });
  }
}
