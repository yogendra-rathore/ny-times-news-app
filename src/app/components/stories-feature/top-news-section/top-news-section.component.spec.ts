import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { TopNewsSectionComponent } from './top-news-section.component';
import { NewsApiService } from 'src/app/services/newsService/news-api.service';
import { SharedService } from 'src/app/services/shared/shared.service';
import { TokenRefreshService } from 'src/app/services/authService/token-refresh.service';

describe('TopNewsSectionComponent', () => {
  let component: TopNewsSectionComponent;
  let fixture: ComponentFixture<TopNewsSectionComponent>;
  let newsApiServiceSpy: jasmine.SpyObj<NewsApiService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;
  let tokenRefreshServiceSpy: jasmine.SpyObj<TokenRefreshService>;

  beforeEach(() => {
    const newsApiSpy = jasmine.createSpyObj('NewsApiService', ['topHeadlines', 'getSearchHistoryKeywords']);
    const sharedSpy = jasmine.createSpyObj('SharedService', ['setHistorySearches']);
    const tokenRefreshSpy = jasmine.createSpyObj('TokenRefreshService', ['isTokenExpired', 'getUserDetailsFromToken', 'refreshToken']);

    TestBed.configureTestingModule({
      declarations: [TopNewsSectionComponent],
      providers: [
        { provide: NewsApiService, useValue: newsApiSpy },
        { provide: SharedService, useValue: sharedSpy },
        { provide: TokenRefreshService, useValue: tokenRefreshSpy }
      ]
    });

    fixture = TestBed.createComponent(TopNewsSectionComponent);
    component = fixture.componentInstance;
    newsApiServiceSpy = TestBed.inject(NewsApiService) as jasmine.SpyObj<NewsApiService>;
    sharedServiceSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
    tokenRefreshServiceSpy = TestBed.inject(TokenRefreshService) as jasmine.SpyObj<TokenRefreshService>;

    // Set up default spy behaviors
    newsApiServiceSpy.topHeadlines.and.returnValue(of({ results: [] }));
    newsApiServiceSpy.getSearchHistoryKeywords.and.returnValue(of({ response: { docs: [{ keywords: [] }] } }));
    tokenRefreshServiceSpy.isTokenExpired.and.returnValue(false);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call newsApiService.topHeadlines on ngOnInit', () => {
    component.ngOnInit();
    expect(newsApiServiceSpy.topHeadlines).toHaveBeenCalled();
  });

  it('should set topNewsList and filteredNewsList on topHeadlines API response', () => {
    const mockResponse = { results: [{ title: 'News 1' }, { title: 'News 2' }] };
    newsApiServiceSpy.topHeadlines.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(component.topNewsList).toEqual(mockResponse.results);
    expect(component.filteredNewsList).toEqual(mockResponse.results);
  });

  it('should call newsApiService.getSearchHistoryKeywords on ngOnInit', () => {
    component.ngOnInit();
    expect(newsApiServiceSpy.getSearchHistoryKeywords).toHaveBeenCalled();
  });

  it('should set sharedService.setHistorySearches on getSearchHistoryKeywords API response', () => {
    const mockResponse = { response: { docs: [{ keywords: ['keyword1', 'keyword2'] }] } };
    newsApiServiceSpy.getSearchHistoryKeywords.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(sharedServiceSpy.setHistorySearches).toHaveBeenCalledWith(mockResponse.response.docs[0].keywords);
  });

});
