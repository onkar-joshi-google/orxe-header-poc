import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from '@app/core/interfaces';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  @Input() isOpen = false;

  @Input() menuItems: MenuItem[] = [
    { name: 'Link 1', link: 'https://www.google.co.in', active: false },
    { name: 'Link 2', link: 'https://www.google.co.in', active: false },
    { name: 'Link 3', link: 'https://www.google.co.in', active: false }
  ];

  @Input() userMenuItems: MenuItem[] = [
    { name: 'User Link 1', link: 'https://www.google.co.in', active: false },
    { name: 'User Link 2', link: 'https://www.google.co.in', active: false }
  ];

  @Output() menuClosed = new EventEmitter<boolean>();

  selectedMenuItem = this.menuItems[0];

  constructor() { }

  ngOnInit() {
  }

  closeMenu(event) {
    this.isOpen = false;
    this.menuClosed.emit(false);
  }

  _handleCloseMenuBlur(event) {
    console.log(event);
  }

  _handleCloseMenuFocus(event) {
    console.log(event);
  }

  selectMenuItem(item) {
    this.selectedMenuItem = Object.assign(item);
    this.selectedMenuItem.active = true;
  }

}
