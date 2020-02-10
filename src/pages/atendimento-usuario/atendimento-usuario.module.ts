import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AtendimentoUsuarioPage } from './atendimento-usuario';

@NgModule({
  declarations: [
    AtendimentoUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(AtendimentoUsuarioPage),
  ],
})
export class AtendimentoUsuarioPageModule {}
