import { Component } from '@angular/core';
import { NewsApiService } from 'src/app/services/newsService/news-api.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-science-stories',
  templateUrl: './science-stories.component.html',
  styleUrls: ['./science-stories.component.css']
})
export class ScienceStoriesComponent {
  showLoader:boolean=true;
  topNewsList?: any[];
  filteredNewsList?: any[];
  searchedkeywords:any[]=[];

  pagedNewsList?: any[];
  itemsPerPage:number=6;
  totalPages:number=0;
  currentPage:number=1;

  searchQuery = '';
  constructor(private newsApi: NewsApiService,private shared :SharedService){

  }

  onSearch() {
    console.log("Inside search",this.searchQuery);
    this.shared.setHistorySearches(this.searchedkeywords);

    if (this.searchQuery.trim() !== '') {
      this.filteredNewsList = this.topNewsList?.filter(
        (news) => news.title.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
      );
      console.log("Filtered List",this.filteredNewsList);
      
    } else {
      this.filteredNewsList = this.topNewsList;
    }
  }


  ngOnInit(): void {
   this.newsApi.topScienceHeadlines().subscribe(response=>{
      console.log("Data received from Science Stories",response);
      console.log("only cards data",response['results']);
      this.topNewsList=response['results'];
      this.filteredNewsList=response['results'];
      this.showLoader=false
      
   })

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


}
