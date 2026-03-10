import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VipCustomersComponent } from './vip-customers';

describe('VipCustomers', () => {
  let component: VipCustomersComponent;
  let fixture: ComponentFixture<VipCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VipCustomersComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VipCustomersComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
