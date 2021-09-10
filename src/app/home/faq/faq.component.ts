import { Component, OnInit } from '@angular/core';
import { FaqsLIst } from 'src/app/entities/faqlist';
import { HomeService } from 'src/app/service/home.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  public faqS: FaqsLIst[];

  constructor(private homeService: HomeService) { }

  async ngOnInit() {
    await this.getFaqs();
  }

  private async getFaqs() {
    try {
      let res = await this.homeService.getFAQ();
      if (res && res.status == 200) {
        this.faqS = res.recordList;
      }
    }
    catch (error) {

    }
  }

}
