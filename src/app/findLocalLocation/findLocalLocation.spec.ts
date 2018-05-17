import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindLocalLocationComponent } from './map.component';

describe('FindLocalLocationComponent', () => {
  let component: FindLocalLocationComponent;
  let fixture: ComponentFixture<FindLocalLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindLocalLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindLocalLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
