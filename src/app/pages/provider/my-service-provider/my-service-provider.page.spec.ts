import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyServiceProviderPage } from './my-service-provider.page';

describe('MyServiceProviderPage', () => {
  let component: MyServiceProviderPage;
  let fixture: ComponentFixture<MyServiceProviderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyServiceProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
