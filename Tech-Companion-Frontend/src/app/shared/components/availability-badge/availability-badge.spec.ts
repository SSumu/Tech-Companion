import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityBadge } from './availability-badge';

describe('AvailabilityBadge', () => {
  let component: AvailabilityBadge;
  let fixture: ComponentFixture<AvailabilityBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilityBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(AvailabilityBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
