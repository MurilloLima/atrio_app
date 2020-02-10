//import { StorageProvider } from './../storage/storage';
import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
//import { ConexaoApiProvider } from '../conexao-api/conexao-api';


@Injectable()
export class ScheduleProvider {

  

  constructor(private localNotifications: LocalNotifications) {
  
  }

  createSchedule(data: any) {
    // Schedule a single notification
    this.localNotifications.schedule({
      id: 1,
      title: 'Atenção!',
      text: data.message,
      foreground: true,
      icon: 'res://icon',
      //smallIcon: 'res://ic_stat_onesignal_default',
      color: '#FF0000',
      vibrate: true,       
    });
  }

}
