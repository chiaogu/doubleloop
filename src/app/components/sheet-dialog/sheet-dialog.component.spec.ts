import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SheetDialogComponent } from './sheet-dialog.component';

describe('SheetDialogComponent', () => {
  let component: SheetDialogComponent;
  let fixture: ComponentFixture<SheetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SheetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SheetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
