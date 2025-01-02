import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePostsPageComponent } from './create-posts-page.component';

describe('CreatePostsPageComponent', () => {
  let component: CreatePostsPageComponent;
  let fixture: ComponentFixture<CreatePostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatePostsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatePostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
