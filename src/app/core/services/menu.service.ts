import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  /**
   * Get menu items based on the user
   */
  getMenuItems() {
    // Check user details and make appropriate API calls
    return [
      { name: 'Link 1', link: 'https://www.google.co.in', data: [], isVisible: true },
      { name: 'Link 2', link: 'https://www.google.co.in', data: [], isVisible: true },
      { name: 'Link 3', link: 'https://www.google.co.in', data: [], isVisible: true }
    ];
  }

  getUserMenuItems() {
    // Check user details and make appropriate API calls
    return [
      { name: 'User Link 1', link: 'https://www.google.co.in', data: [], isVisible: true },
      { name: 'User Link 2', link: 'https://www.google.co.in', data: [], isVisible: true }
    ];
  }

}
