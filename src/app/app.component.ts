import { Component, ViewChild, ViewContainerRef, ElementRef, ComponentRef } from '@angular/core';
import { OrxeHeader } from '../../orxe-header/src';
import { HeaderDetails } from 'orxe-header/src/interfaces';
import { CbtestComponent } from './cbtest/cbtest.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'orxe-shell';
  isMenuOpen = false;
  headerDetails: HeaderDetails = {
    leftIcon: "ic-menu",
    showMenuIcon: true
  }

  ngOnInit() {
    OrxeHeader.getDetails().subscribe((response: HeaderDetails) => {
      this.headerDetails = response;
    })
  }

  toggleMenu(value) {
    OrxeHeader.leftIconClicked();
    if (this.headerDetails.showMenuIcon) {
      this.isMenuOpen = value;
      this.headerDetails.leftIcon = 'ic-menu'
    } else {
      this.headerDetails.leftIcon = 'ic-arrow-left'
    }
  }

  updateHeader() {
    OrxeHeader.update({title: '', subtitle: 'sub', leftIcon: 'ic-arrow-left', showMenuIcon: false})
  }

  toggleHeaderIcon() {
    OrxeHeader.update({title: 'a', subtitle: 'sub', leftIcon: 'ic-arrow-left', showMenuIcon: false})
  }

}
