import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileProviderPage } from './profile-provider.page';

describe('ProfileProviderPage', () => {
  let component: ProfileProviderPage;
  let fixture: ComponentFixture<ProfileProviderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
