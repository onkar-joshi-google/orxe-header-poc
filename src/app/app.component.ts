import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'orxe-shell';

  isMenuOpen = false;

  toggleMenu(value) {
    this.isMenuOpen = value;
  }

}
