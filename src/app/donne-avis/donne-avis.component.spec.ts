import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneAvisComponent } from './donne-avis.component';

describe('DonneAvisComponent', () => {
  let component: DonneAvisComponent;
  let fixture: ComponentFixture<DonneAvisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonneAvisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonneAvisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
