import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { ConexaoApiProvider } from '../../providers/conexao-api/conexao-api';
import { UtilsProvider } from '../../providers/utils/utils';

@IonicPage()
@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html',
})
export class CadastrarPage {
  name: string;
  email: string;
  password: string;
  signupForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private conexaoApi: ConexaoApiProvider,
    private navCtrl: NavController,private statusBar: StatusBar, private utilsPr: UtilsProvider) {

    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#311734');

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

  }


  onSubmit(){
    this.conexaoApi.userStore(this.name,this.email,this.password)
    .then((data: any)=>{
      this.utilsPr.alertInformation(data.json().message);
      this.navCtrl.pop();
    })
    .catch((error)=> {

      if(error.status == 422){
        this.utilsPr.alertInformation(error.json().errors.email[0]);
      }
      else{
        console.log("Erro: ", error);
        this.utilsPr.alertError("Não foi possível cadastrar o usuario! Tente novamente.");
      }

    })
  }

}
