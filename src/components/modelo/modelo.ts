import { Component } from '@angular/core';

/**
 * Generated class for the ModeloComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modelo',
  templateUrl: 'modelo.html'
})
export class ModeloComponent {

  text: string;

  constructor() {
    console.log('Hello ModeloComponent Component');
    this.text = 'Hello World';
  }

}
