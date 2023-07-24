import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsApiService {

  constructor(private _http: HttpClient) { }
  // API Secret Later Going to be get from Backend or Vault Only
  apiSecret="8GjHknvhatT9j0BXBHe9dhrsgXDsAYsT"
  topNewsApi=`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${this.apiSecret}`;
  worldNewsApi=`https://api.nytimes.com/svc/topstories/v2/world.json?api-key=${this.apiSecret}`;
  scienceNewsApi=`https://api.nytimes.com/svc/topstories/v2/science.json?api-key=${this.apiSecret}`;
  searchHistoryNewsApi=`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=${this.apiSecret}`;

  topHeadlines():Observable<any>{
    return this._http.get(this.topNewsApi);

  }
  topWorldHeadlines():Observable<any>{
    return this._http.get(this.worldNewsApi);

  }

  topScienceHeadlines():Observable<any>{
    return this._http.get(this.scienceNewsApi);

  }

  getSearchHistoryKeywords():Observable<any>{
    return this._http.get(this.searchHistoryNewsApi);
  }

}
