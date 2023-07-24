import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { WorldStoriesComponent } from './world-stories.component';
import { NewsApiService } from 'src/app/services/newsService/news-api.service';
import { SharedService } from 'src/app/services/shared/shared.service';

describe('WorldStoriesComponent', () => {
  let component: WorldStoriesComponent;
  let fixture: ComponentFixture<WorldStoriesComponent>;
  let newsApiServiceSpy: jasmine.SpyObj<NewsApiService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;

  beforeEach(() => {
    const newsApiSpy = jasmine.createSpyObj('NewsApiService', ['topWorldHeadlines']);
    const sharedSpy = jasmine.createSpyObj('SharedService', ['setHistorySearches']);

    TestBed.configureTestingModule({
      declarations: [WorldStoriesComponent],
      providers: [
        { provide: NewsApiService, useValue: newsApiSpy },
        { provide: SharedService, useValue: sharedSpy }
      ]
    });

    fixture = TestBed.createComponent(WorldStoriesComponent);
    component = fixture.componentInstance;
    newsApiServiceSpy = TestBed.inject(NewsApiService) as jasmine.SpyObj<NewsApiService>;
    sharedServiceSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;

    newsApiServiceSpy.topWorldHeadlines.and.returnValue(of({ results: [] }));
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call newsApiService.topWorldHeadlines on ngOnInit', () => {
    component.ngOnInit();
    expect(newsApiServiceSpy.topWorldHeadlines).toHaveBeenCalled();
  });

  it('should set topNewsList and filteredNewsList on topWorldHeadlines API response', () => {
    const mockResponse = { results: [{ title: 'News 1' }, { title: 'News 2' }] };
    newsApiServiceSpy.topWorldHeadlines.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(component.topNewsList).toEqual(mockResponse.results);
    expect(component.filteredNewsList).toEqual(mockResponse.results);
  });

  it('should call sharedService.setHistorySearches on onSearch', () => {
    component.searchQuery = 'test';
    component.onSearch();
    expect(sharedServiceSpy.setHistorySearches).toHaveBeenCalled();
  });

  it('should filter news on onSearch', () => {
    component.topNewsList = [
      { title: 'News 1' },
      { title: 'News 2' },
      { title: 'Test News 1' },
      { title: 'Test News 2' }
    ];
    component.searchQuery = 'test';

    component.onSearch();

    expect(component.filteredNewsList).toEqual([{ title: 'Test News 1' }, { title: 'Test News 2' }]);
  });

  it('should set filteredNewsList to topNewsList when searchQuery is empty on onSearch', () => {
    component.topNewsList = [{ title: 'News 1' }, { title: 'News 2' }];
    component.searchQuery = '';

    component.onSearch();

    expect(component.filteredNewsList).toEqual(component.topNewsList);
  });

});
