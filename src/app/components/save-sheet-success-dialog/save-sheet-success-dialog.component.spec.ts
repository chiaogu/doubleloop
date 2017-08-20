import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSheetSuccessDialogComponent } from './save-sheet-success-dialog.component';

describe('SaveSheetSuccessDialogComponent', () => {
  let component: SaveSheetSuccessDialogComponent;
  let fixture: ComponentFixture<SaveSheetSuccessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveSheetSuccessDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSheetSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
