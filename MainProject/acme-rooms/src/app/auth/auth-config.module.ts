import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
              authority: 'https://localhost:5000',
              redirectUrl: 'http://localhost:4200/callback',
              postLogoutRedirectUri: window.location.origin,
              clientId: 'web',
              scope: 'api', 
              responseType: 'code',
              silentRenew: true,
              useRefreshToken: true,
              renewTimeBeforeTokenExpiresInSeconds: 30,
              
          }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
