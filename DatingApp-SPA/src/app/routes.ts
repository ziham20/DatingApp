import { MessagesResolver } from './_resolvers/messages.resolver';
import { PrevenUnsavedChanges } from './_guards/prevent-unsaved-changes.guards';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { AuthGuard } from './_guards/auth.guard';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { Routes} from '@angular/router';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { ListResolver } from './_resolvers/list.resolver';

export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { 
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
                {  path: 'members', component: MemberListComponent ,
                   resolve: {users: MemberListResolver}} ,

                 { path: 'members/:id', component: MemberDetailComponent,
                   resolve: {user: MemberDetailResolver}} ,

                 { path: 'member/edit', component: MemberEditComponent,
                   resolve: {user: MemberEditResolver },
                   canDeactivate: [PrevenUnsavedChanges]},

                 { path: 'messages', component: MessagesComponent,
                   resolve: {messages: MessagesResolver }},

                 { path: 'lists', component: ListsComponent,
                   resolve: {users: ListResolver }
                 }

        ]
    },
     { path: '**', redirectTo: '', pathMatch: 'full' }
];