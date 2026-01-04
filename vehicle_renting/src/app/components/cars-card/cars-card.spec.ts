import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarsCard } from './cars-card';

describe('CarsCard', () => {
  let component: CarsCard;
  let fixture: ComponentFixture<CarsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarsCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
