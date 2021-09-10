import { Component, OnInit } from '@angular/core';
//import { Lightbox } from 'ngx-lightbox';

declare var $: any

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.scss']
})
export class ScreenshotComponent implements OnInit {
  public isShowModal: boolean;
  //public imag = ["assets/images/ss/17.png", "assets/images/ss/16.png", "assets/images/ss/18.png", "assets/images/ss/15.png", "assets/images/ss/14.png", "assets/images/ss/3.png", "assets/images/ss/4.png", "assets/images/ss/5.png", "assets/images/ss/6.png", "assets/images/ss/7.png", "assets/images/ss/8.png", "assets/images/ss/9.png", "assets/images/ss/10.png", "assets/images/ss/11.png", "assets/images/ss/12.png", "assets/images/ss/13.png", "assets/images/ss/1.png", "assets/images/ss/2.png"];
  //public images=[];
  public images = ["assets/images/ss/17.png", "assets/images/ss/16.png", "assets/images/ss/18.png", "assets/images/ss/15.png", "assets/images/ss/14.png", "assets/images/ss/3.png", "assets/images/ss/4.png", "assets/images/ss/5.png", "assets/images/ss/6.png", "assets/images/ss/7.png", "assets/images/ss/8.png", "assets/images/ss/9.png", "assets/images/ss/10.png", "assets/images/ss/11.png", "assets/images/ss/12.png", "assets/images/ss/13.png", "assets/images/ss/1.png", "assets/images/ss/2.png"];
  public showImage: string
  private imgIndex = 0;
  constructor(
    // private _lightbox: Lightbox
    ) { }

  ngOnInit() {
    // for (let i = 1; i <= this.imag.length; i++) {
    //   const album = {
    //     src: this.imag[i],
    //     caption: "image" + i,
    //     thumb: this.imag[i]
    //   };
    //   this.images.push(album);
    // }
    $('#default-demo').slickLightbox().on({
      'show.slickLightbox': function () {
        document.body.style.overflow = 'hidden'
        return true;
      },
      'hide.slickLightbox': function () {
        document.body.style.overflow = 'auto'
      },
    });
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

  // open(index: number): void {
  //   // open lightbox
  //   this._lightbox.open(this.images, index);
  // }

  // close(): void {
  //   // close lightbox programmatically
  //   this._lightbox.close();
  // }
}
