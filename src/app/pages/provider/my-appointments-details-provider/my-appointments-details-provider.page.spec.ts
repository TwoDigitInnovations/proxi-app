import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAppointmentsDetailsProviderPage } from './my-appointments-details-provider.page';

describe('MyAppointmentsDetailsProviderPage', () => {
  let component: MyAppointmentsDetailsProviderPage;
  let fixture: ComponentFixture<MyAppointmentsDetailsProviderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppointmentsDetailsProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
