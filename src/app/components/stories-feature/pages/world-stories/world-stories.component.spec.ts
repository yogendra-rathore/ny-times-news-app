import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldStoriesComponent } from './world-stories.component';

describe('WorldStoriesComponent', () => {
  let component: WorldStoriesComponent;
  let fixture: ComponentFixture<WorldStoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorldStoriesComponent]
    });
    fixture = TestBed.createComponent(WorldStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
