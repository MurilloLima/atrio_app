
import { Injectable } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { Http } from '@angular/http';
import { GraficoUtilsProvider } from './grafico-utils';


@Injectable()
export class GraficoManagerTutorProvider {

  private API_URL = 'http://200.98.142.33/api/';
  usuario: Usuario;


  constructor(private graUtils: GraficoUtilsProvider, private http: Http) {
  }

  //Chamados por tutor e matéria
  dashboardCallsToTutorMatter(access_token: string, idTutor: number, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idTutor: idTutor
      });

      this.http.post(this.API_URL + "dashboard-calls-to-tutor-matter/", valores,
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

  //Chamados por tutor e classificação
  dashboardCallsToReasonTutor(access_token: string, idTutor: number, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idTutor: idTutor
      });

      this.http.post(this.API_URL + "dashboard-calls-to-reason-tutor/", valores,
        this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          //Por campos serem difente, valida os labels
          let labelDoughnut: Array<String> = [];
          for (let i = 0; i < result.json().data.length; i++) {
            labelDoughnut.push(result.json().data[i].name);
          }

          resolve(this.graUtils.geraGrafico(result.json(), 'Chamados por classificação', labelDoughnut,true));
        },
          (error) => {
            reject(error.json());
          })
    });
  }

  //Atendimentos por hora e tutor
  dashboardAnswearToHourTutor(access_token: string, idTutor: number, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idTutor: idTutor
      });

      this.http.post(this.API_URL + "dashboard-answear-to-hour-tutor/", valores,
        this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          resolve(this.graUtils.geraGraficoLine(result.json(), 'Chamados por hora'));
        },
          (error) => {
            reject(error.json());
          })
    });
  }
}
