import { Component, OnInit } from '@angular/core';
import { NewsApiService } from 'src/app/services/newsService/news-api.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.css']
})
export class SearchHistoryComponent implements OnInit{
  isLoadingFooterData=true;
  keywords?: any[];

  
  constructor(private newsApi: NewsApiService,private shared : SharedService){

  }
   async ngOnInit() {
    await this.shared.historySearches.subscribe(historyData=>{
      this.keywords=historyData;
      this.isLoadingFooterData=false
    })

    if(this.keywords?.length===0){
      this.newsApi.getSearchHistoryKeywords().subscribe(data=>{
        console.log("Search API response",data);
  
        console.log("keywords data",data['response']['docs'][0]['keywords']);
        
        this.keywords=data['response']['docs'][0]['keywords'];
        this.isLoadingFooterData=false
        
      })
    }
    
   
  }

}
