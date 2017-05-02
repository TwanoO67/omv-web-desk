import { MixinObject } from './mixin';

export class DockItem extends MixinObject {
  public id = '';
  public image = '';
  public iframe = '';
  public title = '';
  public text = '';
  public opened = false;
  public selected = false;
  public ref: any = null;

  constructor(obj ?: any) {
    super();
    this.mixin(obj);
    return this;
  }
}
