import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScienceStoriesComponent } from './pages/science-stories/science-stories.component';
import { WorldStoriesComponent } from './pages/world-stories/world-stories.component';
import { TopNewsSectionComponent } from './top-news-section/top-news-section.component';

const routes: Routes = [
  {path:'',component:TopNewsSectionComponent},
  {path:'news-articles/world-stories',component: WorldStoriesComponent},
  {path:'news-articles/science-stories',component: ScienceStoriesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoriesFeatureRoutingModule { }
