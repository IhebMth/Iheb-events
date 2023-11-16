import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConavComponent } from './conav.component';

describe('ConavComponent', () => {
  let component: ConavComponent;
  let fixture: ComponentFixture<ConavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
