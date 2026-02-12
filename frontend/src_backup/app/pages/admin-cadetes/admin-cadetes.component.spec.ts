import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCadetesComponent } from './admin-cadetes.component';

describe('AdminCadetesComponent', () => {
  let component: AdminCadetesComponent;
  let fixture: ComponentFixture<AdminCadetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCadetesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCadetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
