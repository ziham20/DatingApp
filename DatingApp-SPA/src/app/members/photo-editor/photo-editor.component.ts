import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { AuthService } from './../../_services/auth.service';
import { environment } from 'src/environments/environment';
import { Photo } from './../../_models/photo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})

export class PhotoEditorComponent implements OnInit {

  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(

    private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService

  ) {}

  ngOnInit() {
    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

    initializeUploader() {
      this.uploader = new FileUploader({
        url: this.baseUrl + '/users/' + this.authService.decodedToken.nameid + '/photos',
        authToken: 'Bearer ' + localStorage.getItem('token'),
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,  // true means no need to click a button to upload
        maxFileSize: 10 * 1024 * 1024
      });
      // remove cross orign error
      this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
      this.uploader.onSuccessItem = (item, response, status, headers) => {

      if(response){
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };

        this.photos.push(photo);

      }};
    }


    setMainPhoto(photo: Photo){
      this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
         // sets button color
        this.currentMain = this.photos.filter( p => p.isMain === true)[0];
        this.currentMain.isMain = false;
        photo.isMain = true;
        this.authService.changeMemberPhoto(photo.url);
        this.authService.curentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authService.curentUser));
       // this.getMemberPhotoChange.emit(photo.url);
      }, error => {
        this.alertify.error(error);
      });
    }



}
