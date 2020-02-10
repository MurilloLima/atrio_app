import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Usuario } from '../../model/usuario';


@Injectable()
export class StorageProvider {

  constructor(private storage: Storage) {

  }

  public getInfo(key: string){
    return this.storage.get(key)
    .catch((error)=>{
      alert("Não foi possível acessar o Storage local. A aplicação não funcionará corretamente: " + error);
    });
  }

  public save(key: string, usuario: Usuario){
   return this.storage.set(key, usuario)
    .catch((error)=>{
      alert("Não foi possível acessar o Storage local. A aplicação não funcionará corretamente: " + error);
    });
}

public resetStorage(){
  this.storage.clear()
  .catch((error)=>{
    alert("Não foi possível acessar o Storage local. A aplicação não funcionará corretamente: " + error);
  });
}

}
