import firebase from 'firebase';
import { Injectable } from '@angular/core';
/*
 Provider, contains methods used in AddPhoto
*/
@Injectable()
export class PhotoProvider {
  public miusuario: any;
public DbRef:firebase.database.Reference;
public dbci:firebase.database.Reference;
  constructor() {
    //this.miusuario = firebase.auth().currentUser.uid;
    this.DbRef = firebase.database().ref('restaurante'+'/'+this.miusuario);
    this.dbci = firebase.database().ref('ciudad');
  }

  //will take the image from the addphoto page, push the image to storage, and then store the downloadUrl and given name of the photo
  
  createPost(pictureName: string, picture: string): Promise<any> {
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
    var postData = {
      picture :picture,
      name: pictureName,
      nombre: 'ass'
    }
    firebase.storage().ref('/ciudades').child(pictureName)
    .child(pictureName + 'Picture.jpg')
    .putString(picture, 'base64', {contentType: 'image/jpeg'})
    .then((savedPicture) => {
    var post = this.DbRef.push({
     picture: savedPicture.downloadURL,
      name: pictureName,
     }).key;
    var updates={};
    updates['/posts/'+post] = postData;
    updates['/user-post/'+this.miusuario+'/'+post] = postData;
    this.DbRef.update(updates);

    });
    return 
  }

  //returns the db refrence of our images so we can display them 
  getPhotoList(): firebase.database.Reference {
    return this.DbRef;
  }
  getCiudades(): firebase.database.Reference{
    return this.dbci;
  }

}
