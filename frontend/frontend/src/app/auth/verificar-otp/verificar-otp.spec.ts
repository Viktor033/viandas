import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificarOtp } from './verificar-otp';

describe('VerificarOtp', () => {
  let component: VerificarOtp;
  let fixture: ComponentFixture<VerificarOtp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerificarOtp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerificarOtp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
