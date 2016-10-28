export class MixinObject{
  //permet de mixer le contenu d'un param avec l'objet en cours
  public mixin(obj ?: any){
    let keys = Object.keys(obj);
    keys.forEach(key => {
      if(typeof this[key] !== 'undefined' && obj[key])
        this[key] = obj[key];
    });
    return this;
  }
}
