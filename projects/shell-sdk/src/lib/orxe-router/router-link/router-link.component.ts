import { Component, OnInit, Input } from '@angular/core';
import { RouterService } from '../../services';

@Component({
  selector: 'orxe-router-link',
  templateUrl: './router-link.component.html',
  styleUrls: ['./router-link.component.scss']
})
/**
 * Generates a link tag limited to OrxeRoutes. Used to Orxe specific navigation
 */
export class RouterLinkComponent implements OnInit {

  /**
   * URL for navigation
   */
  @Input() href: string;

  /**
   * Injects and provide router instance
   * @param _routerService OrxeRouter, to navigate to requested URL
   */
  constructor(
    private _routerService: RouterService
  ) { }

  ngOnInit() { }

  /**
   * Event listener when user clicks on the navigation link
   * @param $event event raised by the link
   */
  navigate($event) {
    $event.preventDefault();
    this._routerService.navigateTo(this.href);
  }
}
