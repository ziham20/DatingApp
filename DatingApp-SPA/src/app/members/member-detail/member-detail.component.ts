import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(

  private userService: UserService,
  private alrtify: AlertifyService,
  private route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.route.data.subscribe(data =>
      {
        this.user = data ['user'];
      }),

      this.galleryOptions = [
        {
          width: '600px',
          height: '400px',
          imagePercent: 100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false
        }
      ];

    this.galleryImages =  this.getImages();

  }

  // loadUser(){
  //   this.userService.getUser(+this.route.snapshot.params['id']) // plus sign is used to convert string id to number
  //    .subscribe((user: User) => {
  //     this.user = user;
  //    }, error =>{
  //      this.alrtify.error(error);
  //    });
  // }

  getImages(){
    const imageUrls = [];
    for (const photo of this.user.photos) {
      imageUrls.push({
        small: photo.url,
        medium : photo.url,
        big: photo.url
      });
    }
    return imageUrls;
  }

}
