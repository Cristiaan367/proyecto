import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {Location} from '../../providers/location/location';
//import { Device } from '@ionic-native/device';
//import * as firebase from 'firebase';
//import { Platform } from 'ionic-angular';
//declare const google;

 declare var google;
/**
 * Generated class for the InicioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {
  title: string = 'Arrastre el Icono hasta la posicion de su resataurante'
  lat: number;
  lng: number;
  //@ViewChild('map') mapElement: ElementRef;
  //private userAuth: any;
  map: any;//manejador del mapa
  //coords: any = {lat:0, lng:0 }
 // markers = [];
  // ref = firebase.database().ref('geolocation/');
  location : Location;
  marker = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public platform: Platform, private geolocation:Geolocation) {
    
    this.lat= 51.678418;
    this.lng= 7.809007;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaCategoriaPage');
    //this.getPosition();
  }
  onSetMarker(event: any){
    console.log(event);
    this.marker = true;
    //this.location = new Location(event.coords.lat,event.coords.lng)
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
  }
  mapa(){
    console.log(this.lat+'/'+this.lng)
  }
  dragEnd($event) {
    this.lat= $event.coords.lat;
    this.lng = $event.coords.lng;
    //this.form.patchValue({ latitude: $event.coords.lat, longitude: $event.coords.lng });
  }


  getPosition():any{
    console.log('entra');
    this.geolocation.getCurrentPosition().then(response =>{
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })
  }

  loadMap(position: Geoposition){
    let latitude = position.coords.latitude;
    let longitude = position.coords.latitude;
    console.log(latitude, longitude);

    let mapEle: HTMLElement = document.getElementById('map');

    let myLatLng = {lat: latitude, lng: longitude};
    this.map = new google.maps.Map(mapEle,{
      center:myLatLng,
      zoom:12
    });
     var infowindow = new  google.maps.InfoWindow({
       content:'estoy aqui'
     });

     let marker = new google.maps.Marker({
         position:myLatLng,
         map: this.map
     });
     marker.addListener('click', function(){
         infowindow.open(this.map, marker);
     });
  }

  

  

  

}


