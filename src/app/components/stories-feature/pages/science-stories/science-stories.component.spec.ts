import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScienceStoriesComponent } from './science-stories.component';

describe('ScienceStoriesComponent', () => {
  let component: ScienceStoriesComponent;
  let fixture: ComponentFixture<ScienceStoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScienceStoriesComponent]
    });
    fixture = TestBed.createComponent(ScienceStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
