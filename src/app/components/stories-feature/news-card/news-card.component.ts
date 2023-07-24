import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent {
  @Input() newsItem?: any;
  isFooterVisible = false;

  toggleFooterVisibility() {
    this.isFooterVisible = !this.isFooterVisible;
  }

}
