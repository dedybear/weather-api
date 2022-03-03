import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RainCheckComponent } from './rain-check.component';

describe('RainCheckComponent', () => {
  let component: RainCheckComponent;
  let fixture: ComponentFixture<RainCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RainCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RainCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // if currently raining


  // if might rain before midnight

  // Not if clear
  // Not if anything clear

  //


});
