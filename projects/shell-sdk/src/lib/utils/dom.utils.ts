import { Injectable, Renderer2, ElementRef, RendererFactory2 } from '@angular/core';

@Injectable()
export class DomService {
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  insertElement(target: ElementRef, tagName: string) {
    const el = this.renderer.createElement(tagName);
    this.renderer.appendChild(target.nativeElement, el);
  }
}
