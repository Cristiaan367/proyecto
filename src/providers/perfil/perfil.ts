
export class Perfil {

  $key: string;
  nombre: string;
  descripcion: string;
  contacto: number;
  latitude: number;
  longitude: number;
  excerpt: string;
  direccion: string;
  picture: string;
  priority: number;
  web: string;
  ciudad:string;
  userId: string;
  imagen: string[];

  static fromJSON({$key, nombre, descripcion, excerpt, latitude, longitude, direccion, picture, priority, userId, imagen, contacto,web, ciudad}: any): Perfil {
    return new Perfil($key, nombre, descripcion, excerpt, latitude, longitude, direccion, picture, priority, userId, imagen, contacto, web, ciudad );
  }

  static fromJSONArray(json: any[]): Perfil[] {
    return json.map(Perfil.fromJSON);
  }

  constructor(
    $key: string,
    nombre: string,
    descripcion: string,
    excerpt: string,
    latitude: number,
    longitude: number,
    direccion: string,
    picture: string,
    priority: number,
    userId: string,
    imagen: string[],
    contacto: number,
    ciudad : string,
    web: string,
  ) {

    this.$key = $key || '';
    this.nombre = nombre || '';
    this.descripcion = descripcion || '';
    this.excerpt = excerpt || '';
    this.latitude = latitude || 0;
    this.longitude = longitude || 0;
    this.direccion = direccion || '';
    this.picture = picture || '';
    this.priority = priority || 0;
    this.userId = userId || '';
    this.imagen = imagen || [] ;
    this.contacto= contacto || 0;
    this.ciudad = ciudad ||'';
    this.web = web ||'';
  }

}
