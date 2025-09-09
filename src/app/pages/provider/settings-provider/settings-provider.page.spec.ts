import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsProviderPage } from './settings-provider.page';

describe('SettingsProviderPage', () => {
  let component: SettingsProviderPage;
  let fixture: ComponentFixture<SettingsProviderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
