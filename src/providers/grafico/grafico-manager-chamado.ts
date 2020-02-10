
import { Injectable } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { Http} from '@angular/http';
import { GraficoUtilsProvider } from './grafico-utils';


@Injectable()
export class GraficoManagerChamadoProvider {

  private API_URL = 'http://200.98.142.33/api/';
  usuario: Usuario;

  constructor(private graUtils: GraficoUtilsProvider, private http: Http) {
  }

  //Chamados por matéria
  dashboardCallsToMatter(access_token: string, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim
      });

      this.http.post(this.API_URL + "dashboard-calls-to-matter/", valores, this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          //Por campos serem difente, valida os labels
          let labelDoughnut: Array<String> = [];
          for (let i = 0; i < result.json().data.length; i++) {
            labelDoughnut.push(result.json().data[i].nameMatter);
          }

          resolve(this.graUtils.geraGrafico(result.json(), 'Chamados por matéria', labelDoughnut,true));
        },
          (error) => {
            reject(error.json());
          })
    });

  }

  //Chamados por tutor
  dashboardCallsToDest(access_token: string, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim
      });

      this.http.post(this.API_URL + "dashboard-calls-to-dest/", valores, this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          //Por campos serem difente, valida os labels
          let labelDoughnut: Array<String> = [];
          for (let i = 0; i < result.json().data.length; i++) {
            labelDoughnut.push(result.json().data[i].name);
          }

          resolve(this.graUtils.geraGrafico(result.json(), 'Chamados por tutor', labelDoughnut,false));
        },
          (error) => {
            reject(error.json());
          })
    });

  }

  //Chamado por hora
  dashboardCallsToHour(access_token: string, dtIni?: String, dtFim?: String) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim
      });

      this.http.post(this.API_URL + "dashboard-calls-to-hour/", valores, this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          resolve(this.graUtils.geraGraficoLine(result.json(), 'Chamados por hora'));
        },
          (error) => {
            reject(error.json());
          })
    });

  }

  //Top 10 alunos com mais chamados
  dashboardCallsToOriTopTenDesc(access_token: string, dtIni?: String, dtFim?: String) {
    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim
      });

      this.http.post(this.API_URL + "dashboard-calls-to-ori-top-10-desc/", valores, this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          resolve(this.graUtils.geraGraficoBar(result.json(), 'Top 10 alunos com mais chamados'));
        },
          (error) => {
            reject(error.json());
          })
    });
  }

  //Top 10 alunos com menos chamados
  dashboardCallsToOriTopTen(access_token: string, dtIni?: String, dtFim?: String) {
    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        dtIni: dtIni,
        dtFim: dtFim
      });

      this.http.post(this.API_URL + "dashboard-calls-to-ori-top-10/", valores, this.graUtils.geraHeaderPost(access_token))
        .subscribe((result: any) => {
          resolve(this.graUtils.geraGraficoBar(result.json(), 'Top 10 alunos com menos chamados'));
        },
          (error) => {
            reject(error.json());
          })
    });
  }

}
