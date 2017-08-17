import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSheetDialogComponent } from './save-sheet-dialog.component';

describe('SaveSheetDialogComponent', () => {
  let component: SaveSheetDialogComponent;
  let fixture: ComponentFixture<SaveSheetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveSheetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSheetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
