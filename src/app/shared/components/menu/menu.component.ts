import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { MenuItem } from '@app/core/interfaces';
import { MenuService } from '@app/core/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  @Input() isOpen = false;

  @Output() menuItemSelected = new EventEmitter<MenuItem>();
  @Output() menuClosed = new EventEmitter<boolean>();

  menuItems: MenuItem[];
  userMenuItems: MenuItem[];
  selectedMenuItem: MenuItem;

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuItems = this.menuService.getMenuItems();
    this.userMenuItems = this.menuService.getUserMenuItems();
    this.selectedMenuItem = this.menuItems[0];
  }

  closeMenu(event?) {
    this.isOpen = false;
    this.menuClosed.emit(false);
  }

  selectMenuItem(item) {
    this.selectedMenuItem = Object.assign(item);
    this.menuItemSelected.emit(item);
    this.closeMenu();
  }

}
