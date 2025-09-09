import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyAppointmentsProviderPage } from './my-appointments-provider.page';

describe('MyAppointmentsProviderPage', () => {
  let component: MyAppointmentsProviderPage;
  let fixture: ComponentFixture<MyAppointmentsProviderPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppointmentsProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
