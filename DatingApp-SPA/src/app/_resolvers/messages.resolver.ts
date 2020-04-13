import { AuthService } from './../_services/auth.service';
import { Message } from './../_models/message';
import { AlertifyService } from '../_services/alertify.service';
import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable} from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { MessageService } from '../_services/message.service';


@Injectable()
export class MessagesResolver implements Resolve<Message[]>{

    pageNumber = 1;
    pageSize = 5;
    messageContainer = 'Unread';

    constructor(
        private messageService: MessageService,
        private router: Router,
        private alertify: AlertifyService,
        private authService: AuthService
    ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Message[]> {
      return this.messageService.getMessage(
           this.authService.decodedToken.nameid,
           this.pageNumber,
           this.pageSize,
           this.messageContainer)
           .pipe(
          catchError(error => {
                this.alertify.error('Problem retrieving messages');
                this.router.navigate(['/home']);
                return of(null);
          })
        );
    }
}