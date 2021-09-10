import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LandingFixService } from '../shared/services/landing-fix.service';

@Component({
  selector: 'app-howtoredeem',
  templateUrl: './howtoredeem.component.html',
  styleUrls: ['./howtoredeem.component.scss']
})
export class HowToRedeemComponent implements OnInit {

  public type: string;

  constructor(private route: ActivatedRoute,
    private title: Title,
    private meta: Meta,
    private fix: LandingFixService) { }

  ngOnInit() {
    this.fix.addFixPages();
    this.title.setTitle(this.route.snapshot.data['title']);
    this.meta.updateTag({ name: 'description', content: this.route.snapshot.data['content'] })
    this.meta.addTag({ name: this.route.snapshot.data['title'], content: this.route.snapshot.data['content'] })
    this.meta.updateTag({ property: "og:title", content: this.route.snapshot.data['content'] })
   
    let type = window.navigator.userAgent;
    this.type = type.toLowerCase();
  }

  ngOnDestroy() {
    this.fix.removeFixPages();
  }

}