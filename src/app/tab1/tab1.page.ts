import {Component, ViewChild} from '@angular/core';
import {Lugar} from '../models/Lugar';
// FIREBASE
import { AngularFirestore, AngularFirestoreCollection  } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
// Navegacion
import {AlertController, NavController, ToastController} from '@ionic/angular';
import {Tab2Page} from '../tab2/tab2.page';
import { IonSlides} from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  // Lugares
  lugaresCollection: AngularFirestoreCollection<Lugar>;
  lugares: Observable<Lugar[]>;

  // Lugares favoritos
  lugaresFavoritosCollection: AngularFirestoreCollection<Lugar>;
  lugaresFavoritos: Observable<Lugar[]>;
  lugar: any;
  @ViewChild('slides', {static: true})  slides: IonSlides;

  constructor(private afs: AngularFirestore, public navCtrl: NavController, private alertController: AlertController, public toastController: ToastController) {

    this.lugaresCollection = afs.collection<Lugar>('lugares');
    this.lugares = this.lugaresCollection.valueChanges();

    this.lugaresFavoritosCollection = afs.collection<Lugar>('favoritos');
    this.lugaresFavoritos = this.lugaresFavoritosCollection.valueChanges();

  }


  next() {
    console.log('DISLIKE');
    this.slides.slideNext();
  }

  //Esta funcion pasa al siguiente lugar, y agrega un nuevo documento a la coleccion
  async nextAdd(lugarFoto: string, id: string, lugarNombre: string,  lugarPuntuacion: number, lugarTipo: string) {
    this.lugar = new Lugar(lugarFoto, id, lugarNombre, lugarPuntuacion, lugarTipo);
    this.lugaresFavoritosCollection.doc(id).set(JSON.parse(JSON.stringify(this.lugar)));
    console.log('exito');
    await this.slides.slideNext();
    this.mensaje(lugarNombre + 'agregado a favoritos!');
  }

  async mensaje(texto: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: 1000,
      position: 'top',
      color: "success"
    });
    await toast.present();
  }


}
