import { Component } from '@angular/core';
import { TokenRefreshService } from 'src/app/services/authService/token-refresh.service';
import { NewsApiService } from 'src/app/services/newsService/news-api.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-top-news-section',
  templateUrl: './top-news-section.component.html',
  styleUrls: ['./top-news-section.component.css']
})
export class TopNewsSectionComponent {
  showLoader:boolean=true;
  isSearchBarClicked=false;
  topNewsList?: any[];
  filteredNewsList?: any[];
  pagedNewsList?: any[];
  itemsPerPage:number=6;
  totalPages:number=0;
  currentPage:number=1;
  tokenValue:string="";
  userDateFromToken:any={}
  intervalHandler:any;

  searchQuery = '';


  onSearch() {
    this.isSearchBarClicked=false;

    console.log("Inside search",this.searchQuery);
    
    if (this.searchQuery.trim() !== '') {
      this.filteredNewsList = this.topNewsList?.filter(
        (news) => news.title.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
      );
      console.log("Filtered List",this.filteredNewsList);
      
    } else {
      this.filteredNewsList = this.topNewsList;
    }
  }

  constructor(private newsApi: NewsApiService,private shared:SharedService,private tokenUtil:TokenRefreshService){

  }
  ngOnDestroy(): void {
    clearInterval(this.intervalHandler)
  }
  ngOnInit(): void {
   this.newsApi.topHeadlines().subscribe(response=>{
      console.log("Data received from top headlines API",response);
      console.log("only cards data",response['results']);
      this.topNewsList=response['results'];
      this.filteredNewsList=response['results'];
      this.showLoader=false
      
   });

   this.newsApi.getSearchHistoryKeywords().subscribe(data=>{
      console.log("History API response in home",data['response']['docs'][0]['keywords']);
      this.shared.setHistorySearches(data['response']['docs'][0]['keywords']);

      
   })

  //  This is call for Token refresh in every 5mins
   this.intervalHandler=setInterval(() => this.refreshToken(), 300000);

  }

  async refreshToken() {
    console.log("refresh method called");
    
    if (this.tokenUtil.isTokenExpired()) {
      this.userDateFromToken=await this.tokenUtil.getUserDetailsFromToken();
      let dataToSend:any={
        "email":this.userDateFromToken.email,
        "password":this.userDateFromToken.password
      }
      await this.tokenUtil.refreshToken(dataToSend);
       
    }
  }

  getPagesArray(): number[] {
    console.log("Total cards",this.filteredNewsList?.length);

     this.totalPages = Math.ceil((this.filteredNewsList!=null ? this.filteredNewsList.length: 30) / this.itemsPerPage);
     console.log("Inside Get array method",this.totalPages);
     const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.pagedNewsList = this.filteredNewsList?.slice(startIndex, endIndex);
     
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }

  onPageChange(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      this.pagedNewsList = this.filteredNewsList?.slice(startIndex, endIndex);
    }
  }
  onSearchBarClick(){
    this.isSearchBarClicked=true;

    console.log("Search Bar Clicked");
    
  }



}
