import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeProviderPage } from './home-provider.page';

describe('HomeProviderPage', () => {
  let component: HomeProviderPage;
  let fixture: ComponentFixture<HomeProviderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
