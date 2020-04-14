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
   * @param tagName
   */
  insertElement(target: ElementRef, tagName: string) {
    const el = this._renderer.createElement(tagName);
    target.nativeElement.innerHTML = "";
    this._renderer.appendChild(target.nativeElement, el);
  }

  /**
   * Injects microapp bundle in the DOM
   * @param src microapp bundle script
   * @param target target element into which script tag is inserted
   */
  insertApp(src, target) {
    const script = this._renderer.createElement('script');
    script.src = src;
    if (this._renderer) {
      this._renderer.appendChild(target.nativeElement, script);
    }
  }

  /**
   * Creates and returns the element.
   * @param elemName name of the element
   * @param props properties of the element
   * @param children child elements if any
   */
  createElement(elemName, props, ...children) {
    const elem = this._renderer.createElement(elemName);
    if (props) {
      Object.assign(elem, props);
    }
    if (children) {
      children.forEach(child => {
        if (typeof child === 'object') {
          elem.appendChild(child);
        } else {
          elem.appendChild(document.createTextNode(child));
        }
      });
    }
    return elem;
  }
}
