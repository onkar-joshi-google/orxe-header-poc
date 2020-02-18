import { NgModule, Optional, SkipSelf } from '@angular/core';
import { OrxeRouterModule } from './orxe-router/orxe-router.module';
import { DomService } from './utils/dom.utils';


@NgModule({
  imports: [OrxeRouterModule],
  exports: [],
  providers: [DomService]
})
export class ShellSdkModule {
  constructor(@Optional() @SkipSelf() parentModule: ShellSdkModule) {
    if (parentModule) {
      throw new Error('Shell Module is already loaded. Import it in AppModule only.');
    }
  }
}
