import { Injectable, Renderer2, ElementRef, RendererFactory2 } from '@angular/core';

@Injectable()
export class DomService {

  /**
   * Instance of Angular Renderer2, used to manipulate the DOM
   */
  private _renderer: Renderer2;

  /**
   * Injects RendererFactory to provide DOM manipulation
   * @param rendererFactory factory that provides the renderer
   */
  constructor(
    rendererFactory: RendererFactory2
  ) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Creates and inserts tag into target element. Used to add microapp tags
   * @param target element into which a tag is inserted
   * @param tagName name of the tag
   */
  insertElement(target: ElementRef, tagName: string) {
    const el = this._renderer.createElement(tagName);
    target.nativeElement.innerHTML = '';
    this._renderer.appendChild(target.nativeElement, el);
  }

  /**
   * Injects microapp bundle in the DOM
   * @param src microapp bundle script
   * @param target target element into which script tag is inserted
   */
  insertScript(src, target) {
    const script = this._renderer.createElement('script');
    script.src = src;
    this._renderer.appendChild(target.nativeElement, script);
  }
}
