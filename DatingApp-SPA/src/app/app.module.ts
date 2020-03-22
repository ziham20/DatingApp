import { AuthGuard } from './_guards/auth.guard';
import { AlertifyService } from './_services/alertify.service';
import { appRoutes } from './routes';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule , JWT_OPTIONS} from '@auth0/angular-jwt';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';

import { environment } from 'src/environments/environment';

import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';

import { ErrorInterceptorProvider } from './_services/error.interceptor';

import { PrevenUnsavedChanges } from './_guards/prevent-unsaved-changes.guards';

import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';

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
   };
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
      MemberDetailComponent,
      PhotoEditorComponent,
      MemberEditComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      FormsModule,
      NgxGalleryModule,
      FileUploadModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
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
      MemberListResolver,
      MemberEditResolver,
      PrevenUnsavedChanges

   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
