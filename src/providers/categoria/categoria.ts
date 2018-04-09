export class Categoria {

  $key: string;
  nombre: string;
  descripcion: string;
  picture: string;
  cantidad: number;
  prioridad: number;

  static fromJSON({$key, nombre, descripcion, picture, cantidad, prioridad}: any): Categoria {
    return new Categoria($key, nombre, descripcion, picture, cantidad, prioridad );
  }

  static fromJSONArray(json: any[]): Categoria[] {
    return json.map(Categoria.fromJSON);
  }

  constructor(
    $key: string,
    nombre: string,
    descripcion: string,
    picture: string,
    cantidad: number,
    prioridad: number
  ) {

    this.$key = $key || '';
    this.nombre = nombre || '';
    this.descripcion = descripcion || '';
    this.picture = picture || '';
    this.cantidad = cantidad || 0;
    this.prioridad = prioridad || 0;

  }

}

