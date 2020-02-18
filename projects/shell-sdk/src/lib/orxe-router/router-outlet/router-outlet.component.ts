import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { RouterService } from '../router.service';
import { DomService } from '../../utils/dom.utils';

@Component({
  selector: 'orxe-router-outlet',
  templateUrl: './router-outlet.component.html',
  styleUrls: ['./router-outlet.component.css']
})
export class RouterOutletComponent implements OnInit {

  @Input() name: string = 'default';

  @ViewChild('content', { static: true }) content: ElementRef;

  constructor(
    routerService: RouterService,
    private domService: DomService
  ) {
    routerService.onRouteChanged().subscribe((route) => {
      console.log(route);
      if (route && !route.outlet) {
        this.loadMicroapp(route);
      }

      if (route && route.outlet === name) {
        this.loadMicroapp(route);
      }
    });
  }

  loadMicroapp(route) {
    if (this.content) {
      this.domService.insertElement(this.content, route.tagName);
      this.previewContent();
    }
  }

  previewContent() {
    document.getElementById('dom').innerText = this.content.nativeElement.innerHTML;
  }

  ngOnInit() {
  }

}
