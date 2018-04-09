import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { FirebaseService } from '../common/firebase.service';
import { Categoria } from './categoria';
import * as firebase from 'firebase';

@Injectable()
export class CategoriaService extends FirebaseService {
  public DbRef:firebase.database.Reference;
  constructor(private db: AngularFireDatabase) {
    super();
    this.DbRef = firebase.database().ref('categoria');
  }


  find(key: string): Observable<Categoria> {
    return this.db.object(`/Categoria/${key}`).map(Categoria.fromJSON);
  }

  findAll(query?: any): Observable<Categoria[]> {
    let options: any = query ? { query } : {};
    return this.db.list('/categoria', options).map(Categoria.fromJSONArray);
  }

  createPost(pictureName: string, picture: string, descripcion: string): Promise<any> {
    firebase.storage().ref('/categoria')
    .child(pictureName + 'PictureCate.jpg')
    .putString(picture, 'base64', {contentType: 'image/jpeg'})
    .then((savedPicture) => {
      this.DbRef.push({
       picture: savedPicture.downloadURL,
        nombre: pictureName,
        descripcion: descripcion
     })
    });
    return 
  }

  

}

