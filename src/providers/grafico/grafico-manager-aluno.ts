import { Injectable } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { Http} from '@angular/http';
import { GraficoUtilsProvider } from './grafico-utils';


@Injectable()
export class GraficoManagerAlunoProvider {

  private API_URL = 'http://200.98.142.33/api/';
  usuario: Usuario;


  constructor(private graUtils: GraficoUtilsProvider, private http: Http) {
  }

  //Chamados por aluno e matéria
  dashboardCallsToStudentMatter(access_token: string, idStudent: number, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idStudent: idStudent
      });

      this.http.post(this.API_URL + "dashboard-calls-to-student-matter/", valores,
        this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          //Por campos serem difente, valida os labels
          let labelDoughnut: Array<String> = [];
          for (let i = 0; i < result.json().data.length; i++) {
            labelDoughnut.push(result.json().data[i].name);
          }

          resolve(this.graUtils.geraGrafico(result.json(), 'Chamados por matéria', labelDoughnut,true));
        },
          (error) => {
            reject(error.json());
          })
    });

  }

  //Atendimentos por classificação
  dashboardStudentCallsClassification(access_token: string, idStudent: number, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idUser: idStudent
      });

      this.http.post(this.API_URL + "dashboard-student-calls-classification/", valores,
        this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          //Por campos serem difente, valida os labels
          let labelDoughnut: Array<String> = [];
          for (let i = 0; i < result.json().data.length; i++) {
            labelDoughnut.push(result.json().data[i].name);
          }

          resolve(this.graUtils.geraGrafico(result.json(), 'Atendimentos por classificação', labelDoughnut,true));
        },
          (error) => {
            reject(error.json());
          })
    });

  }


}
