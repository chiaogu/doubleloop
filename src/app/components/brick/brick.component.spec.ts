import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrickComponent } from './brick.component';

describe('BrickComponent', () => {
  let component: BrickComponent;
  let fixture: ComponentFixture<BrickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
