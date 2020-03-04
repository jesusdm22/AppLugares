import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Lugar} from '../models/Lugar';
import {AlertController, ToastController} from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  // Lugares
  lugaresCollection: AngularFirestoreCollection<Lugar>;
  lugares: Observable<Lugar[]>;

  // Lugares favoritos
  lugaresFavoritosCollection: AngularFirestoreCollection<Lugar>;
  lugaresFavoritos: Observable<Lugar[]>;
  lugar: any;

  constructor(private afs: AngularFirestore, private alertController: AlertController, public toastController: ToastController) {
    this.lugaresCollection = afs.collection<Lugar>('lugares');

    this.lugares = this.lugaresCollection.valueChanges();

    this.lugaresFavoritosCollection = afs.collection<Lugar>('favoritos');
    this.lugaresFavoritos = this.lugaresFavoritosCollection.valueChanges();

  }

  //Esta funcion recibe el id del documento a eliminar.
  async delete(id: string) {

    const alert = await this.alertController.create({
      message: '¿Está seguro de eliminar este lugar de su lista de favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelado');
          }
        }, {
          text: 'Borrar',
          cssClass: 'primary',
          handler: () => {
            this.lugaresFavoritosCollection.doc(id).delete();
            console.log('eliminado con exito');
            this.mensaje('Eliminado correctamente', 1000, 'success');
          }
        }
      ]
    });

    await alert.present();

  }

  async mensaje(texto: string, duracion: number, estilo: string) {
    const toast = await this.toastController.create({
      message: texto,
      duration: duracion,
      position: 'top',
      color: estilo
    });
    await toast.present();
  }
}
