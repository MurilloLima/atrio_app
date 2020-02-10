import { AlertController, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class UtilsProvider {

  constructor(private alert: AlertController, private diag: Diagnostic, private geolocation: Geolocation,
    private loadingCtrl: LoadingController) {

  }

  alertInformation(mensagem: string) {
    return this.alert.create({
      title: 'Informação',
      message: mensagem,
      buttons: ['OK']
    }).present();
  }

  //Função para exibir alertas de erro
  alertError(mensagem: string, loading?): void {
    if (loading) {
      loading.dismiss();
    }
    this.alert.create({
      title: 'Erro',
      message: mensagem,
      buttons: ['OK']
    }).present();
  }


  //Função para obter coordenadas do aparelho
  getLocation() {
    //Ativar geolocation

    //Validar se está ativado
    //Validar se tem permissão
    //Se não tiver, solicitar permissão para o app

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Obtendo localização do aparelho...'
    });
    loading.present();

    return new Promise(resolve => {

      this.geolocation.getCurrentPosition()
        .then((position) => {
          loading.dismiss();
          resolve({ lat: position.coords.latitude, long: position.coords.longitude });
        })
        .catch((error) => {
          this.diag.isLocationEnabled()
            .then((state: any) => {

              if (!state) {
                loading.dismiss();
                this.alertInformation("Para abertura de chamados é necessário que sua localização/GPS " +
                  "esteja habilitado!");
              }
              else {
                this.diag.isLocationAuthorized()
                  .then((state: AnalyserNode) => {
                    if (!state) {
                      loading.dismiss();
                      this.alertInformation("Para abertura de chamados é necessário que o 'App PPA' esteja com " +
                        "permissão de visualizar a localização do aparelho. Habilite a permissão e tente novamente!");
                    }
                    else {
                      loading.dismiss();
                      this.alertError("Não foi possível obter a sua localização para abertura de chamado!");
                    }
                  })
                  .catch((error) => {
                    loading.dismiss();
                    this.alertInformation("Não foi possível verificar se sua localização está autorizada para abertura de chamado!");
                  });
              }
            })
            .catch((error) => {
              loading.dismiss();
              this.alertInformation("Não foi possível verificar se sua localização está ativa para abertura de chamado!");
            });
        });

    });

    //Validar se está ativado
    //Validar se tem permissão
    //Se não tiver, solicitar permissão para o app

    /* let loading = this.loadingCtrl.create({
         spinner: 'bubbles',
         content: 'Obtendo localização do aparelho...'
       });
       loading.present();
    return new Promise(resolve => {
 
       
 /*
     this.geolocation.getCurrentPosition().then((position) => {
       loading.dismiss();
       this.alertInformation(position.coords.latitude + " " + position.coords.longitude);
       resolve({ lat: position.coords.latitude, long: position.coords.longitude });
     }).catch((error) => {
       loading.dismiss();
       this.alertError("Não foi possível obter a sua localização para abertura de chamado. " +
         "É nessário estar com a 'Localização/GPS' ativado e a permissão de visuzaliar a " +
         "localização do aparelho configurada!");
     });
   });
 
 
     /*this.diag.isGpsLocationEnabled()
         .then((state: AnalyserNode) => {
           this.alertInformation("sem promisse");
           if (!state) {
             loading.dismiss();
             this.alertInformation("Para abertura de chamados é necessário que sua localização/GPS " +
               "esteja habilitado!");
           }
         });
 
     return new Promise(resolve => {
       
 
       this.diag.isGpsLocationEnabled()
         .then((state: AnalyserNode) => {
           this.alertInformation("OOO");
           if (!state) {
             loading.dismiss();
             this.alertInformation("Para abertura de chamados é necessário que sua localização/GPS " +
               "esteja habilitado!");
           }
           else {
             this.alertInformation("Else");
             this.diag.isLocationAuthorized()
               .then((state: AnalyserNode) => {
                 this.alertInformation("OOO");
                 if (!state) {
                   loading.dismiss();
                   this.alertInformation("Para abertura de chamados é necessário que o 'App PPA' esteja com " +
                     "permissão de visuzaliar a " +
                     "localização do aparelho. Habilite a permissão e tente novamente!");
                 }
                 else {
                   this.geolocation.getCurrentPosition().then((position) => {
                     loading.dismiss();
                     resolve({ lat: position.coords.latitude, long: position.coords.longitude });
                   }).catch((error) => {
                     loading.dismiss();
                     this.alertError("Não foi possível obter a sua localização para abertura de chamado. " +
                       "Tente novamente!");
                   });
                 }
               })
               .catch((error) => {
                 loading.dismiss();
                 this.alertError("Não foi possível verificar a permissão de localizaçã do 'App PPA'. Tente novamente!");
               })
           }
         })
         .catch((error) => {
           loading.dismiss();
           this.alertError("Não foi possível verificar se sua localização está ativa. Tente novamente!");
         })
     });*/

  }
}