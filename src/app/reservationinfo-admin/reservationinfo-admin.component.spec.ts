import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationinfoAdminComponent } from './reservationinfo-admin.component';

describe('ReservationinfoAdminComponent', () => {
  let component: ReservationinfoAdminComponent;
  let fixture: ComponentFixture<ReservationinfoAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationinfoAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationinfoAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
