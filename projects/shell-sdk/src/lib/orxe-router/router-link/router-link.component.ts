import { Component, OnInit, Input } from '@angular/core';
import { RouterService } from '../router.service';

@Component({
  selector: 'orxe-router-link',
  templateUrl: './router-link.component.html',
  styleUrls: ['./router-link.component.scss']
})
export class RouterLinkComponent implements OnInit {

  @Input() href: string;

  constructor(
    private routerService: RouterService
  ) { }

  ngOnInit() {
  }

  navigate($event) {
    $event.preventDefault();

    this.routerService.navigateTo(this.href);
  }



}
