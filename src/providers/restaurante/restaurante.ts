import firebase from 'firebase';
import { Injectable } from '@angular/core';
/*
 Provider, contains methods used in AddPhoto
*/
@Injectable()
export class RestauranteProvider {
  public miusuario: any;
public DbRef:firebase.database.Reference;
public dbci:firebase.database.Reference;
  constructor() {
    this.miusuario = firebase.auth().currentUser.uid;
    this.DbRef = firebase.database().ref('restaurante');
    this.dbci = firebase.database().ref('ciudad');
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
    //updates['/restaurante/'+post] = postData;
    updates[this.miusuario+'/'+post] = true;
    firebase.database().ref('restaurantePorUsuario').update(updates);
    //this.DbRef.update(updates);

    });
    return 
  }

  //returns the db refrence of our images so we can display them 
  getPhotoList(): firebase.database.Reference {
    return this.DbRef;
  }

  /*getCiudades(): firebase.database.Reference{
    return this.dbci;
  }*/

}
