import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { timer } from 'rxjs/observable/timer';

@Injectable()
export class ConexaoApiProvider {
  private API_URL = 'http://200.98.142.33/api/';
  //private API_URL = 'http://webppa.ddns.net/api/';

  private headers = new Headers();
  private requestOptions: RequestOptions;

  constructor(private http: Http, private loadingCtrl: LoadingController) {

    this.headers.append('Content-Type', 'application/json');

  }

  //Cadastro do usuário
  userStore(name: string, email: string, password: string, ) {
    //Configura cabeçalho
    let headers = new Headers();
    let requestOptions: RequestOptions;

    headers.append('Content-Type', 'application/json');

    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Aguarde, estamos validando os dados informados...'
      });
      loading.present();

      let valores = JSON.stringify({
        name: name,
        email: email,
        password: password,
        academic_resp: email,
        baia: "",
        role: ""
      });

      requestOptions = new RequestOptions({ headers: headers });

      this.http.post(this.API_URL + "user-store/", valores, requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result);
        },
          (error) => {
            loading.dismiss()
            reject(error);
          })
    });

  }

  //Faz login em uma conta. Recebe o email e password e faz um 'post' na API_URL
  //No retorno, resolve o arquivo para 'json'.
  login(email: string, password: string) {

    return new Promise((resolve, reject) => {
      //Configura cabeçalho
      let headers = new Headers();
      let requestOptions: RequestOptions;

      headers.append('Content-Type', 'application/json');

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Aguarde, estamos validando os dados informados...'
      });
      loading.present();

      let valores = JSON.stringify({
        email: email,
        password: password
      });

      requestOptions = new RequestOptions({ headers: headers });

      this.http.post(this.API_URL + "login/", valores, requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result);
          console.log(result);
        },
          (error) => {
            loading.dismiss();
            reject(error);
          })
    });
  }

  detalheUsuario(access_token: string) {
    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Acesso liberado. Baixando as informações do usuário. Aguarde...'
      });
      loading.present();

      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer ' + access_token);
      this.requestOptions = new RequestOptions({ headers: this.headers });

      this.http.get(this.API_URL + "user/", this.requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result.json());
        },
          (error) => {
            loading.dismiss()
            reject(error);
          })
    });
  }

  permissionsRole(access_token: string, role_id: any) {

    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Baixando as permissões do usuário. Aguarde...'
      });
      loading.present();

      //this.headers.append('Authorization', access_token);
      this.requestOptions = new RequestOptions({ headers: this.headers });

      let valores = JSON.stringify({
        token: access_token,
        role_id: role_id
      });

      this.http.post(this.API_URL + "permissionsRole/", valores, this.requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result.json());
        },
          (error) => {
            loading.dismiss();
            reject(error);
          })
    });

  }

  logout(access_token: string) {
    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Saindo do app...'
      });
      loading.present();

      //Configura cabeçalho
      let headers = new Headers();
      let requestOptions: RequestOptions;
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + access_token);
      requestOptions = new RequestOptions({ headers: headers });

      this.http.get(this.API_URL + "logout/", requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result);
        },
          (error) => {
            loading.dismiss();
            reject(error);
          })
    });
  }

  //Resetar senha
  forgot(email: string) {

    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Aguarde...'
      });
      loading.present();

      //this.headers.append('Authorization', access_token);
      this.requestOptions = new RequestOptions({ headers: this.headers });

      let valores = JSON.stringify({
        email: email,
      });

      this.http.post(this.API_URL + "forgot/", valores, this.requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result.json());
        },
          (error) => {
            loading.dismiss();
            reject(error);
          })
    });

  }


  //*****REFERENTE A CHAMADOS FEITA PELO ALUNO */
  requisition(access_token: String, id_usuario: number,  latitude: number, longitude: number) {
    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Aguarde, buscando as áreas...'
      });
      loading.present();

      //1º passo
      this.requestOptions = new RequestOptions({ headers: this.headers });

      let valores = JSON.stringify({
        token: access_token,
        sender_call: id_usuario,
        latitude: latitude,
        longitude: longitude
      });

      this.http.post(this.API_URL + "requisition/", valores, this.requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result.json());
        },
          (error) => {
            loading.dismiss();
            reject(error);
          })
    });

  }

  //2º Passo
  requisitionMatter(access_token: String, classification_id: number, id_usuario: number) {
    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Aguarde, carregando...'
      });
      loading.present();

      this.requestOptions = new RequestOptions({ headers: this.headers });

      let valores = JSON.stringify({
        token: access_token,
        sender_call: id_usuario,
        classification_id: classification_id
      });

      this.http.post(this.API_URL + "requisition-matter/", valores, this.requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          timer(300).subscribe(() => {
            resolve(result.json());
          });
        },
          (error) => {
            loading.dismiss();
            reject(error.json());
          })
    });
  }

  //3º passo
  requisitionCreateAll(access_token: String, matter_id: number, id_usuario: number) {
    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Aguarde, carregando...'
      });
      loading.present();

      this.requestOptions = new RequestOptions({ headers: this.headers });

      let valores = JSON.stringify({
        token: access_token,
        sender_call: id_usuario,
        matter_id: matter_id
      });

      this.http.post(this.API_URL + "requisition-create-call/", valores, this.requestOptions)
        .subscribe((result: any) => {
          loading.dismiss()
          resolve(result.json());
        },
          (error) => {
            loading.dismiss();
            reject(error.json());
          })
    });

  }

  //Cancelar chamado
  requisitionCancel(access_token: String, id_call: number) {
    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Aguarde, cancelando chamado...'
      });
      loading.present();

      this.requestOptions = new RequestOptions({ headers: this.headers });

      let valores = JSON.stringify({
        token: access_token,
        id_call: id_call
      });

      this.http.post(this.API_URL + "requisition-cancel/", valores, this.requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result.json());
        },
          (error) => {
            loading.dismiss();
            reject(error);
          })
    });

  }

  //CHAMADOS PENDENTES ALUNO
  myCallsDatePending(access_token: String) {

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Aguarde, listando seus chamados pendentes...'
    });
    loading.present();

    //Cabeçalho criado novo pois usando o ativo ele enviava 2 tokens
    let headers = new Headers();
    let requestOptions: RequestOptions;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    requestOptions = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {

      this.http.get(this.API_URL + "my-calls-date-pending/", requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result.json());
        },
          (error) => {
            loading.dismiss();
            reject(error.json());
          })
    });
  }

  //LISTAR TUTORES DISPONÍVEIS PARA O ALUNO
  tutorsJob(access_token: string) {
    return new Promise((resolve, reject) => {

      this.headers = new Headers();
      this.headers.append('Content-Type', 'application/json');
      this.headers.append('Authorization', 'Bearer ' + access_token);
      this.requestOptions = new RequestOptions({ headers: this.headers });

      this.http.get(this.API_URL + "tutors-job/", this.requestOptions)
        .subscribe((result: any) => {
          resolve(result);
        },
          (error) => {
            reject(error);
          })
    });
  }

  //**FIM DE CHAMADOS PARA O ALUNO */


  //** REFERENTE A CHAMADOS PARA O TUTOR */

  //CHAMADOS PENDENTES PARA O TUTOR
  requisitionPending(access_token: String) {

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Aguarde, listando seus chamados pendentes...'
    });
    loading.present();

    //Cabeçalho criado novo pois usando o ativo ele enviava 2 tokens
    let headers = new Headers();
    let requestOptions: RequestOptions;
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    requestOptions = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + "requisition-pending/", requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result.json());
        },
          (error) => {
            loading.dismiss();
            reject(error.json());
          })
    });

  }

  //1º PASSO (SELEÇÃO DO CONTEÚDO DO CHAMADO)
  requisitionSetTheme(id_call: number, status: number, id_theme?: number, level_theme?: number) {

    //O requisitionSetTheme é dividio em 2 status. O 1º envia somente o id_call para trazer todos os items.
    //Seleção do conteúdo do chamado
    //O 2º passo envia o id_theme e level_theme, que são os códigos de cada item. Seleção dos parâmetros
    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Aguarde, buscando itens...'
      });
      loading.present();

      this.requestOptions = new RequestOptions({ headers: this.headers });
      let valores = {};
      //Valida qual passo está. se 1, envia só id call, se 2, envia tambem id_theme e level_theme
      if (status == 1) {
        valores = JSON.stringify({
          id_call: id_call
        });

      }
      else {
        valores = JSON.stringify({
          id_call: id_call,
          id_theme: id_theme,
          level_theme: level_theme,
        });

      }

      this.http.post(this.API_URL + "requisition-set-theme/", valores, this.requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          timer(300).subscribe(() => {
            resolve(result);
          });
        },
          (error) => {
            loading.dismiss();
            reject(error);
          })
    });
  }

  //2º PASSO
  requisitionAnswer(id_call: number) {

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Aguarde, buscando itens...'
    });
    loading.present();

    this.requestOptions = new RequestOptions({ headers: this.headers });

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        id_call: id_call
      });

      this.http.post(this.API_URL + "requisition-answer/", valores, this.requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result);
        },
          (error) => {
            loading.dismiss()
            reject(error);
          })
    });
  }
  //3º PASSO
  answerRegister(id_call: number, description: String, reason: String, type: String) {
    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Aguarde, finalizando o chamado...'
      });
      loading.present();

      this.requestOptions = new RequestOptions({ headers: this.headers });

      let valores = JSON.stringify({
        id_call: id_call,
        description: description,
        reason: reason,
        type: type
      });

      this.http.post(this.API_URL + "answer-register/", valores, this.requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result);
        },
          (error) => {
            loading.dismiss();
            reject(error);
          })
    });
  }
  //**FIM CHAMADOS PARA O TUTOR */

  //REGISTRO DE ENTRADA DE PONTO PARA O TUTOR
  arrival(access_token: string) {

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Aguarde, registrando a entrada...'
    });
    loading.present();

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + access_token);
    this.requestOptions = new RequestOptions({ headers: this.headers });
    return new Promise((resolve, reject) => {

      this.http.get(this.API_URL + "arrival/", this.requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result.json());
        },
          (error) => {
            loading.dismiss()
            reject(error);
          })
    });

  }

  //REGISTRO DE ENTRADA DE PONTO PARA O TUTOR
  departure(access_token: string) {

    let loading = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: 'Aguarde, registrando a entrada...'
    });
    loading.present();

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + access_token);
    this.requestOptions = new RequestOptions({ headers: this.headers });

    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + "departure?=", this.requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result.json());
        },
          (error) => {
            loading.dismiss();
            reject(error);
          })
    });

  }

  //************************* RELATÓRIOS */
  //ATENDIMENTO POR CLASSIFICAÇÃO - ALUNO
  dashboardStudentCallsClassification(access_token: string, id_user: number, dtIni?: String, dtFim?: String) {
    //Configura cabeçalho
    let headers = new Headers();
    let requestOptions: RequestOptions;

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    requestOptions = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idUser: id_user
      });

      this.http.post(this.API_URL + "dashboard-student-calls-classification/", valores, requestOptions)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          })
    });

  }

  //Atendimento por matéria
  dashboardStudentCallsMatter(access_token: string, id_user: number, dtIni?: String, dtFim?: String) {
    //Configura cabeçalho
    let headers = new Headers();
    let requestOptions: RequestOptions;

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    requestOptions = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idUser: id_user
      });

      this.http.post(this.API_URL + "dashboard-student-calls-matter/", valores, requestOptions)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error.json());
          })
    });

  }

  //RELAÇÃO A TENANTS DE USUÁRIO
  //REGISTRO DE ENTRADA DE PONTO PARA O TUTOR
  userListTenants(access_token: string) {

    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Authorization', 'Bearer ' + access_token);
    this.requestOptions = new RequestOptions({ headers: this.headers });

    return new Promise((resolve, reject) => {
      this.http.get(this.API_URL + "user-list-tenants?=", this.requestOptions)
        .subscribe((result: any) => {
          resolve(result.json());
        },
          (error) => {
            reject(error);
          })
    });

  }

  //ALTERAR O TENANT
  userAlterTenant(access_token: String, tenant_id: number) {
    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        spinner: 'bubbles',
        content: 'Aguarde, alterando o campus...'
      });
      loading.present();

      this.requestOptions = new RequestOptions({ headers: this.headers });

      let valores = JSON.stringify({
        token: access_token,
        tenant_id: tenant_id
      });

      this.http.post(this.API_URL + "user-alter-tenant/", valores, this.requestOptions)
        .subscribe((result: any) => {
          loading.dismiss();
          resolve(result.json());
        },
          (error) => {
            loading.dismiss();
            reject(error);
          })
    });
  }

}
