import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceProviderPage } from './service-provider.page';

describe('ServiceProviderPage', () => {
  let component: ServiceProviderPage;
  let fixture: ComponentFixture<ServiceProviderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
