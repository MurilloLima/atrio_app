import { Injectable } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { Http} from '@angular/http';
import { GraficoUtilsProvider } from './grafico-utils';



@Injectable()
export class GraficoUsuarioProvider {
  private API_URL = 'http://200.98.142.33/api/';
  usuario: Usuario;

  //configurações padrões
  dtIniGrafico: String;
  dtFimGrafico: String;


  constructor(private graUtils: GraficoUtilsProvider, private http: Http) {
  }

  //ATENDIMENTO POR CLASSIFICAÇÃO - ALUNO
  dashboardStudentCallsClassification(access_token: string, id_user: number, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idUser: id_user
      });

      this.http.post(this.API_URL + "dashboard-student-calls-classification/", valores,
        this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          //Por campos serem difente, valida os labels
          let labelDoughnut: Array<String> = [];
          for (let i = 0; i < result.json().data.length; i++) {
            labelDoughnut.push(result.json().data[i].name);
          }
          //resolve(result.json());
          resolve(this.graUtils.geraGrafico(result.json(), 'Chamados por matéria', labelDoughnut,true));
        },
          (error) => {
            reject(error.json());
          })
    });

  }

  //Atendimento por matéria
  dashboardStudentCallsMatter(access_token: string, id_user: number, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idUser: id_user
      });

      this.http.post(this.API_URL + "dashboard-student-calls-matter/", valores,
        this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          let labelDoughnut: Array<String> = [];
          for (let i = 0; i < result.json().data.length; i++) {
            labelDoughnut.push(result.json().data[i].name);
          }
          resolve(this.graUtils.geraGrafico(result.json(), 'Atendimento por matéria', labelDoughnut,true));
        },
          (error) => {
            reject(error.json());
          })
    });

  }

}
