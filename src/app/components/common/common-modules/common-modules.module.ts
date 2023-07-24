import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { SearchHistoryComponent } from '../search-history/search-history.component';
import { DescriptionShortnerPipe } from 'src/app/utilities/description-shortner.pipe';



@NgModule({
  declarations: [LoaderComponent,SearchHistoryComponent,DescriptionShortnerPipe],
  imports: [
    CommonModule
  ],
  exports:[LoaderComponent,SearchHistoryComponent,DescriptionShortnerPipe]
})
export class CommonModulesModule { }
