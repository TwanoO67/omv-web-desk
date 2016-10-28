import { MixinObject } from "./mixin";

export class NavbarItem extends MixinObject {
  public label: string = "";
  public selected: boolean = false;
  public submenu: Array<NavbarSubItem> = [];
  public action:any = null;
  public link:string = "";
  public routerlink:string = "";
  constructor(obj ?: any){
    super();
    this.mixin(obj);
  }
}

export class NavbarSubItem extends MixinObject {
  public label:string = "";
  public action:any = null;
  constructor(obj ?: any){
    super();
    this.mixin(obj);
  }
}
