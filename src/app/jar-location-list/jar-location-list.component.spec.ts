import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JarLocationListComponent } from './jar-location-list.component';

describe('JarLocationListComponent', () => {
  let component: JarLocationListComponent;
  let fixture: ComponentFixture<JarLocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JarLocationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JarLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
