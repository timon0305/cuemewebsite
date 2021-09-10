import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LandingFixService } from '../shared/services/landing-fix.service';
declare var $: any


@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  public type: string;
  public isShowModal: boolean;
  public images = ["assets/images/ss/17.png", "assets/images/ss/16.png", "assets/images/ss/18.png", "assets/images/ss/15.png", "assets/images/ss/14.png", "assets/images/ss/3.png", "assets/images/ss/4.png", "assets/images/ss/5.png", "assets/images/ss/6.png", "assets/images/ss/7.png", "assets/images/ss/8.png", "assets/images/ss/9.png", "assets/images/ss/10.png", "assets/images/ss/11.png", "assets/images/ss/12.png", "assets/images/ss/13.png", "assets/images/ss/1.png", "assets/images/ss/2.png"];
  public showImage: string
  private imgIndex = 0;
  constructor(private route: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private fix: LandingFixService) { }

  ngOnInit(): void {
    let type = window.navigator.userAgent;
    this.type = type.toLowerCase();
    this.fix.addFixPages();
    this.title.setTitle(this.route.snapshot.data['title']);
    this.meta.updateTag({ name: 'description', content: this.route.snapshot.data['content'] })
    this.meta.addTag({ name: this.route.snapshot.data['title'], content: this.route.snapshot.data['content'] })
    this.meta.updateTag({ property: "og:title", content: this.route.snapshot.data['content'] });

    $('#aboutus-demo').slickLightbox().on({
      'show.slickLightbox': function () {
        document.body.style.overflow = 'hidden'
        return true;
      },
      'hide.slickLightbox': function () {
        document.body.style.overflow = 'auto'
      },
    });
  }
  ngOnDestroy() {
    this.fix.removeFixPages();
  }
  public openImageModal() {
    this.isShowModal = true;
    this.showImage = this.images[0];
  }
  public nextImg() {
    this.imgIndex += 1;
    if (this.imgIndex == this.images.length) {
      this.imgIndex = 0;
      this.showImage = this.images[this.imgIndex];
    }
    else {
      this.showImage = this.images[this.imgIndex];
    }
  }
  public prevImg() {
    this.imgIndex -= 1;
    if (this.imgIndex == -1) {
      this.imgIndex = this.images.length - 1;
      this.showImage = this.images[this.imgIndex];
    }
    else {
      this.showImage = this.images[this.imgIndex];
    }
  }
}
