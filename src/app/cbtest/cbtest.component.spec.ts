import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbtestComponent } from './cbtest.component';

describe('CbtestComponent', () => {
  let component: CbtestComponent;
  let fixture: ComponentFixture<CbtestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbtestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbtestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
