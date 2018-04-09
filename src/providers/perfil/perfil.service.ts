import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import { FirebaseService } from '../common/firebase.service';
//import { Place } from './place';
import {Perfil} from './perfil';
import * as firebase from 'firebase';
//import * as _ from 'lodash';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/combineLatest';


@Injectable()
export class PerfilService extends FirebaseService {
  public miUsuario:  string;
  constructor(private db: AngularFireDatabase) {
      super();
      this.miUsuario = firebase.auth().currentUser.uid;
  }


  find(key: string): Observable<Perfil> {
    return this.db.object(`/places/${key}`).map(Perfil.fromJSON);
  }

  findAll(): Observable<Perfil[]> {
    return this.db.list('/places').map(Perfil.fromJSONArray);
  }

  findByArea(areaId: string): Observable<Perfil[]> {

    return this.db.list(`/CategoriaRestaurante/${areaId}`)
      .map(places => places.map(place => place.$key))
      .map(places => places.map(placeKey => this.db.object(`/restaurante/${placeKey}`)))
      .flatMap(places => (places.length === 0) ? Observable.of([]) : Observable.combineLatest(places))
      .map(this.sortPlacesByPriority);
  }

  buscarPorUsuario(): Observable<Perfil[]> {

    return this.db.list(`/usuarioRestaurante/${this.miUsuario}`)
      .map(places => places.map(place => place.$key))
      .map(places => places.map(placeKey => this.db.object(`/restaurante/${placeKey}`)))
      .flatMap(places => (places.length === 0) ? Observable.of([]) : Observable.combineLatest(places))
      .map(this.sortPlacesByPriority);
  }

  sortPlacesByPriority(places: Perfil[]): Perfil[] {
    return places.sort((a: Perfil, b: Perfil) => {
      return a.priority -  b.priority;
    });
  }

  create(place: Perfil): Observable<any> {
    delete place.$key;

    const newPlaceKey: string = this.db.list('/places').push(null).key;
    let updates: any = {};

    updates[`/places/${newPlaceKey}`] = place;
    updates[`/placesPerArea/${place.userId}/${newPlaceKey}`] = true;

    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);

  }


  update(place: Perfil): Observable<any> {
    let updatedPlace: Perfil = Object.assign({}, place);
    delete updatedPlace.$key;
    const action: firebase.Promise<any> = this.db.list('/places').update(place.$key, updatedPlace);
    return super.actionAsObservable(action);
  }

  delete(place: Perfil): Observable<any> {
    let updates: any = {};

    updates[`/places/${place.$key}`] = null;
    updates[`/placesPerArea/${place.userId}/${place.$key}`] = null;

    const action: firebase.Promise<any> = this.db.object('/').update(updates);
    return super.actionAsObservable(action);
  }


  

  uploadImage(place: Perfil, file: any): void {
    let storageRef: firebase.storage.Reference = firebase.storage().ref();
    let uploadTask: firebase.storage.UploadTask = storageRef.child(`places/images/${file.name}`).put(file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => { console.log('Place files uploaded'); },
      (error) => { console.warn('Place error uploading files:', error.message); },
      () => {
        if (!place.imagen) place.imagen = [];
        place.imagen.push(uploadTask.snapshot.downloadURL);
        this.update(place);
      }
    );

  }

}

