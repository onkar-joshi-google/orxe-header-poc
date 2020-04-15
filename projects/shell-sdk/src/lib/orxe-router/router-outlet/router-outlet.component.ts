import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DomService, AppResolverService } from '../../services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'orxe-router-outlet',
  templateUrl: './router-outlet.component.html',
  styleUrls: ['./router-outlet.component.css']
})
/**
 * Generates a outlet element that hosts the microapps in a page
 */
export class RouterOutletComponent implements OnInit{

  /**
   * Used to assign a name to the outlet instance
   */
  @Input() name = 'default';

  /**
   * Reference container into which microapp is injected
   */
  @ViewChild('content', { static: true }) content: ElementRef;

  /**
   * Injects required services and sets up observers for route changes to load microapps
   * @param _appResolver AppResolver service monitors app change for outlets
   * @param _domService DomService used to inject scripts and microapp tags
   */
  constructor(
    private _appResolver: AppResolverService,
    private _domService: DomService
  ) {
    this._appResolver.getAppResolved().subscribe(app => {
      this.loadMicroApp(app);
    });
  }

  ngOnInit() { }

  /**
   * Injects microapp bundle and tag into the DOM
   * @param route a requested route for which microapp needs to be loaded
   */
  loadMicroApp(app) {
    // TODO Add logic to microapp deps first by using loader service.
    if (this.content) {
      this._domService.insertElement(this.content, app.tagName);
      this._domService.insertApp(app.bundle, this.content);
    }
  }
}
