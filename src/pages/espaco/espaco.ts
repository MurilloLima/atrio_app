import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';


@IonicPage()
@Component({
  selector: 'page-espaco',
  templateUrl: 'espaco.html',
})
export class EspacoPage {
  images = [
    {
      "img": "assets/imgs/espaco/29.jpg",
    },
    {
      "img": "assets/imgs/espaco/34.jpg",
    },
    {
      "img": "assets/imgs/espaco/13.jpg"
    },
    {
      "img": "assets/imgs/espaco/12.jpg"
    },
    {
      "img": "assets/imgs/espaco/6.jpg"
    },
    {
      "img": "assets/imgs/espaco/35.jpg"
    },
    {
      "img": "assets/imgs/espaco/36.jpg"
    },
    {
      "img": "assets/imgs/espaco/3.jpg"
    },
    {
      "img": "assets/imgs/espaco/2.jpg"
    },
    {
      "img": "assets/imgs/espaco/32.jpg"
    },
    {
      "img": "assets/imgs/espaco/33.jpg"
    }
  ];
  grid = true;

  constructor(private photoViewer: PhotoViewer,private file: File,private statusBar: StatusBar) {
    // let status bar overlay webview
    this.statusBar.overlaysWebView(false);
    // set status bar to white
    this.statusBar.backgroundColorByHexString('#311734');
  }

  viewPhoto(img){
   this.photoViewer.show(decodeURI(this.file.applicationDirectory + "www/"+img));
  }

  //para mudar de uma foto por linha
  changeGrid(){
   this.grid = !this.grid;
 }

}
