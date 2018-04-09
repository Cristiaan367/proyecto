import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
/*
 Provider, contains methods used in AddPhoto
*/
@Injectable()
export class RestauranteProvider {
  public miusuario: any;
public DbRef:firebase.database.Reference;
public dbci:firebase.database.Reference;
public dbm;
  constructor() {
    this.miusuario = firebase.auth().currentUser.uid;
    this.DbRef = firebase.database().ref('restaurante');
    this.dbci = firebase.database().ref('ciudad');
    this.dbm = firebase.database().ref('/');

  }

  //will take the image from the addphoto page, push the image to storage, and then store the downloadUrl and given name of the photo
  
  createPost(resraurante: {}): Promise<any> {
    /*firebase.storage().ref('/pictures/').child(pictureName)
    .child('plantPicture.png')
    .putString(picture, 'base64', {contentType: 'image/png'})
    .then((savedPicture) => {
    this.DbRef.push({
     picture: savedPicture.downloadURL,
      name: pictureName,
     })
    });
    return*/ 
    /*var postData = {
      picture :picture,
      name: pictureName,
      nombre: 'ass'
    }*/
    firebase.storage().ref('/restaurante').child(resraurante['nombre'])
    .child(resraurante['nombre'] + 'Picture.jpg')
    .putString(resraurante['picture'], 'base64', {contentType: 'image/jpeg'})
    .then((savedPicture) => {
      resraurante['picture'] = savedPicture.downloadURL;
    var post = this.DbRef.push(resraurante).key;
    var updates={};
    updates['/usuarioRestaurante/'+this.miusuario+'/'+post] = true;
    updates['/CategoriaRestaurante/'+resraurante['ciudad']+'/'+post] = true;
    firebase.database().ref('/').update(updates);
    //this.DbRef.update(updates);

    });
    return 
  }

  crearMapa(id, lat, lng){
    var updates={};
    updates['/restaurante/'+id+'/lat']=lat;
    updates['/restaurante/'+id+'/lng']=lng;
     return this.dbm.update(updates);
  }

  //returns the db refrence of our images so we can display them 
  getPhotoList(): firebase.database.Reference {
    return this.DbRef;
  }

  /*getCiudades(): firebase.database.Reference{
    return this.dbci;
  }*/

  listSomethingOnceService(path:any){

    return firebase.database().ref(path).once('value');
  }



}
