import { BrowserModule } from '@angular/platform-browser';

import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ConexaoApiProvider } from '../providers/conexao-api/conexao-api';
import { IonicStorageModule } from '@ionic/storage';
import { StorageProvider } from '../providers/storage/storage';
import { HomePage } from '../pages/home/home';
import { UtilsProvider } from '../providers/utils/utils';5
import { ScheduleProvider } from '../providers/utils/schedule';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
import { GraficoUsuarioProvider } from '../providers/grafico/grafico-usuario';
import { GraficoManagerChamadoProvider } from '../providers/grafico/grafico-manager-chamado';
import { GraficoManagerMateriaProvider } from '../providers/grafico/grafico-manager-materia';
import { GraficoManagerAlunoProvider } from '../providers/grafico/grafico-manager-aluno';
import { GraficoManagerTutorProvider } from '../providers/grafico/grafico-manager-tutor';
import { GraficoUtilsProvider } from '../providers/grafico/grafico-utils';

import {Diagnostic} from '@ionic-native/diagnostic';
import {Geolocation} from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BackgroundMode,
    ConexaoApiProvider,
    LocalNotifications,
    StorageProvider,
    UtilsProvider,
    ScheduleProvider,
    PhotoViewer,
    File,
    GraficoUtilsProvider,
    GraficoUsuarioProvider,
    GraficoManagerChamadoProvider,
    GraficoManagerAlunoProvider,
    GraficoManagerTutorProvider,
    GraficoManagerMateriaProvider,
    Diagnostic,
    Geolocation
  ]
})
export class AppModule {}
