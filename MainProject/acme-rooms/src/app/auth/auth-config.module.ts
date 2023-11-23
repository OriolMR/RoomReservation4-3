import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
              authority: 'https://localhost:44310',
              redirectUrl: 'http://localhost:4200/home',
              postLogoutRedirectUri: window.location.origin,
              clientId: 'web',
              scope: 'openid', 
              responseType: 'code',
              silentRenew: true,
              useRefreshToken: true,
              renewTimeBeforeTokenExpiresInSeconds: 30,
              
          }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
