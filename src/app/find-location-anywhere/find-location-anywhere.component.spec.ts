import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLocationAnywhereComponent } from './find-location-anywhere.component';

describe('FindLocationAnywhereComponent', () => {
  let component: FindLocationAnywhereComponent;
  let fixture: ComponentFixture<FindLocationAnywhereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindLocationAnywhereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindLocationAnywhereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
