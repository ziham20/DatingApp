import { AlertifyService } from './../../_services/alertify.service';
import { UserService } from './../../_services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  
  @ViewChild('memberTabs',{static: true}) memberTabs: TabsetComponent

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

      this.route.queryParams.subscribe(params => {
          const selectedTab = params['tab'];
          this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;
        })

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

  selectTab(tabId: number){
    this.memberTabs.tabs[tabId].active = true;
  }

}
