import { MixinObject } from './mixin';

export class NavbarItem extends MixinObject {
  public label = '';
  public selected = false;
  public submenu: Array<NavbarSubItem> = [];
  public action: any = null;
  public link = '';
  public routerlink = '';
  constructor(obj ?: any) {
    super();
    this.mixin(obj);
  }
}

export class NavbarSubItem extends MixinObject {
  public label = '';
  public action: any = null;
  constructor(obj ?: any) {
    super();
    this.mixin(obj);
  }
}
