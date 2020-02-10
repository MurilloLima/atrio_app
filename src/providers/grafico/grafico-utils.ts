//Métodos comuns utilizados pelo gráficos gerenciais
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class GraficoUtilsProvider {

  private API_URL = 'http://200.98.142.33/api/';

  private backgroundColor = [
    '#449D44', '#ec971f', '#00c0ef', '#c9302c', '#b94bdd', '#D8089A', '#E0A574', '#1AA6C9', '#C4EAFC', '#118969', '#8798E5',
    '#A1EA8F', '#F711A3', '#05AA68', '#0F8E62', '#99F7B5', '#ED2180', '#F2A98E', '#C45F36', '#DAE876', '#A8FF99', '#41A6A8',
    '#EAB7F4', '#A6B8EA', '#BF4609', '#EDA171', '#99FCC3', '#FCC2BD', '#F226AB', '#0B8957', '#D308A0', '#D1FFA0', '#57F9A3',
    '#EFBC94', '#D677E5', '#F4B897', '#4A72D4', '#71CC4D', '#7DF2E4', '#A3F989', '#F9F348', '#5B94C6', '#A9E3F2', '#14E0C5',
    '#E5ED95', '#197D84', '#E6F489', '#FCD8C4', '#EA8435', '#64EAC6', '#D87A5B', '#DFE52D', '#6E7BD3', '#ADD7FF', '#62EF8F'
  ];

  constructor(private http: Http) { }

  //End point para selecionar parâmetros para demais gráficos
  dashboardSelectParams(access_token: string, tipo_opcao: string) {

    return new Promise((resolve, reject) => {

      let valores = JSON.stringify({
        type: tipo_opcao
      });

      this.http.post(this.API_URL + "dashboard-select-params/", valores, this.geraHeaderPost(access_token))
        .subscribe((result: any) => {
            resolve(result.json());
        },
          (error) => {
            reject(error.json());
          })
    });

  }


  geraGrafico(data, title, labelDoughnut, viewLegend: boolean) {

    let dataDoughnut: Array<number> = [];
    let doughnutChart: any;

    if (data.data.length > 0) {

      for (let i = 0; i < data.data.length; i++) {
        //labelDoughnut.push(data.data[i].name);
        dataDoughnut.push(data.data[i].qtde);
      }

      return doughnutChart = {
        type: "doughnut",
        data: {
          labels: labelDoughnut,
          datasets: [
            {
              data: dataDoughnut,
              backgroundColor: this.backgroundColor,
              borderColor: 'transparent',
              weight: 4
            }
          ]
        },

        options: {
          title: {
            display: true,
            text: title,
            fontColor: '#fff',
            textAlign: 'left'

          },
          legend: {
            position: 'left',
            display:viewLegend,
            labels: {
              fontColor: '#fff',
              fontSize: 9,
              fontFamily: 'Neo Sans',
              padding: 7,
              boxWidth: 10
            }
          }
        }
      };
    }
    else {
      return doughnutChart = {
        type: "doughnut",
        data: {
          labels: ['SEM DADOS'],
          datasets: [
            {
              data: [0],
              backgroundColor: ['#990000'],
              borderColor: 'transparent',
              weight: 0
            }
          ]
        },

        options: {
          title: {
            display: true,
            text: title,
            fontColor: '#fff',
            textAlign: 'left'

          },
          legend: {
            position: 'left',
            labels: {
              fontColor: '#fff',
              fontSize: 9,
              fontFamily: 'Neo Sans',
              padding: 7,
              boxWidth: 7
            }
          }
        }
      };
    }
  }

  geraGraficoLine(data, title) {

    let configcallstohour;
    let listHour = [];
    let listQtde = [];

    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i].hour;
      listHour.push(element);
    }

    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i].qtde;
      listQtde.push(element);
    }

    return configcallstohour = {
      type: 'line',
      data: {
        labels: listHour,

        datasets: [
          {
            backgroundColor: '#ffffff',
            borderColor: '#311734',
            pointBorderColor: '#ffffff',
            data: listQtde,
            fill: false,
            showLine: true
          },
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: title,
          fontColor: "#FFFFFF",
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {

          xAxes: [{
            display: true,
            gridLines: {
              display: true,
              color: "#FFFFFF"
            },
            ticks: {
              fontColor: "#FFFFFF",
            },
            scaleLabel: {
              display: true,
              labelString: 'Horário',
              fontColor: '#FFFFFF'
            }
          }],
          yAxes: [{
            display: true,
            ticks: {
              fontColor: "#FFFFFF",
            },
            gridLines: {
              display: true,
              color: "#FFFFFF"
            },
            scaleLabel: {
              display: true,
              labelString: 'Quantidade',
              fontColor: '#FFFFFF'
            }
          }]
        }
      }
    }
  }

  geraGraficoBar(data, title) {

    let barChart: any;
    let listName = [];
    let listQtde = [];

    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i].name;
      listName.push(element);
    }

    for (let i = 0; i < data.data.length; i++) {
      const element = data.data[i].qtde;
      listQtde.push(element);
    }


    return barChart = {
      type: "bar",
      data: {
        labels: listName,
        datasets: [
          {
            data: listQtde,
            backgroundColor: this.backgroundColor,
            borderColor: 'transparent',
            weight: 4
          }
        ]
      },

      options: {
        responsive: true,
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: title,
          fontColor: "#FFFFFF",
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {

          xAxes: [{
            display: true,
            gridLines: {
              display: true,
              color: "#FFFFFF",
            },
            ticks: {
              display: false,
              fontColor: "#FFFFFF",
            },
            scaleLabel: {
              display: true,
              labelString: 'Aluno',
              fontColor: '#FFFFFF',
            },

          }],
          yAxes: [{
            display: true,
            ticks: {
              min:0,
              fontColor: "#FFFFFF",
            },
            gridLines: {
              display: true,
              color: "#FFFFFF"
            },
            scaleLabel: {
              display: true,
              labelString: 'Quantidade',
              fontColor: '#FFFFFF'
            }
          }]
        }
      }
    }
  }

  geraHeaderPost(access_token: string) {
    //Configura cabeçalho
    let headers = new Headers();
    let requestOptions: RequestOptions;

    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + access_token);
    requestOptions = new RequestOptions({ headers: headers });
    return requestOptions;
  }


}
