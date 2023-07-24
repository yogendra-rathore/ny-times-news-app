import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNewsSectionComponent } from './top-news-section.component';

describe('TopNewsSectionComponent', () => {
  let component: TopNewsSectionComponent;
  let fixture: ComponentFixture<TopNewsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopNewsSectionComponent]
    });
    fixture = TestBed.createComponent(TopNewsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
