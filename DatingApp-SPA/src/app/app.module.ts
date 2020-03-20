import { MemberListResolver } from './_resolvers/member-list.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { AlertifyService } from './_services/alertify.service';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { appRoutes } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { JwtModule ,JWT_OPTIONS} from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';

import { ErrorInterceptorProvider } from './_services/error.interceptor';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberCardComponent } from './members/member-card/member-card.component';

import { environment } from 'src/environments/environment';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';

// method 1
// export function tokenGetter() {
//    return localStorage.getItem("token");
//  }

// meothd 2
export function jwtOptionsFactory() {
   return {
     tokenGetter: () => {
       return localStorage.getItem('token');
     },
     whitelistedDomains: environment.whitelist,
     blacklistedRoutes: environment.blacklist
   }
 }

@NgModule({
   declarations: [
      AppComponent,
      RegisterComponent,
      HomeComponent,
      NavComponent,
      MessagesComponent,
      ListsComponent,
      MemberListComponent,
      MemberCardComponent,
      MemberDetailComponent

   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BrowserAnimationsModule, 
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule ,
      // method 2 implementaion
      JwtModule.forRoot({
         jwtOptionsProvider: {
           provide: JWT_OPTIONS,
           useFactory: jwtOptionsFactory
         }
       }),

      // method 1 implementaion

      // JwtModule.forRoot({
      //    config: {
      //      tokenGetter: tokenGetter,
      //      whitelistedDomains: ['http://localhost:60885', 'localhost:60885'],
      //      blacklistedRoutes: ['http://localhost:60885/api/auth']
      //    }
      //  })

   ],
     providers: [
      AuthService,
      UserService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      MemberDetailResolver,
      MemberListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
