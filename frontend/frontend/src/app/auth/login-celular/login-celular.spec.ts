import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCelular } from './login-celular';

describe('LoginCelular', () => {
  let component: LoginCelular;
  let fixture: ComponentFixture<LoginCelular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCelular]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCelular);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
