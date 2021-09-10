import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LandingFixService } from '../shared/services/landing-fix.service';

@Component({
  selector: 'app-termscondition',
  templateUrl: './termscondition.component.html',
  styleUrls: ['./termscondition.component.scss']
})
export class TermsconditionComponent implements OnInit {

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

    // let sub = this.route.params.subscribe(async (params) => {
    //   let type = params['type']; // (+) converts string 'id' to a number
    //   this.type = type.toLowerCase();
    //   //await this.getPlayerDetail(id);
    // });
    let type = window.navigator.userAgent;
    this.type = type.toLowerCase();
  }

  ngOnDestroy() {
    this.fix.removeFixPages();
  }

}