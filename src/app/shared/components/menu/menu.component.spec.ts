
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { MenuService } from '@app/core/services/menu.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CultureModule } from '@orxe-culture/angular';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [ MenuService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      imports: [CultureModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the menu',  () => {
    component.closeMenu();
    expect(component.isOpen).toBeFalsy();
  });

  it('should set the selected menu item to selectedMenuItem and close the menu',  () => {
    const menuItem = {
      name: 'Menu Link 1',
      link: 'https://www.google.co.in',
      data: [],
      isVisible: false
    };
    component.selectMenuItem(menuItem);
    expect(component.isOpen).toBeFalsy();
  });
});
