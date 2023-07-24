import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesFeatureRoutingModule } from './stories-feature-routing.module';
import { NewsCardComponent } from './news-card/news-card.component';
import { DescriptionShortnerPipe } from 'src/app/utilities/description-shortner.pipe';
import { TopNewsSectionComponent } from './top-news-section/top-news-section.component';
import { LoaderComponent } from '../common/loader/loader.component';
import { SearchHistoryComponent } from '../common/search-history/search-history.component';
import { CommonModulesModule } from '../common/common-modules/common-modules.module';
import { FormsModule } from '@angular/forms';
import { WorldStoriesComponent } from './pages/world-stories/world-stories.component';
import { ScienceStoriesComponent } from './pages/science-stories/science-stories.component';


@NgModule({
  declarations: [
    NewsCardComponent,
    TopNewsSectionComponent,
     WorldStoriesComponent,
    ScienceStoriesComponent,
  ],
  imports: [
    CommonModule,
    StoriesFeatureRoutingModule,
    CommonModulesModule,
    FormsModule

  ],
  exports:[NewsCardComponent,
    TopNewsSectionComponent,
    WorldStoriesComponent,
    ScienceStoriesComponent,
    ]
})
export class StoriesFeatureModule { }
