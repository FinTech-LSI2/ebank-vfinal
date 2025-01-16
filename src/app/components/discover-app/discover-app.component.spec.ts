import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverAppComponent } from './discover-app.component';

describe('DiscoverAppComponent', () => {
  let component: DiscoverAppComponent;
  let fixture: ComponentFixture<DiscoverAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverAppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoverAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
