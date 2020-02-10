import { Injectable } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { Http } from '@angular/http';
import { GraficoUtilsProvider } from './grafico-utils';


@Injectable()
export class GraficoManagerMateriaProvider {

  private API_URL = 'http://200.98.142.33/api/';
  usuario: Usuario;


  constructor(private graUtils: GraficoUtilsProvider, private http: Http) {
  }



  //Qtde de atendimentos tutores por matéria
  dashboardCallsToMatter(access_token: string, idMatter: number, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idMatter: idMatter
      });

      this.http.post(this.API_URL + "dashboard-calls-to-dest-matter/", valores,
        this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          //Por campos serem difente, valida os labels
          let labelDoughnut: Array<String> = [];
          for (let i = 0; i < result.json().data.length; i++) {
            labelDoughnut.push(result.json().data[i].name);
          }

          resolve(this.graUtils.geraGrafico(result.json(), 'Atendimentos tutores', labelDoughnut,false));
        },
          (error) => {
            reject(error.json());
          })
    });

  }

  //Qtde classificação duvidas por matéria
  dashboardCallsToReasonMatter(access_token: string, idMatter: number, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idMatter: idMatter
      });

      this.http.post(this.API_URL + "dashboard-calls-to-reason-matter/", valores,
        this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          //Por campos serem difente, valida os labels
          let labelDoughnut: Array<String> = [];
          for (let i = 0; i < result.json().data.length; i++) {
            labelDoughnut.push(result.json().data[i].name);
          }

          resolve(this.graUtils.geraGrafico(result.json(), 'Classificação de dúvidas', labelDoughnut,true));
        },
          (error) => {
            reject(error.json());
          })
    });

  }

  //Top 10 alunos com mais chamados por matéria
  dashboardCallsToMatterTopTenDesc(access_token: string, idMatter: number, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idMatter: idMatter
      });

      this.http.post(this.API_URL + "dashboard-calls-to-matter-top-10-desc/", valores,
        this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          resolve(this.graUtils.geraGraficoBar(result.json(), 'Top 10 alunos com mais chamados'));
        },
          (error) => {
            reject(error.json());
          })
    });
  }
  //Top 10 alunos com menos chamados por matéria
  dashboardCallsToMatterTopTenAsc(access_token: string, idMatter: number, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idMatter: idMatter
      });

      this.http.post(this.API_URL + "dashboard-calls-to-matter-top-10-asc/", valores,
        this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          resolve(this.graUtils.geraGraficoBar(result.json(), 'Top 10 alunos com menos chamados'));
        },
          (error) => {
            reject(error.json());
          })
    });

  }

  //Chamados por hora e matéria
  dashboardCallsToHourMatter(access_token: string, idMatter: number, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim,
        idMatter: idMatter
      });

      this.http.post(this.API_URL + "dashboard-calls-to-hour-matter/", valores, this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          resolve(this.graUtils.geraGraficoLine(result.json(), 'Chamados por hora'));
        },
          (error) => {
            reject(error.json());
          })
    });

  }


}
